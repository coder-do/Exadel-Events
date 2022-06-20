import puppeteer, { Browser, Page } from "puppeteer";

describe("Testing App.tsx", () => {
	let browser: Browser;
	let page: Page;

	beforeAll(async () => {
		browser = await puppeteer.launch();
		page = await browser.newPage();
	});

	afterAll(async () => {
		await browser.close();
	});

	it("Home page initially will show log in link", async () => {
		await page.goto("http://localhost:3000/");
		await page.waitForSelector(".home_title");
		const title = await page.$eval(".home_title", (el) => el.textContent);
		expect(title).toBe("First, you need to log in");
	});

	it("It will log in", async () => {
		await page.goto("http://localhost:3000/auth/login");
		await page.type("#basic_email", "admin@exadel.com");
		await page.type("#basic_password", "admin");
		await Promise.all([
			page.click("#login"),
			page.waitForNavigation({
				waitUntil: "networkidle0",
			}),
		]);
		await page.screenshot({ path: "src/__tests__/screenshots/login.png" });
		expect(page.url()).toBe("http://localhost:3000/");
	});

	it("It will create a new account", async () => {
		await page.evaluate(() => {
			localStorage.clear();
		});
		await page.goto("http://localhost:3000/auth/register");
		await page.type("#basic_username", "test");
		await page.type("#basic_email", Date.now().toString() + "@mail.ru");
		await page.type("#basic_password", "testmail");
		await page.type("#basic_confirm", "testmail");
		await page.screenshot({
			path: "src/__tests__/screenshots/register-before.png",
		});
		await Promise.all([
			page.click("#register"),
			page.waitForNavigation({
				waitUntil: "networkidle0",
			}),
		]);
		await page.screenshot({
			path: "src/__tests__/screenshots/register-after.png",
		});
		expect(page.url()).toBe("http://localhost:3000/auth/login");
	});
});
