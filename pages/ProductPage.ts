import { Page } from "@playwright/test";
import { productPageLocators } from "../locators/ProductPageLocators";

export class ProductPage{
    constructor(private page:Page){}
    async logout()
    {
        await this.page.click(productPageLocators.settingIcon);
        await this.page.click(productPageLocators.logoutlink)
    }

    async openAboutPage()
    {
        await this.page.click(productPageLocators.settingIcon);
        await this.page.click(productPageLocators.aboutlink)
    }

}