import { NumberOfEmployees } from "./application"
import { Relationship } from "./common"

type CreditApplicationStatus = "Created" | "Pending" | "Approved" | "Denied" | "Canceled"

interface CreditApplicationAttributes {
    /**
     * The date the resource was created.
     */
    createdAt: string

    /**
     * The status of the credit application. One of Created, Pending, Approved, Denied, Canceled.
     */
    status: CreditApplicationStatus

    /**
     * Optional. Array of aggregator access tokens which are Plaid (or other account linking platform) integration tokens. See Plaid processor token
     */
    aggregatorAccessTokens?: string[]

    /**
     * Optional. The annual income of the applicant.
     */
    annualIncome?: number

    /**
     * Optional. Number of employees of the business.
     */
    numberOfEmployees?: NumberOfEmployees

    /**
     * 	Optional. Number of years the business has been in operation.
     */
    yearsInBusiness?: number

    /**
     * Optional. Object containing key-value pairs of underwriting data per credit policy.
     */
    additionalUnderwritingData?: { [key: string]: string; }
}

interface CreditApplicationRelationships {
    /**
     * The Application to which this credit application applies to.
     */
    application: Relationship

    /**
     * The LendingProgram to which this credit application is related to.
     */
    lendingProgram: Relationship
}

interface BaseCreditApplicationResource {
    id: string
    type: string
    attributes: CreditApplicationAttributes
    relationships: CreditApplicationRelationships
}

export type OnboardingCreditApplication = BaseCreditApplicationResource

export type ExistingCustomerCreditApplication = BaseCreditApplicationResource

export type CreditApplication = OnboardingCreditApplication | ExistingCustomerCreditApplication

export type ApprovedCreditApplication = BaseCreditApplicationResource

export type DeniedCreditApplication = BaseCreditApplicationResource

export interface CreateExistingCustomerCreditApplicationRequest {
    type: "createExistingCustomerCreditApplication"
    attributes: Omit<CreditApplicationAttributes, "createdAt" | "status"> & {
        /**
         * Optional. See [Idempotency](https://www.unit.co/docs/api/#intro-idempotency).
         */
        idempotencyKey?: string
    }

    relationships: {
        customer: Relationship
        lendingProgram: Relationship
    }
}

export interface CreateOnboardingCustomerCreditApplicationRequest {
    type: "createOnboardingCustomerCreditApplication"
    attributes: Omit<CreditApplicationAttributes, "createdAt" | "status"> & {
        /**
         * Optional. See [Idempotency](https://www.unit.co/docs/api/#intro-idempotency).
         */
        idempotencyKey?: string
    }

    relationships: CreditApplicationRelationships
}

export type CreateCreditApplicationRequest = CreateExistingCustomerCreditApplicationRequest | CreateOnboardingCustomerCreditApplicationRequest

export interface PatchCreditApplicationRequest {
    /**
     * The id of the CreditApplication to patch
     */
    id: string

    data: {
        type: "patchCreditApplication"
        attributes: Omit<CreditApplicationAttributes, "createdAt" | "status">
    }
}