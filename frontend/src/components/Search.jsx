//Working on making it work with fake data for testing

import React, {useState} from 'react'

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    if (searchInput.length > 0) {
        //filter through data
    }

    return <div>

    <input
        type="text"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput} />
    </div>
    
};

export default SearchBar;
