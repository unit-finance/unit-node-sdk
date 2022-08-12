export interface ApproveAuthorizationRequest {
    id: string
    amount?: number
}


export interface DeclineAuthorizationRequest {
    id: string
    reason: AuthorizationRequestDeclineReason
}

export type AuthorizationRequestDeclineReason = "AccountClosed" | "CardExceedsAmountLimit" | "DoNotHonor" | "InsufficientFunds" | "InvalidMerchant" | "ReferToCardIssuer" | "RestrictedCard" | "Timeout" | "TransactionNotPermittedToCardholder"

