import { Relationship } from "./common"

export type Account = DepositAccount | BatchAccount

export interface DepositAccount {
    /**
     * Identifier of the deposit account resource.
     */
    id: string

    /**
     * Type of the resource, the value is always depositAccount.
     */
    type: "depositAccount"

    /**
     * Representing the deposit account data.
     */
    attributes: {
        /**
         * Date only. The date the resource was created.
         * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
         */
        createdAt: string

        /**
         * Name of the account holder.
         */
        name: string

        /**
         * The name of the deposit product.
         */
        depositProduct: string

        /**
         * Routing number of account.
         */
        routingNumber: string

        /**
         * Account number, together with the routingNumber forms the identifier of the account on the ACH network.
         */
        accountNumber: string

        /**
         * Currency of the account.
         * Note: the currency is currently always set to USD. The balance is represented in cents.
         */
        currency: string

        /**
         * The balance amount (in cents).
         */
        balance: number

        /**
         * The hold amount (in cents).
         */
        hold: number

        /**
         * The available balance for spending (in cents).
         */
        available: number

        /**
         * See [Tags](https://developers.unit.co/#tags).
         */
        tags: object

        /**
         * Status of the account, either Open or Closed.
         */
        status: string
    }

    /**
     * Describes relationships between the deposit account resource and the customer.
     */
    relationships: {
        /**
         * The customer.
         */
        customer: Relationship
    }
}

export type CreateAccountRequest = CreateDepositAccountRequest | CreateBatchAccountRequest

export interface CreateDepositAccountRequest {
    /**
     * Type of the resource, the value is always depositAccount.
     */
    type: "depositAccount"

    /**
     * Representing the deposit account data.
     */
    attributes: {
        /**
         * The name of the deposit product.
         */
        depositProduct: string

        /**
         * See [Tags](https://developers.unit.co/#tags).
         */
        tags: object

        /**
         * See [Idempotency.](https://developers.unit.co/#intro-idempotency)
         */
        idempotencyKey?: string
    }

    /**
     * Describes relationships between the deposit account resource and the customer.
     */
    relationships: {
        /**
         * The customer the deposit account belongs to. The customer is either a business or an individual.
         * You must provide exactly one of customer or customers
         */
        customer?: Relationship

        /**
         * The list of customers the deposit account belongs to. Each of the customers is an individual customer and at least one must be over 18 years old.
         * You must provide exactly one of customer or customers
         */
        customers?: Relationship[]
    }
}
export interface CreateBatchAccountRequest {
    /**
     * Type of the resource, the value is always batchAccount.
     */
    type: "batchAccount"

    /**
     * Representing the batch account data.
     */
    attributes: {
        /**
         * The name of the batch account.
         */
        name: string

        /**
         * The name of the deposit product.
         */
        depositProduct: string

        /**
         * See [Idempotency.](https://developers.unit.co/#intro-idempotency)
         */
        idempotencyKey?: string
    }

    /**
     * Describes relationships between the batch account resource and the org.
     */
    relationships: {
        /**
         * The org.
         */
        org: Relationship
    }
}

export interface AccountLimits {
    type: "limits"
    attributes: {
        ach: {
            limits: {
                dailyDebit: number
                dailyCredit: number
                monthlyDebit: number
                monthlyCredit: number
            }
            totalsDaily: {
                debits: number
                credits: number
            }
            totalsMonthly: {
                debits: number
                credits: number
            }
        }
        card: {
            limits: {
                dailyWithdrawal: number
                dailyDeposit: number
                dailyPurchase: number
            }
            totalsDaily: {
                withdrawals: number
                deposits: number
                purchases: number
            }
        }
    }
}

export type PatchAccountRequest = PatchDepositAccountRequest

export interface PatchDepositAccountRequest {
    accountId: string

    data: {
        type: "depositAccount"
        attributes: {
            tags?: object
            depositProduct?: string
        }
    }
}

export interface BatchAccount {
    type: "batchAccount"
    id: string
    attributes: {
        createdAt: string
        name: string
        routingNumber: string
        accountNumber: string
        balance: number
        hold: number
    }
    relationships: {
        org: Relationship
    }
}

export interface AccountDepositProduct {
    type: "accountDepositProduct"
    attributes: {
        name: string
    }
}

type CloseReason = "ByCustomer" | "Fraud"

export class CloseAccountRequest {
    public accountId: string
    public reason: CloseReason

    constructor(accountId: string, reason: CloseReason = "ByCustomer") {
        this.accountId = accountId
        this.reason = reason
    }

    public to_json(): any {
        const data: any = {
            "data": {
                "type": "accountClose",
                "attributes": {
                    "reason": this.reason
                }
            }
        }

        return data
    }
}
