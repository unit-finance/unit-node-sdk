import { BaseCreateRequestAttributes, Relationship, Tags } from "./common"

type Permissions = "CreditOnly" | "DebitOnly" | "CreditAndDebit"

type CounterpartyAccountType =  "Checking" | "Savings" | "Loan"

type CounterpartyType = "Business" | "Person" | "Unknown"

export interface AchCounterparty {
    /**
     * Identifier of the ACH counterparty resource.
     */
    id: string

    /**
     * Type of the ACH counterparty resource.
     */
    type: string

    /**
     * 	JSON object representing the payment resource.
     */
    attributes: {
        /**
         * Date only. The date the resource was created.
         * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
         */
        createdAt: string

        /**
         * The account holder's name (whether an individual or a business).
         */
        name: string

        /**
         * Valid 9-digit ABA routing transit number.
         */
        routingNumber: string

        /**
         * Name of the bank.
         */
        bank: string

        /**
         * Bank account number.
         */
        accountNumber: string

        /**
         * Either Checking, Savings or Loan.
         */
        accountType: CounterpartyAccountType

        /**
         * Either Business, Person or Unknown.
         */
        type: CounterpartyType

        /**
         * Either CreditOnly or CreditAndDebit.
         */
        permissions: Permissions

        /**
         * See [Tags](https://developers.unit.co/#tags).
         */
        tags?: Tags
    }

    /**
     * Describes relationships between the ACH counterparty and the originating customer.
     */
    relationships: {
        /**
         * The customer the counterparty belongs to.
         */
        customer: Relationship
    }
}

export type CreateCounterpartyRequest = CreateCounterpartyWithoutTokenRequest | CreateCounterpartyWithTokenRequest

interface BaseCreateCounterpartyRequestAttributes extends BaseCreateRequestAttributes {
    /**
     * The account holder's name (whether an individual or a business).
     */
    name: string

    /**
     * Either Business, Person or Unknown.
     */
    type: CounterpartyType

    /**
     * Optional, custom counterparty permissions. Only DebitOnly or CreditAndDebit are valid values when using the permissions' attribute. 
     * 'CreditOnly' will be assigned as defualt value when permissions attribute is not declared. If the account and rounting number of the counterparty belong to an account under your org on Unit, you may specify "CreditAndDebit" or "DebitOnly" permissions as well.
     */
    permissions?: Permissions
}

interface BaseCreateCounterpartyRequestRelationships {
    /**
     * The customer that the counterparty belongs to.
     */
    customer: Relationship
}


export interface CreateCounterpartyWithoutTokenRequest {
    type: "achCounterparty"
    attributes: {
        /**
         * Valid 9-digit [ABA routing transit number](https://en.wikipedia.org/wiki/ABA_routing_transit_number).
         */
        routingNumber: string

        /**
         * Bank account number.
         */
        accountNumber: string

        /**
         * Either Checking, Savings or Loan.
         */
        accountType: CounterpartyAccountType
    } & BaseCreateCounterpartyRequestAttributes

    relationships: BaseCreateCounterpartyRequestRelationships
}

export interface CreateCounterpartyWithTokenRequest {
    type: "achCounterparty"
    attributes: {
        /**
         * Plaid integration token
         * See [Plaid processor token](https://plaid.com/docs/api/processors/).
         */
        plaidProcessorToken: string

        /**
         * Optional, default to false.Verify the name of the counterparty, if the name verification fails the request will fail with code field set to NameVerificationFailed.
         */
        verifyName?: boolean
    } & BaseCreateCounterpartyRequestAttributes

    relationships: BaseCreateCounterpartyRequestRelationships
}

export interface PatchCounterpartyRequest {
    /**
     * Plaid integration token
     * See Plaid processor token
     */
    plaidProcessorToken?: string

    /**
     * Optional, default to false. Verify the name of the counterparty, if the name verification fails the request will fail with code field set to NameVerificationFailed.
     */
    verifyName?: boolean

    /**
     * Optional, custom counterparty permissions. Either CreditOnly, DebitOnly, CreditAndDebit
     */
    permissions?: Permissions

    /**
     * See [Tags](https://developers.unit.co/#tags).
     */
    tags?: Tags
}

export interface CounterpartyBalance {
    /**
     * Identifier of the Counterparty.
     */
    id: string

    /**
     * Type of the balance. for counterparty balance the value is always counterpartyBalance.
     */
    type: "counterpartyBalance"

    /**
     * JSON object representing the counterparty balance resource.
     */
    attributes: {
        /**
         * The current balance amount (in cents) of the counterparty.
         */
        balance: number

        /**
         * Optional. The available balance amount (in cents) of the counterparty.
         */
        available?: number
    }

    /**
     * Describes relationships between the counterparty balance and the customer and counterparty.
     */
    relationships: {
        /**
         * The customer the counterparty belongs to.
         */
        counterparty: Relationship

        /**
         * The customer the counterparty belongs to.
         */
        customer: Relationship
    }
}
