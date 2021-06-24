export interface Webhook {
    /**
     * Identifier of the webhook resource.
     */
    id: string

    /**
     * Type of the webhook resource. The value is always webhook.
     */
    type: 'webhook'

    /**
     * JSON object representing the webhook data.
     */
    attributes: {
        /**
         * Date only. The date the resource was created.
         * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
         */
        createdAt: string

        /**
         * A label describing the webhook.
         */
        label: string

        /**
         * The URL of the webhook endpoint.
         */
        url: string

        /**
         * The status of the webhook. Either Enabled or Disabled.
         */
        status: 'Enabled' | 'Disabled.'

        /**
         * The type of content you wish to receive.
         */
        contentType: 'JsonAPI'

        /**
         * The secret token (see [Securing your webhooks](https://developers.unit.co/#securing-your-webhooks)).
         */
        token: string
    }
}

export interface WebhookListParams {
    /**
     * Maximum number of resources that will be returned. Maximum is 1000 resources. See Pagination.
     * default: 100
     */
    limit?: number,

    /**
     * Number of resources to skip. See Pagination.
     * default: 0
     */
    offset?: number
}

export interface CreateWebhookRequest {
    type: 'webhook'
    attributes:
    {
        /**
         * A label describing the webhook.
         */
        label: string

        /**
         * The URL of the webhook endpoint.
         */
        url: string

        /**
         * The secret token(see Securing your webhooks).
         */
        token: string

        /**
         * The type of content you wish to receive. Either Json or JsonAPI.
         */
        contentType: "Json" | "JsonAPI"
    }
}

export interface PatchWebhookRequest {
    type: "webhook",
    attributes: {
        /**
         * The label of the webhook. To modify or add specify the new label.
         */
        label?: string

        /**
         * The URL of the webhook endpoint. To modify or add specify the new URL.
         */
        url?: string

        /**
         * The content type of the webhook. To modify or add specify the new content type.
         */
        contentType?: string

        /**
         * The secret token of the webhook. To modify or add specify the token.
         */
        token?: string
    }
}