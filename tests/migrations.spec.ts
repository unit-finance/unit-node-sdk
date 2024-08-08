import { Unit } from "../unit"

import dotenv from "dotenv"
dotenv.config()
const unit = new Unit(
  process.env.UNIT_TOKEN || "test",
  process.env.UNIT_API_URL || "test"
)

describe("Find Migrations", () => {
  test("Find Migrations", async () => {
    const res = await unit.migrations.find()
    expect(res.data.length > 0).toBeTruthy()
    res.data.forEach((migration) =>
      expect(migration.type === "customerBankMigration").toBeTruthy()
    )
  })
})
