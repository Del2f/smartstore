// import React from 'react';
import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import store from "./store/store";
import App from "./App";

import GlobalStyles from "@styles/global-style";
import ScrollToTop from "./components/ScrollToTop";

import Login from "./pages/Login";
// import Intro from "./pages/adminPage/Intro";
import Notfound from "./pages/Notfound";
import Shop from "./pages/shop/Shop";
import Buy from "./pages/shop/Buy before";

import { CookiesProvider } from "react-cookie";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

// import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <>
    {/* <React.StrictMode> */}
    <CookiesProvider>
      <BrowserRouter basename="smartstore">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ScrollToTop />
            <GlobalStyles />
            <Routes>
              {/* <Route path="/" element={<Intro />} /> */}
              <Route path="/" element={<Login />} />
              <Route path="/home/*" element={<App />} />
              <Route path="/shop/*" element={<Shop />} />
              <Route path="/buy/:id" element={<Buy />} />
              <Route path="*" element={<Notfound />} />
            </Routes>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </CookiesProvider>
    {/* </React.StrictMode> */}
  </>
);
