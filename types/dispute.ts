import { Relationship } from "./common"

type DisputeStatus = "InvestigationStarted" | "ProvisionallyCredited" | "Denied" | "ResolvedLost" | "ResolvedWon"



export interface Dispute {
    /**
     * Identifier of the Dispute resource.
     */
    id: string

    /**
     * Type of the Dispute resource. The value is always dispute.
     */
    type: "dispute"

    /**
     * 	JSON object representing the Dispute data.
     */
    attributes: {
        /**
         * One of DebitCard or ACH
         */
        source: "DebitCard" | "ACH"
     
        /**
         * A dispute status list with the status date. Possible statuses are InvestigationStarted, ProvisionallyCredited, Denied, ResolvedLost, ResolvedWon.
         */
        statusHistory: DisputeStatus[]

        /**
         * 	Dispute description.
         */
        description: string

        /**
         * Date only. The date the resource was created.
         * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
         */
        createdAt: string

        /**
         * Optional. The date the resource was updated.
         * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
         */
        updatedAt: string

        /**
         * The amount (cents) of the payment.
         */
        amount: string

        /**
         * Optional. Reason for a ResolvedLost status.
         */
        decisionReason?: string
    }

    /**
     * Describes relationships between the Dispute resource and other resources.
     */
    relationships: {
        /**
         * The [Deposit Account](https://docs.unit.co/deposit-accounts/) creating the payment.
         */
        account: Relationship

        /**
         * The [Customer](https://docs.unit.co/customers/) the deposit account belongs to.
         * This relationship is only available if the account belongs to a single customer, business or individual.
         */
        customer?: Relationship

        /**
         * The transaction the resource belongs to.
         */
        transaction: Relationship
    }
}