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

    async addSpecificProductsToCart(productName: string[]) {
        for (const name of productName) {
            const item = this.page.locator(".inventory_item").filter({ hasText: name });
            await item.locator(productPageLocators.addToCartButtons).click();
        }
    }

    async filterByNameAtoZ() {
        await this.page.selectOption(productPageLocators.filterDropdown, "az");
    }

    async filterByNameZtoA() {
        await this.page.selectOption(productPageLocators.filterDropdown, "za");

    }
    async filterByPriceLowToHigh() {
        await this.page.selectOption(productPageLocators.filterDropdown, "lohi");
    }
    async filterByPriceHighToLow() {
        await this.page.selectOption(productPageLocators.filterDropdown, "hilo");
    }
    async getProductNames() {
        return await this.page.locator(productPageLocators.productNames).allTextContents()
    }

    async getProductPrices() {
        const prices = await this.page.locator(productPageLocators.productPrices).allTextContents();
        return prices.map(price => parseFloat(price.replace('$', '')))

    }

    async clickOnCartLink() {
        await this.page.locator(productPageLocators.shoppingCart).click();
    }

    async getFirstProductDetails() {
        const name = await this.page.locator(productPageLocators.productNames).first().textContent();
        const description = await this.page.locator(productPageLocators.productDescription).first().textContent();
        const price = await this.page.locator(productPageLocators.productPrices).first().textContent();

        return {
            name: name?.trim(),
            description: description?.trim(),
            price: price?.trim()

        }

    }

    async getAllProductDetails() {
        const allNames = await this.page.locator(productPageLocators.productNames).allTextContents();
        const alldescription = await this.page.locator(productPageLocators.productDescription).allTextContents();
        const allprice = await this.page.locator(productPageLocators.productPrices).allTextContents();

        const allproducts = allNames.map((_, i) =>
        ({
            name: allNames[i].trim(),
            description: alldescription[i].trim(),
            price: allprice[i].trim()

        }))

        return allproducts;


    }
    async getSpecificProductDetails(productName: String[]) {
        const allNames = await this.page.locator(productPageLocators.productNames).allTextContents();
        const alldescription = await this.page.locator(productPageLocators.productDescription).allTextContents();
        const allprice = await this.page.locator(productPageLocators.productPrices).allTextContents();

        const allproducts = allNames.map((_, i) =>
        ({
            name: allNames[i].trim(),
            description: alldescription[i].trim(),
            price: allprice[i].trim()

        }))

        return allproducts.filter(p => productName.includes(p.name));


    }










}