import { useState, useEffect } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
    {
        name: 'Clothing',
        categoryId: '1',
    },
    {
        name: 'Electronics',
        categoryId: '2',
    },
    {
        name: 'Appliances',
        categoryId: '3',
    },
    {
        name: 'Grocery',
        categoryId: '4',
    },
    {
        name: 'Toys',
        categoryId: '5',
    },
]

const sortbyOptions = [
    {
        optionId: 'PRICE_HIGH',
        displayText: 'Price (High-Low)',
    },
    {
        optionId: 'PRICE_LOW',
        displayText: 'Price (Low-High)',
    },
]

const ratingsList = [
    {
        ratingId: '4',
        imageUrl:
            'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
    },
    {
        ratingId: '3',
        imageUrl:
            'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
    },
    {
        ratingId: '2',
        imageUrl:
            'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
    },
    {
        ratingId: '1',
        imageUrl:
            'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
    },
]

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}

const AllProductsSection = () => {
    const [productsList, setProductsList] = useState([]);
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
    const [activeOptionId, setActiveOptionId] = useState(sortbyOptions[0].optionId);
    const [searchInput, setSearchInput] = useState('');
    const [activeCategoryId, setActiveCategoryId] = useState('');
    const [activeRatingId, setActiveRatingId] = useState('');

    const getProducts = async () => {
        setApiStatus(apiStatusConstants.inProgress);

        const jwtToken = Cookies.get('jwt_token');
        const apiUrl = `https://srinivas-nxt-trendz-backend-project.vercel.app/products?sort_by=${activeOptionId}&category=${activeCategoryId}&title_search=${searchInput}&rating=${activeRatingId}`
        const options = {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
            method: 'GET',
        }

        const response = await fetch(apiUrl, options)
        if (response.ok) {
            const fetchedData = await response.json()
            // console.log("fetcheddata:", fetchedData);
            const updatedData = fetchedData.products.map(product => ({
                title: product.title,
                brand: product.brand,
                price: product.price,
                id: product.id,
                imageUrl: product.image_url,
                rating: product.rating,
            }));
            setProductsList(updatedData);
            setApiStatus(apiStatusConstants.success);

        } else {
            setApiStatus(apiStatusConstants.failure);
        }
    }

    useEffect(() => {
        getProducts();
    }, [activeOptionId, activeCategoryId, activeRatingId]);

    const renderLoaderView = () => (
        <div className="products-loader-container">
            <ThreeDots type="ThreeDots" color="#0b69ff" height="50" width="50" />
        </div>
    )

    const renderFailureView = () => (
        <div className="products-error-view-container">
            <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
                alt="products failure"
                className="products-failure-image"
            />
            <h1 className="products-error-heading">Oops! Something Went Wrong.</h1>
            <p className="products-error-description">
                We are having some trouble processing your request. Please try again.
            </p>
        </div>
    )

    const changeSortby = activeOptionId => {
        setActiveOptionId(activeOptionId);
    }

    const renderProductsListView = () => {
        const showProductsList = productsList.length > 0

        return showProductsList ? (
            <div className="all-products-container">
                <ProductsHeader
                    activeOptionId={activeOptionId}
                    sortbyOptions={sortbyOptions}
                    changeSortby={changeSortby}
                />
                <ul className="products-list">
                    {productsList.map(product => (
                        <ProductCard productData={product} key={product.id} />
                    ))}
                </ul>
            </div>
        ) : (
            <div className="no-products-view">
                <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
                    alt="no products"
                    className="no-products-image"
                />
                <h1 className="no-products-heading">No Products Found</h1>
                <p className="no-products-description">
                    We could not find any products. Try other filters.
                </p>
            </div>
        )
    }

    const changeSearchInput = searchInput => {
        setSearchInput(searchInput);
    }

    const changeCategory = activeCategoryId => {
        setActiveCategoryId(activeCategoryId);
    }

    const enterSearchInput = () => {
        getProducts();
    }

    const changeRating = activeRatingId => {
        setActiveRatingId(activeRatingId);
    }

    const renderAllProducts = () => {
        switch (apiStatus) {
            case apiStatusConstants.success:
                return renderProductsListView()
            case apiStatusConstants.failure:
                return renderFailureView()
            case apiStatusConstants.inProgress:
                return renderLoaderView()
            default:
                return null
        }
    }

    const clearFilters = () => {
        setSearchInput('');
        setActiveCategoryId('');
        setActiveRatingId('');
        getProducts();
    }

    return (
        <div className="all-products-section">
            <FiltersGroup
                searchInput={searchInput}
                categoryOptions={categoryOptions}
                ratingsList={ratingsList}
                changeSearchInput={changeSearchInput}
                enterSearchInput={enterSearchInput}
                changeCategory={changeCategory}
                changeRating={changeRating}
                activeCategoryId={activeCategoryId}
                activeRatingId={activeRatingId}
                clearFilters={clearFilters}
            />

            {renderAllProducts()}
        </div>
    )
}

export default AllProductsSection