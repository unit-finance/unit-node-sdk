import { BatchRelease } from "../types/batchAccount"
import { Address, Relationship, UnitConfig, UnitResponse } from "../types/common"
import { BaseResource } from "./baseResource"

export class BatchAccounts extends BaseResource {
    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/batch-releases", config)
    }

    public async create(request: CraeteBatchReleaseRequest): Promise<UnitResponse<BatchRelease>> {
        return this.httpPost<UnitResponse<BatchRelease>>("", { data: request })
    }
}

export interface CraeteBatchReleaseRequest {
    type: "batchRelease"
    attributes: {
        /**
         * The amount (in cents) to move from the batch account to the receiver account.
         */
        amount: number

        /**
         * Description of the payment (maximum of 50 characters).
         */
        description: string

        /**
         * string	Sender name for the payment (maximum of 255 characters).
         */
        senderName: string

        /**
         * Address	Sender address for the payment.
         */
        senderAddress: Address

        /**
         * A unique identifier for the sender of the payment (maximum of 17 characters). As an example, when the payment comes from a card processor, this identifier may be set to the BIN followed by the last four digits of the card used.
         */
        senderAccountNumber: string

        /**
         * See Tags will be passed to the related Release Transaction.
         */
        tags?: object
    }

    /**
     * Describes relationships
     */
    relationships:{
        /**
         * The batch account to release the funds from.
         */
        batchAccount: Relationship

        /**
         * The receiver account to release the funds to.
         */
        receiver: Relationship
    }
}
