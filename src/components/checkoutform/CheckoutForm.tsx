import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/Cart";
import { validateCheckoutForm } from "../../utilities/validations";
import { NameField, LastNameField, EmailField, PhoneNumFieldV2, AddressField, CityField, PostalCodeField, MessageField } from "../formfields";
import { DeliveryMethodField } from "../deliveryMethod";
import { TotalPriceTable } from "../pricecheckouttable";
import { PaymentOptionSelection } from "../paymentOptions";
import { CartItem } from "../../types/CartItem";
import "../bookingform/BookingForm.css"

const CheckoutForm: React.FC = () => {
    const navigate = useNavigate();
    const { getCartTotal } = useCart();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [city, setCity] = useState("");
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [branch, setBranch] = useState("");
    const [address, setAddress] = useState("");
    const [deliveryMethod, setDeliveryMethod] = useState("");
    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const [selectedPayment, setSelectedPayment] = useState<string>("");
    const [paymentCost, setPaymentCost] = useState<number>(0);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const storedCart = localStorage.getItem("coffee-cart");
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    const handlePaymentChange = (name: string, cost: number) => {
        setSelectedPayment(name);
        setPaymentCost(cost);
    };

    const handleDeliveryChange = (name: string, price: number) => {
        setDeliveryMethod(name);
        setDeliveryPrice(price);
    };

    const handleBranchChange = (branch: string) => {
        setBranch(branch);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userId = sessionStorage.getItem("userId");

        const filteredCartItems = cartItems.map(({ id, name, selectedWeight, quantity }) => ({
            id,
            name,
            selectedWeight,
            quantity,
        }));

        const totalPrice = getCartTotal() + deliveryPrice + paymentCost;

        const formData = {
            firstName,
            lastName,
            phoneNumber,
            email,
            address,
            city,
            postalCode,
            message,
            branch,
            deliveryMethod,
            deliveryPrice,
            selectedPayment,
            paymentCost,
            totalPrice,
            cart: filteredCartItems,
            userId,
        };

        const validationErrors = validateCheckoutForm(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const orderData = await response.json();

            // Extract orderId from the response
            const { orderId } = orderData;

            if (selectedPayment === "Karta") {
                // Pass the totalPrice, orderId, and orderDetails in the state
                navigate("/card", { state: { orderId, orderDetails: formData, totalPrice } });
            } else {
                alert("Objednávka byla úspěšně odeslána!");
                // Reset form fields after submission
                setFirstName("");
                setLastName("");
                setPhoneNumber("");
                setEmail("");
                setAddress("");
                setCity("");
                setPostalCode("");
                setMessage("");
                setBranch("");
                setDeliveryMethod("");
                setDeliveryPrice(0);
                setSelectedPayment("");
                setPaymentCost(0);
                setErrors({});
                setCartItems([]);
                localStorage.removeItem("coffee-cart");
            }
        } catch (error) {
            console.error("Error submitting booking:", error);
            alert("Došlo k chybě při odesílání objednávky.");
        }
    };

    const isCartEmpty = cartItems.length === 0;

    return (
        <div className="booking-form-container">
            <form className="booking-form" onSubmit={handleSubmit}>
                <h3>Fakturační údaje</h3>
                <NameField value={firstName} onChange={setFirstName} />
                {errors.firstName && <p className="error-message">{errors.firstName}</p>}
                <LastNameField value={lastName} onChange={setLastName} />
                {errors.lastName && <p className="error-message">{errors.lastName}</p>}
                <EmailField value={email} onChange={setEmail} />
                {errors.email && <p className="error-message">{errors.email}</p>}
                <AddressField value={address} onChange={setAddress} />
                {errors.address && <p className="error-message">{errors.address}</p>}
                <CityField value={city} onChange={setCity} />
                {errors.city && <p className="error-message">{errors.city}</p>}
                <PostalCodeField value={postalCode} onChange={setPostalCode} />
                {errors.postalCode && <p className="error-message">{errors.postalCode}</p>}
                <PhoneNumFieldV2 value={phoneNumber} onChange={setPhoneNumber} />
                {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}

                <h3>Doprava a platba</h3>
                <DeliveryMethodField value={deliveryMethod} onChange={handleDeliveryChange} onBranchChange={handleBranchChange} />
                {errors.deliveryMethod && <p className="error-message">{errors.deliveryMethod}</p>}
                <PaymentOptionSelection onChange={handlePaymentChange} />
                {errors.paymentMethod && <p className="error-message">{errors.paymentMethod}</p>}
                <TotalPriceTable cartTotal={getCartTotal()} deliveryPrice={deliveryPrice} paymentCost={paymentCost} />

                <MessageField value={message} onChange={setMessage} />

                <button type="submit" className="submit-button" disabled={isCartEmpty}>
                    Odeslat
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;
