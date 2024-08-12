export enum MigrationStatus {
  MigrationStarted = "MigrationStarted",
  CollectingAccountsConsent = "CollectingAccountsConsent",
  MigratingAccounts = "MigratingAccounts",
  CollectingMoneyMovementConsent = "CollectingMoneyMovementConsent",
  ExecutingMoneyMovement = "ExecutingMoneyMovement",
  PendingMigrationDeadline = "PendingMigrationDeadline",
  PendingMoneyMovementOnDeadline = "PendingMoneyMovementOnDeadline",
  ClosingAccounts = "ClosingAccounts",
  Completed = "Completed",
  Cancelled = "Cancelled",
}

export enum BalanceTransferTiming {
  NewAccountCreation = "NewAccountCreation",
  MigrationDeadline = "MigrationDeadline",
}

export interface Migration {
  id: string
  type: "customerBankMigration"
  attributes: {
    status: MigrationStatus
    deadLine: string
    fromBank: string
    toBank: string
    orgName: string
    supportEmail: string
    supportPhone: string
    migrationUrl: string
    createdAt: string
    updatedAt: string
    supressInvitationEmail: boolean
    digitallyActivatePhysicalCards: boolean
    balanceTransferTiming: BalanceTransferTiming
  }
  relationships: {
    org: {
      data: {
        type: "org"
        id: string
      }
    }
    customer: {
      data: {
        type: "customer"
        id: string
      }
    }
    whiteLabelTheme: {
      data: {
        type: "whiteLabelTheme"
        id: string
      }
    }
  }
}
