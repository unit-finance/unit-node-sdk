export interface Biller {
    /**
     * Type of the biller resource. The value is always biller.
     */
     type: "biller"

    /**
     * Identifier of the biller resource.
     */
    id: string

    /**
     * JSON object representing the biller data.
     */
    attributes: {
        /**
         * Name of the biller.
         */
        name: string

        /**
         * The category this biller is belong to.
         */
        category: string
    }
}

export interface GetBillerParams {
    /**
     * Optional. Determine the results page number.
     */
    page?: number

    /**
     * Filter the name of the biller (full or partial).
     */
    name: string
}
