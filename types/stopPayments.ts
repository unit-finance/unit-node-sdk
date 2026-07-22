import { Tags, RelationshipsArray, Relationship } from "./common"
import { BasePaymentRelationships } from "./payments"

export type StopPaymentStatus = "Active" | "Disabled"

export interface StopPayment {
    id: string

    type: "stopPayment"

    attributes: {
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
         * The amount (in cents) to look on payments to stop.
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

    relationships: {
        /**
         * The list of CheckPayments that were stopped by this stopPayment.
         */
        stoppedPayments?: RelationshipsArray

    } & Omit<BasePaymentRelationships, "transaction">
}

export interface AchStopPayment {
    id: string

    type: "achStopPayment"

    attributes: {
        /**
         * The date the resource was created.
         * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
         */
        createdAt: string

        /**
         * Optional. The amount (in cents) above which a payment will be stopped.
         */
        minAmount?: number

        /**
         * Optional. The originator name(s) to look for in payments to stop.
         */
        originatorName?: string[]
        /**
         * The direction of the payments to stop. Debit only.
         */
        direction: "Debit"

        /**
         * Optional. Whether the stop payment can stop more than one payment. False by default.
         */
        isMultiUse?: boolean

        /**
         * Optional. Date only (e.g. "2001-08-15").
         */
        expiration?: string

        /**
         * The description of the stop payment (up to 255 characters).
         */
        description: string

        /**
         * The status of the stop payment, one of Active or Disabled.
         */
        status: StopPaymentStatus

        /**
         * See [Tags](https://developers.unit.co/#tags).
         */
        tags?: Tags
    }

    relationships: Omit<BasePaymentRelationships, "transaction">
}

export type StopPaymentResource = StopPayment | AchStopPayment

export interface CreateStopPaymentRequest {
    type: "stopPayment"
    attributes: {
        amount?: number
        checkNumber: string
        tags?: Tags
        idempotencyKey?: string
    }
    relationships: {
        account: Relationship
    }
}

export interface CreateAchStopPaymentRequest {
    type: "achStopPayment"
    attributes: {
        /**
         * Optional. The amount (in cents) above which a payment will be stopped. At least one originatorName or minAmount must be provided.
         */
        minAmount?: number

        /**
         * Optional. The name of the originator of the payment to look for in payments to stop. At least one originatorName or minAmount must be provided.
         */
        originatorName?: string[]

        /**
         * The direction of the payments to stop. Debit only.
         */
        direction: "Debit"

        /**
         * Optional. Date only (e.g. "2001-08-15").
         */
        expiration?: string

        /**
         * Optional. Whether the stop payment can stop more than one payment. False by default.
         */
        isMultiUse?: boolean

        /**
         * The description of the stop payment (up to 255 characters).
         */
        description: string

        /**
         * Optional. See [Tags](https://developers.unit.co/#tags).
         */
        tags?: Tags

        /**
         * Optional. See [Idempotency](https://docs.unit.co/#intro-idempotency).
         */
        idempotencyKey?: string
    }
    relationships: {
        account: Relationship
    }
}

export interface PatchAchStopPaymentRequest {
    type: "achStopPayment"
    attributes: {
        /**
         * Optional. See [Updating Tags](https://docs.unit.co/#updating-tags).
         */
        tags?: Tags

        /**
         * Optional. Date only (e.g. "2026-08-15").
         */
        expiration?: string
    }
}
