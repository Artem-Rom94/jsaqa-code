const { test, expect } = require("@playwright/test");
const user = require("./user");

test("Successful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.click(
    "#__next > div:nth-child(2) > div > div > div.modal_container__bYVMP > div.modal_content__DUfb6 > div.styles_root__yEztd > div > div.styles_otherWays__ruSCf > div",
  );
  await page.click(
    "#__next > div:nth-child(2) > div > div > div.modal_container__bYVMP > div.modal_content__DUfb6 > div.styles_root__yEztd > div > div.styles_socials__l_Xf8.styles_visible__ADyIt > div.styles_button__MYGdj.styles_emailButton__OKJKJ",
  );
  await page.waitForSelector(
    '#__next > div:nth-child(2) > div > div > div.modal_container__bYVMP > div.modal_content__DUfb6 > div.styles_root__yEztd > div > div.styles_socials__l_Xf8.styles_visible__ADyIt > div.styles_loginForm__itQt_.styles_visible__ADyIt > form > div.Input_root__Kw_9L.Input_size-m__MEuuj.Input_fluid__qKoHw > input[type="email"]',
    { timeout: 10000 },
  );
  await page.fill(
    '#__next > div:nth-child(2) > div > div > div.modal_container__bYVMP > div.modal_content__DUfb6 > div.styles_root__yEztd > div > div.styles_socials__l_Xf8.styles_visible__ADyIt > div.styles_loginForm__itQt_.styles_visible__ADyIt > form > div.Input_root__Kw_9L.Input_size-m__MEuuj.Input_fluid__qKoHw > input[type="email"]',
    user.email,
  );
  await page.fill(
    "#__next > div:nth-child(2) > div > div > div.modal_container__bYVMP > div.modal_content__DUfb6 > div.styles_root__yEztd > div > div.styles_socials__l_Xf8.styles_visible__ADyIt > div.styles_loginForm__itQt_.styles_visible__ADyIt > form > div.styles_passwordInputWrapper__IOpHE > div.Input_root__Kw_9L.Input_size-m__MEuuj.Input_fluid__qKoHw > input",
    user.password,
  );
  await page.click('button[type="submit"]');
  await page.waitForURL(/\/profile/, { timeout: 20000 });
  const catalogLink = await page.locator('a:has-text("Каталог курсов")');
  await expect(catalogLink).toBeVisible({ timeout: 10000 });
});

test("Unsuccessful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.click(
    "#__next > div:nth-child(2) > div > div > div.modal_container__bYVMP > div.modal_content__DUfb6 > div.styles_root__yEztd > div > div.styles_otherWays__ruSCf > div",
  );
  await page.click(
    "#__next > div:nth-child(2) > div > div > div.modal_container__bYVMP > div.modal_content__DUfb6 > div.styles_root__yEztd > div > div.styles_socials__l_Xf8.styles_visible__ADyIt > div.styles_button__MYGdj.styles_emailButton__OKJKJ",
  );
  await page.waitForSelector(
    '#__next > div:nth-child(2) > div > div > div.modal_container__bYVMP > div.modal_content__DUfb6 > div.styles_root__yEztd > div > div.styles_socials__l_Xf8.styles_visible__ADyIt > div.styles_loginForm__itQt_.styles_visible__ADyIt > form > div.Input_root__Kw_9L.Input_size-m__MEuuj.Input_fluid__qKoHw > input[type="email"]',
    { timeout: 10000 },
  );
  await page.fill(
    '#__next > div:nth-child(2) > div > div > div.modal_container__bYVMP > div.modal_content__DUfb6 > div.styles_root__yEztd > div > div.styles_socials__l_Xf8.styles_visible__ADyIt > div.styles_loginForm__itQt_.styles_visible__ADyIt > form > div.Input_root__Kw_9L.Input_size-m__MEuuj.Input_fluid__qKoHw > input[type="email"]',
    "invalid@example.com",
  );
  await page.fill(
    "#__next > div:nth-child(2) > div > div > div.modal_container__bYVMP > div.modal_content__DUfb6 > div.styles_root__yEztd > div > div.styles_socials__l_Xf8.styles_visible__ADyIt > div.styles_loginForm__itQt_.styles_visible__ADyIt > form > div.styles_passwordInputWrapper__IOpHE > div.Input_root__Kw_9L.Input_size-m__MEuuj.Input_fluid__qKoHw > input",
    "invalidpassword",
  );
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2000);
  const errorMessage = await page.locator('[data-testid="login-error-hint"]');
  await expect(errorMessage).toBeVisible({ timeout: 10000 });
});
