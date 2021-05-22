import { Address } from "cluster"
import { AuthorizedUser, BusinessContact, FullName, Phone, Relationship, State } from "./core"


export interface Customer {
    /**
     * Identifier of the individual resource.
     */
    id: string

    /**
     * Type of the resource.
     */
    type: 'IndividualCustomer' | 'BusinessCustomer'

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

export interface IndividualCustomer extends Customer {
    /**
     * Type of the resource, the value is always individualCustomer.
     */
    type: 'IndividualCustomer'

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
        nationality: string

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
        * See [Tags](https://developers.unit.co/#tags).
        */
        tags: object
    }
}

export interface BusinessCustomer extends Customer {
    /**
     * Type of the resource, the value is always businessCustomer.
     */
    type: 'BusinessCustomer'

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
         * See [Tags](https://developers.unit.co/#tags).
         * Inherited from the application tags(see [Tag Inheritance](https://developers.unit.co/#tag-inheritance)).
         */
        tags: Object

    }
}

export interface DepositAccount {
    /**
     * Identifier of the deposit account resource.
     */
    id: string

    /**
     * Type of the resource, the value is always depositAccount.
     */
    type: 'depositAccount'

    /**
     * Representing the deposit account data.
     */
    attributes: {
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
          * See [Tags](https://developers.unit.co/#tags).
          */
         tags: Object

         /**
          * Status of the account, either Open or Closed.
          */
         status: string
    }

    /**
     * Describes relationships between the deposit account resource and the customer.
     */
    relationships: {
        /**
         * The customer.
         */
        customer: Relationship
    }
}