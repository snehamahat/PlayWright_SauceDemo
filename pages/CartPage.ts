import { Page } from "@playwright/test";
import { cartPagelocators } from "../locators/cartPageLocators";

export class cartPageLocators
{
    constructor(private page : Page){}

    async clicktocontinueShopping()
    {
        return{
            carttitle:this.page.locator(cartPagelocators.carttitle),
            shoppingCart:this.page.locator(cartPagelocators.continueshop),
            checkOut:this.page.locator(cartPagelocators.checkout)

        }
    }
    async getCartProducts(){
          const allNames = await this.page.locator(cartPagelocators.productNames).allTextContents();
                const alldescription = await this.page.locator(cartPagelocators.productDescription).allTextContents();
                const allprice = await this.page.locator(cartPagelocators.productPrices).allTextContents();
        
                const allproducts = allNames.map((_, i) =>
                ({
                    name: allNames[i].trim(),
                    description: alldescription[i].trim(),
                    price: allprice[i].trim()
        
                }))
        
                return allproducts;
        

    }


}