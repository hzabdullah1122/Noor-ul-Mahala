import { useState } from 'react'
// import logo from 'my-app/src/assets/images/';
import logo from '@/assets/images/background-remove-logo.png';
import logo_2 from '../../../assets/images/logo-gpt.png';
import { Link } from 'react-router-dom';


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    return (
        <div class="hero-section">
            <div class="navbar">
                <div className="logo">
                    <img src={logo_2} alt="Noor Al Mahala Logo" />
                </div>
                <nav class="nav-links">
                    <ul class="nav-links-u">
                        <li><a href="#">Home</a></li>
                        <li><a href="#arrival-car-flex">Stock</a></li>
                        <li class="dropdown">
                            <a href="#search-vehicle">How to buy <svg class="arrow-icon" width="10" height="10"
                                viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 7L10 12L15 7" stroke="#000" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg></a>
                            <ul class="dropdown-content">
                                <li><a href="#">From Japan</a></li>
                                <li><a href="#">From Dubai</a></li>
                                <li><a href="#">From Local Market</a></li>
                            </ul>
                        </li>
                        <li><a href="#map">News</a></li>
                        <li><a href="#trading-section">About Us</a></li>
                        <li><a href="#contact-section">Contact Us</a></li>
                    </ul>
                </nav>
                <div class="nav-buttons">
                    <a href="#" class="register">Register Here</a>
                    <Link to="/login" className="login">Log In</Link>
                </div>
                <div class="navbar-2">
                    <button class="mobile-menu-toggle">☰</button>
                </div>
            </div>
            <div id="header-txt">
                <p class="top-txt">Trusted Global Exporter – Quality, Transparency & Speed</p>
                <p class="top-txt-2">We export premium Japanese cars to 8 regions worldwide, offering two flexible buying
                    options: from live auctions or direct stock — your perfect car, your way.</p>
                <div class="nav-buttons-2">
                    <a href="#" class="register">View Stock</a>
                    <a href="#" class="login">How to Buy?</a>
                </div>
            </div>
        </div>


    )
}

export default Header;