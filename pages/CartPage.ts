import { Page } from "@playwright/test";
import { cartPagelocators } from "../locators/cartPageLocators";


export class CartPage {
    constructor(private page: Page) { }

    async clicktocontinueShopping() {
        await this.page.locator(cartPagelocators.continueshop).click();
    }

    async getCartPageElements() {
        return {
            carttitle: this.page.locator(cartPagelocators.carttitle),
            shoppingCart: this.page.locator(cartPagelocators.continueshop),
            checkOut: this.page.locator(cartPagelocators.checkout)

        }
    }
    async getCartProducts() {
        const allNames = await this.page.locator(cartPagelocators.productNames).allTextContents();
        const alldescription = await this.page.locator(cartPagelocators.productDescription).allTextContents();
        const allprice = await this.page.locator(cartPagelocators.productPrices).allTextContents();

        const allcartproducts = allNames.map((_, i) =>
        ({
            name: allNames[i].trim(),
            description: alldescription[i].trim(),
            price: allprice[i].trim()

        }))

        return allcartproducts;


    }
    async removeFirstProduct() {
        await this.page.locator(cartPagelocators.removeButton).first().click();
    }


}