import { responseEncoding, ResponseType } from "axios"
import { Address, BusinessContact, FullName, Officer, Phone, Relationship, DeviceFingerprint, Agent, RelationshipsArray, Beneficiary, Grantor, TrustContact, Trustee, UnimplementedRelationships, UnimplementedFields, EvaluationParams, Industry, Tags, BaseContactAttributes, Status, EntityType } from "./common"

/**
 * see [Application Statuses](https://docs.unit.co/applications/#application-statuses).
 */
export type ApplicationStatus =
    "AwaitingDocuments" | //Certain documents are required for the process to continue. You may upload them via Upload Document.
    "PendingReview" |     //The application is pending review by Unit.
    "Pending" |           //The application is being evaluated asynchronously and a result should be available shortly. Listen for webhooks (application.denied, customer.created and application.awaitingdocuments) for the final result, or periodically query the application with Get by Id).
    "Approved" |          //The application was approved. A Customer resource was created.
    "Denied" |            //The application was denied. A Customer resource will not be created.
    "Canceled"            //The application was сanceled. A Customer resource will not be created.

export type Application = IndividualApplication | BusinessApplication | TrustApplication

export type ApplicationType = "businessApplication" | "individualApplication" | "trustApplication"

export type Revocability = "Revocable" | "Irrevocable"

export type SourceOfFunds = "Inheritance" | "Salary" | "Savings" | "InvestmentReturns" | "Gifts"

export type Occupation =
    "ArchitectOrEngineer" |
    "BusinessAnalystAccountantOrFinancialAdvisor" |
    "CommunityAndSocialServicesWorker" |
    "ConstructionMechanicOrMaintenanceWorker" |
    "Doctor" |
    "Educator" |
    "EntertainmentSportsArtsOrMedia" |
    "ExecutiveOrManager" |
    "FarmerFishermanForester" |
    "FoodServiceWorker" |
    "GigWorker" |
    "HospitalityOfficeOrAdministrativeSupportWorker" |
    "HouseholdManager" |
    "JanitorHousekeeperLandscaper" |
    "Lawyer" |
    "ManufacturingOrProductionWorker" |
    "MilitaryOrPublicSafety" |
    "NurseHealthcareTechnicianOrHealthcareSupport" |
    "PersonalCareOrServiceWorker" |
    "PilotDriverOperator" |
    "SalesRepresentativeBrokerAgent" |
    "ScientistOrTechnologist" |
    "Student"

export type SourceOfIncome =
    "EmploymentOrPayrollIncome" |
    "PartTimeOrContractorIncome" |
    "InheritancesAndGifts" |
    "PersonalInvestments" |
    "BusinessOwnershipInterests" |
    "GovernmentBenefits"

export type AnnualIncome =
    "UpTo10k" |
    "Between10kAnd25k" |
    "Between25kAnd50k" |
    "Between50kAnd100k" |
    "Between100kAnd250k" |
    "Over250k"

export type SoleProprietorAnnualRevenue =
    "UpTo50k" |
    "Between50kAnd100k" |
    "Between100kAnd200k" |
    "Between200kAnd500k" |
    "Over500k"

export type SoleProprietorNumberOfEmployees =
    "One" |
    "Between2And5" |
    "Between5And10" |
    "Over10"

export type BusinessVertical =
    "AdultEntertainmentDatingOrEscortServices" |
    "AgricultureForestryFishingOrHunting" |
    "ArtsEntertainmentAndRecreation" |
    "BusinessSupportOrBuildingServices" |
    "Cannabis" |
    "Construction" |
    "DirectMarketingOrTelemarketing" |
    "EducationalServices" |
    "FinancialServicesCryptocurrency" |
    "FinancialServicesDebitCollectionOrConsolidation" |
    "FinancialServicesMoneyServicesBusinessOrCurrencyExchange" |
    "FinancialServicesOther" |
    "FinancialServicesPaydayLending" |
    "GamingOrGambling" |
    "HealthCareAndSocialAssistance" |
    "HospitalityAccommodationOrFoodServices" |
    "LegalAccountingConsultingOrComputerProgramming" |
    "Manufacturing" |
    "Mining" |
    "Nutraceuticals" |
    "PersonalCareServices" |
    "PublicAdministration" |
    "RealEstate" |
    "ReligiousCivicAndSocialOrganizations" |
    "RepairAndMaintenance" |
    "RetailTrade" |
    "TechnologyMediaOrTelecom" |
    "TransportationOrWarehousing" |
    "Utilities"

export type CashFlow = "Unpredictable" | "Predictable"

interface OccupationAndIncome {
    sourceOfIncome?: SourceOfIncome
    annualIncome?: AnnualIncome
    occupation?: Occupation
}

export interface BeneficialOwner extends BaseContactAttributes, OccupationAndIncome {
    /**
     * One of Approved, Denied or PendingReview.
     */
    status?: Status

    /**
     * SSN of the beneficial owner (numbers only). One of ssn or passport is required.
     */
    ssn?: string

    /**
     * Passport of the beneficial owner. One of ssn or passport is required.
     */
    passport?: string

    /**
     * Only when Passport is populated. Two letters representing the beneficial owner's nationality.
     * ISO31661 - Alpha2 format. For more information: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
     */
    nationality?: string

    /**
     * The beneficial owner percentage of ownership at the business.
     */
    percentage?: number

    /**
     * Optional. Evaluation Params for this entity.
     */
    evaluationParams?: EvaluationParams
}

export interface BeneficialOwnerDTO {
    id: string
    type: string
    attributes: BeneficialOwner
    relationships: {
        application: Relationship
    }
}

export interface BaseApplication {
    /**
     * Identifier of the application resource.
     */
    id: string

    /**
     * Type of the application resource.
     */
    type: ApplicationType
}

export interface BaseApplicationAttributes extends UnimplementedFields {
    /**
     * One of AwaitingDocuments, PendingReview, Approved, Pending, or Denied, see Application Statuses.
     */
    status: ApplicationStatus

    /**
     * A message describing the status.
     */
    message: string

    /**
     * Date only. The date the resource was created.
     * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
     */
    createdAt: string

    /**
     * Date only. The date the resource was created.
     * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
     */
    updatedAt?: string

    /**
     * Indicates whether the application has been archived. Archived applications are read-only and no changes can be made to them.
     * Once an application has been archived, a new application with the same SSN (or Passport) may be submitted.
     * An application becomes archived once the corresponding customer is [archived](https://docs.unit.co/customers/#archive-customer).
     */
    archived: boolean

    /**
     * IP address of the end-customer creating the application, if specified.
     */
    ip?: string

    /**
     * See [Tags](https://developers.unit.co/#tags).
     */
    tags?: object
}

export interface BaseApplicationRelationships extends UnimplementedRelationships {
    /**
     * The Org of the application.
     */
    org?: Relationship

    /**
     * Application's documents.
     */
    documents: RelationshipsArray

    /**
     * Optional. The created Customer in case of approved application.
     */
    customer?: Relationship

    /**
     * Optional. The Application Form used to create the application.
     */
    applicationForm?: Relationship
}

interface BaseIndividualAttributes extends OccupationAndIncome {
    /**
     * SSN of the individual (numbers only). Either an SSN or a passport number is required.
     */
    ssn?: string

    /**
     * Passport number of the individual. Either an SSN or a passport is required.
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
    * Optional. The details of the person that will act as the agent that has power of attorney.
    */
    powerOfAttorneyAgent?: Agent
}

export interface IndividualApplication extends BaseApplication {
    type: "individualApplication"

    attributes: {
        /**
         * Optional. Indicates whether the individual is a sole proprietor, if specified.
         */
        soleProprietorship?: boolean

        /**
         * Optional. Indicates if the individual is a sole proprietor who has an Employer Identification Number, if specified.
         */
        ein?: string

        /**
         * Optional. Indicates if the individual is a sole proprietor who is doing business under a different name, if specified.
         */
        dba?: string

        /**
         * Optional. Indicates if the individual is a sole proprietor who has an business industry, if specified.
         */
        industry?: Industry

        /**
         * Optional. Score (0-1000) for ID theft verification, >900 is auto rejected as default (threshold is configurable).
         */
        idTheftScore?: number

        /**
         * Optional. See (this)[https://docs.unit.co/customer-api-tokens/#customers-create-customer-bearer-token-jwt] section for more information.
         */
        jwtSubject?: string
    } & BaseApplicationAttributes & BaseIndividualAttributes

    relationships: BaseApplicationRelationships
}

interface BaseBusinessApplicationAttributes {
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
     * Phone number of the business.
     */
    phone: Phone

    /**
     * Two letters representing a US state.
     */
    stateOfIncorporation: string

    /**
     * Business EIN (numbers only).
     */
    ein: string

    /**
     * The business industry.
     */
    industry?: Industry

    /**
     * One of Corporation, LLC, Partnership, PubliclyTradedCorporation, PrivatelyHeldCorporation or NotForProfitOrganization.
     */
    entityType: EntityType

    /**
     * Optional. Business's website.
     */
    website?: string

    /**
     * Primary contact of the business.
     */
    contact: BusinessContact

    /**
     * Officer representing the business(must be the CEO, COO, CFO, President, BenefitsAdministrationOfficer, CIO, VP, AVP, Treasurer, Secretary, Controller, Manager, Partner or Member).To onboard a business successfully, you must provide the officer's full personal details as well as identifying documents.
     */
    officer: Officer

    /**
     * Array of beneficial owners in the business.Beneficial owners are all people that, directly or indirectly, own 25 % or more of the business.To onboard a business successfully, you must provide each beneficial owner's full personal details as well as identifying documents.
     */
    beneficialOwners: BeneficialOwner[]

    /**
     * Optional. Annual revenue of the business.
     */
    annualRevenue?: BusinessAnnualRevenue

    /**
     * Optional. Number of employees of the business.
     */
    numberOfEmployees?: BusinessNumberOfEmployees

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
     * Optional. The business vertical of the business.
     */
    businessVertical?: BusinessVertical
}

export interface BusinessApplication extends BaseApplication {
    type: "businessApplication"

    attributes: BaseBusinessApplicationAttributes & BaseApplicationAttributes

    relationships: {
        beneficialOwners?: RelationshipsArray
    } & BaseApplicationRelationships
}

export interface TrustApplication extends BaseApplication {
    type: "trustApplication"

    attributes: BaseApplicationAttributes & TrustApplicationBaseAttributes

    relationships: {
        /**
         * The trustees of the trust.
         */
        trustees: RelationshipsArray

        /**
         * The beneficiaries of the trust.
         */
        beneficiaries: RelationshipsArray
    } & Pick<BaseApplicationRelationships, "org" | "documents" | "customer">
}

export type ApplicationDocumentStatus =
    "Required" |	    //The document is required for the application to be evaluated.
    "ReceivedBack" |	//Back-side of the document was received. Front-side is still required. Only relevant for IdDocument document type.
    "ReceivedFront" |	//Front-side of the document was received. Back-side is still required. Only relevant for IdDocument document type.
    "Invalid" |	        //The document is invalid. You may re-upload the correct document for the application to be evaluated.
    "Approved" |	    //The document is approved.
    "PendingReview" 	//The document is currently undergoing review.


export type DocumentType =
    "IdDocument" |	        //An individual's Drivers License or State ID. Both front-side and back-side are required.
    "Passport" |	        //An individual's passport.
    "AddressVerification" |	//An individual's document to verify address. Document may be a utility bill, bank statement, lease agreement or current pay stub.
    "SocialSecurityCard" |	//An individual's social security card.
    "CertificateOfIncorporation" |	//A business's certificate of incorporation.
    "EmployerIdentificationNumberConfirmation" | 	//A business's EIN confirmation document (either IRS form 147c or IRS form CP-575).
    "PowerOfAttorney" |
    "ClientRequested" |
    "SelfieVerification"

export type ReasonCode =
    "PoorQuality" |
    "NameMismatch" |
    "SSNMismatch" |
    "AddressMismatch" |
    "DOBMismatch" |
    "ExpiredId" |
    "EINMismatch" |
    "StateMismatch" |
    "Other"


export type BusinessAnnualRevenue = "UpTo250k" | "Between250kAnd500k" | "Between500kAnd1m" | "Between1mAnd5m" | "Over5m"

export type BusinessNumberOfEmployees = "UpTo10" | "Between10And50" | "Between50And100" | "Between100And500" | "Over500"


export interface ApplicationDocument {
    /**
     * Identifier of the document resource.
     */
    id: string

    type: "document"

    /**
     * Representing the document’s data.
     */
    attributes: {
        /**
         * One of Required, ReceivedBack, ReceivedFront, Invalid, Approved or PendingReview, see Application Document Status.
         */
        status: ApplicationDocumentStatus

        /**
         * One of IdDocument, Passport, AddressVerification, CertificateOfIncorporation or EmployerIdentificationNumberConfirmation.
         */
        documentType: DocumentType

        /**
         * The document requirements description.
         */
        description: string

        /**
         * Name of business or individual.
         */
        name: string

        /**
         * Individual address, present only for the AddressVerification document type.
         */
        address?: Address

        /**
         * Date only. Present only for Passport and License document types.
         * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
         */
        dateOfBirth?: string

        /**
         * Individual passport number. Present only for the Passport document type.
         */
        passport?: string

        /**
         * Business EIN. Present only for the EmployerIdentificationNumberConfirmation document type.
         */
        ein?: string

        /**
         * Application Document rejection reason code. Present only when document status is Invalid.
         * One of PoorQuality, NameMismatch, SSNMismatch, AddressMismatch, DOBMismatch, ExpiredId, EINMismatch, StateMismatch, Other.
         */
        reasonCode?: ReasonCode

        /**
         * Application Document rejection reason. Present only when document status is Invalid.
         */
        reason?: string
    }
}

export interface TrustApplicationBaseAttributes {
    /**
     * Name of the business.
     */
    name: string

    /**
     * Two letters representing a US state.
     */
    stateOfIncorporation: string

    /**
     * Whether the trust can be changed or canceled after the trust document has been signed.
     */
    revocability: Revocability

    /**
     * Origin of the funds used to fund the account.
     */
    sourceOfFunds: SourceOfFunds

    /**
     * The grantor's SSN.
     */
    taxId: string

    /**
     * The individual that creates the trust.
     */
    grantor: Grantor

    /**
     * Primary contact of the trust. This person is the one that will have access to the account.
     */
    contact: TrustContact
}

export type CreateApplicationRequest = CreateBusinessApplicationRequest | CreateIndividualApplicationRequest | CreateTrustApplicationRequest | CreateSoleProprietorApplicationRequest

interface BaseCreateApplicationRequestAttributes {
    /**
     * IP address of the end - customer creating the application.
     */
    ip?: string

    /**
     * See [Tags](https://developers.unit.co/#tags). Tags that will be copied to the customer that this application creates(see [Tag Inheritance](https://developers.unit.co/#tag-inheritance)).
     */
    tags?: object

    /**
     * See [Idempotency.](https://developers.unit.co/#intro-idempotency)
     */
    idempotencyKey?: string

    /**
     * Optional. A list of device fingerprints for fraud and risk prevention [See Device Fingerprints](https://developers.unit.co/applications/#device-fingerprints).
     */
    deviceFingerprints?: DeviceFingerprint[]
}


export interface CreateIndividualApplicationRequest {
    type: "individualApplication"

    attributes: {
        /**
         * Optional. Evaluation Params for this entity.
         */
        evaluationParams?: EvaluationParams

        /**
         * Optional. See [this](https://docs.unit.co/customer-api-tokens/#customers-create-customer-bearer-token-jwt) section for more information.
         */
        jwtSubject?: string
    } & BaseCreateApplicationRequestAttributes & BaseIndividualAttributes
}

export interface CreateSoleProprietorApplicationRequest {
    type: "individualApplication"

    attributes: {
        /**
         * Set this to true in order to indicate that the individual is a sole proprietor.
         */
        soleProprietorship?: boolean


        /**
         * Optional. Indicates if the individual is a sole proprietor who has an Employer Identification Number, if specified.
         */
        ein?: string

        /**
         * Optional. Indicates if the individual is a sole proprietor who is doing business under a different name, if specified.
         */
        dba?: string

        /**
         * Optional. Indicates if the individual is a sole proprietor who has an business industry, if specified.
         */
        industry?: Industry

        /**
         * Optional. Evaluation Params for this entity.
         */
        evaluationParams?: EvaluationParams

        /**
         * Optional. For sole proprietors, specify the annual revenue here.
         */
        annualRevenue?: SoleProprietorAnnualRevenue

        /**
         * Optional. For sole proprietors, specify the number of employees here.
         */
        numberOfEmployees?: SoleProprietorNumberOfEmployees

        /**
         * Optional. For sole proprietors, specify the business vertical here.
         */
        businessVertical?: BusinessVertical

        /**
         * Optional. For sole proprietors, specify the business website here.
         */
        website?: string

        /**
         * Optional. See [this](https://docs.unit.co/customer-api-tokens/#customers-create-customer-bearer-token-jwt) section for more information.
         */
        jwtSubject?: string
    } & BaseCreateApplicationRequestAttributes & BaseIndividualAttributes
}

export interface CreateBusinessApplicationRequest {
    type: "businessApplication"

    attributes: BaseBusinessApplicationAttributes & BaseCreateApplicationRequestAttributes
}

export interface CreateTrustApplicationRequest {
    type: "trustApplication"

    attributes: {

        /**
         * List of individual who take legal ownership of the assets held by the trust.
         */
        trustees: Trustee[]

        /**
         * List of individuals for whom the trust is created.
         */
        beneficiaries: Beneficiary[]

    } & TrustApplicationBaseAttributes & BaseCreateApplicationRequestAttributes
}

export interface UploadDocumentRequest {
    applicationId: string
    documentId: string
    isBackSide?: boolean
    file: Buffer
    fileType: "jpeg" | "png" | "pdf"
}

export interface DownloadDocumentRequest {
    applicationId: string
    documentId: string
    isBackSide?: boolean
    responseEncoding?: responseEncoding
    responseType?: ResponseType
}

type PatchIndividualApplicationAttributes = OccupationAndIncome
type PatchBusinessApplicationAttributes = Pick<BaseBusinessApplicationAttributes, "annualRevenue" | "numberOfEmployees" | "cashFlow" | "yearOfIncorporation" | "countriesOfOperation" | "stockSymbol" | "businessVertical">
type PatchBusinessOfficerApplicationAttributes = {
    officer: OccupationAndIncome
}
type PatchSoleProprietorApplicationAttributes = {
    annualRevenue?: SoleProprietorAnnualRevenue
    numberOfEmployees?: SoleProprietorNumberOfEmployees
    businessVertical?: BusinessVertical
    website?: string
}

type PatchApplicationAttributes = PatchIndividualApplicationAttributes | PatchBusinessApplicationAttributes | PatchBusinessOfficerApplicationAttributes | PatchSoleProprietorApplicationAttributes

export interface PatchApplicationRequest {
    applicationId: string

    data: {
        type: ApplicationType
        attributes: { tags?: Tags; } & PatchApplicationAttributes
    }
}

export interface PatchBusinessApplicationBeneficialOwner {
    beneficialOwnerId: string

    data: {
        type: "beneficialOwner"
        attributes: OccupationAndIncome

        relationships: {
            application: Relationship
        }
    }
}

export interface VerifyDocumentRequest {
    applicationId: string
    documentId: string

    data: {
        type: "selfieVerification"
        attributes: {
            jobId: string
        }
    }
}

export interface CancelApplicationRequest {
    applicationId: string

    data: {
        type: "applicationCancel"
        attributes: {
            reason: string
        }
    }
}
