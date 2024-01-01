import { BaseResource } from "."
import { AtmAuthorizationRequest, CardTransactionAuthorizationRequest, CheckPayment, CreateAtmAuthorizationRequest, CreateCardPurchaseAuthorizationRequest, CreateCardTransactionAuthorizationRequest, CreateCheckPaymentSimulation, PurchaseAuthorizationRequest, UnitConfig, UnitResponse } from "../types"
import { AchReceivedPayment, Application, ApplicationDocument, AchPayment } from "../types"
import {
    ApproveApplicationSimulation,
    DenyApplicationSimulation,
    RejectDocumentSimulation,
    CreateAchReceivedPaymentSimulation,
    ReceiveAchPaymentSimulation,
    CreateCardPurchaseSimulation,
    CreateCardAuthorizationSimulation,
    IncreaseCardAuthorizationSimulation,
    CancelCardAuthorizationSimulation,
    CardTransaction,
} from "../types"

export class Simulations extends BaseResource {
    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/sandbox", config)
    }

    public async approveApplication(
        applicationId: string,
        request: ApproveApplicationSimulation
    ): Promise<UnitResponse<Application>> {
        return this.httpPost<UnitResponse<Application>>(
            `/applications/${applicationId}/approve`,
            {
                data: request,
            }
        )
    }

    public async denyApplication(
        applicationId: string,
        request: DenyApplicationSimulation
    ): Promise<UnitResponse<Application>> {
        return this.httpPost<UnitResponse<Application>>(
            `/applications/${applicationId}/deny`,
            {
                data: request,
            }
        )
    }

    public async approveDocument(
        applicationId: string,
        documentId: string
    ): Promise<UnitResponse<ApplicationDocument>> {
        return this.httpPost<UnitResponse<ApplicationDocument>>(
            `/applications/${applicationId}/documents/${documentId}/approve`,
            undefined
        )
    }

    public async rejectDocument(
        applicationId: string,
        documentId: string,
        request: RejectDocumentSimulation
    ): Promise<UnitResponse<ApplicationDocument>> {
        return this.httpPost<UnitResponse<ApplicationDocument>>(
            `/applications/${applicationId}/documents/${documentId}/reject`,
            {
                data: request,
            }
        )
    }

    public async receiveAchPayment(
        request: ReceiveAchPaymentSimulation
    ): Promise<UnitResponse<AchPayment>> {
        return this.httpPost<UnitResponse<AchPayment>>(
            "/payments",
            {
                data: request,
            }
        )
    }

    public async createAchReceivedPayment(
        request: CreateAchReceivedPaymentSimulation
    ): Promise<UnitResponse<AchReceivedPayment>> {
        return this.httpPost<UnitResponse<AchReceivedPayment>>(
            "/received-payments",
            {
                data: request,
            }
        )
    }

    public async completeAchReceivedPayment(
        id: string,
    ): Promise<UnitResponse<AchReceivedPayment>> {
        return this.httpPost<UnitResponse<AchReceivedPayment>>(
            `/received-payments/${id}/complete`,
        )
    }

    public async createCheckPayment(request: CreateCheckPaymentSimulation): Promise<UnitResponse<CheckPayment>> {
        return this.httpPost<UnitResponse<CheckPayment>>("/check-payments", { data: request} )
    }
    
    public async createCardPurchase(
        request: CreateCardPurchaseSimulation
    ): Promise<UnitResponse<CardTransaction>> {
        return this.httpPost<UnitResponse<CardTransaction>>("/purchases", {
            data: request,
        })
    }

    public async createCardAuthorization(
        request: CreateCardAuthorizationSimulation
    ): Promise<UnitResponse<CardTransaction>> {
        return this.httpPost<UnitResponse<CardTransaction>>("/authorizations", {
            data: request,
        })
    }
    
    public async increaseCardAuthorization(
        request: IncreaseCardAuthorizationSimulation,
        authorizationId: string
    ): Promise<UnitResponse<CardTransaction>> {
        return this.httpPost<UnitResponse<CardTransaction>>(
            `/authorizations/${authorizationId}/increase`,
            {
                data: request,
            }
        )
    }
    
    public async cancelCardAuthorization(
        request: CancelCardAuthorizationSimulation,
        authorizationId: string
    ): Promise<UnitResponse<CardTransaction>> {
        return this.httpPost<UnitResponse<CardTransaction>>(
            `/authorizations/${authorizationId}/cancel`,
            {
                data: request,
            }
        )
    }

    public async createCardTransactionAuthorizationRequest(
        request: CreateCardTransactionAuthorizationRequest
    ): Promise<UnitResponse<CardTransactionAuthorizationRequest>> {
        return this.httpPost<UnitResponse<CardTransactionAuthorizationRequest>>(
            'authorization-requests/card-transaction',
            {
                data: request
            }
        )
    }

    public async createCardPurchaseAuthorizationRequest(
        request: CreateCardPurchaseAuthorizationRequest
    ): Promise<UnitResponse<PurchaseAuthorizationRequest>> {
        return this.httpPost<UnitResponse<PurchaseAuthorizationRequest>>(
            'authorization-requests/purchase',
            {
                data: request
            }
        )
    }

    public async createAtmAuthorizationRequest(
        request: CreateAtmAuthorizationRequest
    ): Promise<UnitResponse<AtmAuthorizationRequest>> {
        return this.httpPost<UnitResponse<AtmAuthorizationRequest>>(
            'authorization-requests/atm',
            {
                data: request
            }
        )
    }
}