import React, { useCallback, useContext, useReducer, useState } from 'react'
import Search from '../Components/Search'
import "./homepage.css"
import RecipeItem from '../Components/RecipeItem';
import { useEffect } from 'react';
import FavoritesItem from '../Components/FavoritesItem';
import { ThemeContext } from '../App';

const initialState = {
    filteredValue: ''
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'filterFavorites':
            return {
                ...state,
                filteredValue: action.value
            }
        default:
            return state;
    }
}
const Homepage = () => {
    const [loading, setLoading] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [favorites, setFavorites] = useState([]);

    const [filteredState, dispatch] = useReducer(reducer, initialState);

    const { theme } = useContext(ThemeContext);
    const filteredFavoritesItems = favorites && favorites.length > 0 ? favorites.filter((item) =>
        item.title.toLowerCase().includes(filteredState.filteredValue)
    ) : [];

    const getSearchData = (searchData) => {
        // console.log("search", searchData);
        setLoading(true)
        async function getFoodData() {
            const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=77734db9cbe4439c82b8787608c1452c&query=${searchData}`)
            const res = await data.json();
            if (res.results && res.results.length > 0) {
                setLoading(false);
                setRecipes(res.results);
            }
        }

        getFoodData();
    }

    const addToFavorites = useCallback((currentItem) => {
        let copyFavorites = [...favorites];
        const index = copyFavorites.findIndex(item => item.id === currentItem.id);

        if (index === -1) {
            copyFavorites.push(currentItem);
            setFavorites(copyFavorites)
            localStorage.setItem('favorites', JSON.stringify(copyFavorites))
            window.scrollTo({ top: "0", behavior: "smooth" })
        } else {
            alert('Item already present in favorites')
        }
    }, [favorites])

    const removeFromFavorites = (getFavoritesId) => {
        let copyFavorites = [...favorites];
        copyFavorites = copyFavorites.filter((item) => item.id !== getFavoritesId);
        setFavorites(copyFavorites);
        localStorage.setItem('favorites', JSON.stringify(copyFavorites));
    }

    const renderRecipes = useCallback(() => {
        if (recipes && recipes.length > 0) {
            return recipes.map(e => <RecipeItem key={e.id} addToFavorites={() => addToFavorites(e)} {...e} />)
        }
    }, [recipes, addToFavorites])

    useEffect(() => {
        const getFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(getFavorites)
    }, [])
    return (
        <div>
            <Search getSearchData={getSearchData} />
            <div className="favorites-wrapper">
                <h1 style={theme ? { color: "#12343b" } : {}} className='favorites-title'>Favorites</h1>
                <div className="search-favorites">
                    <input
                        onChange={(e) => dispatch({ type: "filterFavorites", value: e.target.value })}
                        type="text"
                        value={filteredState.filteredValue}
                        name='searchfavorites'
                        placeholder='search favorites' />
                </div>
                <div className="favorites">
                    {!filteredFavoritesItems.length && <div style={{ width: "100%", display: "flex", justifyContent: "center" }} className='no-items'>No favorite Item Found</div>}
                    {
                        filteredFavoritesItems && filteredFavoritesItems.length > 0 ?
                            filteredFavoritesItems.map((e) => <FavoritesItem removeFromFavorites={() => removeFromFavorites(e.id)} key={e.id} {...e} />)
                            : null
                    }
                </div>
            </div>
            {
                loading && (<div className='loading'>Loading recipes ! Please wait.</div>)
            }
            <div className="items">
                {renderRecipes()}
            </div>
            {
                !loading && !recipes.length && (<div className='no-items' style={{ display: "flex", justifyContent: "center" }}>No recipes found</div>)
            }
        </div>
    )
}

export default Homepage
