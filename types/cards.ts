import { Address, FullName, Phone, Relationship } from "./core"

export interface IndividualDebitCard {
    /**
     * Identifier of the card resource.
     */
    id: string

    /**
     * Type of the card resource. For individual debit card the value is always individualDebitCard.
     */
    type: 'individualDebitCard'

    /**
     * JSON object representing the card data.
     */
    attributes: {
        /**
         * Date only. The date the resource was created.
         * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
         */
         createdAt: string
         
         /**
          * Last 4 digits of the debit card.
          */
         last4Digits: string
         
         /**
          * Card expiration date, formatted YYYY-MM, e.g "2020-05".
          */
         expirationDate: string

         /**
          * Optional. Shipping address, if specified.
          */
         shippingAddress?: Address

         /**
          * Status of the card, one of: Active, Inactive, Stolen, Lost, Frozen, ClosedByCustomer, SuspectedFraud.
          */
         status: 'Active' | 'Inactive' | 'Stolen' | 'Lost' | 'Frozen' | 'ClosedByCustomer' | 'SuspectedFraud'

         /**
          * Optional. Card design, if specified.
          */
         design?: string
    }

    /**
     * Describes relationships between the card resource and other resources (account and customer).
     */
     relationships: {
        account: Relationship
        customer: Relationship
     }
}

export interface BusinessDebitCard {
    /**
     * Identifier of the card resource.
     */
    id: string

    /**
     * Type of the card resource. For Business debit card the value is always businessDebitCard.
     */
    type: 'businessDebitCard'

    /**
     * JSON object representing the card data.
     */
    attributes: {
        /**
         * Date only. The date the resource was created.
         * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
         */
         createdAt: string
         
         /**
          * Last 4 digits of the debit card.
          */
         last4Digits: string
         
         /**
          * Card expiration date, formatted YYYY-MM, e.g "2020-05".
          */
         expirationDate: string

         /**
          * Optional. Shipping address, if specified.
          */
         shippingAddress?: Address

         /**
          * SSN of the card holder (numbers only). Either an SSN or a passport number is required.
          */
         ssn?: string

         /**
          * Passport number of the card holder. Either an SSN or a passport is required.
          */
         passport?: string

         /**
          * Only when Passport is populated. Two letters representing the card holder nationality. (e.g. “US”).
          * ISO31661-Alpha2 string	
          */	
         nationality?: string

         /**
          * Full name of the card holder.
          */
         fullName: FullName

         /**
          * RFC3339 Date string	Date of birth of the card holder (e.g. "2001-08-15").
          */
         dateOfBirth: string

         /**
          * Address of the card holder.
          */
         address: Address
         
         /**
          * Phone of the card holder.
          */
         phone: Phone

         /**
          * Email address of the card holder.
          */	
         email: string

         /**
          * Status of the card, one of: Active, Inactive, Stolen, Lost, Frozen, ClosedByCustomer, SuspectedFraud.
          */
         status: 'Active' | 'Inactive' | 'Stolen' | 'Lost' | 'Frozen' | 'ClosedByCustomer' | 'SuspectedFraud'

         /**
          * Optional. Card design, if specified.
          */
         design?: string
    }

    /**
     * Describes relationships between the card resource and other resources (account and customer).
     */
     relationships: {
        account: Relationship
        customer: Relationship
     }
}

