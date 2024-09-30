import React, { useState, useEffect } from 'react';
import './style.css';

const TempApp = () => {
    const [data, setData] = useState(null);
    const [city, setCity] = useState("");
    const [inputCity, setInputCity] = useState(""); // State to store user input

    useEffect(() => {
        const fetchApi = async () => {
            if (city) { // Call API only if city is not empty
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f987418a70c3346f32f6b11a6bdd7106&units=metric`;
                const response = await fetch(url);
                const responseJson = await response.json();
                console.log(responseJson);

                setData(responseJson.main);
            }
        }
        fetchApi();
    }, [city]);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setCity(inputCity); // Set city when Enter is pressed
        }
    };

    return (
        <div className='box'>
            <div>
                <h2 className='tophead'>Live Weather City</h2>
            </div>
            
            <div className='inputData'>
                
                <input
                    type="text" // Use "text" type for a generic input
                    className='inputField'
                    placeholder='Enter city'
                    value={inputCity}
                    onChange={(event) => setInputCity(event.target.value)} // Update inputCity as user types
                    onKeyPress={handleKeyPress} // Check for Enter key press
                />
            </div>
            {!data ? (
                <p>No data found</p>
            ) : (
                <div>
                    <div className='info'>
                        <h2 className='location'>
                            <i className="fa-sharp fa-solid fa-street-view"></i>{city}
                        </h2>
                        <h1 className='temp'>
                            {data.temp} °C
                        </h1>
                        <h3 className='tempmin_max'>Max: {data.temp_max}°C | Min: {data.temp_min}°C</h3>
                        <br />
                        <h3>Humidity: {data.humidity}</h3>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TempApp;
