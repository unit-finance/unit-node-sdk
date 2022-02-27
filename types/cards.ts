import { Address, FullName, Phone, Relationship, UnimplementedFields } from "./common"

export type Card = IndividualDebitCard | BusinessDebitCard | IndividualVirtualDebitCard | BusinessVirtualDebitCard

export type cardStatus = "Active" | "Inactive" | "Stolen" | "Lost" | "Frozen" | "ClosedByCustomer" | "SuspectedFraud"
//   /**
//      * Identifier of the card resource.
//      */
//     id: string

//     /**
//      * Type of the card resource. For individual debit card the value is always individualDebitCard.
//      */
//     type: "individualDebitCard" | "businessDebitCard" | "individualVirtualDebitCard" | "businessVirtualDebitCard"

//     attributes: {

export type BaseCard = {
    /**
     * Identifier of the card resource.
     */
    id: string

    /**
     * Type of the card resource.
     */
    type: string

    /**
     * JSON object representing the card data.
     */
    attributes: BaseCardAttributes

    /**
     * Describes relationships between the card resource and other resources (account and customer).
     */
    relationships: BaseCardRelationships
}

export interface BaseCardAttributes extends UnimplementedFields {
    /**
     * Date only. The date the resource was created.
     * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
     */
    createdAt: string

    /**
    * Last 4 digits of the debit card.
    */
    last4Digits: string

    /**
    * Card expiration date, formatted YYYY-MM, e.g "2020-05".
    */
    expirationDate: string

    /**
     * Status of the card, one of: Active, Inactive, Stolen, Lost, Frozen, ClosedByCustomer, SuspectedFraud.
     */
    status: cardStatus
}

export interface BaseCardRelationships extends UnimplementedFields {
    /**
         * The account the card belongs to.
         */
    account: Relationship

    /**
     * The individual or business customer the card belongs to.
     */
    customer: Relationship
}



export type IndividualDebitCard = BaseCard & {
    /**
     * Type of the card resource. For individual debit card the value is always individualDebitCard.
     */
    type: "individualDebitCard"

    /**
     * JSON object representing the card data.
     */
    attributes: {
        /**
         * Optional. Shipping address, if specified.
         */
        shippingAddress?: Address

        /**
         * Optional. Card design, if specified.
         */
        design?: string
    }
}

export type BusinessDebitCard = BaseCard & {
    type: "businessDebitCard"

    /**
     * JSON object representing the card data.
     */
    attributes: {
        /**
         * Optional. Shipping address, if specified.
         */
        shippingAddress?: Address

        /**
         * SSN of the card holder (numbers only). Either an SSN or a passport number is required.
         */
        ssn?: string

        /**
         * Passport number of the card holder. Either an SSN or a passport is required.
         */
        passport?: string

        /**
         * Only when Passport is populated. Two letters representing the card holder nationality. (e.g. “US”).
         * ISO31661 - Alpha2 format. For more information: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
         */
        nationality?: string

        /**
         * Full name of the card holder.
         */
        fullName: FullName

        /**
         * RFC3339 Date string	Date of birth of the card holder (e.g. "2001-08-15").
         */
        dateOfBirth: string

        /**
         * Address of the card holder.
         */
        address: Address

        /**
         * Phone of the card holder.
         */
        phone: Phone

        /**
         * Email address of the card holder.
         */
        email: string

        /**
         * Optional. Card design, if specified.
         */
        design?: string
    }
}

export type IndividualVirtualDebitCard = BaseCard & {
    type: "individualVirtualDebitCard"
}

export type BusinessVirtualDebitCard = BaseCard & {
    type: "businessVirtualDebitCard"

    /**
     * JSON object representing the card data.
     */
    attributes: {
        /**
         * Card expiration date, formatted YYYY-MM, e.g "2020-05".
         */
        expirationDate: string

        /**
         * SSN of the card holder (numbers only). Either an SSN or a passport number is required.
         */
        ssn?: string

        /**
         * Passport number of the card holder. Either an SSN or a passport is required.
         */
        passport?: string

        /**
         * Only when Passport is populated. Two letters representing the card holder nationality. (e.g. “US”).
         * ISO31661 - Alpha2 format. For more information: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
         */
        nationality?: string

        /**
         * Full name of the card holder.
         */
        fullName: FullName

        /**
         * RFC3339 Date string	Date of birth of the card holder (e.g. "2001-08-15").
         */
        dateOfBirth: string

        /**
         * Address of the card holder.
         */
        address: Address

        /**
         * Phone of the card holder.
         */
        phone: Phone

        /**
         * Email address of the card holder.
         */
        email: string
    }
}

export type CreateDebitCardRequest = CreateIndividualDebitCardRequest | CreateBusinessDebitCardRequest | CreateIndividualVirtualDebitCardRequest | CreateBusinessVirtualDebitCardRequest

export interface BaseCreateCardRequestAttributes extends UnimplementedFields {
    /**
     * See [Idempotency](https://developers.unit.co/#intro-idempotency).
     */
    idempotencyKey?: string

    /**
     *  See [Tags](https://developers.unit.co/#tags).
     */
    tags?: object

    /**
     * Optional. See [Limits](https://docs.unit.co/cards/#card-limits) (cents).
     */
    limits?: CardLimits
}

export interface CreateIndividualDebitCardRequest {
    type: "individualDebitCard"

    attributes: {
        /**
         * Address to ship the card to. Optional, if not specified, the individual address is used.
         */
        shippingAddress?: Address

        /**
         * Optional. You may omit if you only have one card design. Please contact Unit if you need multiple card designs.
         */
        design?: string

        /**
         * Optional, up to 21 characters. Use for a second cardholder name, company name, or other data to be embossed on a card.
         */
        additionalEmbossedText?: string

        /**
         * Optional, default is false. Sets the card as Digitally active.
         */
        digitallyActive?: boolean
    } & BaseCreateCardRequestAttributes

    relationships: {
        /**
         * The target resource after the operation was completed.
         */
        account: Relationship
    }
}

export interface CreateBusinessDebitCardRequest {
    type: "businessDebitCard"

    attributes: {
        /**
         * Full name of the card holder.
         */
        fullName: FullName

        /**
         * RFC3339 Date string	Date of birth of the card holder (e.g. "2001-08-15").
         */
        dateOfBirth: string
        
        /**
         * Address to ship the card to. Optional, if not specified, the individual address is used.
         */
        shippingAddress?: Address

        /**
         * Address of the card holder.
         */
        address: Address

        /**
         * Phone of the card holder.
         */
        phone: Phone

        /**
         * Email address of the card holder.
         */
        email: string

        /**
         * Optional. You may omit if you only have one card design. Please contact Unit if you need multiple card designs.
         */
        design?: string

        /**
         * Optional, up to 21 characters. Use for a second cardholder name, company name, or other data to be embossed on a card.
         */
        additionalEmbossedText?: string

        /**
         * Optional, default is false. Sets the card as Digitally active.
         */
        digitallyActive?: boolean 
    } & BaseCreateCardRequestAttributes

    relationships: {
        /**
         * The account the card belongs to. Holder of the account must be a business.
         */
        account: Relationship
    }
}

export interface CreateIndividualVirtualDebitCardRequest {
    type: "individualVirtualDebitCard"

    attributes: BaseCreateCardRequestAttributes

    relationships: {
        /**
         * Link to the account the card belongs to. Holder of the account must be an individual.
         */
        account: Relationship

        /**
         * Optional, Link to the customer the card belongs to. Mandatory if the account has more than one customer.
         * Holder of the account must be an individual.
         */
        customer?: Relationship
    }
}

export interface CreateBusinessVirtualDebitCardRequest {
    type: "businessVirtualDebitCard"

    attributes: {
        /**
         * Full name of the card holder.
         */
        fullName: FullName

        /**
         * RFC3339 Date string	Date of birth of the card holder (e.g. "2001-08-15").
         */
        dateOfBirth: string

        /**
         * Address of the card holder.
         */
        address: Address

        /**
         * Phone of the card holder.
         */
        phone: Phone

        /**
         * Email address of the card holder.
         */
        email: string
    } & BaseCreateCardRequestAttributes

    relationships: {
        /**
         * The account the card belongs to. Holder of the account must be a business.
         */
        account: Relationship
    }
}

export interface ReplaceCardRequest {
    id: string
    shippingAddress?: Address
}

export interface PinStatus {
    type: "pinStatus"

    attributes: {
        status: "Set" | "NotSet"
    }
}

export interface CardLimits {
    type: "limits"

    attributes: {
        limits: {
            dailyWithdrawal: number
            dailyPurchase: number
            monthlyWithdrawal: number
            monthlyPurchase: number
        }
        dailyTotals: {
            withdrawals: number
            deposits: number
            purchases: number
        }
        monthlyTotals: {
            withdrawals: number
            deposits: number
            purchases: number
        }
    }
}
