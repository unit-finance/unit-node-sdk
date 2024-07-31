import {
    AnnualIncome,
    AnnualRevenue,
    BeneficialOwner,
    BusinessVertical,
    CashFlow,
    NumberOfEmployees,
    Occupation,
    SourceOfIncome
} from "./application"
import {Address, BusinessContact, EntityType, FullName, Officer, Phone, Relationship, Tags} from "./common"

export type ApplicationFormStage =
    "ChooseBusinessOrIndividual" |
    "EnterIndividualInformation" |
    "IndividualPhoneVerification" |
    "IndividualApplicationCreated" |
    "EnterBusinessInformation" |
    "EnterOfficerInformation" |
    "BusinessPhoneVerification" |
    "EnterBeneficialOwnersInformation" |
    "BusinessApplicationCreated" |
    "EnterSoleProprietorshipInformation" |
    "SoleProprietorshipPhoneVerification" |
    "SoleProprietorshipApplicationCreated"
export type AllowedApplicationTypes = "Individual" | "SoleProprietorship" | "Business" | "MultipleMemberBusiness" | "SingleMemberBusiness"


export interface CreateApplicationForm {
    type: "applicationForm"
    attributes: {
        /**
         * See [Tags](https://developers.unit.co/#tags). Tags that will be copied to the customer that this application creates(see [Tag Inheritance](https://developers.unit.co/#tag-inheritance)).
         */
        tags?: object
        /**
         * Optional. Add data that is already known about the end-customer to be auto populated on the form.
         */
        applicantDetails?: ApplicationFormPrefill
        /**
         * Optional. Array of Individual, Business or SoleProprietorship. Restrict the available application type for this specific application.
         */
        allowedApplicationTypes?: Array<AllowedApplicationTypes>
        /**
         *    Optional. Override disclosure and redirect URLs that were defined in the application form settings.
         */
        settingsOverride?: ApplicationFormSettingsOverride
    }
    relationships?: {
        /**
         * See [Create an Application Form from an existing Application](https://developers.unit.co/application-forms/#create-an-application-form-from-an-existing-application)
         */
        application?: {
            data: {
                type: "application"
                id: string
            }
        }
    }
}

export interface CreateApplicationFormV2 {
    type: "applicationForm"
    attributes: {
        /**
         * See [Tags](https://developers.unit.co/#tags). Tags that will be copied to the customer that this application creates(see [Tag Inheritance](https://developers.unit.co/#tag-inheritance)).
         */
        tags?: object
        /**
         * Optional. Add data that is already known about the end-customer to be auto populated on the form.
         */
        applicantDetails?: ApplicationFormPrefill
        /**
         * Optional. Array of Individual, Business or SoleProprietorship. Restrict the available application type for this specific application.
         */
        allowedApplicationTypes?: Array<AllowedApplicationTypes>
        /**
         *    Optional. Override disclosure and redirect URLs that were defined in the application form settings.
         */
        settingsOverride?: ApplicationFormSettingsOverride

        /**
         * See [Idempotency](https://docs.unit.co/#intro-idempotency). Required for ApplicationFormV2
         */
        idempotencyKey: string

        /**
         *   Optional. JWT subject for embedding via JWT token
         */

        jwtSubject?: string
    }
    relationships?: {
        /**
         * Optional. The ID of the white-label theme to be used for this application form. See [White-Labeling and Customization](https://www.unit.co/docs/white-label-uis/white-label-application-form/#white-labeling-and-customization).
         */
        whiteLabelTheme?: {
            data: {
                type: "whiteLabelTheme"
                id: string
            }
        }
        /**
         * Optional. The ID of the lending program to be used for this application form. See [Create Application Form with Credit Application](https://www.unit.co/docs/white-label-uis/white-label-application-form/#create-application-form-with-credit-application) for more information.
         */
        lendingProgram?: {
            data: {
                type: "lendingProgram"
                id: string
            }
        }

        /**
         * See [Create an Application Form from an existing Application](https://developers.unit.co/application-forms/#create-an-application-form-from-an-existing-application)
         */
        application?: {
            data: {
                type: "application"
                id: string
            }
        }
    }
}

export type CreateApplicationFormRequest = CreateApplicationForm | CreateApplicationFormV2

export type ApplicationFormV2 = {
    type: "applicationFormV2"
    id: string
    attributes: {

        /**
         * Date only. The date the resource was created.
         * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
         */

        createdAt: string

        /**
         * Date only. The date the resource was updated.
         * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
         */

        updatedAt: string

        /**
         * See [Tags](https://developers.unit.co/#tags). Tags that will be copied to the customer that this application creates(see [Tag Inheritance](https://developers.unit.co/#tag-inheritance)).
         */
        tags: Tags

        /**
         * Token for embedding application form via token
         */

        applicationFormToken: {
            token: string
            expiration: string
        }


        applicationFormSettings: ApplicationFormSettingsOverride

    }
    links: {

        related: {

            type: "text/html"

            /**
             * The URL of the application form for the end-customer to access
             */

            href: string
        }
    }
}


export interface ApplicationFormPrefill {
    /**
     * Optional. One of "Individual", "Business" or "SoleProprietorship".
     */
    applicationType?: AllowedApplicationTypes

    /**
     * Individual. Optional. Full name of the individual.
     */
    fullName?: FullName

    /**
     * Individual. Optional. SSN of the individual (numbers only). Either an SSN or a passport number is required.
     */
    ssn?: string

    /**
     * Individual. Optional. Passport number of the individual. Either an SSN or a passport is required.
     */
    passport?: string

    /**
     * Individual. Optional. ISO31661-Alpha2 Two letters representing the individual nationality. (e.g. “US”).
     */
    nationality?: string

    /**
     * Individual Optional. RFC3339 Date only (e.g. "2001-08-15").
     */
    dateOfBirth?: string

    /**
     * Individual. Optional. Email address of the individual.
     */
    email?: string

    /**
     * Business. Optional. Name of the business.
     */
    name?: string

    /**
     * Business. Optional. Two letters representing a US state.
     */
    stateOfIncorporation?: string

    /**
     * Business. Optional. One of LLC, Partnership, PubliclyTradedCorporation, PrivatelyHeldCorporation or NotForProfitOrganization.
     */
    entityType?: EntityType

    /**
     * Business. Optional. Primary contact of the business.
     */
    contact?: BusinessContact

    /**
     * Business. Optional. Officer representing the business
     * (must be the CEO, COO, CFO, President, BenefitsAdministrationOfficer, CIO, VP, AVP, Treasurer, Secretary, Controller, Manager, Partner or Member). To onboard a business successfully,
     * you must provide the officer's personal details.
     */
    officer?: Officer

    /**
     * Business. Optional. Array of beneficial owners in the business.
     * Beneficial owners are all people that, directly or indirectly, own 25% or more of the business.
     * To onboard a business successfully, you must provide each beneficial owner's personal details.
     */
    beneficialOwners?: BeneficialOwner[]

    /**
     * Business. Optional. Business's website.
     */
    website?: string

    /**
     * Individual / Business. Optional. “Doing business as”.
     * If the individual is a sole proprietor who is doing business under a different name, specify it here.
     */
    dba?: string

    /**
     * Individual / Business. Optional.
     * If the individual is a sole proprietor who has an Employer Identification Number,
     * specify it here. / Business EIN (numbers only).
     */
    ein?: string

    /**
     * Individual / Business. Optional. Address of the individual / Address of the business.
     */
    address?: Address

    /**
     * Individual / Business. Optional. Phone number of the individual / Phone number of the business.
     */
    phone?: Phone

    /**
     * Individual / Business. Optional. See (this)[https://docs.unit.co/customer-api-tokens/#customers-create-customer-bearer-token-jwt] section for more information.
     */
    jwtSubject?: string

    /**
     * Optional. Occupation of the individual / sole proprietor.
     */
    occupation?: Occupation

    /**
     * Optional. Annual income of the individual / sole proprietor.
     */
    annualIncome?: AnnualIncome

    /**
     * Optional. Source of income of the individual / sole proprietor.
     */
    sourceOfIncome?: SourceOfIncome

    /**
     * Optional. The business vertical of the sole proprietor / business.
     */
    businessVertical?: BusinessVertical

    /**
     * Optional. Annual revenue of the sole proprietor / business.
     */
    annualRevenue?: AnnualRevenue

    /**
     * Optional. Number of employees of the sole proprietor / business.
     */
    numberOfEmployees?: NumberOfEmployees

    /**
     * Optional. Cash flow of the business.
     */
    cashFlow?: CashFlow

    /**
     * Optional. Year of incorporation of the business.
     */
    yearOfIncorporation?: string

    /**
     * Optional. An array of two letter codes representing the countries of operation of the business.
     */
    countriesOfOperation?: string[]

    /**
     * Optional. The stock symbol (ticker) of the business.
     */
    stockSymbol?: string

    /**
     *    Optional. Indicates if any of the officer / BeneficialOwner of the business have a non US nationality.
     */
    hasNonUsEntities?: boolean
}

export interface ApplicationFormSettingsOverride {
    /**
     * URL that is presented to the user when an application has been submitted
     */
    redirectUrl: string

    /**
     * Privacy Policy
     */
    privacyPolicyUrl: string

    /**
     * Consent to Electronic Disclosures
     */
    electronicDisclosuresUrl: string

    /**
     * Deposit Terms & Conditions
     */
    depositTermsUrl: string

    /**
     * Client Terms of Service
     */
    clientTermsUrl: string

    /**
     * Cardholder Terms and Conditions
     */
    cardholderTermsUrl: string

    /**
     * Cash Advance Terms and Conditions
     */
    cashAdvancedTermsUrl: string

    /**
     * Debit Card Disclosure
     */
    debitCardDisclosureUrl: string

    /**
     * Array of additional disclosures that were not covered by the above links
     */
    additionalDisclosures: Record<string, string>[]
}


export interface ApplicationFormV1 {
    /**
     * Identifier of the applicationForm resource.
     */
    id: string

    /**
     * Type of the applicationForm resource.
     */
    type: "applicationForm"

    attributes: {
        /**
         * One of possible values for ApplicationFormStage
         */
        stage: ApplicationFormStage

        /**
         * Url for the applicationForm resource.
         */
        url: string

        /**
         * Details for the application for the applicationForm resource.
         */
        applicantDetails?: ApplicationFormPrefill

        /**
         * Disclosure URLs that will override the ones that were defined in the application form settings.
         */
        settingsOverride?: ApplicationFormSettingsOverride

        /**
         * See [Tags](https://developers.unit.co/#tags).
         */
        tags?: object
    }

    /**
     * Describes relationships between the applicattom form resource and the application.
     */
    relationships?: {
        /**
         * The application.
         */
        application?: Relationship
    }
}

export type ApplicationForm = ApplicationFormV2 | ApplicationFormV1