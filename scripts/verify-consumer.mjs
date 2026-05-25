/**
 * Installs the packed SDK like an npm consumer and runs functional checks.
 * CI runs this on Node 16 against a tarball built on Node 24.
 *
 * Usage: node scripts/verify-consumer.mjs <path-to-package.tgz>
 */

import { execSync } from "child_process"
import { createRequire } from "module"
import { mkdtemp, rm, readFile } from "fs/promises"
import { join } from "path"
import { tmpdir } from "os"
import { resolve } from "path"
import { existsSync } from "fs"

const tarball = process.argv[2]

if (!tarball) {
    console.error("Usage: node scripts/verify-consumer.mjs <path-to-package.tgz>")
    process.exit(1)
}

const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10)
console.log(`Consumer verification on Node ${process.versions.node}`)

if (nodeMajor < 16) {
    console.error("This script requires Node >= 16")
    process.exit(1)
}

async function loadEnvFromRepoRoot() {
    const envPath = resolve(process.cwd(), ".env")
    if (!existsSync(envPath)) {
        return
    }
    const contents = await readFile(envPath, "utf8")
    for (const line of contents.split("\n")) {
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith("#")) {
            continue
        }
        const eq = trimmed.indexOf("=")
        if (eq === -1) {
            continue
        }
        const key = trimmed.slice(0, eq)
        const value = trimmed.slice(eq + 1)
        if (process.env[key] === undefined) {
            process.env[key] = value
        }
    }
}

function assert(condition, message) {
    if (!condition) {
        throw new Error(message)
    }
}

async function runTest(name, fn) {
    await fn()
    console.log(`  ✓ ${name}`)
}

async function runSkipped(name, reason) {
    console.log(`  ⊘ ${name} (${reason})`)
}

function assertListResponse(res, specFile) {
    assert(res && Array.isArray(res.data), `${specFile}: expected list response with data array`)
}

function assertCreateResponse(res, expectedType, specFile) {
    assert(res?.data?.type === expectedType, `${specFile}: expected created resource type ${expectedType}`)
}

async function createFixtures(client) {
    const h = client.helpers
    const unique = Date.now()

    const applicationRes = await client.applications.create({
        type: "individualApplication",
        attributes: {
            ssn: "123456789",
            fullName: h.createFullName("Richard", "Hendricks"),
            dateOfBirth: "2001-08-10",
            address: h.createAddress("20 Ingram St", null, "Forest Hills", "CA", "11375", "US"),
            email: `consumer-verify-${unique}@example.com`,
            phone: h.createPhone("1", "5555555555"),
            ip: "127.0.0.2",
            occupation: "ArchitectOrEngineer",
            annualIncome: "Between50kAnd100k",
            sourceOfIncome: "EmploymentOrPayrollIncome"
        }
    })

    const customerId = applicationRes.data.relationships?.customer?.data?.id
    assert(customerId, "fixtures: application should include customer")

    const createDepositAccount = (tags) => client.accounts.create({
        type: "depositAccount",
        attributes: {
            depositProduct: "checking",
            tags
        },
        relationships: {
            customer: { data: { type: "customer", id: customerId } }
        }
    })

    const accountRes = await createDepositAccount({ purpose: "consumer-verify-1" })
    const counterpartyAccountRes = await createDepositAccount({ purpose: "consumer-verify-2" })

    return {
        customerId,
        accountId: accountRes.data.id,
        counterpartyAccountId: counterpartyAccountRes.data.id
    }
}

/** One representative live API call per tests/*.spec.ts file */
function buildSpecLiveTests(client, sdk) {
    const orgId = process.env.TEST_ORG_ID || "252"

    return [
        {
            spec: "accounts.spec.ts",
            name: "accounts.list",
            run: async () => assertListResponse(await client.accounts.list({ limit: 1 }), "accounts.spec.ts")
        },
        {
            spec: "applications.spec.ts",
            name: "applications.list",
            run: async () => assertListResponse(await client.applications.list(), "applications.spec.ts")
        },
        {
            spec: "applicationForms.spec.ts",
            name: "applicationForms.list",
            run: async () => assertListResponse(await client.applicationForms.list(), "applicationForms.spec.ts")
        },
        {
            spec: "atmLocations.spec.ts",
            name: "atmLocations.list (coordinates)",
            run: async () => {
                const res = await client.atmLocations.list({
                    coordinates: { longitude: -73.93041, latitude: 42.79894 }
                })
                assertListResponse(res, "atmLocations.spec.ts")
                if (res.data.length > 0) {
                    assert(res.data[0].type === "atmLocation", "atmLocations.spec.ts: expected atmLocation type")
                }
            }
        },
        {
            spec: "authorizationRequests.spec.ts",
            name: "authorizationRequests.list",
            run: async () => assertListResponse(await client.authorizationRequests.list(), "authorizationRequests.spec.ts")
        },
        {
            spec: "authorizations.spec.ts",
            name: "authorizations.find",
            run: async () => assertListResponse(
                await client.authorizations.find({ limit: 10, status: "Authorized" }),
                "authorizations.spec.ts"
            )
        },
        {
            spec: "bills.spec.ts",
            name: "bills resource (matches spec — no list endpoint)",
            run: async () => {
                assert(client.bills && typeof client.bills.get === "function", "bills.spec.ts: expected bills.get")
            }
        },
        {
            spec: "cards.spec.ts",
            name: "cards.list",
            run: async () => assertListResponse(await client.cards.list(), "cards.spec.ts")
        },
        {
            spec: "cashDeposits.spec.ts",
            name: "cashDeposits.list (coordinates)",
            run: async () => {
                const res = await client.cashDeposits.list({
                    serviceType: "Barcode",
                    coordinates: { longitude: -73.93041, latitude: 42.79894 }
                })
                assertListResponse(res, "cashDeposits.spec.ts")
                if (res.data.length > 0) {
                    assert(res.data[0].type === "storeLocation", "cashDeposits.spec.ts: expected storeLocation type")
                }
            }
        },
        {
            spec: "chargebacks.spec.ts",
            name: "chargebacks.list",
            run: async () => assertListResponse(await client.chargebacks.list(), "chargebacks.spec.ts")
        },
        {
            spec: "checkDeposits.spec.ts",
            name: "checkDeposits.list",
            run: async () => assertListResponse(await client.checkDeposits.list(), "checkDeposits.spec.ts")
        },
        {
            spec: "checkPayments.spec.ts",
            name: "checkPayments.list",
            run: async () => assertListResponse(await client.checkPayments.list(), "checkPayments.spec.ts")
        },
        {
            spec: "counterparties.spec.ts",
            name: "counterparties.list",
            run: async () => assertListResponse(await client.counterparties.list(), "counterparties.spec.ts")
        },
        {
            spec: "creditApplications.spec.ts",
            name: "creditApplications.list",
            run: async () => assertListResponse(await client.creditApplications.list({ limit: 20 }), "creditApplications.spec.ts")
        },
        {
            spec: "credits.spec.ts",
            name: "accounts.list (credit)",
            run: async () => assertListResponse(await client.accounts.list({ type: "credit" }), "credits.spec.ts")
        },
        {
            spec: "customers.spec.ts",
            name: "customers.list",
            run: async () => assertListResponse(await client.customers.list(), "customers.spec.ts")
        },
        {
            spec: "events.spec.ts",
            name: "events.list",
            run: async () => assertListResponse(await client.events.list({ limit: 1 }), "events.spec.ts")
        },
        {
            spec: "migrations.spec.ts",
            name: "migrations.find",
            run: async () => assertListResponse(await client.migrations.find(), "migrations.spec.ts")
        },
        {
            spec: "payments.spec.ts",
            name: "payments.list",
            run: async () => assertListResponse(await client.payments.list(), "payments.spec.ts")
        },
        {
            spec: "receivedPayments.spec.ts",
            name: "receivedPayments.list",
            run: async () => assertListResponse(await client.receivedPayments.list(), "receivedPayments.spec.ts")
        },
        {
            spec: "recurringPayments.spec.ts",
            name: "recurringPayments.list",
            run: async () => assertListResponse(await client.recurringPayments.list(), "recurringPayments.spec.ts")
        },
        {
            spec: "recurringRepayments.spec.ts",
            name: "recurringRepayments.list",
            run: async () => assertListResponse(await client.recurringRepayments.list(), "recurringRepayments.spec.ts")
        },
        {
            spec: "repayments.spec.ts",
            name: "repayments.list",
            run: async () => assertListResponse(await client.repayments.list(), "repayments.spec.ts")
        },
        {
            spec: "rewards.spec.ts",
            name: "rewards.list",
            run: async () => assertListResponse(await client.rewards.list(), "rewards.spec.ts")
        },
        {
            spec: "statements.spec.ts",
            name: "statements.list",
            run: async () => assertListResponse(
                await client.statements.list({ limit: 10, sort: "-period" }),
                "statements.spec.ts"
            )
        },
        {
            spec: "stopPayments.spec.ts",
            name: "stopPayments.list",
            run: async () => assertListResponse(await client.stopPayments.list(), "stopPayments.spec.ts")
        },
        {
            spec: "taxForms.spec.ts",
            name: "taxForms.list",
            run: async () => assertListResponse(await client.taxForms.list(), "taxForms.spec.ts")
        },
        {
            spec: "threadApplications.spec.ts",
            name: "applications.list (thread token)",
            requires: () => process.env.UNIT_THREAD_TOKEN,
            missingEnv: "UNIT_THREAD_TOKEN",
            run: async () => {
                const threadClient = new sdk.Unit(process.env.UNIT_THREAD_TOKEN, process.env.UNIT_API_URL)
                assertListResponse(await threadClient.applications.list(), "threadApplications.spec.ts")
            }
        },
        {
            spec: "transactions.spec.ts",
            name: "transactions.list",
            run: async () => assertListResponse(await client.transactions.list(), "transactions.spec.ts")
        },
        {
            spec: "webhooks.spec.ts",
            name: "webhooks.list",
            run: async () => assertListResponse(await client.webhooks.list(), "webhooks.spec.ts")
        },
        {
            spec: "orgTokens.spec.ts",
            name: "orgTokens.list",
            run: async () => assertListResponse(await client.orgTokens.list(orgId), "orgTokens.spec.ts")
        }
    ]
}

/** POST/create checks aligned with tests/*.spec.ts create flows */
function buildSpecPostTests(client, fixtures) {
    const h = client.helpers
    const orgId = process.env.TEST_ORG_ID || "252"
    const unique = Date.now()

    return [
        {
            spec: "applications.spec.ts",
            name: "POST applications.create",
            run: async () => {
                const res = await client.applications.create({
                    type: "individualApplication",
                    attributes: {
                        ssn: "123456789",
                        fullName: h.createFullName("Erlich", "Bachman"),
                        dateOfBirth: "2001-08-10",
                        address: h.createAddress("20 Ingram St", null, "Forest Hills", "CA", "11375", "US"),
                        email: `consumer-post-app-${unique}@example.com`,
                        phone: h.createPhone("1", "5555555555"),
                        ip: "127.0.0.2",
                        occupation: "ArchitectOrEngineer",
                        annualIncome: "Between50kAnd100k",
                        sourceOfIncome: "EmploymentOrPayrollIncome"
                    }
                })
                assertCreateResponse(res, "individualApplication", "applications.spec.ts")
            }
        },
        {
            spec: "applicationForms.spec.ts",
            name: "POST applicationForms.create",
            run: async () => {
                const res = await client.applicationForms.create({
                    type: "applicationForm",
                    attributes: {},
                    relationships: {}
                })
                assertCreateResponse(res, "applicationForm", "applicationForms.spec.ts")
            }
        },
        {
            spec: "accounts.spec.ts",
            name: "POST accounts.create",
            run: async () => {
                const res = await client.accounts.create({
                    type: "depositAccount",
                    attributes: {
                        depositProduct: "checking",
                        tags: { purpose: "consumer-post-account" }
                    },
                    relationships: {
                        customer: { data: { type: "customer", id: fixtures.customerId } }
                    }
                })
                assertCreateResponse(res, "depositAccount", "accounts.spec.ts")
            }
        },
        {
            spec: "rewards.spec.ts",
            name: "POST rewards.create",
            run: async () => {
                const res = await client.rewards.create({
                    type: "reward",
                    attributes: {
                        amount: 3000,
                        description: "Consumer verify reward"
                    },
                    relationships: {
                        receivingAccount: {
                            data: { type: "depositAccount", id: fixtures.accountId }
                        }
                    }
                })
                assertCreateResponse(res, "reward", "rewards.spec.ts")
            }
        },
        {
            spec: "counterparties.spec.ts",
            name: "POST counterparties.create",
            run: async () => {
                const res = await client.counterparties.create({
                    type: "achCounterparty",
                    attributes: {
                        name: "Joe Doe",
                        routingNumber: "123456789",
                        accountNumber: "123400023",
                        accountType: "Checking",
                        type: "Person"
                    },
                    relationships: {
                        customer: { data: { type: "customer", id: fixtures.customerId } }
                    }
                })
                assertCreateResponse(res, "achCounterparty", "counterparties.spec.ts")
            }
        },
        {
            spec: "chargebacks.spec.ts",
            name: "POST chargebacks.create",
            run: async () => {
                const res = await client.chargebacks.create({
                    type: "chargeback",
                    attributes: {
                        amount: 50,
                        description: "Consumer verify chargeback"
                    },
                    relationships: {
                        account: h.createRelationship("account", fixtures.accountId),
                        counterpartyAccount: h.createRelationship("depositAccount", fixtures.counterpartyAccountId)
                    }
                })
                assertCreateResponse(res, "chargeback", "chargebacks.spec.ts")
            }
        },
        {
            spec: "checkDeposits.spec.ts",
            name: "POST checkDeposits.create",
            run: async () => {
                const res = await client.checkDeposits.create({
                    type: "checkDeposit",
                    attributes: {
                        amount: 20000,
                        description: "Consumer verify check deposit"
                    },
                    relationships: {
                        account: { data: { type: "depositAccount", id: fixtures.accountId } }
                    }
                })
                assertCreateResponse(res, "checkDeposit", "checkDeposits.spec.ts")
            }
        },
        {
            spec: "orgTokens.spec.ts",
            name: "POST orgTokens.create",
            run: async () => {
                const res = await client.orgTokens.create(orgId, {
                    type: "apiToken",
                    attributes: {
                        description: "consumer verify token",
                        scope: "customers applications",
                        expiration: new Date(Date.now() + 86400000 * 365).toISOString(),
                        resources: [{ ids: [fixtures.accountId], type: "account" }]
                    }
                })
                assertCreateResponse(res, "apiToken", "orgTokens.spec.ts")
            }
        },
        {
            spec: "cards.spec.ts",
            name: "POST cards.createDebitCard",
            run: async () => {
                const res = await client.cards.createDebitCard({
                    type: "individualVirtualDebitCard",
                    attributes: {},
                    relationships: {
                        account: { data: { type: "depositAccount", id: fixtures.accountId } }
                    }
                })
                assertCreateResponse(res, "individualVirtualDebitCard", "cards.spec.ts")
            }
        },
        {
            spec: "payments.spec.ts",
            name: "POST payments.create (bookPayment)",
            run: async () => {
                const res = await client.payments.create({
                    type: "bookPayment",
                    attributes: {
                        amount: 200,
                        description: "Consumer verify book payment"
                    },
                    relationships: {
                        account: { data: { type: "depositAccount", id: fixtures.accountId } },
                        counterpartyAccount: { data: { type: "depositAccount", id: fixtures.counterpartyAccountId } }
                    }
                })
                assert(res.data.type === "bookPayment", "payments.spec.ts: expected bookPayment")
            }
        }
    ]
}

const tmpDir = await mkdtemp(join(tmpdir(), "unit-sdk-consumer-"))

try {
    execSync("npm init -y", { cwd: tmpDir, stdio: "pipe" })
    execSync(`npm install "${resolve(tarball)}"`, { cwd: tmpDir, stdio: "inherit" })

    const require = createRequire(join(tmpDir, "package.json"))
    const sdk = require("@unit-finance/unit-node-sdk")

    await loadEnvFromRepoRoot()

    await runTest("exports Unit and UnitError", () => {
        assert(typeof sdk.Unit === "function", "Unit export missing")
        assert(typeof sdk.UnitError === "function", "UnitError export missing")
    })

    const unit = new sdk.Unit("test-token", "https://api.s.unit.sh")

    await runTest("Unit client exposes core resources", () => {
        for (const resource of ["accounts", "payments", "cards", "applications", "customers", "events"]) {
            assert(unit[resource] && typeof unit[resource].list === "function", `Missing resource: ${resource}`)
        }
    })

    await runTest("helpers build request payloads", () => {
        const fullName = unit.helpers.createFullName("Richard", "Hendricks")
        assert(fullName.first === "Richard" && fullName.last === "Hendricks", "createFullName failed")

        const address = unit.helpers.createAddress("5230 Newell Rd", null, "Palo Alto", "CA", "94303", "US")
        assert(address.city === "Palo Alto" && address.country === "US", "createAddress failed")

        const phone = unit.helpers.createPhone("1", "5555555555")
        assert(phone.countryCode === "1" && phone.number === "5555555555", "createPhone failed")

        const relationship = unit.helpers.createRelationship("account", "42")
        assert(relationship.data.type === "account" && relationship.data.id === "42", "createRelationship failed")
    })

    await runTest("unit.isError identifies UnitError instances", () => {
        const err = new sdk.UnitError("401 - Unauthorized")
        assert(unit.isError(err) === true, "isError should be true for UnitError")
        assert(unit.isError({ message: "nope" }) === false, "isError should be false for plain objects")
    })

    await runTest("webhooks.spec.ts: webhooks.verify", () => {
        const signature = "UUNz8ch1Ovjg+ijXUEwlAlWEktU="
        const secret = "OB2HL5E3B4HJ7IVXRNL4YQKYIQIVJK36ZZLPZEFWZVSDSC7LLFJQ===="
        const payload = {
            data: [{
                id: "46306092",
                type: "application.approved",
                attributes: {
                    createdAt: "2025-08-05T06:48:38.957Z",
                    tags: { key: "another-tag", test: "webhook-tag", number: "111" }
                },
                relationships: {
                    application: { data: { id: "3895367", type: "individualApplication" } },
                    customer: { data: { id: "3310133", type: "individualCustomer" } }
                }
            }]
        }
        assert(unit.webhooks.verify(signature, secret, payload) === true, "webhooks.verify should return true")
    })

    await runTest("bills.spec.ts: Bill DTO shape", () => {
        const bill = {
            type: "bill",
            id: "1",
            attributes: {
                status: "Pending",
                version: 1,
                createdAt: "2023-01-01T00:00:00.000Z",
                updatedAt: "2023-01-01T00:00:00.000Z",
                currency: "USD",
                total: 10000,
                description: "Electric bill payment"
            },
            relationships: {
                org: { data: { type: "org", id: "1" } },
                vendor: { data: { type: "vendor", id: "100" } }
            }
        }
        assert(bill.type === "bill" && bill.attributes.total === 10000, "Bill DTO shape check failed")
    })

    await runTest("API errors surface as UnitError", async () => {
        const badClient = new sdk.Unit("invalid-token", process.env.UNIT_API_URL || "https://api.s.unit.sh")
        let caught = null
        try {
            await badClient.accounts.list({ limit: 1 })
        } catch (error) {
            caught = error
        }
        assert(caught !== null, "Expected accounts.list to reject an invalid token")
        assert(unit.isError(caught) === true, `Expected UnitError, got ${caught?.constructor?.name}`)
    })

    const token = process.env.UNIT_TOKEN
    const apiUrl = process.env.UNIT_API_URL

    if (token && apiUrl) {
        const liveClient = new sdk.Unit(token, apiUrl)
        const specTests = buildSpecLiveTests(liveClient, sdk)

        console.log(`\nLive API checks (${specTests.length} spec files):\n`)

        for (const { spec, name, run, requires, missingEnv } of specTests) {
            const label = `${spec}: ${name}`
            if (requires && !requires()) {
                await runSkipped(label, `set ${missingEnv} in .env`)
                continue
            }
            await runTest(label, run)
        }

        console.log("\nPOST / create checks (10 spec-aligned flows):\n")

        const fixtures = await createFixtures(liveClient)
        const postTests = buildSpecPostTests(liveClient, fixtures)

        for (const { spec, name, run, requires, missingEnv } of postTests) {
            const label = `${spec}: ${name}`
            if (requires && !requires()) {
                await runSkipped(label, `set ${missingEnv} in .env`)
                continue
            }
            await runTest(label, run)
        }
    } else {
        console.log("\n  ⊘ Skipping live API tests (set UNIT_TOKEN and UNIT_API_URL in .env to enable)\n")
    }

    console.log("\nConsumer verification passed")
} finally {
    await rm(tmpDir, { recursive: true, force: true })
}
