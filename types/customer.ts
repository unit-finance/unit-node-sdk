import { Address, AuthorizedUser, BusinessContact, EntityType, FullName, Phone, Relationship, State, Tags, TrustContact } from "./common"

export type CustomerStatus = "Active" | "Archived"

export type CustomerArchiveReason = "Inactive" | "FraudACHActivity" | "FraudCardActivity" | "FraudCheckActivity" | "FraudApplicationHistory" | "FraudAccountActivity" | "FraudClientIdentified" | "FraudLinkedToFraudulentCustomer"

export type Customer = IndividualCustomer | BusinessCustomer | TrustCustomer

export type CustomerType = "individualCustomer" | "businessCustomer" | "trustCustomer"

export interface BaseCustomer {
    /**
     * Identifier of the individual resource.
     */
    id: string

    /**
     * Type of the resource.
     */
    type: CustomerType

    /**
     * Describes relationships between the customer resource, the Org it belongs to, and the Application it was created by.
     */
    relationships: {
        /**
         * The Org of the individual.
         */
        org: Relationship

        /**
         * The Application that created this individual.
         */
        application: Relationship
    }
}

export interface BaseCustomerAttributes {
    /**
     * The date the resource was created.
     * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
     */
    createdAt: string

    /**
     * Status of the customer, either Active, Archived. You can't do any write operations with Archived customers.
     */
    status: CustomerStatus

    /**
     * Array of authorized users.
     * An authorized user is someone who can participate in the One Time Password(OTP) authentication process.
     *
     */
    authorizedUsers: AuthorizedUser[]

    /**
     * Optional, only if the customer status is Archived.
     * The reason the account was archived, can be one of Inactive, FraudACHActivity, FraudCardActivity, FraudCheckActivity, FraudApplicationHistory, FraudAccountActivity, FraudClientIdentified, 'FraudLinkedToFraudulentCustomer'.
     */
    archiveReason?: CustomerArchiveReason

    /**
    * See [Tags](https://developers.unit.co/#tags).
    */
    tags?: object

}

export interface IndividualCustomer extends BaseCustomer {
    /**
     * Type of the resource, the value is always individualCustomer.
     */
    type: "individualCustomer"

    /**
     * Representing the individual data.
     */
    attributes: {
        /**
         * SSN of the individual (numbers only). Either ssn or passport will be populated.
         */
        ssn?: string

        /**
         * Passport number of the individual. .Either ssn or passport will be populated.
         */
        passport?: string

        /**
         * Required on passport only. Two letters representing the individual nationality.
         * ISO31661 - Alpha2 format. For more information: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
         */
        nationality?: string

        /**
         * Full name of the individual.
         */
        fullName: FullName

        /**
         * Date only.
         * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
         */
        dateOfBirth: string

        /**
         * Address of the individual.
         */
        address: Address

        /**
         * Phone of the individual.
         */
        phone: Phone

        /**
         * Email address of the individual.
         */
        email: string

        /**
         * Optional. See (this)[https://docs.unit.co/customer-api-tokens/#customers-create-customer-bearer-token-jwt] section for more information.
         */
        jwtSubject?: string
    } & BaseCustomerAttributes
}

export interface BusinessCustomer extends BaseCustomer {
    /**
     * Type of the resource, the value is always businessCustomer.
     */
    type: "businessCustomer"

    /**
     * Representing the business data.
     */
    attributes: {
        /**
         * Name of the business.
         */
        name: string

        /**
         * Optional. “Doing business as”.
         */
        dba?: string

        /**
         * Address of the business.
         */
        address: Address

        /**
         * Phone of the business.
         */
        phone: Phone

        /**
         * Two letters representing a US state.
         */
        stateOfIncorporation: State

        /**
         * Business EIN (numbers only).
         */
        ein: string

        /**
         * One of Corporation, Partnership, LLC, PubliclyTradedCorporation, PrivatelyHeldCorporation or NotForProfitOrganization
         */
        entityType: EntityType

        /**
         * Primary contact of the business.
         */
        contact: BusinessContact
    } & BaseCustomerAttributes
}

export interface TrustCustomer extends BaseCustomer {
    /**
     * Type of the resource, the value is always trustCustomer.
     */
    type: "trustCustomer"

    /**
     * JSON object representing the trust data.
     */
     attributes: {
        /**
         * Name of the trust.
         */
        name: string

        /**
         * Two letters representing a US state.
         */
        stateOfIncorporation: string

        /**
         * Whether the trust can be changed or canceled after the trust document has been signed.
         */
        revocability: "Revocable" | "Irrevocable"

        /**
         * Origin of the funds used to fund the account.
         */
        sourceOfFunds: "Inheritance" | "Salary" | "Savings" | "InvestmentReturns" | "Gifts"

        /**
         * The grantor's SSN.
         */
        taxId: string

        /**
         * Primary contact of the trust.
         */
        contact: TrustContact
     } & BaseCustomerAttributes
}

export type PatchCustomerRequest = PatchIndividualCustomerRequest | PatchBusinessCustomerRequest | PatchTrustCustomerRequest

export interface PatchIndividualCustomerRequest {
    customerId: string

    data: {
        type: "individualCustomer"

        attributes: {
            /**
             * Address of the individual. To modify or add specify the new address.
             */
            address?: Address

            /**
             * Phone of the individual. To modify or add specify the new phone number.
             */
            phone?: Phone

            /**
             * Email address of the individual. To modify or add specify the new email address.
             */
            email?: string

            /**
             * If the individual is a sole proprietor who is doing business under a different name.
             * To modify or add specify the new dba name.
             */
            dba?: string

            /**
             * Array of authorized users. The provided array items will replace the existing ones.
             */
            authorizedUsers?: AuthorizedUser[]

            /**
             * See (Updating Tags)[https://developers.unit.co/#tags].
             */
            tags?: Tags

            /**
             * Optional. See (this)[https://docs.unit.co/customer-api-tokens/#customers-create-customer-bearer-token-jwt] section for more information.
             */
            jwtSubject?: string
        }
    }
}

export interface PatchBusinessCustomerRequest {
    customerId: string

    data: {
        type: "businessCustomer"

        attributes: {
            /**
             * Address of the business. To modify specify the new address.
             */
            address?: Address

            /**
             * Phone of the business. To modify specify the new phone number.
             */
            phone?: Phone

            /**
             * Primary contact of the business.
             */
            contact?: BusinessContact

            /**
             * Array of authorized users. The provided array items will replace the existing ones.
             */
            authorizedUsers?: AuthorizedUser[]

            /**
             * See (Updating Tags)[https://developers.unit.co/#tags].
             */
            tags?: Tags
        }
    }
}

export interface PatchTrustCustomerRequest {
    customerId: string

    data: {
        type: "trustCustomer"

        attributes: {

            /**
             * Optional. Primary contact of the trust.
             */
            contact?: BusinessContact

            /**
             * Array of authorized users. The provided array items will replace the existing ones.
             */
            authorizedUsers?: AuthorizedUser[]

            /**
             * See (Updating Tags)[https://developers.unit.co/#tags].
             */
            tags?: Tags
        }
    }
}

export interface ArchiveCustomerRequest {
    customerId: string

    data: {
        type: "archiveCustomer"

        attributes: {
           /**
            * The reason for archiving the customer.
            * Needs to be one of Inactive, FraudACHActivity, FraudCardActivity, FraudCheckActivity, FraudApplicationHistory, FraudAccountActivity, FraudClientIdentified, FraudLinkedToFraudulentCustomer
            */
            reason: CustomerArchiveReason
        }
    }
}

export interface AddAuthorizedUsersRequest {
    customerId: string

    data: {
        type: "addAuthorizedUsers"

        attributes: {
           /**
            * Array of authorized users. The provided array items will be added to the existing ones.
            */
            authorizedUsers: AuthorizedUser[]
        }
    }
}

export interface RemoveAuthorizedUsersRequest {
    customerId: string

    data: {
        type: "removeAuthorizedUsers"

        attributes: {
           /**
            * The list of authorized users emails to remove from the customer.
            */
            authorizedUsersEmails: string[]
        }
    }
}