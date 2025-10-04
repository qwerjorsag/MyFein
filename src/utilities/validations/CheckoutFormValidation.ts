import { isValidPhoneNumber } from "react-phone-number-input";

export const validateCheckoutForm = (formData: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    deliveryMethod: string;
    selectedPayment: string;
}): { [key: string]: string } => {
    const errors: { [key: string]: string } = {};

    if (!formData.firstName) errors.firstName = "Jméno je povinné.";
    if (!formData.lastName) errors.lastName = "Příjmení je povinné.";
    if (!formData.email) errors.email = "Email je povinný.";
    if (!formData.address) errors.address = "Adresa je povinná.";
    if (!formData.city) errors.city = "Město je povinné.";
    if (!formData.postalCode) errors.postalCode = "PSČ je povinné.";
    if (!formData.phoneNumber || !isValidPhoneNumber(formData.phoneNumber)) {
        errors.phoneNumber = "Neplatné telefonní číslo.";
    }
    if (!formData.deliveryMethod) errors.deliveryMethod = "Vyberte způsob doručení.";
    if (!formData.selectedPayment) errors.paymentMethod = "Vyberte způsob platby.";

    return errors;
};
