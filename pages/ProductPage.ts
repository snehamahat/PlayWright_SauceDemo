import { Page } from "@playwright/test";
import { productPageLocators } from "../locators/ProductPageLocators";

export class ProductPage {
    constructor(private page: Page) { }
    async logout() {
        await this.page.click(productPageLocators.settingIcon);
        await this.page.click(productPageLocators.logoutlink)
    }

    async openAboutPage() {
        await this.page.click(productPageLocators.settingIcon);
        await this.page.click(productPageLocators.aboutlink)
    }
    async validateAllProductsDisplayed() {
        const names = await this.page.locator(productPageLocators.productNames).allTextContents();
        const descriptions = await this.page.locator(productPageLocators.productDescription).allTextContents();
        const prices = await this.page.locator(productPageLocators.productPrices).allTextContents();
        const buttonCount = await this.page.locator(productPageLocators.addToCartButtons).count();

        if (names.length === 0)
            throw new Error("No products found")
        if (names.length !== descriptions.length || names.length !== prices.length || names.length !== buttonCount)
            throw new Error("Mismatch between the product Details")

        return { names, descriptions, prices, buttonCount };
    }
    async addFirstProductToCart() {
        await this.page.locator(productPageLocators.addToCartButtons).first().click();

    }

    async addAllProductsToCart() {
        const buttons = this.page.locator(productPageLocators.addToCartButtons)
        const count = await buttons.count();

        for (let i = 0; i < count; i++) {
            await buttons.first().click();

        }

    }

    async addSpecificProductsToCart(productName : string[])
    {
        const addProducts=this.page.locator(productPageLocators.productNames);
        const count =await addProducts.count();
        for (let i=0;i<count;i++)
        {
            const name =await addProducts.nth(i).textContent();
            if(name && productName.includes(name.trim()))
            {
                await this.page.locator(productPageLocators.addToCartButtons).nth(i).click();
                await this.page.waitForTimeout(3000);
            }

        }
    }

    async filterByNameAtoZ()
    {
        await this.page.selectOption(productPageLocators.filterDropdown,"az");
    }

    async filterByNameZtoA()
    {
        await this.page.selectOption(productPageLocators.filterDropdown,"za");

    }
    async filterByPriceLowToHigh()
    {
        await this.page.selectOption(productPageLocators.filterDropdown,"lohi");
    }
    async filterByPriceHighToLow()
    {
        await this.page.selectOption(productPageLocators.filterDropdown,"hilo");
    }
    async getProductNames()
    {
        return await this.page.locator(productPageLocators.productNames).allTextContents()
    }

    async getProductPrices()
    {
        const prices=await this.page.locator(productPageLocators.productPrices).allTextContents();
        return prices.map(price=>parseFloat(price.replace('$','')))

    }





}