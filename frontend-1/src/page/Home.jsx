import React, {useState} from "react";
import {useKeycloak} from "@react-keycloak/web";

import * as api from "../api";
import {setCookie} from "../utils/cookie";

const Home = () => {
  const {keycloak} = useKeycloak();
  const [animals, setAnimals] = useState([]);

  const handleGetMe = async () => {
    const { data } = await api.getMe();
    console.log('get Me: ', data.result);
  }

  const handleLogin = async () => {
    const loggedIn = await keycloak.login({
      redirectUri: "http://localhost:3000/app1",
    });
    console.log("loggedIn: ", loggedIn);
  };

  const handleLogout = async () => {
    await keycloak.logout({
      redirectUri: "http://localhost:3000/app1",
    });
    setCookie("accessToken", null);
    setCookie("refreshToken", null);
  };

  const handleGetAnimals = async (verifyType) => {
    const {data} = await api.getAnimals(verifyType);
    if (data && data.status) {
      setAnimals(data.result);
      return;
    }
    setAnimals([]);
    alert(data);
  };

  const handlePostAnimals = async () => {
    const {data} = await api.postAnimals();
    if (data && data.status) {
      setAnimals(data.result);
      return;
    }
    setAnimals([]);
    alert(data);
  };

  const handlePutAnimals = async () => {
    const {data} = await api.putAnimals();
    if (data && data.status) {
      setAnimals(data.result);
      return;
    }
    setAnimals([]);
    alert(data);
  };

  const handleDeleteAnimals = async () => {
    const {data} = await api.deleteAnimals();
    if (data && data.status) {
      setAnimals(data.result);
      return;
    }
    setAnimals([]);
    alert(data);
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
            <button onClick={handleGetMe}>getMe</button>
            <button onClick={() => handleGetAnimals("protect")}>
              GET animals with PROTECT
            </button>
            <button onClick={() => handleGetAnimals("enforcer")}>
              GET animals with ENFORCER
            </button>
            <button onClick={() => handlePostAnimals()}>
              POST Animals
            </button>
            <button onClick={() => handlePutAnimals()}>
              PUT Animals
            </button>
            <button onClick={() => handleDeleteAnimals()}>
              DELETE Animals
            </button>

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
