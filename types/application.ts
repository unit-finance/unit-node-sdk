import { Address, BeneficialOwner, BusinessContact, FullName, Officer, Phone, State } from "./core"

export type ApplicationStatus =
    "AwaitingDocuments" | //Certain documents are required for the process to continue. You may upload them via Upload Document.
    "PendingReview" |     //The application is pending review by Unit.
    "Pending" |           //The application is being evaluated asynchronously and a result should be available shortly. Listen for webhooks (application.denied, customer.created and application.awaitingdocuments) for the final result, or periodically query the application with Get by Id).
    "Approved" |          //The application was approved. A Customer resource was created.
    "Denied"              //The application was denied. A Customer resource will not be created.

/**
 * More about [Relationship](https://developers.unit.co/#relationships)
 */
export type Relationship = null | [] | { type: string, id: string } | Array<{ type: string, id: string }>

interface Application {
    /**
     * Identifier of the application resource.
     */
    id: string,

    /**
     * Type of the application resource.
     */
    type: string

    /**
     * The relationships object describes the relationship between the current resource and other resources.
     * Each member of the relationships object represents one reference.
     */
    relationships: {
        /**
         * Application's documents.
         */
        documents: Relationship

        /**
         * Optional. The created Customer in case of approved application.
         */
        customer?: Relationship
    }
}

export interface IndividualApplication extends Application {
    type: 'IndividualApplication',
    attributes: {
        /**
         * One of AwaitingDocuments, PendingReview, Approved or Denied, see Application Statuses.
         */
        status: ApplicationStatus

        /**
         * A message describing the IndividualApplication status.
         */
        message: string

        /**
         * The date the resource was created.
         * RFC3339 Date string	
         */
        createdAt: string

        /**
         * SSN of the individual (numbers only). Either an SSN or a passport number is required.
         */
        ssn: string

        /**
         * Passport number of the individual. Either an SSN or a passport is required.
         */
        passport: string

        /**
         * Required on passport only.Two letters representing the individual nationality.
         * ISO31661 - Alpha2 format. For more information:
         */
        nationality: string

        /**
         * Full name of the individual.
         */
        fullName: FullName

        /**
         * RFC3339 Date
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
         * IP address of the end-customer creating the application, if specified.
         */
        ip?: string

        /**
         * Optional. Indicates whether the individual is a sole proprietor, if specified.
         */
        soleProprietorship?: boolean

        /**
         * Optional. Indicates if the individual is a sole proprietor who has an Employer Identification Number, if specified.
         */
        ein: string,

        /**
         * Optional. Indicates if the individual is a sole proprietor who is doing business under a different name, if specified.
         */
        dba: string,

        /**
         * See [Tags](https://developers.unit.co/#tags).
         */
        tags: object
    }
}

export interface BusinessApplication extends Application {
    type: 'BusinessApplication',
    attributes: {
        /**
         * One of AwaitingDocuments, PendingReview, Approved or Denied, see Application Statuses.
         */
        status: ApplicationStatus

        /**
         * A message describing the BusinessApplication status.
         */
        message: string

        /**
         * RFC3339 Date string	The date the resource was created.
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
         * One of "Corporation", "LLC" or "Partnership"
         */
        entityType: "Corporation" | "LLC" | "Partnership"

        /**
         * Primary contact of the business.
         */
        contact: BusinessContact

        /**
         * Officer representing the business, must be CEO, CFO, President or BenefitsAdministrationOfficer. The officer would need to go over KYC process and provide documents.
         */
        officer: Officer

        /**
         * Array of beneficial owners of the business. Beneficial Owner is anyone with more than 25% ownership. Beneficial Owners would need to go over KYC process and provide documents.
         */
        beneficialOwners: Array<BeneficialOwner>

        /**
         * See [Tags](https://developers.unit.co/#tags).
         */
        tags: Object

    }
}
