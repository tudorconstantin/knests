const clientUrl = process.env.CLIENT_URL || 'http://client:8080';
describe("Signup flow", () => {
  it("should 'signup or log in with email'", async () => {
    console.log(`=======env`, clientUrl, process.env);
    await page.goto(process.env.CLIENT_url);
    // via the toEqualText method
    await expect(page).toEqualText("h1", "Example Domain")
    // or via the Playwright text selector engine
    await expect(page).toHaveSelector('"Example Domain"', {
      state: "attached"
    })
  })
  it("should navigate to iana once you click on 'More information'", async () => {
    await page.click("a");
    expect(page.url()).toMatch(/iana\.org/)
  })
})