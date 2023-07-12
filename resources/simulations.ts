import { BaseResource } from "."
import { UnitConfig, UnitResponse } from "../types"
import { AchReceivedPayment, Application, ApplicationDocument, AchPayment } from "../types"
import {
    ApproveApplicationSimulation,
    DenyApplicationSimulation,
    RejectDocumentSimulation,
    CreateAchReceivedPaymentSimulation,
    ReceiveAchPaymentSimulation,
    CreateCardPurchaseSimulation,
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

    public async createCardPurchase(
        request: CreateCardPurchaseSimulation
    ): Promise<UnitResponse<CardTransaction>> {
        return this.httpPost<UnitResponse<CardTransaction>>("/purchases", {
            data: request,
        })
    }
}
