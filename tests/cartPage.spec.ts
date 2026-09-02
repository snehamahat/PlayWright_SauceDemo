import { test, expect } from '@playwright/test'
import { BASE_URL, USERNAME, PASSWORD } from '../utils/envConfig'
import { ProductPage } from '../pages/ProductPage'
import { LoginPage } from '../pages/LoginPage'
import { productPageLocators } from '../locators/ProductPageLocators'
import { LoginLocators } from '../locators/LoginLocators'
import { productsToCart } from '../test-data/products'
import { cartPagelocators } from '../locators/cartPageLocators'
import { CartPage } from '../pages/CartPage'


test.describe("Product Page Validation", () => {
    let loginPage: LoginPage
    let productPage: ProductPage
    let cartpage:CartPage

    //runs before other tests
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartpage=new CartPage(page);

        await page.goto(BASE_URL);
        await loginPage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    })
    test("Validate cart page URL and UI Elements",async({page})=>
    {
        await productPage.addFirstProductToCart();
        await productPage.clickOnCartLink();
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html")
        const ui=cartpage.getCartPageElements()
        await expect((await ui).carttitle).toBeVisible();
        expect((await ui).shoppingCart).toBeVisible();
        
    })

    test("Validate Continue Shopping Functionality",async({page})=>
    {

    })

    test("Validate Single Product in the Cart Page",async({page})=>
    {

    })

    test("validate All products added to the Cart Page",async({page})=>
    {

    })
    test("Validate specific Products added to the Cart Page",async({page})=>
    {


    })
    test("Validate Remove Product Functionality",async({page})=>
    {

    })

})