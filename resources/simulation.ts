import {BaseResource} from "."
import {Application, ApplicationDocument} from "../types"
import {UnitConfig, UnitResponse} from "../types"
import {
  ApproveApplicationSimulation,
  DenyApplicationSimulation,
  RejectDocumentSimulation,
} from "../types"

export class Simulations extends BaseResource {
  constructor(token: string, basePath: string, config?: UnitConfig) {
    super(token, basePath + "/statements", config)
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
      {}
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
}
