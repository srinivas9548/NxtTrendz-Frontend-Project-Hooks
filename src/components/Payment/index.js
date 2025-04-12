import { useContext, useState } from 'react'

import CartContext from '../../context/CartContext'

import { FaCreditCard, FaUniversity, FaWallet, FaMobileAlt, FaMoneyBillWave } from 'react-icons/fa'

import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

import './index.css'

const paymentOptions = [
    {
        paymentId: 'CARD',
        displayText: 'Card',
        isDisabled: true,
        icon: <FaCreditCard style={{ color: '#1976d2' }} />
    },
    {
        paymentId: 'NET_BANKING',
        displayText: 'Net Banking',
        isDisabled: true,
        icon: <FaUniversity style={{ color: '#4caf50' }} />
    },
    {
        paymentId: 'UPI',
        displayText: 'UPI',
        isDisabled: true,
        icon: <FaMobileAlt style={{ color: '#ff5722' }} />
    },
    {
        paymentId: 'WALLET',
        displayText: 'Wallet',
        isDisabled: true,
        icon: <FaWallet style={{ color: '#9c27b0' }} />
    },
    {
        paymentId: 'CASH_ON_DELIVERY',
        displayText: 'Cash on Delivery',
        isDisabled: false,
        icon: <FaMoneyBillWave style={{ color: '#388e3c' }} />
    },
]

const Payment = () => {
    const { cartList } = useContext(CartContext);
    // console.log(cartList);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [width, height] = useWindowSize();

    const getTotalPrice = cartList.reduce((totalPrice, item) =>
        totalPrice + item.price * item.quantity, 0
    );

    const onClickConfirmOrder = () => {
        setOrderPlaced(true);
    }

    const renderPaymentMethodField = () => (
        <ul className="payment-methods-container">
            {paymentOptions.map(option => (
                <li key={option.paymentId} className="payment-option-item">
                    <input
                        type="radio"
                        id={option.paymentId}
                        className="payment-option-input"
                        value={option.paymentId}
                        disabled={option.isDisabled}
                        checked={paymentMethod === option.paymentId}
                        onChange={() => setPaymentMethod(option.paymentId)}
                    />
                    <label
                        htmlFor={option.paymentId}
                        className={`payment-option-label ${option.isDisabled ? "disabled-label" : ""}`}
                    >
                        <span className="payment-method-icon">{option.icon}</span>
                        {option.displayText}
                    </label>
                </li>
            ))}
        </ul>
    )

    return (
        <div className="payment-container">
            {!orderPlaced ? (
                <>
                    <h1 className="payment-heading">Payment Details</h1>
                    <p className="payment-sub-heading">Payment Methods</p>
                    {renderPaymentMethodField()}
                    <p className="payment-summary">Quantity : {cartList.length}</p>
                    <p className="payment-summary">Total Price : Rs {getTotalPrice}/-</p>
                    <button
                        type="button"
                        className="confirm-order-button"
                        disabled={paymentMethod === ""}
                        onClick={onClickConfirmOrder}
                    >
                        Confirm Order
                    </button>
                </>
            ) : (
                <>
                    <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 1000 }}>
                        <Confetti width={width} height={height} numberOfPieces={400} recycle={false} />
                    </div>
                    <div className="success-message">
                        🎉 Your order has been placed successfully 🎊
                    </div>
                </>
            )}


        </div>
    )
}

export default Payment