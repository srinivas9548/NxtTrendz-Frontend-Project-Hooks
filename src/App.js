import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home'
import LoginForm from './components/LoginForm';
import Products from './components/Products';
import ProductItemDetails from './components/ProductItemDetails';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import CartContext from './context/CartContext';

import './App.css';

const App = () => {
    const [cartList, setCartList] = useState([]);

    const removeAllCartItems = () => {
        setCartList([]);
    }

    const incrementCartItemQuantity = id => {
        setCartList(prevList =>
            prevList.map(eachCartItem => {
                if (eachCartItem.id === id) {
                    const updatedQuantity = eachCartItem.quantity + 1
                    return { ...eachCartItem, quantity: updatedQuantity }
                }
                return eachCartItem
            })
        )
    }

    const decrementCartItemQuantity = id => {
        const productObject = cartList.find(eachCartItem => eachCartItem.id === id)

        if (productObject.quantity > 1) {
            setCartList(prevList =>
                prevList.map(eachCartItem => {
                    if (eachCartItem.id === id) {
                        const updatedQuantity = eachCartItem.quantity - 1
                        return { ...eachCartItem, quantity: updatedQuantity }
                    }
                    return eachCartItem
                })
            )
        } else {
            removeCartItem(id)
        }
    }

    const removeCartItem = id => {
        const updatedCartList = cartList.filter(
            eachCartItem => eachCartItem.id !== id,
        )
        setCartList(updatedCartList);
    }

    const addCartItem = product => {
        const productObject = cartList.find(
            eachCartItem => eachCartItem.id === product.id,
        )

        if (productObject) {
            setCartList(prevList =>
                prevList.map(eachCartItem => {
                    if (eachCartItem.id === productObject.id) {
                        const updatedQuantity = eachCartItem.quantity + product.quantity
                        return { ...eachCartItem, quantity: updatedQuantity }
                    }
                    return eachCartItem
                }),
            )
        } else {
            const updatedCartList = [...cartList, product]
            setCartList(updatedCartList);
        }
    }

    return (
        <CartContext.Provider
            value={{
                cartList,
                addCartItem,
                removeCartItem,
                incrementCartItemQuantity,
                decrementCartItemQuantity,
                removeAllCartItems,
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/" element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    } />
                    <Route path="/products" element={
                        <ProtectedRoute>
                            <Products />
                        </ProtectedRoute>
                    } />
                    <Route path="/products/:id" element={
                        <ProtectedRoute>
                            <ProductItemDetails />
                        </ProtectedRoute>
                    } />
                    <Route path='/cart' element={
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    } />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </CartContext.Provider>
    )
}

export default App;