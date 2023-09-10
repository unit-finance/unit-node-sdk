import { Phone } from "./common"

/**
 * @link https://docs.unit.co/#scopes
 */
 export type UnitScope =
 | "applications-write"
 | "applications"
 | "customer-token-write"
 | "customer-token"
 | "customers-write"
 | "customers"
 | "customer-tags-write"
 | "accounts-write"
 | "accounts"
 | "cards-write"
 | "cards"
 | "cards-sensitive-write"
 | "cards-sensitive"
 | "transactions-write"
 | "transactions"
 | "payments-write"
 | "payments-write-counterparty"
 | "payments-write-ach-debit"
 | "counterparties-write"
 | "counterparties"
 | "events-write"
 | "events"
 | "webhooks-write"
 | "webhooks"
 | "authorization-requests-write"
 | "authorization-requests"
 | "authorizations"
 | "statements"
 | "payments"
 | "batch-releases-write"
 | "batch-releases"
 | "check-deposits-write"
 | "check-deposits"
 | "received-payments-write"
 | "received-payments"
 | "chargebacks-write"
 | "chargebacks"
 | "rewards-write"
 | "rewards"

export interface CreateTokenRequest {
    type: "customerToken"
    attributes: {
        /**
         * list of Scopes separated by spaces.
         */
        scope: string

        /**
         * list of Upgradable scopes separated by spaces.
         */
        upgradableScope?: string

        /**
         * Received as a response from Create Customer Token Verification.
         * Required if scope includes a scope which require two-factor authentication.
         */
        verificationToken?: string

        /**
         * 6 digits code sent to the customer through the desired channel.
         * Required if the scope attribute includes a scope which requires two-factor authentication.
         */
        verificationCode?: string

        /**
         * Optional. The lifetime of the token (in seconds). 
         * Maximum value is 86400 (24 hours). Default value is also 24 hours.
         */
        expiresIn?: number

        /**
         * Required if scope includes a scope which require two-factor authentication. Should be in a valid JWT structure.
         */
        jwtToken?: string

        /**
         * Optional. Scopes the customer token additionally to any resources included.
         */
        resources?: {
            /**
             * Only cards or accounts can be scoped currently.
             */
            type: "card" | "account"

            /**
             * Array of ids corresponding to whatever type is passed in.
             */
            ids: string[]
        }[]
    }
}

/**
 * English-en, Afrikaans-af, Arabic-ar, Catalan-ca, Chinese-zh, Chinese (Mandarin)-zh-CN, Chinese (Cantonese)-zh-HK, Croatian-hr, Czech-cs, Danish-da, Dutch-nl,
 * English (British)-en-GB, Estonian-et, Finnish-fi, French-fr, German-de, Greek-el, Hebrew-he, Hindi-hi, Hungarian-hu, Indonesian-id, Italian-it, Japanese-ja, Kannada-kn,
 * Korean-ko, Malay-ms, Marathi-mr, Norwegian-nb, Polish-pl, Portuguese - Brazil-pt-BR, Portuguese-pt, Romanian-ro, Russian-ru, Slovak-sk, Spanish-es, Swedish-sv, Tagalog-tl,
 * Telegu-te, Thai-th, Turkish-tr, Vietnamese-vi
 */
type LocalizationOptions = "en" | "af" | "ar" | "ca" | "zh" | "zh-CN" | "zh-HK" | "hr" | "cs" | "da" | "nl" | "en-GB" | "et" | "fi" | "fr" | "de" | "el" |
"he" | "hi" | "hu" | "id" | "it" | "ja" | "kn" | "ko" | "ms" | "mr" | "nb" | "pl" | "pt-BR" | "pt" | "ro" | "ru" | "sk" | "es" | "sv" | "tl" | "te" | "th" | "tr" | "vi"

export interface CreateTokenVerificationRequest {
    type: "customerTokenVerification"
    attributes: {
        /**
         * send a verification code to the customer through one of the following channels sms or call.
         */
        channel: "sms" | "call"

        /**
         * Optional. For [BusinessCustomer](https://developers.unit.co/#businesscustomer) only, this allows providing the phone number of one of the customer's authorized users.
         * The provided phone must match an authorized user phone and will be used in the One Time Password (OTP) authentication process instead of the business customer contact's phone.
         */
        phone?: Phone

        /**
         * Optional. For sms verifications only, 11-character hash string that identifies your app. Appended at the end of your verification SMS body the way that client-side SMS Retriever API expects.
         */
        appHash?: string

        /**
         * Optional. Select the verification language using a 2-letters code. Default is English.
         * See Localization Options bellow for the support languages and their 2-letters code.
         */
        language?: LocalizationOptions
    }
}

export interface CustomerToken {
    type: "customerBearerToken"
    attributes: {
        token: string
        expiresIn: number
    }
}

export interface VerificationToken {
    type: "customerTokenVerification"
    attributes: {
        /**
         * The generated verification token.
         * It should be passed back to [Create Customer Bearer Token](https://developers.unit.co/#customers-create-customer-bearer-token) along with the verification code the customer received on the specified channel
         */
        verificationToken: string
    }
}
