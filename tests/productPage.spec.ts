import { test, expect } from '@playwright/test'
import { BASE_URL, USERNAME, PASSWORD } from '../utils/envConfig'
import { ProductPage } from '../pages/ProductPage'
import { LoginPage } from '../pages/LoginPage'
import { productPageLocators } from '../locators/ProductPageLocators'
import { LoginLocators } from '../locators/LoginLocators'
import { productsToCart } from '../test-data/products'

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

    test("validate product page", async ({ page }) => {
        const products = await productPage.validateAllProductsDisplayed();
        expect(products.names.length).toBeGreaterThan(0);
        expect(products.prices.length).toBe(products.names.length);
        await productPage.addFirstProductToCart();
        await productPage.addAllProductsToCart()


    })

    test("validate some product in addtocart", async ({ page }) => {
        await productPage.addSpecificProductsToCart(productsToCart);
    })

    test("Filter By Name A to Z",async()=>
    {
        await productPage.filterByNameAtoZ();
        const names=await productPage.getProductNames();
        const sorted=[...names].sort();
        expect(names).toEqual(sorted);
    })

    test("Filter By Name Z to A",async()=>
    {
        await productPage.filterByNameZtoA();
        const names=await productPage.getProductNames();
        const sorted=[...names].sort().reverse();
        expect(names).toEqual(sorted);
    })

    test("Filter By Price LowToHigh",async()=>
    {
        await productPage.filterByPriceLowToHigh();
        const price=await productPage.getProductPrices();
        const sortedprice=[...price].sort((a,b)=>a-b);
        expect(price).toEqual(sortedprice);
    })
    test.only("Filter By Price HighToLow",async()=>
    {
        await productPage.filterByPriceHighToLow();
        const price=await productPage.getProductPrices();
        const sortedprice=[...price].sort((a,b)=>b-a);
        expect(price).toEqual(sortedprice);
    })
})
