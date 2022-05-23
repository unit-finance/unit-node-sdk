import { Address, AuthorizedUser, BusinessContact, FullName, Phone, Relationship, State } from "./common"

export type CustomerStatus = "Active" | "Archived"

export type CustomerArchiveReason = "Inactive" | "FraudACHActivity" | "FraudCardActivity" | "FraudCheckActivity" | "FraudApplicationHistory" | "FraudAccountActivity" | "FraudClientIdentified" | "FraudLinkedToFraudulentCustomer"

export type Customer = IndividualCustomer | BusinessCustomer

export interface BaseCustomer {
    /**
     * Identifier of the individual resource.
     */
    id: string

    /**
     * Type of the resource.
     */
    type: "individualCustomer" | "businessCustomer"

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
         * Date only. The date the resource was created.
         * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
         */
        createdAt: string

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
         * Status of the customer, either Active, Archived. You can't do any write operations with Archived customers.
         */
        status: CustomerStatus

        /**
         * Optional. The reason the account was archived, can be one of Inactive, FraudACHActivity, FraudCardActivity, FraudCheckActivity, FraudApplicationHistory, FraudAccountActivity, FraudClientIdentified, FraudLinkedToFraudulentCustomer.
         */
        archiveReason?: CustomerArchiveReason

        /**
         * Array of authorized users.
         * An authorized user is someone who can participate in the One Time Password(OTP) authentication process.
         *
         */
        authorizedUsers: AuthorizedUser[]

        /**
        * See [Tags](https://developers.unit.co/#tags).
        */
        tags?: object
    }
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
         * Date only. The date the resource was created.
         * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
         */
        createdAt: string

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
         * One of "Corporation" or "LLC".
         */
        entityType: "Corporation" | "LLC"

        /**
         * Primary contact of the business.
         */
        contact: BusinessContact

        /**
         * Array of authorized users.
         * An authorized user is someone who can participate in the One Time Password(OTP) authentication process.
         *
         */
        authorizedUsers: AuthorizedUser[]

        /**
         * Status of the customer, either Active, Archived. You can't do any write operations with Archived customers.
         */
        status: CustomerStatus

        /**
         * Optional. The reason the account was archived, can be one of Inactive, FraudACHActivity, FraudCardActivity, FraudCheckActivity, FraudApplicationHistory, FraudAccountActivity, FraudClientIdentified, FraudLinkedToFraudulentCustomer.
         */
        archiveReason?: CustomerArchiveReason

        /**
         * See [Tags](https://developers.unit.co/#tags).
         * Inherited from the application tags(see [Tag Inheritance](https://developers.unit.co/#tag-inheritance)).
         */
        tags?: object

    }
}

export type PatchCustomerRequest = PatchIndividualCustomerRequest | PatchBusinessCustomerRequest

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
             * See (Updating Tags)[https://developers.unit.co/#tags].
             */
            tags?: object
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
            tags?: object
        }
    }
}