import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import { chromium } from "playwright";

const port = Number(process.env.SMOKE_PORT ?? 5174);
const baseUrl = `http://127.0.0.1:${port}`;

const server = spawn(
  "npm",
  ["run", "dev", "--", "--host", "127.0.0.1", "--port", String(port), "--strictPort"],
  {
    env: { ...process.env, FORCE_COLOR: "0" },
    stdio: ["ignore", "pipe", "pipe"]
  }
);

let serverOutput = "";
server.stdout.on("data", (chunk) => {
  serverOutput += chunk.toString();
});
server.stderr.on("data", (chunk) => {
  serverOutput += chunk.toString();
});

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(`Dev server exited early.\n${serverOutput}`);
    }

    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      // Vite is still starting.
    }

    await delay(250);
  }

  throw new Error(`Timed out waiting for ${baseUrl}.\n${serverOutput}`);
}

async function clickFirstPlayableCard(page) {
  const playableCard = page.locator("button.card-button:not([disabled])").first();
  if ((await playableCard.count()) > 0) {
    await playableCard.click();
    return true;
  }
  return false;
}

async function winFirstBattle(page) {
  for (let step = 0; step < 40; step += 1) {
    if (await page.getByRole("button", { name: /claim reward/i }).isVisible().catch(() => false)) {
      return;
    }

    if (!(await clickFirstPlayableCard(page))) {
      await page.getByRole("button", { name: /end turn/i }).click();
    }

    await page.waitForTimeout(80);
  }

  throw new Error("Could not reach the reward screen from the first battle.");
}

async function runSmoke() {
  await waitForServer();

  const browser = await chromium.launch({ headless: true });
  const consoleErrors = [];

  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => consoleErrors.push(error.message));

    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await page.getByRole("heading", { name: "Rogue Harvest" }).waitFor();
    await page.getByRole("button", { name: /sound on/i }).click();
    await page.getByRole("button", { name: /sound off/i }).waitFor();
    await page.getByLabel("Sound volume").fill("0.25");
    await page.getByText("Volume 25%").waitFor();
    await page.getByRole("button", { name: /sound off/i }).click();
    await page.getByRole("button", { name: /sound on/i }).waitFor();

    await page.getByRole("button", { name: /start run/i }).click();
    await page.getByRole("button", { name: /enter starter patch/i }).click();
    await page.getByRole("button", { name: /start battle/i }).click();

    await page.getByText(/Intent:/).waitFor();
    await page.locator(".status-glossary summary").click();
    await page.getByText("Poison").waitFor();

    await clickFirstPlayableCard(page);
    await page.getByRole("button", { name: /end turn/i }).click();
    await page.locator(".battle-hud").getByText("Turn 2").waitFor();

    await winFirstBattle(page);
    await page.getByRole("button", { name: /claim reward/i }).click();
    await page.getByRole("heading", { name: /choose a card/i }).waitFor();
    await page.getByText(/added to your run deck/i).waitFor();

    await page.locator(".reward-grid button").first().click();
    await page.getByText(/The Starter Patch/).waitFor();

    if (consoleErrors.length > 0) {
      throw new Error(`Browser console errors:\n${consoleErrors.join("\n")}`);
    }

    console.log("Smoke test passed: start -> map -> battle -> card play -> enemy turn -> reward -> map.");
  } finally {
    await browser.close();
  }
}

runSmoke()
  .finally(() => {
    server.kill("SIGTERM");
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
