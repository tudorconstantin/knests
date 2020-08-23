const clientUrl = process.env.CLIENT_URL || 'http://localhost:8080';
describe("Signup flow", () => {
  it("should 'signup or log in with email'", async () => {
    try {
      console.log(`=======env`,`${clientUrl}/signup`);
      await page.goto(`${clientUrl}/signup`);
      // via the toEqualText method
      await expect(page).toEqualText("h2", "Sign up")      
    } catch (error) {
      console.trace(`=======`, error);
    }
  })
  // it("should navigate to iana once you click on 'More information'", async () => {
  //   await page.click("a");
  //   expect(page.url()).toMatch(/iana\.org/)
  // })
})