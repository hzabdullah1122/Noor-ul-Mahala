import { useState } from 'react'
// import logo from 'my-app/src/assets/images/';
import Action1 from '@/assets/images/competitive (1).png';
import Action2 from '@/assets/images/Icon.png';
import Action3 from '@/assets/images/hygiene.png';
import Action4 from '@/assets/images/insight.png';
import Action5 from '@/assets/images/ribbon.png';
import Action6 from '@/assets/images/Vector.png';


const Action = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    
        <div class="action">
        <p class="action-1"> Why Buy from Japan Auto Auction</p>
        <p class="action-2"> The Smart Way to Own a Car</p>
        <p class="action-3">Japanese auto auctions give access to a wide variety of well-maintained, affordable
            vehicles. With full inspection reports and verified histories, it’s the safest and most cost-effective way
            to purchase cars.</p>
        <div class="action-flex">
            <div class="action-txt">
                <img src={Action1 } alt="Noor Al Mahala Logo" />
                <p class="action-bold">Competitive Prices</p>
                <p class="action-p">Japanese auto auctions offer vehicles at significantly lower prices compared to
                    local markets, giving you unbeatable value.</p>
            </div>
            <div class="action-txt">
               <img src={Action2} alt="Noor Al Mahala Logo" />
                <p class="action-bold"> Extensive Selection</p>
                <p class="action-p">Choose from over 100,000 vehicles across Japan’s top auction houses — from economy
                    to luxury, there's something for everyone.</p>
            </div>
            <div class="action-txt">
                <img src={Action3} alt="Noor Al Mahala Logo" />
                <p class="action-bold">Trusted Accuracy</p>
                <p class="action-p">Each vehicle includes a detailed auction inspection sheet, ensuring full
                    transparency on its condition and history of that.</p>
            </div>
            <div class="action-txt">
                <img src={Action4} alt="Noor Al Mahala Logo" />
                <p class="action-bold">Real Market Insights</p>
                <p class="action-p">Get access to market price data to help you bid smart and maximize your investment.
                </p>
            </div>
            <div class="action-txt">
                <img src={Action5} alt="Noor Al Mahala Logo" />
                <p class="action-bold">Premium Quality Vehicles</p>
                <p class="action-p">Only high-grade used cars with verified quality are available — carefully inspected
                    and priced fairly.</p>
            </div>
            <div class="action-txt">
               <img src={Action6} alt="Noor Al Mahala Logo" />
                <p class="action-bold">Fast & Hassle-Free Shipping</p>
                <p class="action-p">We handle customs and logistics for quick, secure delivery on the next available
                    vessel of this product.</p>
            </div>
        </div>
    </div>
    
  )
}

export default Action;