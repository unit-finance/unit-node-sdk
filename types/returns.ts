import { Relationship } from "./common"

export type AchReturnReason = "InsufficientFunds" | "AccountClosed" | "NoAccount" | "InvalidAccountNumberStructure" | "UnauthorizedDebitToConsumer" |
"ReturnedPerOdfiRequest" | "AuthorizationRevokedByCustomer" | "PaymentStopped" | "UncollectedFunds" | "CustomerAdvisesNotAuthorized" | "CheckTruncationEntryReturned" | "BranchSoldToAnotherDfi" | "RdfiNotQualifiedToParticipate" |
"RepresentativePayeeDeceasedOrUnableToContinue" | "BeneficiaryOrBankAccountHolderDeceased" | "AccountFrozen" | "FileRecordEditCriteria" | "ImproperEffectiveEntryDate" | "AmountFieldError" | "NonTransactionAccount" | "InvalidCompanyIdentification" |
"InvalidIndividualIdNumber" | "CreditEntryRefusedByReceiver" | "DuplicateEntry" | "AddendaError" | "MandatoryFieldError" | "TraceNumberError" | "RoutingNumberCheckDigitError" | "CorporateCustomerAdvisesNotAuthorized" | "RdfiNotParticipantInCheckTruncationProgram" | "PermissibleReturnEntry" | "RdfiNonSettlement" |
"ReturnOfXckEntry" | "LimitedParticipationDfi" | "ReturnOfImproperDebitEntry" | "ReturnOfImproperCreditEntry" | "SourceDocumentPresentedForPayment" | "StopPaymentOnSourceDocument" | "ImproperSourceDocument"

export interface ReturnReceivedAchTransactionRequest {
    transactionId: string
    data: {
        type: "returnAch"
        attributes: {
            reason: AchReturnReason
        }
        relationships: {
            account: Relationship
        }
    }
}