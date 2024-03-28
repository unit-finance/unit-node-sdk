import { BaseCreateRequestAttributes, Relationship } from "./common"

type BaseRepaymentRequest = {
    type: string

    attributes: {
        /**
         * Payment description (maximum of 50 characters), also known as Company Entry Description, this will show up on statement of the counterparty.
         */
        description: string
    } & BaseCreateRequestAttributes

    relationships: {
        /**
         * The [Credit Account](https://www.unit.co/docs/api/resources/#credit-account) that the repayment is made against.
         */
        creditAccount: Relationship
    }
}

type BaseBookRepaymentRequest = BaseRepaymentRequest & {
    attributes: {
        /**
         * If this field is populated, its contents will be returned as the [bookTransaction](https://www.unit.co/docs/api/resources/#transaction-book)’s [summary](https://www.unit.co/docs/api/transactions/#transaction-summaries) field (maximum of 100 characters).
         */
        transactionSummaryOverride?: string
    }

    relationships: {
        /**
         * The Deposit Account the repayment funds are taken from.
         */
        counterpartyAccount: Relationship
    }
}

export type BaseCreateBookRepaymentRequest = BaseBookRepaymentRequest & {
    relationships: {
        /**
         * The [Deposit Account](https://www.unit.co/docs/api/deposit-accounts/) the repayment will be deposited to.
         */
        account: Relationship
    }
}

export type BaseCreateCapitalPartnerBookRepaymentRequest = BaseBookRepaymentRequest


type BaseAchRepaymentRequest = BaseRepaymentRequest & {
    attributes: {
        /**
         * Optional, additional payment description (maximum of 80 characters), not all institutions present that.
         */
        addenda?: string
        
        /**
         * 	Optional, default is false. See [Same Day ACH](https://www.unit.co/docs/api/ach-origination/#same-day-ach).
         */
        sameDay?: boolean

        /**
         * Optional. See [Use a custom SEC code](https://www.unit.co/docs/api/ach-origination/#use-a-custom-sec-code).
         */
        secCode?: string
    }

    relationships: { 
        /**
         * The [ACH Counterparty](https://www.unit.co/docs/api/resources/#counterparty-resource) the repayment will come from.
         */
        counterparty: Relationship
    }
}

export type BaseCreateAchRepaymentRequest = BaseAchRepaymentRequest & {
    relationships: {
        /**
        * The [Deposit Account](https://www.unit.co/docs/api/deposit-accounts/) the repayment will be deposited to.
        */
        account: Relationship
    }
}


export type BaseCreateCapitalPartnerAchRepaymentRequest = BaseAchRepaymentRequest