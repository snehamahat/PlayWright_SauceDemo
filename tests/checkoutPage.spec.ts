import { test, expect } from '@playwright/test'
import { BASE_URL, USERNAME, PASSWORD } from '../utils/envConfig'
import { ProductPage } from '../pages/ProductPage'
import { LoginPage } from '../pages/LoginPage'
import { productsToCart } from '../test-data/products'
import { CartPage } from '../pages/CartPage'
import {checkoutPage} from '../pages/CheckoutPage'
import {checkoutData} from '../test-data/checkoutData'


test.describe("Product Page Validation", () => {
    let loginPage: LoginPage
    let productPage: ProductPage
    let cartpage:CartPage
    let checkoutpage:checkoutPage

    //runs before other tests
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartpage=new CartPage(page);
        checkoutpage=new checkoutPage(page);

        await page.goto(BASE_URL);
        await loginPage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        await productPage.addFirstProductToCart;
        await productPage.clickOnCartLink();
    })
    test ("Validate Checkout Page UI element and url",async({page})=>
    {
        await cartpage.clickCheckoutButton();
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
        const elements=await checkoutpage.getCheckoutElements();
        await expect(elements.cancel).toBeVisible();
        await expect(elements.pageInfo).toBeVisible();
        await expect(elements.continue).toBeVisible();


    })

    test("Validate cancel button Functionality",async({page})=>
    {
        await cartpage.clickCheckoutButton();
        await checkoutpage.clickCancel();
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html")

    })

    test("Validate continue Button",async({page})=>{
        await cartpage.clickCheckoutButton();
        await checkoutpage.fillCheckOutDetails(checkoutData.firstName,checkoutData.lastName,checkoutData.postalCode);
        await checkoutpage.clickOnContinue();
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html")



    })

}) 