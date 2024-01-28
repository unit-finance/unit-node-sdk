import { Relationship } from "./common"

export interface TaxForm {
    /**
     * Identifier of the tax form resource.
     */
    id: string

    /**
     * Type of the tax form resource. The value is always taxForm.
     */
    type: "taxForm"

    /**
     * JSON object representing the tax form data.
     */
    attributes: {
        /**
         * the type of the tax form.
         */
        formType: string

        /**
         * The tax year of the form, formatted YYYY, e.g "2020".
         * [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) Year string
         */
        taxYear: string
    }

    /**
     * Describes relationships between the tax form resource and other resources (account and customer).
     */
    relationships: {
        /**
         * The account for which the tax form was produced.
         * Available only if the customer for which the form was produced for owns a single account.
         */
        account?: Relationship

        /**
         * The accounts for which the tax form was produced.
         * Only available if the customer for which the tax form was produced owns multiple accounts.
         */
        accounts?: Relationship

        /**
         * The [Customer](https://unit.co/docs/api/customers/) the deposit account belongs to.
         */
        customer: Relationship
    }
}