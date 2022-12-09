import React, { useState } from 'react';
import '../styles/search.css';
import Data from '../assets/MockData.json'

function Search() {
    const [filteredData, changeData] = useState([]);
    const [str, setStr] = useState("");

    const handleFilter = (event) => {
        const keyword = event.target.value
        setStr(keyword);
        const newFilter = Data.filter((value) => {
            return value.title.toLowerCase().includes(keyword.toLowerCase());
        });

        if (keyword === "") { changeData([]);} 
        else { changeData(newFilter); }

        changeData(newFilter);
    }
    
    return (
        <div className="search">
            <div className="input">
                <input type="text" placeholder="Enter Content of Post or Author" onChange={handleFilter}/>

            </div>
            {filteredData.length != 0 && (
                <div className="result">
                    {filteredData.slice(0, 20).map((value) => {
                        return (
                            <a className="item" href={value.content} target="_blank">
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