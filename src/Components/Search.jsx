import React, { useContext, useState } from 'react';
import './search.css';
import { ThemeContext } from '../App';

const Search = (props) => {
    const { getSearchData } = props;
    const [searchVal, setSearchVal] = useState('');
    const { theme } = useContext(ThemeContext)

    const handleSearch = (event) => {
        const { value } = event.target;
        setSearchVal(value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        getSearchData(searchVal);
        setSearchVal('')
    }
    // console.log(searchVal);
    return (
        <form className='search'>
            <input type="text" value={searchVal} onChange={handleSearch} name='search' placeholder='Search Receipies' id='search' />
            <button style={theme ? { backgroundColor: "#12343b" } : {}} type='submit' onClick={handleSubmit}>Search</button>
        </form>
    )
}

export default Search
