import { CreateDebitCardRequest, DebitCard } from "../types/cards";
import { UnitResponse, UnitError, Address, Include } from "../types/core";
import { Customer } from "../types/customer";
import { DepositAccount } from "../types/depositAccount";
import { BaseResource } from "./baseResource";

export class Cards extends BaseResource {

    constructor(token: string, basePath: string) {
        super(token, basePath + '/cards');
    }

    public async createDebitCard(request: CreateDebitCardRequest): Promise<UnitResponse<DebitCard> | UnitError> {
        return await this.httpPost<UnitResponse<DebitCard>>('', { data: request })
    }

    public async reportStolen(cardId: number): Promise<UnitResponse<DebitCard> | UnitError> {
        const path = `/${cardId}/report-stolen`
        return await this.httpPost<UnitResponse<DebitCard>>(path, {})
    }

    public async reportLost(cardId: number): Promise<UnitResponse<DebitCard> | UnitError> {
        const path = `/${cardId}/report-lost`
        return await this.httpPost<UnitResponse<DebitCard>>(path, {})
    }

    public async closeCard(cardId: number): Promise<UnitResponse<DebitCard> | UnitError> {
        const path = `/${cardId}/close`
        return await this.httpPost<UnitResponse<DebitCard>>(path, {})
    }

    public async freeze(cardId: number): Promise<UnitResponse<DebitCard> | UnitError> {
        const path = `/${cardId}/freeze`
        return await this.httpPost<UnitResponse<DebitCard>>(path, {})
    }

    public async unfreeze(cardId: number): Promise<UnitResponse<DebitCard> | UnitError> {
        const path = `/${cardId}/unfreeze`
        return await this.httpPost<UnitResponse<DebitCard>>(path, {})
    }

    /**
     * @param cardId 
     * @param shippingAddress - Address to ship the card to. Optional, if not specified, the address provided during card creation is reused.
     */
    public async replace(cardId: number, shippingAddress: Address): Promise<UnitResponse<DebitCard> | UnitError> {
        const path = `/${cardId}/replace`
        const data = {
            type: "replaceCard",
            attributes: {
                shippingAddress: shippingAddress
            }
        }

        return await this.httpPost<UnitResponse<DebitCard>>(path, { data })
    }

    /**
     * @param cardId 
     * @param include - Optional. A comma-separated list of related resources to include in the response.
     * Related resources include: customer, account. See [Getting Related Resources](https://developers.unit.co/#intro-getting-related-resources).
     */
    public async get(cardId: number, include: string = ''): Promise<UnitResponse<DebitCard> | UnitError> {
        const path = `/${cardId}?include=${include}`

        return await this.httpGet<UnitResponse<DebitCard> & Include<DepositAccount[] | Customer[]>>(path, {})
    }

    public async list(params: CardListParams): Promise<UnitResponse<DebitCard> & Include<DepositAccount[] | Customer[]> | UnitError> {
        var parameters = {
            'page[limit]': (params.limit ? params.limit : 100),
            'page[offset]': (params.offset ? params.offset : 0),
            ...(params.accountId && { 'filter[accountId]': params.accountId }),
            ...(params.customerId && { 'filter[customerId]': params.customerId }),
            ...(params.include && { 'include': params.include })
        }

        return this.httpGet<UnitResponse<DebitCard> & Include<DepositAccount[] | Customer[]>>('', { params: parameters })
    }

}

interface CardListParams {
    /**
     * Maximum number of resources that will be returned. Maximum is 1000 resources. See Pagination.
     * default: 100
     */
    limit?: number,

    /**
     * Number of resources to skip. See Pagination.
     * default: 0
     */
    offset?: number,

    /**
     * Optional. Filters the results by the specified account id.
     * default: empty
     */
    accountId?: string,

    /**
     * Optional. Filters the results by the specified customer id.
     * default: empty
     */
    customerId?: string,

    /**
     * Optional. A comma-separated list of related resources to include in the response. Related resources include: customer, account. See Getting Related Resources
     * default: empty
     */
    include?: string
}
