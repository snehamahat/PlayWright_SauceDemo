import { Page } from "@playwright/test";
import { CheckOutPageLocators } from "../locators/checkoutPageLocators";

export class checkoutPage
{
    constructor(private page:Page){}

    async getCheckoutElements()
    {
        return{
            pageInfo :this.page.locator(CheckOutPageLocators.pageInfo),
            cancel :this.page.locator(CheckOutPageLocators.cancelButton),
            continue:this.page.locator(CheckOutPageLocators.continueButton),}

    }

    async fillCheckOutDetails(firstName:string,lastName:string,postalCode:string)
    {
        await this.page.fill(CheckOutPageLocators.firstName,firstName);
        await this.page.fill(CheckOutPageLocators.lastName,lastName);
        await this.page.fill(CheckOutPageLocators.postalCode,postalCode);
    }

    async clickCancel()
    {
        await this.page.click(CheckOutPageLocators.cancelButton);
    }

    async clickOnContinue()
    {
        await this.page.click(CheckOutPageLocators.continueButton);
    }






}

