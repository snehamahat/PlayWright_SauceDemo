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
    async validateAllProductsDisplayed()
    {
        const names = await this.page.locator(productPageLocators.productNames).allTextContents();
        const descriptions = await this.page.locator(productPageLocators.productDescription).allTextContents();
        const price = await  this.page.locator(productPageLocators.productPrices).allTextContents();
        const buttonCount =await this.page.locator(productPageLocators.addToCartButtons).allTextContents();

        if(names.length===0)
            throw new Error("No products found")

        if(names.length!==descriptions.length||names.length!==price.length||names.length!==buttonCount.length)
            throw new Error("Mismatch between the product Details")
}



}