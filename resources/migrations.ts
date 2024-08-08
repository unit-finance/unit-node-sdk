import { UnitResponse, UnitConfig, QueryParameters } from "../types/common"
import { Migration, MigrationStatus } from "../types/migration"
import { BaseResource } from "./baseResource"

export class Migrations extends BaseResource {
  constructor(token: string, basePath: string, config?: UnitConfig) {
    super(token, basePath + "/migrations", config)
  }

  public async find(
    params?: MigrationsFindParams
  ): Promise<UnitResponse<Migration[]>> {
    const parameters: QueryParameters = {
      ...(params?.customerId && { "filter[customerId]": params.customerId }),
    }

    if (params?.status)
      params.status.forEach((s, idx) => {
        parameters[`filter[status][${idx}]`] = s
      })

    return this.httpGet<UnitResponse<Migration[]>>("", {
      params: parameters,
    })
  }
}

export interface MigrationsFindParams {
  status?: MigrationStatus[]
  customerId?: string
}
