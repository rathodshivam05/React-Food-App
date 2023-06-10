import React, { useContext } from 'react';
import './recipeItem.css'
import { ThemeContext } from '../App';


const FavoritesItem = (props) => {
    const { id, image, title, removeFromFavorites } = props;
    const { theme } = useContext(ThemeContext);
    return (
        <div key={id} className='recipe-item'>
            <div>
                <img src={image} alt="image of recipe" />
            </div>
            <p style={theme ? { color: "#12343b" } : {}}>{title}</p>
            <button style={theme ? { backgroundColor: "#12343b" } : {}} onClick={removeFromFavorites}>remove from favorites</button>
        </div>
    )
}

export default FavoritesItem
