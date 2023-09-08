import { BaseResource } from "."
import { CheckPayment, CreateCheckPaymentSimulation, UnitConfig, UnitResponse } from "../types"
import { AchReceivedPayment, Application, ApplicationDocument, AchPayment, TransmitAchPayment } from "../types"
import {
    ApproveApplicationSimulation,
    DenyApplicationSimulation,
    RejectDocumentSimulation,
    CreateAchReceivedPaymentSimulation,
    ReceiveAchPaymentSimulation,
    CreateCardPurchaseSimulation,
    CardTransaction,
    TransmitAchPaymentSimulation
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

    public async transmitAchPayment(
        request: TransmitAchPaymentSimulation
      ): Promise<UnitResponse<TransmitAchPayment>> {
        return this.httpPost<UnitResponse<TransmitAchPayment>>(
            "/ach/transmit",
            {
                data: request,
            }
        )
      }
}
