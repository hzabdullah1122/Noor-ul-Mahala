import { useState } from 'react'
// import logo from 'my-app/src/assets/images/';
import logo from '@/assets/images/background-remove-logo.png';


const Arrival = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    
   <div class="arrival-section">
        <div class="arrival-margin">
            <p class="arrival-1">Latest Arrival</p>
            <p class="arrival-2">Explore the Newest Cars in Our Inventory</p>
        </div>
        <div id="arrival-car-flex">
            <div class="arrival-car">
                <div class="arrival-inside">
                    <div class="arrival-inside-img">
                        {/* <!-- <img src="./noor al mahala pics data/Midnight Black Metallic-218-26,28,33-640-en_US.jpg" alt=""> --> */}
                    </div>
                    <div class="arrival-inside-txt">
                        <p class="arrival-txt-1">Toyota Vitz Yaris</p>
                        <p class="arrival-txt-2">Features</p>
                        <p class="arrival-txt-3">$342</p>
                        <div class="nav-buttons-2">
                            <a href="#" class="register-2">Inquire Now</a>
                        </div>
                    </div>

                </div>
            </div>
            <div class="arrival-car">
                <div class="arrival-inside">
                    <div class="arrival-inside-img-2">
                        {/* <!-- <img src="./noor al mahala pics data/Toyota-vitz-japanese.png" alt=""> --> */}
                    </div>
                    <div class="arrival-inside-txt">
                        <p class="arrival-txt-1">Toyota Vitz Yaris</p>
                        <p class="arrival-txt-2">Features</p>
                        <p class="arrival-txt-3">$342</p>
                        <div class="nav-buttons-2">
                            <a href="#" class="register-2">Inquire Now</a>
                        </div>
                    </div>

                </div>
            </div>
            <div class="arrival-car">
                <div class="arrival-inside">
                    <div class="arrival-inside-img-3">
                        {/* <!-- <img src="./images/car-3rd.png" alt=""> --> */}
                    </div>
                    <div class="arrival-inside-txt">
                        <p class="arrival-txt-1">Toyota Vitz Yaris</p>
                        <p class="arrival-txt-2">Features</p>
                        <p class="arrival-txt-3">$342</p>
                        <div class="nav-buttons-2">
                            <a href="#" class="register-2">Inquire Now</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    
  )
}

export default Arrival;