import React from 'react';
import { Provider } from 'react-redux';
import { Router, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import store from './store/store';
import './index.css';
import App from './App';
import Commerce from "./pages/Commerce";
import Intro from "./pages/Intro";
import Notfound from "./pages/Notfound";
import Shop from "./pages/shop/Shop";
import UserPage from "./pages/user/Userpage";


import { CookiesProvider } from 'react-cookie';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

// import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.css';

let persistor = persistStore(store);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <>
  {/* <React.StrictMode> */}
  <CookiesProvider>
    <BrowserRouter basename="/smartstore/index.html">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Routes>  
              <Route path="/" element={<Intro />} />
              <Route path="/commerce/*" element={<Commerce />} />
              <Route path="/home/*" element={<App />} />
              <Route path="/user/*" element={<UserPage />} />
              <Route path="/shop/*" element={<Shop />} />
              <Route path="*" element={<Notfound />} />
            </Routes> 
          </PersistGate>
        </Provider>
    </BrowserRouter>
  </CookiesProvider>
  {/* </React.StrictMode> */}
  </>
);