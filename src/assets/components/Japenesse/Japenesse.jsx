import { useState } from 'react'
// import logo from 'my-app/src/assets/images/';
import Action1 from '@/assets/images/competitive (1).png';



const Japenesse = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    
 <div class="japenese-car" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="900">
        <div class="japenese-text">
            <p class="japenese-text-1">Your Car, Your Way.</p>
            <p class="japenese-text-2">Buy instantly or take the auction route — both backed by expert support.</p>
            <div class="japenese-btn">
                <a class="japenese-btn-1" href="#">Buy From Stock</a>
                <a class="japenese-btn-2" href="#">Buy From Action</a>
            </div>
        </div>
    </div>
    
  )
}

export default Japenesse;