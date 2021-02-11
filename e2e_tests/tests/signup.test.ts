process.env.DEBUG = "pw:api,pw:browser,pw:protocol";
import { getUsers } from '../fixtures/users';
const clientUrl = process.env.CLIENT_URL || 'http://localhost:8080';
describe("Signup/login flow", () => {
  it("should display the signup page", async () => {
    await page.goto(`${clientUrl}/signup`);
    await expect(page).toEqualText("h2", "Sign up");
  }, 120000);
  it("should be able to sign up with user1", async () => {
    const [user1, user2] = getUsers();
    await expect(page).toEqualText("h2", "Sign up");
    await page.type('input[name="email"]', user1.email);
    await page.type('input[name="password"]', user1.password);
    await page.type('input[name="repeatPassword"]', user1.password);

    // await Promise.all([
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ timeout: 60000, waitUntil: 'domcontentloaded' });
    // ]);

    await expect(page).toEqualText("h2", "Login with email");
  }, 120000);

  it("should be able login with user1", async () => {
    const [user1, user2] = getUsers();
    await page.goto(`${clientUrl}/login`);
    await expect(page).toEqualText("h2", "Login with email");
    await page.type('input[name="email"]', user1.email);
    await page.type('input[name="password"]', user1.password);

    // await Promise.all([
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ timeout: 60000, waitUntil: 'domcontentloaded' });
    // ]);

    await expect(page).toHaveText("TOTAL USERS");
  }, 120000);
})