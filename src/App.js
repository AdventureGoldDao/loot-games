import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import './i18n'
import "./assets/css/style.scss";
import "tailwindcss/tailwind.css"
import { ContextProvider } from "./reducer";
import Layout from "./components/Layout";
import Games from "pages/Games";
import GameDetail from "pages/GameDetail";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

const routeArr = [
  {
    component: Games, path: '/games', special: 'game'
  },
  {
    component: GameDetail, path: '/games/:id', special: 'game'
  },
]

function App() {
  return (
    <ContextProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Router>
          <Layout routeArr={routeArr}>
            <CacheSwitch>
              <Route exact path="/">
                <Redirect to="/games" />
              </Route>
              {
                routeArr.map(item => {
                  if (item.cache) {
                    return <CacheRoute cacheKey={item.path} key={item.path} exact {...item} />
                  }
                  return <Route key={item.path} exact {...item} />
                })
              }
            </CacheSwitch>
          </Layout>
        </Router>
      </Web3ReactProvider>
    </ContextProvider>
  );
}

export default App;
