import { Relationship, Tags } from "./common"

export type BillStatus =
    | "Draft"
    | "Pending"
    | "Scheduled"
    | "Paid"
    | "PaymentInProgress"
    | "FundsPushed"
    | "DeductionPaymentFailed"
    | "VendorPaymentFailed"
    | "RefundInitiated"
    | "Refunded"
    | "CancellationInitiated"
    | "Canceled"
    | "Archived"

export interface BillLineItem {
    /**
     * Optional. Reference identifier for the line item.
     */
    reference?: string

    /**
     * Optional. Description of the line item.
     */
    description?: string

    /**
     * Optional. Category identifier for the line item.
     */
    categoryId?: string

    /**
     * Quantity of the line item.
     */
    quantity: number

    /**
     * Unit price of the line item in cents.
     */
    unitPrice: number
}

export interface PlatformPaymentMethod {
    /**
     * Date only. The deduction date.
     * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
     */
    deductionDate?: string

    /**
     * Date only. The expected payment date.
     * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
     */
    expectedDate?: string

    /**
     * Optional. Fee amount in cents. Positive values represent fees, negative values represent rebates.
     */
    feeAmount?: number
}

export interface ExternalPaymentMethod {
    /**
     * Date only. The date the payment was made.
     * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
     */
    paymentDate?: string
}

export type BillPaymentMethod =
    | { ach: PlatformPaymentMethod; }
    | { sameDayAch: PlatformPaymentMethod; }
    | { check: PlatformPaymentMethod; }
    | { wire: PlatformPaymentMethod; }
    | { external: ExternalPaymentMethod; }

export interface Bill {
    /**
     * Identifier of the bill resource.
     */
    id: string

    /**
     * Type of the bill resource. The value is always bill.
     */
    type: "bill"

    /**
     * JSON object representing the bill data.
     */
    attributes: {
        /**
         * One of Draft, Pending, Scheduled, Paid, PaymentInProgress, FundsPushed, DeductionPaymentFailed,
         * VendorPaymentFailed, RefundInitiated, Refunded, CancellationInitiated, Canceled, Archived.
         */
        status: BillStatus

        /**
         * Version of the bill resource.
         */
        version: number

        /**
         * The date and time the resource was created.
         * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
         */
        createdAt: string

        /**
         * The date and time the resource was last updated.
         * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
         */
        updatedAt: string

        /**
         * Optional. ISO 4217 currency code (e.g. "USD").
         */
        currency?: string

        /**
         * Optional. Line items that make up the bill.
         */
        lineItems?: BillLineItem[]

        /**
         * Date only. The date of the bill.
         * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
         */
        billDate?: string

        /**
         * Date only. The due date of the bill.
         * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
         */
        dueDate?: string

        /**
         * Optional. Invoice number for the bill.
         */
        invoiceNumber?: string

        /**
         * Optional. Description of the bill.
         */
        description?: string

        /**
         * Optional. Tax percentage applied to the bill (0-100).
         */
        tax?: number

        /**
         * Optional. Total amount of the bill in cents.
         */
        total?: number

        /**
         * Optional. The payment method used or scheduled for this bill.
         */
        paymentMethod?: BillPaymentMethod | null

        /**
         * Optional. See [Tags](https://developers.unit.co/#tags).
         */
        tags?: Tags

        /**
         * Optional. Reason for payment failure, present when status is DeductionPaymentFailed or VendorPaymentFailed.
         */
        failureReason?: string
    }

    /**
     * Describes relationships between the bill resource and other resources.
     */
    relationships: {
        /**
         * The organization this bill belongs to.
         */
        org: Relationship

        /**
         * Optional. The vendor this bill is for.
         */
        vendor?: Relationship

        /**
         * Optional. The customer associated with this bill.
         */
        customer?: Relationship

        /**
         * Optional. The uploaded bill file.
         */
        billFile?: Relationship

        /**
         * Optional. The fee associated with this bill.
         */
        fee?: Relationship

        /**
         * Optional. The payment associated with this bill.
         */
        payment?: Relationship

        /**
         * Optional. The linked account for this bill.
         */
        linkedAccount?: Relationship
    }
}
