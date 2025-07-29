import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import viteLogo from '/vite.svg';
import Header from './assets/components/Header/Header';
import Arrival from './assets/components/Arrival/Arrival';
import Search from './assets/components/Search/Search';
import Action from './assets/components/Action/Action';
import Map from './assets/components/Map/Map';
import Trading from './assets/components/Trading/Trading';
import Japeneese from './assets/components/Japenesse/Japenesse';
import Contact from './assets/components/Contact/Contact';
import Footer from './assets/components/Footer/Footer';
import Login from './assets/components/Login/Login';
import Admin from './assets/components/Admin/Admin';
import Customer from './assets/components/Customer/Customer';
import './App.css';
import './media.css';

const MainContent = () => {
  const location = useLocation();

  const hideHeaderRoutes = ['/login', '/admin', '/customer'];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Arrival />
              <Search />
              <Action />
              <Map />
              <Trading />
              <Japeneese />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/customer" element={<Customer />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <MainContent />
    </BrowserRouter>
  );
}

export default App;
