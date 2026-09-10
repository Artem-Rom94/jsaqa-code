let page;


beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});


describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1', { timeout: 30000 });
    const title2 = await page.title();
    expect(title2).toEqual('GitHub · Change is constant. GitHub keeps you ahead. · GitHub');
  }, 40000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 10000);

  test("The page contains Sign in button", async () => {
    const btnSelector = 'a[class*="Primer_Brand__Button"] span[class*="Button--label-secondary"]';
    await page.waitForSelector(btnSelector, {
      visible: true,
      timeout: 20000,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up");
  }, 30000);
});

//  НОВЫЙ БЛОК
describe("Other GitHub pages title tests", () => {
  test("GitHub main page title should contain 'GitHub'", async () => {
    await page.goto("https://github.com");
    const title = await page.title();
    expect(title).toContain("GitHub");
  });

  test("GitHub Explore page title should contain 'Explore'", async () => {
    await page.goto("https://github.com/explore");
    const title = await page.title();
    expect(title).toContain("Explore");
  });

  test("GitHub Trending page title should contain 'Trending'", async () => {
    await page.goto("https://github.com/trending");
    const title = await page.title();
    expect(title).toContain("Trending");
  });
});