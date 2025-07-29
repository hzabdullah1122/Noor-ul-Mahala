import { useState } from 'react'
// import logo from 'my-app/src/assets/images/';
import Action1 from '@/assets/images/competitive (1).png';
import logo from '@/assets/images/background-remove-logo.png';
import link from '@/assets/images/Link.png';
import link2 from '@/assets/images/Link (1).png';
import link3 from '@/assets/images/Link (2).png';
import link4 from '@/assets/images/Link (3).png';


const Footer = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    return (

        <section class="footer">
            <div>
                <img class="link-logo" src={logo} alt="Noor Al Mahala Logo" />
                <p class="footer-p-2">Trusted Global Exporter  Quality Transparency & Speed</p>
            </div>
            <div class="new "  style={{ display: 'flex' }}>
                <div class="footer-data">
                    <p class="footer-p">Follow Us</p>
                    <div class="link">
                        <img class="link-img" src={link} alt="Noor Al Mahala Logo" />
                        <img class="link-img" src={link2} alt="Noor Al Mahala Logo" />
                        <img class="link-img" src={link3} alt="Noor Al Mahala Logo" />
                        <img class="link-img" src={link4} alt="Noor Al Mahala Logo" />
                    </div>
                    <p class="footer-p-6">Alrights Reserved By Webcraftio</p>
                </div>
                <div class="footer-data">
                    <p class="footer-p">Quick Links</p>
                    <p class="footer-p-3">HOME</p>
                    <p class="footer-p-3">IVA SERVICE</p>
                </div>
                <div class="footer-data">
                    <p class="footer-p">Quick contact</p>
                    <div class="footer-flex">
                        <div class="footer-flex-img">
                        </div>
                        <p class="footer-p-3">Address uk</p>
                    </div>
                    <div class="footer-flex">
                        <div class="footer-flex-img-2">
                            
                        </div>
                        <p class="footer-p-3">111-39873246</p>
                    </div>
                    <div class="footer-flex">
                        <div class="footer-flex-img-3">
                        </div>
                        <p class="footer-p-3">Info@noorulmaha.com</p>
                    </div>
                </div>
                <div class="footer-data">
                    <p class="footer-p-5">Copyright © 2025 All rights reserved.</p>
                </div>
            </div>
        </section>
    )
}

export default Footer;