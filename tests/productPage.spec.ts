import { test,expect } from '@playwright/test'
import { BASE_URL,USERNAME,PASSWSORD } from '../utils/envConfig'
import { ProductPage } from '../pages/ProductPage'
import { LoginPage } from '../pages/LoginPage'

test.describe("Product Page Validation",()=>
{
    let loginPage : LoginPage
    let productPage : ProductPage
//runs before other tests
    test.beforeEach(async({page})=>
    {
        loginPage = new LoginPage(page);
        productPage=new ProductPage(page);

        await page.goto(BASE_URL);
        await loginPage.login(USERNAME,PASSWSORD);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    })
})
