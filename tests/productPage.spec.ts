import { test, expect } from '@playwright/test'
import { BASE_URL, USERNAME, PASSWORD } from '../utils/envConfig'
import { ProductPage } from '../pages/ProductPage'
import { LoginPage } from '../pages/LoginPage'
import { productPageLocators } from '../locators/ProductPageLocators'
import { LoginLocators } from '../locators/LoginLocators'

test.describe("Product Page Validation", () => {
    let loginPage: LoginPage
    let productPage: ProductPage
    //runs before other tests
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);

        await page.goto(BASE_URL);
        await loginPage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    })
    test("validate Logout functionality", async ({ page }) => {
        await productPage.logout();
        await expect(page.locator(LoginLocators.loginButton)).toBeVisible();
    })


    test("Validate About page and navigate back", async ({ page }) => {
        await productPage.openAboutPage();
        await expect(page.locator(productPageLocators.requestDemoButton).first()).toBeVisible();
        await expect(page.locator(productPageLocators.tryitfree).first()).toBeVisible();
        await page.goBack();
        await expect(page.locator(productPageLocators.settingIcon)).toBeVisible()

    })

    test("validate product page",async({page})=>
    {
        await productPage.validateAllProductsDisplayed();
        await productPage.addFirstProductToCart();
        await productPage.addAllProductsToCart()

    })

})
