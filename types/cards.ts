import { Address, FullName, Phone, Relationship } from "./common"

export type Card = IndividualDebitCard | BusinessDebitCard | IndividualVirtualDebitCard | BusinessVirtualDebitCard

export type cardStatus = "Active" | "Inactive" | "Stolen" | "Lost" | "Frozen" | "ClosedByCustomer" | "SuspectedFraud"

export interface IndividualDebitCard {
    /**
     * Identifier of the card resource.
     */
    id: string

    /**
     * Type of the card resource. For individual debit card the value is always individualDebitCard.
     */
    type: "individualDebitCard"

    /**
     * JSON object representing the card data.
     */
    attributes: {
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
         * Optional. Shipping address, if specified.
         */
        shippingAddress?: Address

        /**
         * Status of the card, one of: Active, Inactive, Stolen, Lost, Frozen, ClosedByCustomer, SuspectedFraud.
         */
        status: cardStatus

        /**
         * Optional. Card design, if specified.
         */
        design?: string
    }

    /**
     * Describes relationships between the card resource and other resources (account and customer).
     */
    relationships: {
        /**
         * The account the card belongs to.
         */
        account: Relationship

        /**
         * The individual or business customer the card belongs to.
         */
        customer: Relationship
    }
}

export interface BusinessDebitCard {
    /**
     * Identifier of the card resource.
     */
    id: string

    /**
     * Type of the card resource. For Business debit card the value is always businessDebitCard.
     */
    type: "businessDebitCard"

    /**
     * JSON object representing the card data.
     */
    attributes: {
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
         * Status of the card, one of: Active, Inactive, Stolen, Lost, Frozen, ClosedByCustomer, SuspectedFraud.
         */
        status: cardStatus

        /**
         * Optional. Card design, if specified.
         */
        design?: string
    }

    /**
     * Describes relationships between the card resource and other resources (account and customer).
     */
    relationships: {
        /**
         * Account the card belong to.
         */
        account: Relationship

        /**
         * Holder of the account.
         */
        customer: Relationship
    }
}

export interface IndividualVirtualDebitCard {
    /**
     * Identifier of the card resource.
     */
    id: string

    /**
     * Type of the card resource. For Business debit card the value is always individualVirtualDebitCard.
     */
    type: "individualVirtualDebitCard"

    /**
     * JSON object representing the card data.
     */
    attributes: {
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

    /**
     * Describes relationships between the card resource and other resources (account and customer).
     */
    relationships: {
        /**
         * The account the card belongs to.
         */
        account: Relationship

        /**
         * The individual or business customer the card belongs to.
         */
        customer: Relationship
    }
}

export interface BusinessVirtualDebitCard {
    /**
     * Identifier of the card resource.
     */
    id: string

    /**
     * Type of the card resource. For Business debit card the value is always businessVirtualDebitCard.
     */
    type: "businessVirtualDebitCard"

    /**
     * JSON object representing the card data.
     */
    attributes: {
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
         * Status of the card, one of: Active, Inactive, Stolen, Lost, Frozen, ClosedByCustomer, SuspectedFraud.
         */
        status: cardStatus
    }

    /**
     * Describes relationships between the card resource and other resources (account and customer).
     */
    relationships: {
        /**
         * Account the card belong to.
         */
        account: Relationship

        /**
         * Holder of the account.
         */
        customer: Relationship
    }
}

export type CreateDebitCardRequest = CreateIndividualDebitCardRequest | CreateBusinessDebitCardRequest | CreateIndividualVirtualDebitCardRequest | CreateBusinessVirtualDebitCardRequest

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
         * See [Idempotency](https://developers.unit.co/#intro-idempotency).
         */
        idempotencyKey?: string

        /**
         *  See [Tags](https://developers.unit.co/#tags).
         */
        tags?: object
    }

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
         * Address to ship the card to. Optional, if not specified, the individual address is used.
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
         * Required on passport only. Two letters representing the card holder nationality. (e.g. “US”).
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
         * Optional. You may omit if you only have one card design. Please contact Unit if you need multiple card designs.
         */
        design?: string

        /**
         * See [Idempotency](https://developers.unit.co/#intro-idempotency).
         */
        idempotencyKey?: string

        /**
         *  See [Tags](https://developers.unit.co/#tags).
         */
        tags?: object
    }

    relationships: {
        /**
         * The account the card belongs to. Holder of the account must be a business.
         */
        account: Relationship
    }
}

export interface CreateIndividualVirtualDebitCardRequest {
    type: "individualVirtualDebitCard"

    attributes: {
        /**
         * See [Idempotency](https://developers.unit.co/#intro-idempotency).
         */
        idempotencyKey?: string

        /**
         *  See [Tags](https://developers.unit.co/#tags).
         */
        tags?: object
    }

    relationships: {
        /**
         * Link to the account the card belongs to. Holder of the account must be an individual.
         */
        account: Relationship
    }
}

export interface CreateBusinessVirtualDebitCardRequest {
    type: "businessVirtualDebitCard"

    attributes: {
        /**
         * SSN of the card holder (numbers only). Either an SSN or a passport number is required.
         */
        ssn?: string

        /**
         * Passport number of the card holder. Either an SSN or a passport is required.
         */
        passport?: string

        /**
         * Required on passport only. Two letters representing the card holder nationality. (e.g. “US”).
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
         * See [Idempotency](https://developers.unit.co/#intro-idempotency).
         */
        idempotencyKey?: string

        /**
         *  See [Tags](https://developers.unit.co/#tags).
         */
        tags?: object
    }

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
