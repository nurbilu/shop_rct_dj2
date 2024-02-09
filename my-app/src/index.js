import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Shop from './Shop';
import AllCtas from './AllCtas';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<h1>plz choose from nav bar</h1>} />
          <Route path="/helolo" element={<h1>helolo</h1>} />
          <Route path="/shop" element={<Shop />}>
            <Route path="/shop/allCtas/:id" element={<AllCtas />} />
            <Route path="*" element={<h1>not found</h1>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>

  </React.StrictMode>
);

