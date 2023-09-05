import App from './App.jsx'
import { useState } from 'react'



function SearchBar(props) {

    const [inputVal, setInputVal] = useState('');

    const handleInputChange= (event) => {
        const newValue = event.target.value;
        setInputVal(newValue);
        props.onInputChange(newValue);
        console.log(newValue)
    }
    
    return (
        <div>
            <input type='search' id='citysearch' className='city-search' placeholder={inputVal} onChange={handleInputChange}></input>
            <div>
                {props.searchResult}
            </div>
        </div>
    )
    
}

export default SearchBar