'use client';

import Image from 'next/image';
import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { CalendlyButton } from '@/components/calendly-button';
import '@/styles/landing.scss';

export function Navbar() {
//   const toggleMobileMenu = () => {
//     const menu = document.getElementById('mobile-menu');
//     menu?.classList.toggle(styles.hidden);
//   };

  return (
    <header className="header">
      <nav className="nav">
        <div className="inner">
          <Link href="/" className="logo">
            <Image
              src="/timmo-icon.svg"
              alt="TIMMO"
              width={140}
              height={40}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="desktopNav">
            <a href="/#comment-ca-marche">Comment ça marche ?</a>
            <Link href="/qui-sommes-nous">Qui sommes-nous?</Link>
            <a href="/#avantages">Avantages</a>
            <a href="/#faq">FAQ</a>

            {/* <CalendlyButton className="calendly">
              Rendez-vous
            </CalendlyButton> */}

            <Link href="/newsletter">
              {/* <Button className="invest">
                Investir
              </Button> */}
            </Link>
          </div>

          {/* Mobile */}
          <div className="mobile">
            {/* <button
              onClick={toggleMobileMenu}
              className="burger"
            >
              ☰
            </button> */}

            <div
              id="mobile-menu"
              className="mobileMenu hidden"
            >
              <a href="/#comment-ca-marche">Comment ça marche ?</a>
              <Link href="/qui-sommes-nous">Qui sommes-nous?</Link>
              <a href="/#avantages">Avantages</a>
              <a href="/#faq">FAQ</a>

              <hr />

              {/* <CalendlyButton className="calendlyMobile">
                Rendez-vous
              </CalendlyButton> */}

              <Link href="/newsletter">
                {/* <Button className="investMobile">
                  Investir
                </Button> */}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
