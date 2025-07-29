import { useState } from 'react'
// import logo from 'my-app/src/assets/images/';
import Action1 from '@/assets/images/competitive (1).png';
import Action2 from '@/assets/images/Icon.png';



const Contact = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return ( 
     <section id="contact-section">
        <h2>Contact Us</h2>
        <p class="contact-padding">To get started, simply reach out to us or fill this form to request more information or a quote.</p>
        <form class="contact-form">
            <div class="input-group"> 
                <input type="text" placeholder="Your Name" required/>
                <input type="email" placeholder="Your Email" required/>
            </div>
            <div class="input-group">
                <input type="tel" placeholder="Telephone" required/>
                <input type="text" placeholder="Interested Vehicle"/>
            </div>
            <textarea placeholder="Your Message" rows="5" required></textarea>
            <button type="submit">Submit</button>
        </form>
    </section>
  )
}

export default Contact;