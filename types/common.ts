import axiosStatic, { AxiosInstance } from "axios"

export interface UnimplementedFields {
    /**
     * Support arbitrary keys (to make this type useful even when it has drifted from the real implementation)
     */
    [k: string]: unknown
}
export interface UnimplementedRelationships {
    /**
     * Support arbitrary keys (to make this type useful even when it has drifted from the real implementation)
     */
    [k: string]: Relationship | RelationshipsArray | undefined
}

export interface BaseListParams extends UnimplementedFields {
    /**
     * Maximum number of resources that will be returned. Maximum is 1000 resources. See Pagination.
     * default: 100
     */
    limit?: number

    /**
     * Number of resources to skip. See Pagination.
     * default: 0
     */
    offset?: number

    [k: string]: unknown
}

/**
 * See [Tags](https://developers.unit.co/#tags).
 * Inherited from the payment tags (see [Tag Inheritance](https://developers.unit.co/#tag-inheritance)).
 */
export type Tags = Record<string, string | null>

export type Status = "Approved" | "Denied" | "PendingReview"

export type Title = "CEO" | "COO" | "CFO" | "President" | "BenefitsAdministrationOfficer" | "CIO" | "VP" | "AVP" | "Treasurer" | "Secretary" | "Controller" | "Manager" | "Partner" | "Member"

export type State = "AL" | "AK" | "AZ" | "AR" | "CA" | "CO" | "CT" | "DE" | "FL" | "GA" | "HI" | "ID" | "IL" | "IN" | "IA" | "KS" | "KY" | "LA" | "ME" | "MD" | "MA" | "MI" | "MN" | "MS" | "MO" | "MT" | "NE" | "NV" | "NH" | "NJ" | "NM" | "NY" | "NC" | "ND" | "OH" | "OK" | "OR" | "PA" | "RI" | "SC" | "SD" | "TN" | "TX" | "UT" | "VT" | "VA" | "WA" | "WV" | "WI" | "WY"
    | "AS" // American Samoa
    | "DC" // District of Columbia
    | "FM" // Federated States of Micronesia
    | "GU" // Guam
    | "MH" // Marshall Islands
    | "MP" // Northern Mariana Islands
    | "PW" // Palau
    | "PR" // Puerto Rico
    | "VI" // Virgin Islands

export interface FullName {
    /**
     * 	Individual first name.
     */
    first: string

    /**
     * 	Individual last name.
     */
    last: string
}

export interface UsAddress {
    /**
     * First line of an address.
     */
    street: string

    /**
     * Optional. Second line of an address.
     */
    street2?: string

    /**
     * City
     */
    city: string

    /**
     * Two letters representing the state. Only required for US addresses.
     */
    state?: State

    /**
     * Postal code.
     */
    postalCode: string

    /**
     * Two letters representing the country.
     * ISO31661 - Alpha2 format. For more information: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
     */
    country: "US"
}

export interface InternationalAddress {
    street: string
    street2?: string
    city: string
    state?: string
    postalCode: string
    country: string
}

export type Address = UsAddress | InternationalAddress

export interface Phone {
    /**
     * Country code of the phone number.
     */
    countryCode: string

    /**
     * The phone number without the country code.
     */
    number: string
}

export interface BaseContactAttributes extends UnimplementedFields {
    fullName: FullName
    ssn?: string
    /**
     * Date only. RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
     */
    dateOfBirth: string
    address: Address
    phone: Phone
    email: string
}

export interface Officer extends BaseContactAttributes {
    /**
     * One of Approved, Denied or PendingReview.
     */
    status?: Status

    /**
     * One of CEO, COO, CFO, President, BenefitsAdministrationOfficer, CIO, VP, AVP, Treasurer, Secretary, Controller, Manager, Partner or Member
     */
    title?: Title

    /**
     * SSN of the officer (numbers only). One of ssn or passport is required.
     */
    ssn?: string

    /**
     * Passport of the beneficial owner. One of ssn or passport is required.
     */
    passport?: string

    /**
     * Only when Passport is populated. Two letters representing the officer's nationality.
     * ISO31661 - Alpha2 format. For more information: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
     */
    nationality?: string
}


export type BusinessContact = {
    /**
    * Optional. See (this)[https://docs.unit.co/customer-api-tokens/#customers-create-customer-bearer-token-jwt] section for more information.
    */
    jwtSubject?: string
} & Pick<BaseContactAttributes, "fullName" | "email" | "phone">

export type AuthorizedUser = Pick<BaseContactAttributes, "fullName" | "email" | "phone"> & {
    /**
     * Optional. See (this)[https://docs.unit.co/customer-api-tokens/#customers-create-customer-bearer-token-jwt] section for more information.
     */
    jwtSubject?: string
}

export interface Counterparty {
    /**
     * Valid 9-digit ABA routing transit number.
     */
    routingNumber: string

    /**
     * Bank account number.
     */
    accountNumber: string

    /**
     * Either Checking or Savings.
     */
    accountType: string

    /**
     * Name of the person or company that owns the bank account.
     */
    name: string

    /**
     * Optional. See (this)[https://docs.unit.co/customer-api-tokens/#customers-create-customer-bearer-token-jwt] section for more information.
     */
    jwtSubject?: string
}

export interface WireCounterparty extends Pick<Counterparty, "routingNumber" | "accountNumber" | "name"> {
    /**
     * Address of the person or company that owns the bank account.
     */
    address: Address
}

export type CheckCounterparty = Pick<Counterparty, "routingNumber" | "accountNumber" | "name">

export interface Coordinates {
    /**
     * The longitude value.
     */
    longitude: number

    /**
     * The latitude value.
     */
    latitude: number
}

export interface Statement {
    /**
     * Identifier of the statement resource.
     */
    id: string

    /**
     * Type of the statement resource. The value is always statement.
     */
    type: "statement"

    /**
     * JSON object representing the statement data.
     */
    attributes: {
        /**
         * Period of the statement, formatted YYYY-MM, e.g "2020-05".
         */
        period: string
    } & UnimplementedFields

    /**
     * Describes relationships between the statement resource and other resources (account and customer).
     */
    relationships: {
        /**
         * The account for which the statement was produced.
         */
        account: Relationship

        /**
         * The individual or business customer the account belongs to.
         */
        customer?: Relationship

        /**
         * The list of Customers the deposit account belongs to. This relationship is only available if the account belongs to multiple individual customers.
         */
        customers?: RelationshipsArray
    } & UnimplementedRelationships
}

type R = { type: string; id: string; }

/**
 * More about [Relationship](https://developers.unit.co/#relationships)
 */
export type Relationship = { data: R; }

export type RelationshipsArray = { data: RelationshipsArrayData; }

export type RelationshipsArrayData = Array<R>

/**
 * More about [DeviceFingerprint](https://developers.unit.co/types#devicefingerprint)
 */
export interface DeviceFingerprint {
    /**
     * Provider of the device fingerprint fraud and risk prevention. The value is always iovation
     */
    provider: string

    /**
     * The device fingerprint blackbox value.
     */
    value: string
}

/**
 * More about [Agent](https://docs.unit.co/types/#agent)
 */
export interface Agent extends BaseContactAttributes {
    /**
     * One of Approved, Denied or PendingReview.
     */
    status: Status

    /**
     * Passport of the agent. One of ssn or passport is required.
     */
    passport?: string

    /**
     * ISO31661-Alpha2 string	Only when Passport is populated. Two letters representing the agent's nationality.
     */
    nationality?: string

    /**
     * Optional. See [this](https://docs.unit.co/customer-api-tokens/#customers-create-customer-bearer-token-jwt) section for more information.
     */
    jwtSubject?: string
}

export interface Merchant {
    /**
     * The name of the merchant.
     */
    name?: string

    /**
     * The 4-digit ISO 18245 merchant category code (MCC).
     */
    type?: number

    /**
     * The merchant category, described by the MCC code (see [this reference](https://github.com/greggles/mcc-codes) for the list of category descriptions).
     */
    category?: string

    /**
     * Optional. The location (city, state, etc.) of the merchant.
     */
    location?: string

    /**
     * Optional. The unique network merchant identifier.
     */
    id?: string

}

export interface HealthcareAmounts {
    /**
     * Dental expense (cents).
     */
    dentalAmount: number

    /**
     * Transit expense (cents).
     */
    transitAmount: number

    /**
     * Vision expense (cents).
     */
    visionOpticalAmount: number

    /**
     * Prescription drugs expense (cents).
     */
    prescriptionRXAmount: number

    /**
     * Misc medical expense (cents).
     */
    clinicOtherQualifiedMedicalAmount: number

    /**
     * Total medical expense (cents).
     */
    totalHealthcareAmount: number
}

export interface EvaluationParams {
    /**
     * Optional. Decide when to request a selfie verification document
     */
    useSelfieVerification?: "Never" | "ReplaceIdentification" | "Always"

    /**
     * Optional, default to false. Decide whether to require an ID verification regardless of evaluation response
     */
    requireIdVerification?: boolean
}

export type Grantor = BaseContactAttributes

export type Beneficiary = Pick<BaseContactAttributes, "fullName" | "dateOfBirth">

export type Trustee = BaseContactAttributes

export interface TrustContact extends Pick<BaseContactAttributes, "fullName" | "email" | "phone" | "address"> {
    /**
     * Optional. See (this)[https://docs.unit.co/customer-api-tokens/#customers-create-customer-bearer-token-jwt] section for more information.
     */
    jwtSubject?: string
}

export type Industry = "Retail" | "Wholesale" | "Restaurants" | "Hospitals" | "Construction" | "Insurance" | "Unions" | "RealEstate" |
    "FreelanceProfessional" | "OtherProfessionalServices" | "OnlineRetailer" | "OtherEducationServices"

export type Direction = "Credit" | "Debit"

export type CardNetwork = "Visa" | "Interlink" | "Accel" | "Allpoint" | "Other"

export interface RichMerchantData {
    logo?: string // URL of the merchant's logo.
    phone?: string // Phone number of the merchant.
    categories?: Array<{ name: string; icon: string; }> // Array of categories the merchant belongs to (from the least specific to the most specific).
    address?: { city: string; state: string; country: string; street?: string; } // Address of the merchant.
    coordinates?: Coordinates // Coordinates (latitude, longitude) of the merchant.
    facilitators?: Array<RichMerchantDataFacilitator> // The transaction facilitators.
}

export interface RichMerchantDataFacilitator {
    name: string // Name of the facilitator.
    type?: "BuyNowPayLater" | "DeliveryService" | "Marketplace" | "PaymentProcessor" | "Platform" | "PointOfSale" // Optional. Type of the facilitator.
    logo?: string // Optional. URL of the facilitator.
}

export interface CurrencyConversion {
    originalCurrency: string // ISO 4217 currency code of original currency.
    amountInOriginalCurrency: number // The amount in original currency in 'cents' (i.e. 50 euros will be written 5000)
    fxRate?: string // Optional. The conversion rate for the currency conversion to USD.
}

export interface UnitResponse<T> {
    data: T
}

export type NoContent = ""

export interface Include<T> {
    included?: T
}

export interface Meta extends UnimplementedFields {
    /**
     * JSON object that contains pagination data
     */
    meta: {
        pagination: {
            total: number
            limit: number
            offset: number
        }
    }
}

export interface BaseCreateRequestAttributes {
    /**
     * See [Tags](https://developers.unit.co/#tags).
     */
    tags?: Tags

    /**
     * See [Idempotency.](https://developers.unit.co/#intro-idempotency)
     */
    idempotencyKey?: string
}

export interface UnitConfig {
    axios?: AxiosInstance
    sdkUserAgent?: boolean
    securePath?: string
}

/**
 * https://docs.unit.co/types/#push-to-card-configuration
 */
export interface PushToCardConfiguration {
    astra: {
        authToken: string
        debitFeePercent?: number
        institutionId: string
        destinationCardId: string
        routingNumber: number
        accountNumber: number
        referenceId: string
    }
}

export class UnitError extends Error {
    public readonly isUnitError = true

    // preserve the underlying object used to parse a UnitError
    public readonly underlying: any
    public readonly errors: UnitErrorPayload[]

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor(message: string, underlying?: any, errors?: UnitErrorPayload[]) {
        super(message)
        this.name = "UnitError"
        Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain

        this.underlying = underlying
        this.errors = errors ?? []
    }
}

// https://docs.unit.co/#intro-errors
export interface UnitErrorPayload {
    status: string // http status code
    title: string
    code?: string
    detail?: string // to be deprecated
    details?: string
    meta?: { supportId?: string; }
    source?: { pointer: string; }
    [k: string]: unknown // allow for other keys
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const extractUnitError = (underlying: any): UnitError => {
    // for now, we only support extracting a UnitError from an axios error
    if (!underlying || !axiosStatic.isAxiosError(underlying) || !underlying.response) {
        return new UnitError("Unknown Error", underlying)
    }

    let message = `${underlying.response.status} - ${underlying.response.statusText ?? "Error"}`
    const errors = underlying.response.data?.errors

    if (!isValidUnitErrorsArray(errors)) {
        return new UnitError(message, underlying)
    }

    if (errors.length === 1) {
        message = `${errors[0].status} - ${errors[0].title}`
    }

    return new UnitError(message, underlying, errors)
}

const isValidUnitErrorsArray = (errors: any): errors is UnitErrorPayload[] => {
    if (errors && Array.isArray(errors)) {
        let isValidErrorsArray = true
        for (let i = 0; i < errors.length; i++) {
            const error = errors[i]
            if (!error.hasOwnProperty("title") || !error.hasOwnProperty("status")) {
                isValidErrorsArray = false
                break
            }
        }

        return isValidErrorsArray
    }

    return false
}
