import { Address, FullName, Phone, Relationship, Tags, UnimplementedFields } from "./common"

export type Card = IndividualDebitCard | BusinessDebitCard | IndividualVirtualDebitCard | BusinessVirtualDebitCard | BusinessVirtualCreditCard | BusinessCreditCard

type CardType = "individualDebitCard" | "businessDebitCard" | "individualVirtualDebitCard" | "businessVirtualDebitCard" | 
"businessVirtualCreditCard" | "businessCreditCard"

export type CardStatus = "Active" | "Inactive" | "Stolen" | "Lost" | "Frozen" | "ClosedByCustomer" | "SuspectedFraud"

export type BaseCard = {
    /**
     * Identifier of the card resource.
     */
    id: string

    /**
     * Type of the card resource.
     */
    type: CardType

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
     * Optional. The date the resource was updated.
     * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
     */
    updatedAt?: string

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
    status: CardStatus

    /**
     * See [Tags](https://developers.unit.co/#tags).
     */
    tags: Tags

    /**
     * 9-digit Bank Identification Number (BIN).
     */
    bin: string
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

interface BusinessCardAttributes {
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

export type BusinessDebitCard = BaseCard & {
    type: "businessDebitCard"

    /**
     * JSON object representing the card data.
     */
    attributes: BusinessCardAttributes
}

export type BusinessCreditCard = BaseCard & {
    type: "BusinessCreditCard"

    /**
     * JSON object representing the card data.
     */
    attributes: BusinessCardAttributes
}

export type IndividualVirtualDebitCard = BaseCard & {
    type: "individualVirtualDebitCard"
}

interface CreateCardRequestRelationships {
    /**
     * Link to the account the card belongs to.
     */
    account: Relationship

    defaultFundingAccount?: Relationship
}

interface BusinessVirtualCardAttributes {
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

export type BusinessVirtualDebitCard = BaseCard & {
    type: "businessVirtualDebitCard"

    /**
     * JSON object representing the card data.
     */
    attributes: BusinessVirtualCardAttributes
}

export type BusinessVirtualCreditCard = BaseCard & {
    type: "businessVirtualCreditCard"

    /**
     * JSON object representing the card data.
     */
    attributes: BusinessVirtualCardAttributes
}

export type CreateDebitCardRequest = CreateIndividualDebitCardRequest | CreateBusinessDebitCardRequest | CreateIndividualVirtualDebitCardRequest | CreateBusinessVirtualDebitCardRequest
export type CreateCreditCardRequest = CreateBusinessCreditCardRequest | CreateBusinessVirtualCreditCardRequest
export type CreateCardRequest = CreateDebitCardRequest | CreateCreditCardRequest

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
    limits?: CardLevelLimits

    /**
     * Optional. Expiration date of the card in one of the formats MM/yy or yyyy-MM or yy-MM (e.g. "03/27"). Must be between 3 to 5 years. Default is 4 years.
     */
    expiryDate?: string
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
         * Optional, default is false. Print the business name on the card instead of the card holder's name. Available only for Sole Proprietorship typed customers that have a DBA property.
         */
        printOnlyBusinessName?: boolean
    } & BaseCreateCardRequestAttributes

    relationships: {
        /**
         * Optional, Link to the customer the card belongs to. Mandatory if the account has more than one customer.
         * Holder of the account must be an individual.
         */
        customer?: Relationship
    } & CreateCardRequestRelationships
}

interface CreateBusinessCardRequestAttributes {
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
         * Optional, default is false. Print the business name on the card instead of the card holder's name.
         */
        printOnlyBusinessName?: boolean
    }


export interface CreateBusinessDebitCardRequest {
    type: "businessDebitCard"

    attributes: CreateBusinessCardRequestAttributes & BaseCreateCardRequestAttributes

    relationships: CreateCardRequestRelationships
}

export interface CreateBusinessCreditCardRequest {
    type: "businessCreditCard"

    attributes: CreateBusinessCardRequestAttributes & BaseCreateCardRequestAttributes

    relationships: CreateCardRequestRelationships
}

export interface CreateIndividualVirtualDebitCardRequest {
    type: "individualVirtualDebitCard"

    attributes: BaseCreateCardRequestAttributes

    relationships: {
        /**
         * Optional, Link to the customer the card belongs to. Mandatory if the account has more than one customer.
         * Holder of the account must be an individual.
         */
        customer?: Relationship
    } & CreateCardRequestRelationships
}

interface CreateBusinessVirtualCardRequestAttribues {
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

export interface CreateBusinessVirtualDebitCardRequest {
    type: "businessVirtualDebitCard"

    attributes: CreateBusinessVirtualCardRequestAttribues & BaseCreateCardRequestAttributes

    relationships: CreateCardRequestRelationships
}

export interface CreateBusinessVirtualCreditCardRequest {
    type: "businessVirtualCreditCard"

    attributes: CreateBusinessVirtualCardRequestAttribues & BaseCreateCardRequestAttributes

    relationships: CreateCardRequestRelationships
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

export interface CardLevelLimits {
    dailyWithdrawal: number
    dailyPurchase: number
    monthlyWithdrawal: number
    monthlyPurchase: number
}

export interface CardLimits {
    type: "limits"
    attributes: {
        limits?: CardLevelLimits
        dailyTotals?: {
            cardTransactions: number
            withdrawals: number
            deposits: number
            purchases: number
        }
        monthlyTotals?: {
            cardTransactions: number
            withdrawals: number
            deposits: number
            purchases: number
        }
    }
}

export interface MobileWalletPayload {
    type: "mobileWalletPayload"
    attributes: {
        payload: string
    }
}

export interface MobileWalletPayloadRequest {
    cardId: string

    data: {
        attributes: {
            signedNonce: string
        }
    }
}

export interface EnableCardToCardPaymentResponse {
    type: "astra"
    id: string
    attributes: {
        astraCardId: string
    }
}

export interface EnableCardToCardPaymentRequest {
    cardId: string

    data: {
        type: "astra"
        attributes: {
            token: string
            idempotencyKey?: string
        }
    }
}

interface BaseUpdateAttributes extends UnimplementedFields {
    /**
     * Optional. See [Updating Tags](https://docs.unit.co/#updating-tags).
     */
    tags?: object

    /**
     * Optional. See [Limits](https://docs.unit.co/cards/#card-limits) (cents).
     */
    limits?: object

    defaultFundingAccountId?: string
}

interface BaseUpdateRequest {
    id: string
    type: CardType
    attributes: BaseUpdateAttributes
}

interface UpdateIndividualCardRequest extends BaseUpdateRequest {
    type: "individualDebitCard"
    attributes: {
        /**
         * Optional. Address to ship the card to.
         * To modify or add specify the key and value.
         * To delete a key specify the key name and null for the value.
         */
        shippingAddress?: Address | null

        /**
         * Optional. Card design name. To modify or add specify the key and value.
         */
        design?: string
    } & BaseUpdateAttributes
}

interface UpdateBusinessCardRequest extends BaseUpdateRequest {
    type: "businessDebitCard" | "businessCreditCard"
    attributes: {
        /**
         * Optional. Address to ship the card to.
         * To modify or add specify the key and value.
         * To delete a key specify the key name and null for the value.
         */
        shippingAddress?: Address | null

        /**
         * Optional. Address of the card holder.
         * To modify or add specify the new address.
         */
        address?: Address

        /**
         * Optional. Phone of the card holder.
         * To modify or add specify the new phone number.
         */
        phone?: Phone

        /**
         * Optional. Email address of the card holder.
         * To modify or add specify the new email address.
         */
        email?: string

        /**
         * Optional. Card design name. To modify or add specify the key and value.
         */
        design?: string
    } & BaseUpdateAttributes
}

interface UpdateBusinessVirtualCardRequest extends BaseUpdateRequest {
    type: "businessVirtualDebitCard" | "businessVirtualCreditCard"
    attributes: {
        /**
         * Optional. Address of the card holder.
         * To modify or add specify the new address.
         */
        address?: Address

        /**
         * Optional. Phone of the card holder.
         * To modify or add specify the new phone number.
         */
        phone?: Phone

        /**
         * Optional. Email address of the card holder.
         * To modify or add specify the new email address.
         */
        email?: string
    } & BaseUpdateAttributes
}

interface UpdateIndividualVirtualCardRequest extends BaseUpdateRequest {
    type: "individualVirtualDebitCard"
}

export type UpdateCardRequest = UpdateIndividualCardRequest | UpdateBusinessCardRequest | UpdateIndividualVirtualCardRequest | UpdateBusinessVirtualCardRequest
