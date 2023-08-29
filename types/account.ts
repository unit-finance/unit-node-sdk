import { BaseCreateRequestAttributes, Relationship, RelationshipsArray, RelationshipsArrayData, Tags, UnimplementedFields } from "./common"

export type Account = DepositAccount | BatchAccount | CreditAccount

type FraudReason = "ACHActivity" | "CardActivity" | "CheckActivity" | "ApplicationHistory" | "AccountActivity" | "ClientIdentified" |
 "IdentityTheft" | "LinkedToFraudulentCustomer"

export type CloseReason =  "ByCustomer" | "Fraud"
export type CreditAccountCloseReason =  CloseReason | "Overdue"

type AccountStatus = "Open" | "Frozen" | "Closed"
 
interface BaseAccountAttributes {
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
         * Status of the account, either Open or Closed.
         */
        status: AccountStatus
        
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
         * Optional. The reason the account was frozen, either Fraud or free-text description.
         */
        freezeReason?: string

        closeReasonText?: string

        /**
         * Optional. The expanded fraud reason for closing the account when Fraud is specified as the reason.
         * Can be one of: (ACHActivity, CardActivity, CheckActivity, ApplicationHistory, AccountActivity, ClientIdentified, IdentityTheft, LinkedToFraudulentCustomer).
         */
        fraudReason?: FraudReason

        /**
         * Optional. Date only. The date the resource was uodated.
         * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
         */
        updatedAt?: string

        /**
         * See [Tags](https://developers.unit.co/#tags).
         */
        tags?: Tags
}

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
         * Optional. The account DACA (Deposit Account Control Agreements) status. Can be one of: Entered, Activated.
         */
        dacaStatus?: "Entered" | "Activated"

        /**
         * Optional. The reason the account was closed, either ByCustomer or Fraud.
         */
        closeReason?: CloseReason

        /**
         * Optional.
         */
        overdraftLimit?: string
        maskedAccountNumber?: string
        isOverdrawnWithinLimit?: boolean 
    } & BaseAccountAttributes & UnimplementedFields

    /**
     * Describes relationships between the deposit account resource and the customer.
     */
    relationships: {
        /**
         * The customer.
         */
        customer?: Relationship

        customers?: RelationshipsArray
    } & UnimplementedFields
}

export interface CreditAccount {
    /**
     * Identifier of the deposit account resource.
     */
    id: string

    /**
     * Type of the resource, the value is always creditAccount.
     */
    type: "creditAccount"

    /**
     * Representing the credit account data.
     */
    attributes: {
        creditTerms: string
        creditLimit: number
        /**
         * Optional. The reason the account was closed, either ByCustomer, Fraud or Overdue.
         */
        closeReason?: CreditAccountCloseReason
    } & BaseAccountAttributes & UnimplementedFields

    /**
     * Describes relationships between the credit account resource and the customer.
     */
    relationships: {
        /**
         * The customer.
         */
        customer?: Relationship

        org?: Relationship
    } & UnimplementedFields
}

export type CreateAccountRequest = CreateDepositAccountRequest | CreateBatchAccountRequest | CreateCreditAccountRequest

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
    } & BaseCreateRequestAttributes

    /**
     * Describes relationships between the deposit account resource and the customer.
     */
    relationships: {
        /**
         * The customer the deposit account belongs to. The customer is either a business or an individual.
         */
        customer?: Relationship

        /**
         * The list of customers the deposit account belongs to.
         * Each of the customers is an individual customer and at least one must be over 18 years old.
         */
        customers?: RelationshipsArray
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

export interface CreateCreditAccountRequest {
    /**
     * Type of the resource, the value is always creditAccount.
     */
    type: "creditAccount"

    /**
     * Representing the deposit account data.
     */
    attributes: {
        /**
         * The credit terms that will be associated with the account.
         */
        creditTerms: string

        /**
         * The credit limit of the account.
         */
        creditLimit: number
    } & BaseCreateRequestAttributes

    /**
     * Describes relationships between the deposit account resource and the customer.
     */
    relationships: {
        /**
         * The customer the deposit account belongs to. The customer is either a business or an individual.
         */
        customer?: Relationship

        /**
         * The list of customers the deposit account belongs to.
         * Each of the customers is an individual customer and at least one must be over 18 years old.
         */
        customers?: RelationshipsArray
    }
}

export interface FreezeAccountRequest {
    accountId: string

    data: {
        type: "accountFreeze" | "creditAccountFreeze"
        attributes: {
            /**
             * The reason for closing the account. Either Fraud or Other, with a specified reasonText.
             */
            reason: "Fraud" | "Other"

            /**
             * Optional. The free-text reason for freezing the account (up to 255 characters) when Other is specified.
             */
            reasonText?: string
        }
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
                dailyCardTransaction: number
            }
            totalsDaily: {
                withdrawals: number
                deposits: number
                purchases: number
                cardTransactions: number
            }
        }
        checkDeposit: {
            limits: {
                daily: number
                monthly: number
                dailySoft: number
                monthlySoft: number
            }
            totalsDaily: number
            totalsMonthly: number
        }
    } & UnimplementedFields
}

export type PatchAccountRequest = PatchDepositAccountRequest | PatchCreditAccountRequest

export interface PatchDepositAccountRequest {
    accountId: string

    data: {
        type: "depositAccount"
        attributes: {
            tags?: Tags
            depositProduct?: string
            overdraftLimit?: number
        }
    }
}

export interface PatchCreditAccountRequest {
    accountId: string

    data: {
        type: "creditAccount"
        attributes: { 
            tags?: Tags
            creditLimit?: number
        }
    }
}

export interface BatchAccount {
    type: "batchAccount"
    id: string
    attributes: {
        depositProduct?: string
        routingNumber?: string
        accountNumber?: string
        closeReason?: CloseReason
        maskedAccountNumber?: string
    } & Omit<BaseAccountAttributes, "freezeReason" | "closeReasonText" | "updatedAt" | "tags"> & UnimplementedFields
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

export type CloseAccountType = "depositAccountClose" | "creditAccountClose"

export interface CloseAccountRequest {
    accountId: string

    data: {
        type: CloseAccountType
        attributes: {
            /**
             * The reason for closing the account.
             * For Deposit Account Either ByCustomer or Fraud.
             * For Credit Account Either ByCustomer, Fraud or Overdue.
             * If not specified, will default to ByCustomer.
             */
            reason: CreditAccountCloseReason

            /**
             * Optional. The expanded fraud reason for closing the account when Fraud is specified as the reason.
             * Can be one of: (ACHActivity, CardActivity, CheckActivity, ApplicationHistory, AccountActivity, ClientIdentified, IdentityTheft, LinkedToFraudulentCustomer).
             */
            fraudReason?: FraudReason
        }
    }
}

export interface AccountOwnersRequest {
    accountId: string
    data: RelationshipsArrayData
}