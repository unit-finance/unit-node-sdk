import { AxiosInstance } from "axios"

export type Status = "Approved" | "Denied" | "PendingReview"

export type Title = "CEO" | "COO" | "CFO" | "President"

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

export interface Address {
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
    country: string
}

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

export interface Officer {
    /**
     * One of Approved, Denied or PendingReview.
     */
    status?: Status

    /**
     * Full name of the officer.
     */
    fullName: FullName

    /**
     * One of CEO, COO, CFO or President.
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

    /**
     * Date only.
     * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
     */
    dateOfBirth: string

    /**
     * The officer's address.
     */
    address: Address

    /**
     * The officer's phone number.
     */
    phone: Phone

    /**
     * The officer's email address.
     */
    email: string
}

export interface BeneficialOwner {
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
     * Only when Passport is populated. Two letters representing the beneficial owner's nationality.
     * ISO31661 - Alpha2 format. For more information: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
     */
    nationality?: string

    /**
     * Date only.
     * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
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
     * The beneficial owner percentage of ownership at the business.
     */
    percentage?: number
}

export interface BusinessContact {
    /**
     * Full name of the contact.
     */
    fullName: FullName

    /**
     * The contact's email address.
     */
    email: string

    /**
     * The contact's phone number.
     */
    phone: Phone
}

export interface AuthorizedUser {
    /**
     * Full name of the authorized user.
     */
    fullName: FullName

    /**
     * The authorized user's email address.
     */
    email: string

    /**
     * The authorized user's phone number. This number will be used for One Time Password (OTP) authentication.
     */
    phone: Phone
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
}

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
    }

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
        customer: Relationship
    }
}

/**
 * More about [Relationship](https://developers.unit.co/#relationships)
 */
export type Relationship = { data: { type: string; id: string; }; }

export interface UnitResponse<T> {
    data: T
}

export interface Include<T> {
    included?: T
}

export interface UnitConfig {
    axios?: AxiosInstance
}

export class UnitError extends Error {
    // duck typing can be used as a last resort to determine the type of error thrown
    public readonly isUnitError = true

    // https://docs.unit.co/#intro-errors
    public readonly errors: UnitErrorPayload[]

    constructor(errors: UnitErrorPayload[] | UnitErrorPayload) {
        super(Array.isArray(errors) ?  (errors.length === 1 ? errors[0].title : "Unit api client error") : errors.title)
        // restore prototype chain; see:
        // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
        Object.setPrototypeOf(this, new.target.prototype)
        this.name = "UnitError"

        this.errors = Array.isArray(errors) ? errors : [errors]
    }
}

export interface UnitErrorPayload {
    title: string
    status: number
    code?: string
    detail?: string
    details?: string
}
