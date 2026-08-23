import {test,expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { BASE_URL, PASSWSORD, USERNAME } from '../utils/envConfig'

test ('Login to SauceDemo application with valid credentials',async({page})=>
{
    const loginPage =new LoginPage(page)

    await page.goto(BASE_URL);
    await loginPage.login(USERNAME,PASSWSORD);
    await expect (page).toHaveURL("https://www.saucedemo.com/inventory.html");


}
)

