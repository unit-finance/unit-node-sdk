import { Tags, RelationshipsArray, Relationship, BaseListParams, Sort, Counterparty, BaseCreateRequestAttributes, CheckPaymentCounterparty } from "./common"
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

type CheckPaymentReturnReason =
  | "NotSufficientFunds"
  | "UncollectedFundsHold"
  | "StopPayment"
  | "ClosedAccount"
  | "UnableToLocateAccount"
  | "FrozenOrBlockedAccount"
  | "StaleDated"
  | "PostDated"
  | "NotValidCheckOrCashItem"
  | "AlteredOrFictitious"
  | "UnableToProcess"
  | "ItemExceedsDollarLimit"
  | "NotAuthorized"
  | "ReferToMaker"
  | "UnusableImage"
  | "DuplicatePresentment"
  | "WarrantyBreach"
  | "UnauthorizedWarrantyBreach"

type DeliveryStatus = "Mailed" | "InLocalArea" | "Delivered" | "Rerouted" | "ReturnedToSender"

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
        returnStatusReason?: CheckPaymentReturnReason

        /**
         * Optional.
         */
        rejectReason?: string

        /**
         * Optional. List of reasons as to why the Check Payment is in pending review status, more reasons may be added in the future, current possible reasons: SoftLimit.
         */
        pendingReviewReasons?: PendingReviewReasons[]

        /**
         * The last time when a return will be accepted using the [return Check Payment endpoint](https://docs.unit.co/check-payments/#return-check-payment).
         * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs 
         */
        returnCutoffTime?: string

        /**
         * One of 'Required', 'NotRequired' or 'Approved', when Requires an additional verification will be required, see [Approve Additional Verification](https://docs.unit.co/check-payments/#approve-additional-verification).
         */
        additionalVerificationStatus: "Required" | "NotRequired" | "Approved"

        /**
         * Optional. One of Mailed, InLocalArea, Delivered, Rerouted, ReturnedToSender. Available once check status is InDelivery
         */
        deliveryStatus?: DeliveryStatus

        /**
         * The date of the last delivery status update.
         * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs 
         */
        trackedAt: string

        /**
         * The location of the last delivery status update.
         */
        postalCode: string

        /**
         * check expiration date, formatted YYYY-MM--DD, e.g "2020-05-01".
         */
        expirationDate?: string

        /**
         * check expected delivery date, formatted YYYY-MM--DD, e.g "2020-05-01".
         */
        expectedDelivery?: string

        /**
         * The date and time in which the check is to be sent.
         * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs 
         */
        sendAt: string

        /**
         * The receiving party of the check.
         */
        counterparty: CheckPaymentCounterparty

        /**
         * Text included on the memo line of the check.
         */
        memo?: string


    } & Omit<BaseCheckPaymentAttributes, "status">

    relationships: BasePaymentRelationships
}

export interface CreateStopPaymentRequest {
    type: "stopPayment"
    attributes: {
        amount: number
        checkNumber: string
        tags: Tags
    }
    relationships: {
        account: Relationship
    }
}

export interface ApproveCheckPaymentRequest {
    id: string

    data: {
        type: "additionalVerification"
    }
}

export interface ReturnCheckPaymentRequest {
    id: string 

    data: {
        type: "checkPaymentReturn"

        attributes: {
            /**
             * The reason for returning the Check Payment. see [valid reasons for Check Payment returns](https://docs.unit.co/check-payments#check-payment-return-reasons) list.
             */
            returnReasonCode: string
        }
    }
}

export interface BaseCheckPaymentListParams extends BaseListParams {
    /**
     * Optional. Filters the results by the specified account id.
     * default: empty
     */
    accountId?: string

    /**
     * Optional. Filters the results by the specified customer id.
     * default: empty
     */
    customerId?: string

    /**
     * Optional. Filter stop payments by Tags.
     */
    tags?: Tags

    /**
     * Optional. Leave empty or provide sort=createdAt for ascending order. Provide sort=-createdAt (leading minus sign) for descending order.
     */
    sort?: Sort

    /**
     * Optional. Filters before the specified date. e.g. 2021-06-01
     */
    since?: string

    /**
     * Optional. Filters after the specified date. e.g. 2021-07-01
     */
    until?: string

    /**
     * Optional. Filters the Stop Payments that have an amount that is higher or equal to the specified amount (in cents). e.g. 5000
     */
    fromAmount?: number

    /**
     * Optional. Filters the Stop Payments that have an amount that is lower or equal to the specified amount (in cents). e.g. 7000 
     */
    toAmount?: number

    /**
     * Optional. Filter Payments by check number (trimming leading zeros).
     */
    checkNumber?: string
}

export interface CreateCheckPaymentRequest extends BaseCreateRequestAttributes {
    type: "checkPayment"

    attributes: {
        /**
         * The amount (in cents).
         */
        amount: number

        /**
         * Optional. Check payment memo (maximum of 40 characters)
         */
        memo?: string

        /**
         * Optional. Date only (e.g. 2022-06-23). The date the check should be sent at. Possible values are between today and 180 days in the future. If null or in the past, will default to today.
         * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
         */
        sendDate?: string

        /**
         * The payee's details . address1 may contain max 50 characters. address2 must be null. country must be "US".
         */
        counterparty: Counterparty
    }

    relationships: {
        /**
         * The [Deposit Account](https://docs.unit.co/deposit-accounts/) originating the payment.
         */
        account: Relationship
    }
}
