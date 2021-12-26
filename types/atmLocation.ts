import { Coordinates } from "."

export interface AtmLocation {
    /**
     * Type of the ATM location resource. The value is always atmLocation.
     */
    type: "atmLocation"

    /**
     * JSON object representing the ATM location data.
     */
    attributes: {
        /**
         * Name of the ATM network.
         */
        network: string

        /**
         * Name of the ATM's location.
         */
        locationName: string

        /**
         * Coordinates (latitude, longitude) of the ATM.
         */
        coordinates: Coordinates
        
        /**
         * Address of the ATM.
         */
        address: string

        /**
         * Distance to the ATM (in miles).
         */
        distance: number

        /**
         * Indicates if the ATM is surcharge free.
         */
        surchargeFree: boolean

        /**
         * Indicates if the ATM accepts deposits.
         */
        acceptDeposits: boolean
    }
}