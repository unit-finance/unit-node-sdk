import { Account, Customer, Transaction } from "../types"
import { Include, UnitConfig, UnitResponse } from "../types/common"
import { CreateRewardRequest, Reward, RewardListParams } from "../types/rewards"
import { BaseResource } from "./baseResource"

export class Rewards extends BaseResource {
    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/rewards", config)
    }

    public async create(request: CreateRewardRequest): Promise<UnitResponse<Reward>> {
        return this.httpPost<UnitResponse<Reward>>("", { data: request })
    }

    /**
     * Optional. A comma-separated list of related resources to include in the response.
     * Related resources include: customer, account, transaction. See [Getting Related Resources](https://developers.unit.co/about-jsonapi/#intro-getting-related-resources)
     */
    public async get(id: string, include?: string): Promise<UnitResponse<Reward> & Include<Account[] | Customer[] | Transaction[]>> {
        const params = {...(include && { include })}
        return this.httpGet<UnitResponse<Reward> & Include<Account[] | Customer[] | Transaction[]>>(`/${id}`, { params })
    }
    
    public async list(params?: RewardListParams): Promise<UnitResponse<Reward[]> & Include<Account[] | Customer[] | Transaction[]>> {
        const parameters: any = {
            "page[limit]": (params?.limit ? params.limit : 100),
            "page[offset]": (params?.offset ? params.offset : 0),
            ...(params?.transactionId && { "filter[transactionId]": params.transactionId }),
            ...(params?.rewardedTransactionId && { "filter[rewardedTransactionId]": params.rewardedTransactionId }),
            ...(params?.receivingAccountId && { "filter[receivingAccountId]": params.receivingAccountId }),
            ...(params?.customerId && { "filter[customerId]": params.customerId }),
            ...(params?.cardId && { "filter[cardId]": params.cardId }),
            ...(params?.tags && { "filter[tags]": params.tags }),
            ...(params?.since && { "filter[since]": params.since }),
            ...(params?.until && { "filter[until]": params.until }),
            "sort": params?.sort ? params.sort : "-createdAt",
            "include": params?.include ? params.include : ""
        }

        if (params?.status)
            params.status.forEach((s, idx) => {
                parameters[`filter[status][${idx}]`] = s
            })

        return this.httpGet<UnitResponse<Reward[]> & Include<Account[] | Customer[] | Transaction[]>>("", { params: parameters })
    }

}
