import { useState } from 'react'
// import logo from 'my-app/src/assets/images/';
import Action1 from '@/assets/images/competitive (1).png';



const Map = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
        <div id="map">
        <div class="map-text">
            <p class="map-1">We Shop to <span>Eight</span> Countries Worldwide</p>
            <p class="map-2">We offer seamless vehicle export services to Japan, Korea, Singapore, Thailand,China, UAE,
                UK, and more.</p>
            <div class="map-img-flex">
                <div class="map-img">
                    <div class="map-inside-img">

                    </div>
                    <div class="map-p">
                        <p>United Kingdom(UK)</p>
                    </div>

                </div>
                <div class="map-img">
                    <div class="map-inside-img-2">

                    </div>
                    <div class="map-p">
                        <p>Thailand</p>
                    </div>

                </div>
                <div class="map-img">
                    <div class="map-inside-img-3">

                    </div>
                    <div class="map-p">
                        <p>Japan</p>
                    </div>

                </div>
                <div class="map-img">
                    <div class="map-inside-img-4">

                    </div>
                    <div class="map-p">
                        <p>China</p>
                    </div>

                </div>
                <div class="map-img">
                    <div class="map-inside-img-5">

                    </div>
                    <div class="map-p">
                        <p>Singapore</p>
                    </div>

                </div>
                <div class="map-img">
                    <div class="map-inside-img-6">

                    </div>
                    <div class="map-p">
                        <p>Korea</p>
                    </div>

                </div>
                <div class="map-img">
                    <div class="map-inside-img-7">

                    </div>
                    <div class="map-p">
                        <p>United Arab Emirates(UAE)</p>
                    </div>

                </div>

            </div>
        </div>
    </div>
  )
}

export default Map;