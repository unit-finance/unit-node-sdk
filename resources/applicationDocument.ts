import { Address } from "../types/core"

export type ApplicationDocumentStatus =
    "Required" |	    //The document is required for the application to be evaluated.
    "ReceivedBack" |	//Back-side of the document was received. Front-side is still required. Only relevant for IdDocument document type.
    "ReceivedFront" |	//Front-side of the document was received. Back-side is still required. Only relevant for IdDocument document type.
    "Invalid" |	        //The document is invalid. You may re-upload the correct document for the application to be evaluated.
    "Approved" |	    //The document is approved.
    "PendingReview" 	//The document is currently undergoing review.


export type DocumentType =
    "IdDocument" |	        //An individual's Drivers License or State ID. Both front-side and back-side are required.
    "Passport" |	        //An individual's passport.
    "AddressVerification" |	//An individual's document to verify address. Document may be a utility bill, bank statement, lease agreement or current pay stub.
    "SocialSecurityCard" |	//An individual's social security card.
    "CertificateOfIncorporation" |	//A business's certificate of incorporation.
    "EmployerIdentificationNumberConfirmation" 	//A business's EIN confirmation document (either IRS form 147c or IRS form CP-575).

export type ReasonCode =
    "PoorQuality" |
    "NameMismatch" |
    "SSNMismatch" |
    "AddressMismatch" |
    "DOBMismatch" |
    "ExpiredId" |
    "EINMismatch" |
    "StateMismatch" |
    "Other"


export interface ApplicationDocument {
    /**
     * Identifier of the document resource.
     */
    id: string

    /**
     * Always document.
     */
    type: string

    /**
     * representing the document’s data.
     */
    attributes: {
        /**
         * One of Required, ReceivedBack, ReceivedFront, Invalid, Approved or PendingReview, see Application Document Status.
         */
        status: ApplicationDocumentStatus

        /**
         * One of IdDocument, Passport, AddressVerification, CertificateOfIncorporation or EmployerIdentificationNumberConfirmation.
         */
        documentType: DocumentType

        /**
         * The document requirements description.
         */
        description: string

        /**
         * Name of business or individual.
         */
        name: string

        /**
         * Individual address, present only for the AddressVerification document type.
         */
        address?: Address

        /**
         * RFC3339 Date string	Date only. Present only for Passport and License document types.
         */
        dateOfBirth?: string

        /**
         * Individual passport number. Present only for the Passport document type.
         */
        passport?: string

        /**
         * Business EIN. Present only for the EmployerIdentificationNumberConfirmation document type.
         */
        ein?: string

        /**
         * Application Document rejection reason code. Present only when document status is Invalid.
         * One of PoorQuality, NameMismatch, SSNMismatch, AddressMismatch, DOBMismatch, ExpiredId, EINMismatch, StateMismatch, Other.
         */
        reasonCode?: ReasonCode

        /**
         * Application Document rejection reason. Present only when document status is Invalid.
         */
        reason?: string
    }
}