export interface RestrictedResource {
    /**
     * Type of the resource. The value is always account or card.
     */
    type: "account" | "card"

    /**
     * Array of resource identifiers.
     */
    ids: string[]
}

export interface ApiToken {
    id: string
    type: "apiToken"
    attributes: {
        /**
         * The date the API token was created.
         * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
         */
        createdAt: string

        /**
         * A description of the API token.
         */
        description: string

        /**
         * Expiration date of the API token.
         * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
         */
        expiration: string

        /**
         * Optional. The actual bearer token. Available only on API token creation response.
         */
        token?: string

        /**
         * Optional. A comma separated list of IP addresses that are allowed to use the API token.
         */
        sourceIp?: string
    }
}

export interface CreateApiTokenRequest {
    type: "apiToken"
    attributes: {
        /**
         * A description of the Org API token.
         */
        description: string

        /**
         * list of Scopes separated by spaces.
         */
        scope: string

        /**
         * Expiration date of the API token.
         * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
         */
        expiration?: string

        /**
         * Optional. A comma separated list of IP addresses that are allowed to use the API token.
         */
        sourceIp?: string

        /**
         * Optional. Restrict token to one or more specific resources. To one or many cards and/or to one or many accounts (cards under it, payments, transactions).
         */
        resources?: RestrictedResource[]
    }
}