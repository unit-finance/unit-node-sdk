import { Relationship } from "./common"

export enum DisputeStatusHistory {
    InvestigationStarted, ProvisionallyCredited, Denied, ResolvedLost, ResolvedWon
}

export interface Dispute {
    /**
     * 	Identifier of the Dispute resource.
     */
    id: string

    /**
     * Type of the Dispute resource. The value is always dispute.
     */
    type: "dispute"

    /**
     * JSON object representing the Dispute data.
     */
    attributes: {
        /**
         * One of DebitCard or ACH
         */
        source: "DebitCard" | "ACH"	

        /**
         * One of source
         */
        status: string	

        /**
         * A dispute status list with the status date. Possible statuses are InvestigationStarted, ProvisionallyCredited, Denied, ResolvedLost, ResolvedWon.
         */
        statusHistory: DisputeStatusHistory[]

        /**
         * Dispute description.
         */
        description: string

        /**
         * The date the resource was created.
         */
        createdAd: string

        /**
         * The amount (cents) of the payment.
         */
        amount: number

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
         * The Deposit Account creating the payment.
         */
        account: Relationship
        
        /**
         * Optional, JSON:API Relationship	The Customer the deposit account belongs to.
         * This relationship is only available if the account belongs to a single customer, business or individual.
         */
        customer?: Relationship

        /**
         * The transaction the resource belongs to.
         */
        transaction: Relationship
    }
}

export interface DisputeListParams {
    /**
     * Optional. Maximum number of resources that will be returned. Maximum is 1000 resources. See Pagination.
     * default: 100
     */
    limit?: number

    /**
     * Optional. Number of resources to skip. See Pagination.
     * default: 0
     */
    offset?: number

    /**
     * Optional. Search term according to the Full-Text Search Rules.
     */
    query?: string
}

