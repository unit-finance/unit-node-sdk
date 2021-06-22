import { Phone } from "./core";

export interface CreateTokenRequest {
    customerId: string
    data: {
        type: "customerToken"
        attributes: {
            /**
             * list of Scopes separated by spaces.
             */
            scope: string

            /**
             * Received as a response from Create Customer Token Verification.
             * Required if scope includes a scope which require two-factor authentication.
             */
            verificationToken?: string

            /**
             * string	6 digits code sent to the customer through the desired channel.
             * Required if the scope attribute includes a scope which requires two-factor authentication.
             */
            verificationCode?: string}
    }
}

export interface CreateTokenVerificationRequest {
    customerId: string
    data: {
        type: "customerTokenVerification"
        attributes: {
            /**
             * send a verification code to the customer through one of the following channels sms or call.
             */
            channel: string

            /**
             * Optional. For [BusinessCustomer](https://developers.unit.co/#businesscustomer) only, this allows providing the phone number of one of the customer's authorized users.
             * The provided phone must match an authorized user phone and will be used in the One Time Password (OTP) authentication process instead of the business customer contact's phone.
             */
            phone?: Phone
        }
    }
}

export interface CustomerToken {
    type: "customerBearerToken",
    attributes: {
        token: string
        expiresIn: number
    }
}

export interface VerificationToken {
    type: "customerTokenVerification",
    attributes: {
        /**
         * The generated verification token.
         *  It should be passed back to [Create Customer Bearer Token](https://developers.unit.co/#customers-create-customer-bearer-token) along with the verification code the customer received on the specified channel
         */
        verificationToken: string
    }
}
