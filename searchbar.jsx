import App from './App.jsx'
import { useState, useEffect, useRef } from 'react'



function SearchBar(props) {

    const [inputVal, setInputVal] = useState('');
    const directions = useRef()

    const handleInputChange= (event) => {
        const newValue = event.target.value;
        setInputVal(newValue);
        props.onInputChange(newValue);
        console.log(newValue)
    }

    useEffect(() => {
        directions.current.style.display = 'none';
    }, [props.coordinates])

    useEffect(() => {
        directions.current.style.display = 'block';
    }, [inputVal])
  
    return (
        <div className='search-bar-container'>
            <input type='search' id='citysearch' className='city-search' placeholder={inputVal} onChange={handleInputChange}></input>
            <div className='city-option-display' ref={directions}>
                {props.searchResult}
            </div>
    </div>
    )
    
}

export default SearchBar