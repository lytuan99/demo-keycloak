import React, {useState} from "react";
import {useKeycloak} from "@react-keycloak/web";

import * as api from "../api";
import { setCookie} from "../utils/cookie";

const Home = () => {
  const {keycloak, initialized} = useKeycloak();
  const [animals, setAnimals] = useState([]);

  const handleLogin = async () => {
    const loggedIn = await keycloak.login({
      redirectUri: "http://localhost:3001/app2",
    });
    console.log("loggedIn: ", loggedIn);
  };

  const handleLogout = async () => {
    await keycloak.logout({
      redirectUri: "http://localhost:3001/app2",
    });
    setCookie("accessToken", null);
    setCookie("refreshToken", null);
  };

  const handleGetAnimals = async () => {
    const {data} = await api.getAnimals(keycloak.token);
    if (data && data.status) {
      setAnimals(data.result);
      return;
    }
    setAnimals([]);
  };

  const handleProfile = () => {
    keycloak.accountManagement();
  };

  return (
    <div className="App" style={{padding: "10vh 40%"}}>
      <div style={{display: "flex", gap: "20px"}}>
        {!keycloak.authenticated && (
          <button onClick={handleLogin}>Login</button>
        )}

        {keycloak.authenticated && (
          <>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleGetAnimals}>show animals</button>
            <button onClick={handleProfile}>Profile</button>
          </>
        )}
        
      </div>
      <br />
      <div style={{display: "flex", gap: "20px"}}>
        {animals && animals.map((animal) => <h3 key={animal}>{animal}</h3>)}
      </div>
    </div>
  );
};

export default Home;
