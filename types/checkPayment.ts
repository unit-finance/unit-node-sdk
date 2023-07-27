import { Tags, RelationshipsArray, Relationship } from "./common"
import { BasePaymentRelationships } from "./payments"

export type StopPaymentStatus = "Active" | "Disabled"
export type CheckPaymentStatus = "Processed" | "PendingReview" | "MarkedForReturn" | "Returned"

interface BaseCheckPaymentAttributes {
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
     * The amount (cents) of the check deposit.
     */
    amount: number

    /**
     * The status of the stop payment, one of Active or Disabled.
     */
    status: StopPaymentStatus

    /**
     * The checkNumber of the check payments that the stop payment operation will be applied to.
     */
    checkNumber: string

    /**
     * See [Tags](https://developers.unit.co/#tags).
     */
    tags?: Tags
}

export interface StopPayment {
    id: string

    type: "stopPayment"

    attributes: BaseCheckPaymentAttributes

    relationships: {
        /**
         * The list of CheckPayments that were stopped by this stopPayment.
         */
        stoppedPayments?: RelationshipsArray
        
    } & Omit<BasePaymentRelationships, "transaction">
}

type PendingReviewReasons = "SoftLimit"

export interface CheckPayment {
    id: string

    type: "checkPayment"

    attributes: {
        /**
         * One of Processed, PendingReview, MarkedForReturn, Returned.
         */
        status: CheckPaymentStatus

        /**
         * Description of the Check Payment.
         */
        description: string

        /**
         * Optional.
         */
        onUs?: string

        /**
         * Optional.
         */
        onUsAuxiliary?: string

        /**
         * The routing number of the party that deposited the Check.
         */
        counterpartyRoutingNumber: string

        /**
         * Optional. The reason the Check Payment have been marked for return or returned. See [Check Payment return reasons](https://docs.unit.co/check-payments/#check-payment-return-reasons).
         */
        returnReason?: string

        /**
         * Optional. List of reasons as to why the Check Payment is in pending review status, more reasons may be added in the future, current possible reasons: SoftLimit.
         */
        pendingReviewReasons?: PendingReviewReasons[]

        /**
         * The last time when a return will be accepted using the [return Check Payment endpoint](https://docs.unit.co/check-payments/#return-check-payment).
         */
        returnCutoffTime?: string

        /**
         * One of 'Required', 'NotRequired' or 'Approved', when Requires an additional verification will be required, see [Approve Additional Verification](https://docs.unit.co/check-payments/#approve-additional-verification).
         */
        additionalVerificationStatus: "Required" | "NotRequired" | "Approved"
    } & Omit<BaseCheckPaymentAttributes, "status">

    relationships: BasePaymentRelationships
}

export interface CreateStopPaymentRequest {
    type: "stopPayment",
    attributes: {
        amount: number,
        checkNumber: string,
        tags: Tags
    },
    relationships: {
        account: Relationship
    }
}
