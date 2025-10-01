import { useState, useEffect } from "react"

export default function Vejr({ CityName }) {
  const API_KEY = "35d44656a04198632b2bd258d292f766"

  const [Weather, setWeather] = useState(null)

  useEffect(() => {
    const GeoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${CityName}&limit=1&appid=${API_KEY}`
    // Først hent koordinater
    fetch(GeoUrl)
     .then(response => response.json())
    .then(geoData => {
        console.log( geoData)

            // Hvis der er mindst 1 by (> 0) så kan vi bruge den første geoData[0]
        if (geoData.length > 0) {
        // Vi tager latitude (breddegrad) og longitude (længdegrad) fra byens data
          const latitude = geoData[0].lat
        const longitude = geoData[0].lon

          const ApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`

          // Hent vejrdata
          fetch(ApiUrl)
        .then(response => response.json())
            .then(weatherData => {
            console.log( weatherData)
              setWeather(weatherData)
            })
        } else {
            // Hvis Geo API ikke fandt en by, vi sætter weather til null
          setWeather(null)
        }
      })
  }, [CityName])



  const CardStyle = {
    border: "solid 1px black",
         padding: "10px",
      marginTop: "10px",
      width: "250px",
      textAlign:"center"

  }


  return (
    <div style={CardStyle}>
      <h2>{CityName} </h2>

    {/* Hvis vi har hentet vejret */}
      {Weather ? (
        <>
          <p>Temperatur: {Weather.main.temp} C</p>
            <p>Feels Like:{Weather.main.feels_like}</p>
          <img
            src={`http://openweathermap.org/img/wn/${Weather.weather[0].icon}@2x.png`}
        
          />
                <p>{Weather.weather[0].description}</p>

        </>
      ) : (
        // Hvis vi ikke har data, viser vi en besked
        <p>No result </p>
      )}
    </div>
  )
}


