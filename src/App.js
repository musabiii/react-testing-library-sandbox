import "./App.css";
import { useState } from "react";

const Search = ({ value, onChange, children }) => (
  <div>
    <label htmlFor="search">{children}</label>
    <input id="search" type="text" value={value} onChange={onChange} placeholder='search...'/>
  </div>
);

function App() {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="App">
      <img alt="search image"/>
      <Search value={search} onChange={handleChange}>
        Search:
      </Search>
      <p>Searches for {search ? search : "..."}</p>
    </div>
  );
}

export default App;
