import React, { useState } from 'react';
import '../styles/search.css';
import Data from '../assets/MockData.json'

function Search() {
    const [filteredData, setFilteredData] = useState([]);

    const handleFilter = (event) => {
        const searchWord = event.target.value
        const newFilter = Data.filter((value) => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
        setFilteredData(newFilter);
    }
    
    return (
        <div className="search">
            <div className="searchInputs">
                <input type="text" placeholder="Enter Content of Post" onChange={handleFilter}/>
                <div className="searchIcon" placeholder="SEARCH"></div>
            </div>
            {filteredData.length != 0 && (
                <div className="dataResult">
                    {filteredData.slice(0, 15).map((value, key) => {
                        return (
                            <a className="dataItem" href={value.author} target="_blank">
                                <p>{value.title}</p>
                            </a>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Search;