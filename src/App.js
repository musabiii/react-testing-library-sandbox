import "./App.css";
import { useEffect, useState } from "react";

const getUser = () => Promise.resolve({id:1,name:"Musa"})

const Search = ({ value, onChange, children }) => (
  <div>
    <label htmlFor="search">{children}</label>
    <input id="search" type="text" value={value} onChange={onChange} placeholder='search...'/>
  </div>
);

function App() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState("");

  useEffect(()=>{
    const loadUser = async () => {
      const user = await getUser();
      setUser(user);
    };
    loadUser()
  },[])

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="App">
      {user && <h2> Logged in as {user.name}</h2>}
      <img alt="search image"/>
      <Search value={search} onChange={handleChange}>
        Search:
      </Search>
      <p>Searches for {search ? search : "..."}</p>
    </div>
  );
}

export default App;
