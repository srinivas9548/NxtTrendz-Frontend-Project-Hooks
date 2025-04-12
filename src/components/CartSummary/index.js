import Popup from 'reactjs-popup'

import Payment from '../Payment'

import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
    <CartContext.Consumer>
        {value => {
            const { cartList } = value
            let totalCount = 0
            cartList.forEach(eachCartItem => {
                totalCount += eachCartItem.price * eachCartItem.quantity
            })

            return (
                <div className="cart-summary-container">
                    <div className="cart-summary-content">
                        <h1 className="order-total-items">
                            Order Total:
                            <span className="total-count"> Rs {totalCount}/-</span>
                        </h1>
                        <p className="total-items">{cartList.length} Items in cart</p>
                        <Popup
                            modal
                            trigger={
                                <button type="button" className="checkout-button btn-sm-none">
                                    Checkout
                                </button>
                            }
                            overlayClassName="popup-overlay"
                        >
                            {close => <Payment close={close} />}
                        </Popup>
                    </div>
                    <Popup
                        modal
                        trigger={
                            <button type="button" className="checkout-button btn-lg-none">
                                Checkout
                            </button>
                        }
                        overlayClassName="popup-overlay"
                    >
                        {close => <Payment close={close} />}
                    </Popup>
                </div>
            )
        }}
    </CartContext.Consumer>
)

export default CartSummary