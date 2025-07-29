import { useState } from 'react'
// import logo from 'my-app/src/assets/images/';
import logo from '@/assets/images/background-remove-logo.png';


const Search = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    
     <div id="search-vehicle">
        <p class="search-vehicle-1">Search For a Vehicle</p>
        <div class="filter-container">
            <select class="search-input">
                <option selected disabled>Make (Any)</option>
                <option>Toyota</option>
                <option>Nissan</option>
                <option>Honda</option>
            </select>

            <select class="search-input">
                <option selected disabled>Model (Any)</option>
                <option>Corolla</option>
                <option>Civic</option>
                <option>Altima</option>
            </select>

            <select class="search-input">
                <option selected disabled>Body Type (Any)</option>
                <option>Sedan</option>
                <option>SUV</option>
                <option>Hatchback</option>
            </select>

            <select class="search-input">
                <option selected disabled>Fuel (Any)</option>
                <option>Petrol</option>
                <option>Diesel</option>
                <option>Hybrid</option>
            </select>
            <div class="nav-buttons-3">
                <a href="#" class="login">Search</a>
            </div>
        </div>

    </div>
    
  )
}

export default Search;