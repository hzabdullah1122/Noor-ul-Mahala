import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Trading1 from '@/assets/images/Icon (1).png';
import Trading2 from '@/assets/images/Icon (2).png';
import Trading3 from '@/assets/images/Icon (3).png';

const Trading = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div id="trading-section">
      <div
        class="trading-img"
        data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
      ></div>

      <div class="trading-data" data-aos="fade-up">
        <p class="trading-1">Why Choose Noor Al Mahala Trading</p>
        <p class="trading-2">
          At Noor Mahala Trading, we excel in providing seamless and reliable car sales and
          export services, backed by decades of experience and a customer-centric approach.
          Here’s why thousands trust us:
        </p>

        <div class="trading-flex">
          <div class="trading-flex-1" data-aos="fade-up" data-aos-delay="100">
            <div class="trading-icon">
              <img src={Trading1} alt="Trusted Exporter" />
            </div>
            <div class="trading-margin">
              <p class="trading-3">Trusted Global Exporter</p>
              <p class="trading-4">
                With over 15 years in the car export business, we have built a reputation for
                reliability, speed, and exceptional service. Our strong global presence ensures
                smooth transactions and satisfied clients across 8+ countries.
              </p>
            </div>
          </div>

          <div class="trading-flex-2" data-aos="fade-up" data-aos-delay="200">
            <div class="trading-icon">
              <img src={Trading2} alt="Tailored Solutions" />
            </div>
            <div class="trading-margin">
              <p class="trading-3">Tailored Solutions for Every Buyer</p>
              <p class="trading-4">
                Whether you're a first-time buyer or a dealership, we craft flexible
                solutions to meet your needs. From auctions to direct stock, we simplify every
                step of the process.
              </p>
            </div>
          </div>

          <div class="trading-flex-1" data-aos="fade-up" data-aos-delay="300">
            <div class="trading-icon">
              <img src={Trading3} alt="Transparency" />
            </div>
            <div class="trading-margin">
              <p class="trading-3">Transparent & Secure Process</p>
              <p class="trading-4">
                No hidden fees, no surprises. We prioritize honest communication, real-time
                updates, and complete transparency throughout your journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trading;
