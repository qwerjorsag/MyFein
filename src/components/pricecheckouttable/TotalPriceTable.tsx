import React from 'react';
import './TotalPriceTable.css'; // Add a new CSS file for styling the table

const PriceTable = ({ cartTotal, deliveryPrice, paymentCost }) => {
    const totalPrice = cartTotal + deliveryPrice + paymentCost;

    return (
        <div className="price-table-container">
            <table className="price-table">
                <tbody>
                <tr>
                    <td className="price-label-nt">Cena zboží:</td>
                    <td className="price-value">{cartTotal}</td>
                </tr>
                <tr>
                    <td className="price-label-nt">Cena dopravy:</td>
                    <td className="price-value">{deliveryPrice}</td>
                </tr>
                <tr>
                    <td className="price-label-nt">Cena platby:</td>
                    <td className="price-value">{paymentCost}</td>
                </tr>
                <tr className="total-row">
                    <td className="price-label">Celková cena:</td>
                    <td className="price-value">{totalPrice}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default PriceTable;
