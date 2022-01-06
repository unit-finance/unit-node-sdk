import { Address } from "./common"

export interface Institution {
    /**
     * Type of the institution resource. The value is always institution.
     */
    type: "institution"

    /**
     * JSON object representing the institution data.
     */
    attributes: {
        /**
         * Routing number of the institution. Valid 9-digit ABA routing transit number. 
         */
        routingNumber: string

        /**
         * Name of the institution.
         */
        name: string
        
        /**
         * Optional. Address of the institution.
         */
        address?: Address

        /**
         * Is FedACH participant.
         */
        isACHSupported: boolean

        /**
         * Is Fedwire participant.
         */
        isWireSupported: boolean
    }
}