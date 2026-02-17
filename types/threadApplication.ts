import { 
    Address, 
    FullName, 
    Phone, 
    Tags, 
    Relationship, 
    RelationshipsArray, 
    UnimplementedFields, 
    UnimplementedRelationships,
    DeviceFingerprint,
    EvaluationParams,
    BaseContactAttributes,
    Status,
    Title
} from "./common"
import { ApplicationStatus, Product } from "./application"

// ==========================================
// Applications V2 Specific Types
// ==========================================

/**
 * The primary purpose of the account for individuals.
 * @see https://www.unit.co/docs/applications-v2/types/#accountpurpose
 */
export type IndividualAccountPurpose =
    | "PayrollOrDirectDeposit"
    | "PersonalSavingsOrEmergencyFund"
    | "EverydaySpending"
    | "DomesticP2PAndBillPay"
    | "InternationalRemittances"
    | "CashHeavyPersonalIncome"
    | "PropertyPurchaseOrInvestment"
    | "EducationOrStudentUse"
    | "TrustOrEstateDistributions"
    | "Cryptocurrency"

/**
 * The primary purpose of the account for businesses.
 * @see https://www.unit.co/docs/applications-v2/types/#accountpurpose
 */
export type BusinessAccountPurpose =
    | "RetailSalesInPerson"
    | "EcommerceSales"
    | "CashHeavyIncomeAndOperations"
    | "ImportExportTradeOperations"
    | "ProfessionalServicesNotHandlingFunds"
    | "ProfessionalServicesHandlingFunds"
    | "HoldingOrInvestmentCompanyOperations"
    | "PropertyManagementOrRealEstateOperations"
    | "CharitableOrNonProfitOrganizationOperations"
    | "ConstructionAndContractingOperations"
    | "CommercialCashOperations"
    | "FreightForwardingOrLogisticsOperations"
    | "ThirdPartyPaymentProcessing"
    | "TechnologyStartupOperations"
    | "WholesaleDistributionOperations"
    | "FranchiseOperationOperations"
    | "HealthcareProviderOperations"
    | "EducationalInstitutionOperations"

/**
 * Union type for all account purposes.
 */
export type AccountPurpose = IndividualAccountPurpose | BusinessAccountPurpose

/**
 * The primary source of funds for individuals.
 * @see https://www.unit.co/docs/applications-v2/types/#source-of-funds
 */
export type IndividualSourceOfFunds =
    | "SalaryOrWages"
    | "BusinessIncome"
    | "InvestmentIncome"
    | "RetirementSavings"
    | "Inheritance"
    | "Gift"
    | "SaleOfAssets"
    | "LegalSettlement"
    | "LoanProceeds"

/**
 * The primary source of funds for businesses.
 * @see https://www.unit.co/docs/applications-v2/types/#source-of-funds
 */
export type BusinessSourceOfFunds =
    | "SalesOfGoods"
    | "SalesOfServices"
    | "CustomerPayments"
    | "InvestmentCapital"
    | "BusinessLoans"
    | "OwnerContributions"
    | "FranchiseRevenue"
    | "RentalIncome"
    | "GovernmentContractsOrGrants"
    | "DonationsOrFundraising"
    | "MembershipFeesOrSubscriptions"
    | "LicensingOrRoyalties"
    | "CommissionIncome"
    | "ImportExportRevenue"
    | "CryptocurrencyRelatedActivity"

/**
 * The expected monthly transaction volume.
 * @see https://www.unit.co/docs/applications-v2/types/#transaction-volume
 */
/**
 * Transaction volume for individual accounts.
 */
export type IndividualTransactionVolume =
    | "LessThan1K"
    | "Between1KAnd5K"
    | "Between5KAnd15K"
    | "Between15KAnd30K"
    | "Between30KAnd60K"
    | "GreaterThan60K"

/**
 * Transaction volume for business accounts.
 */
export type BusinessTransactionVolume =
    | "LessThan10K"
    | "Between10KAnd50K"
    | "Between50KAnd250K"
    | "Between250KAnd1M"
    | "Between1MAnd2M"
    | "GreaterThan2M"

/**
 * Transaction volume for sole proprietorship accounts.
 */
export type SoleProprietorTransactionVolume =
    | "LessThan5K"
    | "Between5KAnd20K"
    | "Between20KAnd75K"
    | "Between75KAnd150K"
    | "Between150KAnd300K"
    | "GreaterThan300K"

/**
 * Combined transaction volume type.
 */
export type TransactionVolume = IndividualTransactionVolume | BusinessTransactionVolume | SoleProprietorTransactionVolume

/**
 * The occupation/profession of the individual.
 * @see https://www.unit.co/docs/applications-v2/types/#profession
 */
export type Profession =
    | "Accountant"
    | "Actor"
    | "Administrator"
    | "Analyst"
    | "Architect"
    | "Artist"
    | "Attorney"
    | "Auditor"
    | "Banker"
    | "Barber"
    | "Bartender"
    | "Bookkeeper"
    | "Broker"
    | "BusinessOwner"
    | "Chef"
    | "Clergy"
    | "Coach"
    | "Consultant"
    | "Contractor"
    | "CustomerServiceRepresentative"
    | "Dentist"
    | "Designer"
    | "Developer"
    | "Doctor"
    | "Driver"
    | "Economist"
    | "Educator"
    | "Electrician"
    | "Engineer"
    | "Entrepreneur"
    | "EventPlanner"
    | "Executive"
    | "Farmer"
    | "FinancialAdvisor"
    | "Firefighter"
    | "Fisherman"
    | "FlightAttendant"
    | "Freelancer"
    | "GovernmentEmployee"
    | "GraphicDesigner"
    | "HealthcareWorker"
    | "HRProfessional"
    | "InsuranceAgent"
    | "Investor"
    | "ITSpecialist"
    | "Janitor"
    | "Journalist"
    | "Laborer"
    | "LawEnforcementOfficer"
    | "Lawyer"
    | "Librarian"
    | "LogisticsCoordinator"
    | "Manager"
    | "MarketingProfessional"
    | "Mechanic"
    | "MilitaryPersonnel"
    | "Musician"
    | "Nurse"
    | "Optometrist"
    | "Painter"
    | "Pharmacist"
    | "Photographer"
    | "PhysicalTherapist"
    | "Pilot"
    | "Plumber"
    | "PoliceOfficer"
    | "Professor"
    | "Programmer"
    | "ProjectManager"
    | "RealEstateAgent"
    | "Receptionist"
    | "Researcher"
    | "RetailWorker"
    | "Salesperson"
    | "Scientist"
    | "SocialWorker"
    | "SoftwareEngineer"
    | "Student"
    | "Surgeon"
    | "Teacher"
    | "Technician"
    | "Therapist"
    | "Trainer"
    | "Veterinarian"
    | "WaiterWaitress"
    | "Writer"

/**
 * The industry of the business.
 * @see https://www.unit.co/docs/applications-v2/types/#business-industry
 */
export type BusinessIndustry =
    | "GroceryStoresOrSupermarkets"
    | "ConvenienceStores"
    | "SpecialtyFoodRetailers"
    | "GasStationsWithRetail"
    | "GeneralMerchandiseOrDepartmentStores"
    | "OnlineRetailOrECommerce"
    | "SubscriptionAndMembershipPlatforms"
    | "DirectToConsumerBrands"
    | "Cannabis"
    | "BanksOrCreditUnions"
    | "FinTechOrPaymentProcessing"
    | "InsuranceProviders"
    | "InvestmentAdvisorsOrBrokerDealers"
    | "LendingOrMortgageCompanies"
    | "TreasuryManagementPlatforms"
    | "PersonalFinanceAppsOrAIAssistants"
    | "RetirementPlanning"
    | "RealEstateInvestmentPlatforms"
    | "MoneyServiceBusinesses"
    | "Cryptocurrency"
    | "DebtCollection"
    | "PaydayLending"
    | "Gambling"
    | "FarmsOrAgriculturalProducers"
    | "FoodWholesalersOrDistributors"
    | "RestaurantsOrCafes"
    | "BarsOrNightclubs"
    | "CateringServices"
    | "FarmersMarkets"
    | "RestaurantTechAndPOSProviders"
    | "HospitalsOrClinics"
    | "Pharmacies"
    | "MedicalEquipmentSuppliers"
    | "BiotechnologyFirms"
    | "HomeHealthServices"
    | "HealthcareStaffingPlatforms"
    | "WellnessAndBenefitsPlatforms"
    | "HealthcareAndSocialAssistance"
    | "LegalServices"
    | "AccountingOrAuditingFirms"
    | "ConsultingFirms"
    | "MarketingOrAdvertisingAgencies"
    | "RealEstateAgentsOrPropertyManagers"
    | "CorporateServicesAndIncorporation"
    | "HRAndWorkforceManagementPlatforms"
    | "DirectMarketingOrTelemarketing"
    | "LegalAccountingConsultingOrComputerProgramming"
    | "ChemicalManufacturing"
    | "ElectronicsOrHardwareManufacturing"
    | "AutomotiveManufacturing"
    | "ConstructionMaterials"
    | "TextilesOrApparel"
    | "Mining"
    | "RealEstate"
    | "Construction"
    | "TransportationOrWarehousing"
    | "WholesaleTrade"
    | "BusinessSupportOrBuildingServices"
    | "EscortServices"
    | "DatingOrAdultEntertainment"

/**
 * The nature of the business's ties to the U.S.
 * @see https://www.unit.co/docs/applications-v2/types/#us-nexus
 */
export type UsNexus =
    | "NotAvailable"
    | "Employees"
    | "Customers"
    | "PhysicalOfficeOrFacility"
    | "BankingRelationships"

/**
 * Extended entity type for Applications V2.
 * @see https://www.unit.co/docs/applications-v2/resources/#businessapplication
 */
export type ThreadApplicationEntityType =
    | "Estate"
    | "Trust"
    | "ForeignFinancialInstitution"
    | "DomesticFinancialInstitution"
    | "GovernmentEntityOrAgency"
    | "ReligiousOrganization"
    | "Charity"
    | "LLC"
    | "Partnership"
    | "PubliclyTradedCorporation"
    | "PrivatelyHeldCorporation"
    | "NotForProfitOrganization"

// ==========================================
// Thread Application Response Types
// ==========================================

/**
 * Base attributes for thread applications.
 */
interface BaseThreadApplicationAttributes extends UnimplementedFields {
    /**
     * One of AwaitingDocuments, PendingReview, Approved, Denied or Pending.
     * @see https://docs.unit.co/applications/#application-statuses
     */
    status: ApplicationStatus

    /**
     * A message describing the application status.
     */
    message: string

    /**
     * The date the resource was created.
     * RFC3339 format.
     */
    createdAt: string

    /**
     * Optional. The date the resource was updated.
     * RFC3339 format.
     */
    updatedAt?: string

    /**
     * Indicates whether the application has been archived.
     */
    archived: boolean

    /**
     * Optional. IP address of the end-customer creating the application.
     */
    ip?: string

    /**
     * See [Tags](https://developers.unit.co/#tags).
     */
    tags?: Tags
}

/**
 * Base relationships for thread applications.
 */
interface BaseThreadApplicationRelationships extends UnimplementedRelationships {
    /**
     * The Org of the application.
     */
    org?: Relationship

    /**
     * Application's documents.
     */
    documents?: RelationshipsArray

    /**
     * Optional. The created Customer in case of approved application.
     */
    customer?: Relationship

    /**
     * Optional. The Application Form used to create the application.
     */
    applicationForm?: Relationship
}

/**
 * Response type for Individual Thread Application.
 * @see https://www.unit.co/docs/applications-v2/resources/#individualapplication
 */
export interface IndividualThreadApplication {
    /**
     * Identifier of the application resource.
     */
    id: string

    /**
     * Type of the application resource.
     */
    type: "individualApplication"

    attributes: {
        /**
         * SSN of the individual (numbers only). Either ssn or passport will be populated.
         */
        ssn?: string

        /**
         * Individual passport number. Either ssn or passport will be populated.
         */
        passport?: string

        /**
         * Two letters representing the individual nationality.
         * ISO31661-Alpha2 format.
         */
        nationality?: string

        /**
         * Full name of the individual.
         */
        fullName: FullName

        /**
         * Date only (e.g. "2001-08-15").
         * RFC3339 format.
         */
        dateOfBirth: string

        /**
         * Address of the individual.
         */
        address: Address

        /**
         * Optional. The operating address of the individual (for sole proprietors).
         */
        operatingAddress?: Address

        /**
         * Phone of the individual.
         */
        phone: Phone

        /**
         * Email address of the individual.
         */
        email: string

        /**
         * Optional. Indicates whether the individual is a sole proprietor.
         */
        soleProprietorship?: boolean

        /**
         * Optional. Employer Identification Number for sole proprietors.
         */
        ein?: string

        /**
         * Optional. "Doing business as" name for sole proprietors.
         */
        dba?: string

        /**
         * Optional. Score (0-1000) for ID theft verification.
         */
        idTheftScore?: number

        /**
         * The primary purpose of the account.
         */
        accountPurpose?: AccountPurpose

        /**
         * Required if accountPurpose is Cryptocurrency, CashHeavyPersonalIncome, or InternationalRemittances.
         */
        accountPurposeDetail?: string

        /**
         * The primary source of funds.
         */
        sourceOfFunds?: IndividualSourceOfFunds

        /**
         * The expected monthly transaction volume.
         */
        transactionVolume?: TransactionVolume

        /**
         * The occupation of the individual.
         */
        profession?: Profession
    } & BaseThreadApplicationAttributes

    relationships: BaseThreadApplicationRelationships
}

/**
 * Officer type for Business Thread Application.
 * @see https://www.unit.co/docs/applications-v2/resources/#businessapplication
 */
export interface ThreadApplicationOfficer extends BaseContactAttributes {
    /**
     * One of Approved, Denied or PendingReview.
     */
    status?: Status

    /**
     * Officer title. One of CEO, COO, CFO, President, BenefitsAdministrationOfficer,
     * CIO, VP, AVP, Treasurer, Secretary, Controller, Manager, Partner or Member.
     */
    title?: Title

    /**
     * SSN of the officer (numbers only). One of ssn or passport is required.
     */
    ssn?: string

    /**
     * Passport of the officer. One of ssn or passport is required.
     */
    passport?: string

    /**
     * Always when Passport is populated and optional when SSN is populated.
     * Two letters representing the officer's nationality.
     * ISO31661-Alpha2 format.
     */
    nationality?: string

    /**
     * Optional. Score (0-1000) for ID theft verification,
     * >900 is auto rejected as default (threshold is configurable).
     */
    idTheftScore?: number
}

/**
 * Beneficial Owner type for Business Thread Application.
 * @see https://www.unit.co/docs/applications-v2/resources/#beneficialowner
 */
export interface ThreadApplicationBeneficialOwner extends BaseContactAttributes {
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
     * Always when Passport is populated and optional when SSN is populated.
     * Two letters representing the beneficial owner's nationality.
     * ISO31661-Alpha2 format.
     */
    nationality?: string

    /**
     * The beneficial owner percentage of ownership at the business (between 25 and 100).
     */
    percentage?: number

    /**
     * Optional. Score (0-1000) for ID theft verification,
     * >900 is auto rejected as default (threshold is configurable).
     */
    idTheftScore?: number
}

/**
 * Response type for Business Thread Application.
 * @see https://www.unit.co/docs/applications-v2/resources/#businessapplication
 */
export interface BusinessThreadApplication {
    /**
     * Identifier of the application resource.
     */
    id: string

    /**
     * Type of the application resource.
     */
    type: "businessApplication"

    attributes: {
        /**
         * Name of the business.
         */
        name: string

        /**
         * Optional. "Doing business as" name.
         */
        dba?: string

        /**
         * Address of the business.
         */
        address: Address

        /**
         * Optional. The operating address of the business.
         * Required when the address is of a registered agent or if any beneficial owner or officer is non-US.
         */
        operatingAddress?: Address

        /**
         * Phone number of the business.
         */
        phone: Phone

        /**
         * Two letters representing the US state of incorporation.
         */
        stateOfIncorporation: string

        /**
         * Business EIN (numbers only).
         */
        ein: string

        /**
         * Entity type of the business.
         */
        entityType: ThreadApplicationEntityType

        /**
         * Primary contact of the business.
         */
        contact: {
            fullName: FullName
            email: string
            phone: Phone
            jwtSubject?: string
        }

        /**
         * Officer representing the business.
         */
        officer: ThreadApplicationOfficer

        /**
         * Array of beneficial owners in the business.
         */
        beneficialOwners: ThreadApplicationBeneficialOwner[]

        /**
         * The primary source of funds of the business.
         */
        sourceOfFunds?: BusinessSourceOfFunds

        /**
         * Required if sourceOfFunds is ImportExportRevenue or DonationsOrFundraising.
         */
        sourceOfFundsDescription?: string

        /**
         * The industry of the business.
         */
        businessIndustry?: BusinessIndustry

        /**
         * A brief description of the business.
         */
        businessDescription?: string

        /**
         * Is the business regulated by a government agency or financial regulator?
         */
        isRegulated?: boolean

        /**
         * Required if isRegulated is true. The name of the regulator.
         */
        regulatorName?: string

        /**
         * The nature of the business's ties to the U.S.
         */
        usNexus?: UsNexus[]

        /**
         * The primary purpose of the account.
         */
        accountPurpose?: AccountPurpose

        /**
         * Required for certain accountPurpose values.
         */
        accountPurposeDetail?: string

        /**
         * The expected monthly transaction volume.
         */
        transactionVolume?: TransactionVolume

        /**
         * Required if entityType is PubliclyTradedCorporation.
         */
        stockExchangeName?: string

        /**
         * Required if entityType is PubliclyTradedCorporation.
         */
        stockSymbol?: string

        /**
         * Array of ISO31661-Alpha2 country codes representing countries of operation.
         */
        countriesOfOperation?: string[]

        /**
         * Year of incorporation of the business.
         */
        yearOfIncorporation?: string

        /**
         * Optional. Business's website.
         */
        website?: string
    } & BaseThreadApplicationAttributes

    relationships: {
        /**
         * Beneficial owners of the business.
         */
        beneficialOwners?: RelationshipsArray
    } & BaseThreadApplicationRelationships
}

/**
 * Response type for Beneficial Owner Thread Application.
 * @see https://www.unit.co/docs/applications-v2/resources/#beneficialowner
 */
export interface BeneficialOwnerThreadApplication {
    /**
     * Identifier of the beneficial owner resource.
     */
    id: string

    /**
     * Type of the resource. Always "beneficialOwner".
     */
    type: "beneficialOwner"

    attributes: {
        /**
         * One of Approved, Denied or PendingReview.
         */
        status?: Status

        /**
         * Full name of the beneficial owner.
         */
        fullName: FullName

        /**
         * SSN of the beneficial owner (numbers only). One of ssn or passport is required.
         */
        ssn?: string

        /**
         * Passport of the beneficial owner. One of ssn or passport is required.
         */
        passport?: string

        /**
         * Always when Passport is populated and optional when SSN is populated.
         * Two letters representing the beneficial owner's nationality.
         * ISO31661-Alpha2 format.
         */
        nationality?: string

        /**
         * Date only (e.g. "2001-08-15").
         * RFC3339 format.
         */
        dateOfBirth: string

        /**
         * The beneficial owner's address.
         */
        address: Address

        /**
         * The beneficial owner's phone number.
         */
        phone: Phone

        /**
         * The beneficial owner's email address.
         */
        email: string

        /**
         * The beneficial owner percentage of ownership at the business (between 25 and 100).
         */
        percentage?: number

        /**
         * Optional. Score (0-1000) for ID theft verification,
         * >900 is auto rejected as default (threshold is configurable).
         */
        idTheftScore?: number
    }
}

// ==========================================
// Create Thread Application Request Types
// ==========================================

/**
 * Base attributes for creating thread applications.
 */
interface BaseCreateThreadApplicationRequestAttributes {
    /**
     * Optional. IP address of the end-customer creating the application.
     */
    ip?: string

    /**
     * See [Tags](https://developers.unit.co/#tags).
     */
    tags?: Tags

    /**
     * See [Idempotency](https://developers.unit.co/#intro-idempotency).
     */
    idempotencyKey?: string

    /**
     * Optional. A list of device fingerprints for fraud and risk prevention.
     */
    deviceFingerprints?: DeviceFingerprint[]

    /**
     * Optional. The products being applied for.
     */
    requestedProducts?: Product[]
}

/**
 * Request to create an Individual Thread Application.
 */
export interface CreateIndividualThreadApplicationRequest {
    type: "individualApplication"

    attributes: {
        /**
         * SSN of the individual (numbers only). Either ssn or passport is required.
         */
        ssn?: string

        /**
         * Passport number of the individual. Either ssn or passport is required.
         */
        passport?: string

        /**
         * Required when passport is provided. Two letters representing the individual nationality.
         * ISO31661-Alpha2 format.
         */
        nationality?: string

        /**
         * Full name of the individual.
         */
        fullName: FullName

        /**
         * Date only (e.g. "2001-08-15").
         * RFC3339 format.
         */
        dateOfBirth: string

        /**
         * Address of the individual.
         */
        address: Address

        /**
         * Optional. The operating address of the individual.
         */
        operatingAddress?: Address

        /**
         * Phone of the individual.
         */
        phone: Phone

        /**
         * Email address of the individual.
         */
        email: string

        /**
         * The primary purpose of the account.
         */
        accountPurpose: AccountPurpose

        /**
         * Required if accountPurpose is Cryptocurrency, CashHeavyPersonalIncome, or InternationalRemittances.
         */
        accountPurposeDetail?: string

        /**
         * The primary source of funds.
         */
        sourceOfFunds: IndividualSourceOfFunds

        /**
         * The expected monthly transaction volume.
         */
        transactionVolume: TransactionVolume

        /**
         * The occupation of the individual.
         */
        profession: Profession

        /**
         * Optional. Evaluation Params for this entity.
         */
        evaluationParams?: EvaluationParams

        /**
         * Optional. See JWT subject documentation for more information.
         */
        jwtSubject?: string
    } & BaseCreateThreadApplicationRequestAttributes
}

/**
 * Request to create a Sole Proprietor Thread Application.
 */
export interface CreateSoleProprietorThreadApplicationRequest {
    type: "individualApplication"

    attributes: {
        /**
         * Set this to true to indicate that the individual is a sole proprietor.
         */
        soleProprietorship: true

        /**
         * SSN of the individual (numbers only). Either ssn or passport is required.
         */
        ssn?: string

        /**
         * Passport number of the individual. Either ssn or passport is required.
         */
        passport?: string

        /**
         * Required when passport is provided. Two letters representing the individual nationality.
         * ISO31661-Alpha2 format.
         */
        nationality?: string

        /**
         * Full name of the individual.
         */
        fullName: FullName

        /**
         * Date only (e.g. "2001-08-15").
         * RFC3339 format.
         */
        dateOfBirth: string

        /**
         * Address of the individual.
         */
        address: Address

        /**
         * Optional. The operating address of the sole proprietor.
         */
        operatingAddress?: Address

        /**
         * Phone of the individual.
         */
        phone: Phone

        /**
         * Email address of the individual.
         */
        email: string

        /**
         * Optional. Employer Identification Number.
         */
        ein?: string

        /**
         * Optional. "Doing business as" name.
         */
        dba?: string

        /**
         * Whether the sole proprietor is incorporated.
         */
        isIncorporated: boolean

        /**
         * Countries where the business operates.
         * Array of ISO31661-Alpha2 strings.
         */
        countriesOfOperation: string[]

        /**
         * A brief description of the business.
         */
        businessDescription: string

        /**
         * The nature of the business's ties to the U.S.
         */
        usNexus: UsNexus[]

        /**
         * The primary purpose of the account.
         */
        accountPurpose: AccountPurpose

        /**
         * Required if accountPurpose is Cryptocurrency, CashHeavyPersonalIncome, or InternationalRemittances.
         */
        accountPurposeDetail?: string

        /**
         * The primary source of funds (uses Business source of funds for sole proprietors).
         */
        sourceOfFunds: BusinessSourceOfFunds

        /**
         * The expected monthly transaction volume.
         */
        transactionVolume: TransactionVolume

        /**
         * The occupation of the individual.
         */
        profession: Profession

        /**
         * Optional. The industry of the business.
         */
        businessIndustry?: BusinessIndustry

        /**
         * Optional. Business website.
         */
        website?: string

        /**
         * Optional. Evaluation Params for this entity.
         */
        evaluationParams?: EvaluationParams

        /**
         * Optional. See JWT subject documentation for more information.
         */
        jwtSubject?: string
    } & BaseCreateThreadApplicationRequestAttributes
}

/**
 * Officer for creating Business Thread Application.
 */
export interface CreateThreadApplicationOfficer {
    /**
     * Full name of the officer.
     */
    fullName: FullName

    /**
     * Officer title. One of CEO, COO, CFO, President, BenefitsAdministrationOfficer,
     * CIO, VP, AVP, Treasurer, Secretary, Controller, Manager, Partner or Member.
     */
    title?: Title

    /**
     * SSN of the officer (numbers only). One of ssn or passport is required.
     * It is optional to provide only last 4 SSN digits.
     */
    ssn?: string

    /**
     * Passport of the officer. One of ssn or passport is required.
     */
    passport?: string

    /**
     * Required when passport is provided and optional when SSN is populated.
     * Two letters representing the officer's nationality.
     * ISO31661-Alpha2 format.
     */
    nationality?: string

    /**
     * Date only (e.g. "2001-08-15").
     * RFC3339 format.
     */
    dateOfBirth: string

    /**
     * Address of the officer.
     */
    address: Address

    /**
     * Phone of the officer.
     */
    phone: Phone

    /**
     * Email address of the officer.
     */
    email: string

    /**
     * Optional. Evaluation Params for this entity.
     */
    evaluationParams?: EvaluationParams
}

/**
 * Beneficial Owner for creating Business Thread Application.
 */
export interface CreateThreadApplicationBeneficialOwner {
    /**
     * Full name of the beneficial owner.
     */
    fullName: FullName

    /**
     * SSN of the beneficial owner (numbers only). One of ssn or passport is required.
     * It is optional to provide only last 4 SSN digits.
     */
    ssn?: string

    /**
     * Passport of the beneficial owner. One of ssn or passport is required.
     */
    passport?: string

    /**
     * Always when Passport is populated and optional when SSN is populated.
     * Two letters representing the beneficial owner's nationality.
     * ISO31661-Alpha2 format.
     */
    nationality?: string

    /**
     * Date only (e.g. "2001-08-15").
     * RFC3339 format.
     */
    dateOfBirth: string

    /**
     * Address of the beneficial owner.
     */
    address: Address

    /**
     * Phone of the beneficial owner.
     */
    phone: Phone

    /**
     * Email address of the beneficial owner.
     */
    email: string

    /**
     * The beneficial owner percentage of ownership at the business (between 25 and 100).
     */
    percentage?: number

    /**
     * Optional. Evaluation Params for this entity.
     */
    evaluationParams?: EvaluationParams
}

/**
 * Request to create a Business Thread Application.
 */
export interface CreateBusinessThreadApplicationRequest {
    type: "businessApplication"

    attributes: {
        /**
         * Name of the business.
         */
        name: string

        /**
         * Optional. "Doing business as" name.
         */
        dba?: string

        /**
         * Address of the business.
         */
        address: Address

        /**
         * Optional. The operating address of the business.
         * Required when the address is of a registered agent or if any beneficial owner or officer is non-US.
         */
        operatingAddress?: Address

        /**
         * Phone number of the business.
         */
        phone: Phone

        /**
         * Two letters representing the US state of incorporation.
         */
        stateOfIncorporation: string

        /**
         * Business EIN (numbers only).
         */
        ein: string

        /**
         * Entity type of the business.
         */
        entityType: ThreadApplicationEntityType

        /**
         * Primary contact of the business.
         */
        contact: {
            fullName: FullName
            email: string
            phone: Phone
            jwtSubject?: string
        }

        /**
         * Officer representing the business.
         */
        officer: CreateThreadApplicationOfficer

        /**
         * Array of beneficial owners in the business.
         */
        beneficialOwners: CreateThreadApplicationBeneficialOwner[]

        /**
         * The primary source of funds of the business.
         */
        sourceOfFunds: BusinessSourceOfFunds

        /**
         * Required if sourceOfFunds is ImportExportRevenue or DonationsOrFundraising.
         */
        sourceOfFundsDescription?: string

        /**
         * The industry of the business.
         */
        businessIndustry: BusinessIndustry

        /**
         * A brief description of the business.
         */
        businessDescription: string

        /**
         * Is the business regulated by a government agency or financial regulator?
         */
        isRegulated: boolean

        /**
         * Required if isRegulated is true. The name of the regulator.
         */
        regulatorName?: string

        /**
         * The nature of the business's ties to the U.S.
         */
        usNexus: UsNexus[]

        /**
         * The primary purpose of the account.
         */
        accountPurpose: AccountPurpose

        /**
         * Required for certain accountPurpose values.
         */
        accountPurposeDetail?: string

        /**
         * The expected monthly transaction volume.
         */
        transactionVolume: TransactionVolume

        /**
         * Required if entityType is PubliclyTradedCorporation.
         */
        stockExchangeName?: string

        /**
         * Required if entityType is PubliclyTradedCorporation.
         */
        stockSymbol?: string

        /**
         * Array of ISO31661-Alpha2 country codes representing countries of operation.
         */
        countriesOfOperation?: string[]

        /**
         * Year of incorporation of the business.
         */
        yearOfIncorporation?: string

        /**
         * Optional. Business's website.
         */
        website?: string
    } & BaseCreateThreadApplicationRequestAttributes
}

/**
 * Union type for all Create Thread Application Requests.
 */
export type CreateThreadApplicationRequest =
    | CreateIndividualThreadApplicationRequest
    | CreateSoleProprietorThreadApplicationRequest
    | CreateBusinessThreadApplicationRequest

// ==========================================
// Update Thread Application Request Types
// ==========================================

/**
 * Request to update a Business Thread Application.
 */
export interface UpdateBusinessThreadApplicationRequest {
    applicationId: string

    data: {
        type: "businessApplication"
        attributes: {
            tags?: Tags
            operatingAddress?: Address
        }
    }
}

/**
 * Request to update a Business Beneficial Owner Thread Application.
 */
export interface UpdateBusinessBeneficialOwnerThreadApplicationRequest {
    beneficialOwnerId: string

    data: {
        type: "beneficialOwner"
        attributes: {
            /**
             * Full name of the beneficial owner.
             */
            fullName?: FullName

            /**
             * SSN of the beneficial owner (numbers only).
             */
            ssn?: string

            /**
             * Passport of the beneficial owner.
             */
            passport?: string

            /**
             * Two letters representing the beneficial owner's nationality.
             */
            nationality?: string

            /**
             * Date only (e.g. "2001-08-15").
             */
            dateOfBirth?: string

            /**
             * The beneficial owner's address.
             */
            address?: Address

            /**
             * The beneficial owner's phone number.
             */
            phone?: Phone

            /**
             * The beneficial owner's email address.
             */
            email?: string

            /**
             * The beneficial owner percentage of ownership (between 25 and 100).
             */
            percentage?: number
        }
        relationships: {
            application: Relationship
        }
    }
}

/**
 * Request to update an Individual Thread Application.
 */
export interface UpdateIndividualThreadApplicationRequest {
    applicationId: string

    data: {
        type: "individualApplication"
        attributes: {
            tags?: Tags
            profession?: Profession
            operatingAddress?: Address
        }
    }
}

/**
 * Request to update a Sole Proprietor Thread Application.
 */
export interface UpdateSoleProprietorThreadApplicationRequest {
    applicationId: string

    data: {
        type: "individualApplication"
        attributes: {
            tags?: Tags
            profession?: Profession
            businessIndustry?: BusinessIndustry
            website?: string
            operatingAddress?: Address
        }
    }
}

/**
 * Request to upgrade an existing Business Application to a Thread Application.
 * @see https://www.unit.co/docs/applications-v2/operations/#update-business
 */
export interface UpgradeToBusinessThreadApplicationRequest {
    applicationId: string

    data: {
        type: "businessApplication"
        attributes: {
            /**
             * Optional. See Updating Tags.
             */
            tags?: Tags

            /**
             * Optional. The primary source of funds of the business.
             */
            sourceOfFunds?: BusinessSourceOfFunds

            /**
             * Optional. Further detail around the source of funds.
             */
            sourceOfFundsDescription?: string

            /**
             * Optional. The industry of the business.
             */
            businessIndustry?: BusinessIndustry

            /**
             * Optional. A brief description of the business, including its main products or services and the customers.
             */
            businessDescription?: string

            /**
             * Optional. Is the business regulated by a government agency or financial regulator?
             */
            isRegulated?: boolean

            /**
             * Optional. The name of the regulator if the business is regulated.
             */
            regulatorName?: string

            /**
             * Optional. The nature of the business's ties to the U.S. Either NotAvailable or one or more of the other options.
             */
            usNexus?: UsNexus[]

            /**
             * Optional. The primary purpose of the account.
             */
            accountPurpose?: BusinessAccountPurpose

            /**
             * Optional. Further detail on the purpose of the account.
             */
            accountPurposeDescription?: string

            /**
             * Optional. The expected monthly transaction volume of the business.
             */
            transactionVolume?: BusinessTransactionVolume

            /**
             * Optional. Further detail around transaction volume selection.
             */
            transactionVolumeDescription?: string

            /**
             * Optional. The name of the stock exchange where the business's stock is traded.
             */
            stockExchangeName?: string

            /**
             * Optional. The stock symbol (ticker) of the business.
             */
            stockSymbol?: string

            /**
             * Optional. The countries in which business is conducted in.
             * Array of ISO31661-Alpha2 strings.
             */
            countriesOfOperation?: string[]

            /**
             * Optional. Year of incorporation of the business.
             */
            yearOfIncorporation?: string

            /**
             * Optional. One of LLC, Partnership, PubliclyTradedCorporation, PrivatelyHeldCorporation,
             * NotForProfitOrganization, Estate, Trust, ForeignFinancialInstitution, DomesticFinancialInstitution,
             * GovernmentEntityOrAgency, ReligiousOrganization, Charity.
             */
            entityType?: ThreadApplicationEntityType

            /**
             * Optional. A valid website URL.
             */
            website?: string
        }
    }
}

/**
 * Request to upgrade an existing Individual Application to a Thread Application.
 * @see https://www.unit.co/docs/applications-v2/operations/#update-individual
 */
export interface UpgradeToIndividualThreadApplicationRequest {
    applicationId: string

    data: {
        type: "individualApplication"
        attributes: {
            /**
             * Optional. See Updating Tags.
             */
            tags?: Tags

            /**
             * Optional. The primary purpose of the account.
             */
            accountPurpose?: IndividualAccountPurpose

            /**
             * Optional. Further detail on the account purpose.
             */
            accountPurposeDescription?: string

            /**
             * Optional. The primary source of funds.
             */
            sourceOfFunds?: IndividualSourceOfFunds

            /**
             * Optional. The expected transaction volume.
             */
            transactionVolume?: IndividualTransactionVolume

            /**
             * Optional. Further detail around transaction volume selection.
             */
            transactionVolumeDescription?: string

            /**
             * Optional. The occupation of the individual.
             */
            profession?: Profession
        }
    }
}

/**
 * Request to upgrade an existing Sole Proprietor Application to a Thread Application.
 * @see https://www.unit.co/docs/applications-v2/operations/#update-sole-proprietor
 */
export interface UpgradeToSoleProprietorThreadApplicationRequest {
    applicationId: string

    data: {
        type: "individualApplication"
        attributes: {
            /**
             * Optional. See Updating Tags.
             */
            tags?: Tags

            /**
             * Optional. Specify the business website here.
             */
            website?: string

            /**
             * Optional. The primary source of funds of the business.
             */
            sourceOfFunds?: BusinessSourceOfFunds

            /**
             * Optional. Further detail on the source of funds.
             */
            sourceOfFundsDescription?: string

            /**
             * Optional. The industry of the sole proprietor.
             */
            businessIndustry?: BusinessIndustry

            /**
             * Optional. Is the business incorporated.
             */
            isIncorporated?: boolean

            /**
             * Optional. Two letters representing a US state.
             */
            stateOfIncorporation?: string

            /**
             * Optional. Year of incorporation of the business.
             */
            yearOfIncorporation?: string

            /**
             * Optional. The countries in which business is conducted in.
             * Array of ISO31661-Alpha2 strings.
             */
            countriesOfOperation?: string[]

            /**
             * Optional. The nature of the business's ties to the U.S. Either NotAvailable or one or more of the other options.
             */
            usNexus?: UsNexus[]

            /**
             * Optional. The expected monthly transaction volume of the business.
             */
            transactionVolume?: SoleProprietorTransactionVolume

            /**
             * Optional. Further detail around transaction volume selection.
             */
            transactionVolumeDescription?: string

            /**
             * Optional. The primary purpose of the account.
             */
            accountPurpose?: IndividualAccountPurpose

            /**
             * Optional. Further detail around the purpose of the account.
             */
            accountPurposeDescription?: string
        }
    }
}

/**
 * Union type for all Update Thread Application Requests.
 */
export type UpdateThreadApplicationRequest =
    | UpdateBusinessThreadApplicationRequest
    | UpdateBusinessBeneficialOwnerThreadApplicationRequest
    | UpdateIndividualThreadApplicationRequest
    | UpdateSoleProprietorThreadApplicationRequest

/**
 * Union type for Upgrade Thread Application Requests.
 */
export type UpgradeToThreadApplicationRequest =
    | UpgradeToBusinessThreadApplicationRequest
    | UpgradeToIndividualThreadApplicationRequest
    | UpgradeToSoleProprietorThreadApplicationRequest

/**
 * Union type for all Thread Application responses.
 */
export type ThreadApplication =
    | IndividualThreadApplication
    | BusinessThreadApplication
