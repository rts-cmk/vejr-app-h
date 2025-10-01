import { useState } from "react"
import Vejr from "./components/vejr"

function App() {
  const [CityName, setCityName] = useState("London")
  const [InputValue, setInputValue] = useState("")


    // Når man klikker på knappen, gemmer vi bynavnet
  function handleSearch() {
    setCityName(InputValue)   // vi sætter CityName til det brugeren skrev
    setInputValue("")         // vi tømmer inputfeltet bagefter
  }


  return (
    <>
      <h1>Vejr App</h1>
      <input type="text" placeholder="bynavn..." value={InputValue}
        onChange={(event) => setInputValue(event.target.value)} // opdaterer InputValue
      />

    
      <button onClick={handleSearch}> søg</button>

      <Vejr CityName={CityName} />
    </>
  )
}

export default App
