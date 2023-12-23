import { useState, useEffect } from 'react'
import { Dialog, Popover } from '@headlessui/react'
// import { Popover } from '@headlessui/react'
// import { Bars3Icon } from '@heroicons/react/24/outline'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Logo from "../assets/logo/suitmedia.png"

function Header(){
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('Ideas');
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      const isScrollingUp = currentScrollPos > prevScrollPos
      setIsScrolled(isScrollingUp)
      setIsAtTop(currentScrollPos <= 0)
      setPrevScrollPos(currentScrollPos)
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
        window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const links = [
    { text: 'Work', href: '#' },
    { text: 'About', href: '#' },
    { text: 'Services', href: '#' },
    { text: 'Ideas', href: '#' },
    { text: 'Careers', href: '#' },
    { text: 'Contact', href: '#' },
  ];

  return (
    <header className={`bg-[#ff6600] fixed top-0 w-full z-50 ${isScrolled ? 'bg-transparent' : ''} transition duration-300 ease-in-out ${isAtTop ? 'bg-opacity-100' : 'bg-opacity-75'}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-24" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className={`-m-1.5 p-1.5 ${isScrolled ? 'opacity-0' : ''}`}>
            <img className="w-28" src={Logo} alt="" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-8">
          {links.map((link) => (
              <a
                key={link.text}
                href={link.href}
                className={`text-sm font-semibold leading-6 text-white ${isScrolled ? 'opacity-0' : ''} ${
                  activeLink === link.text ? 'border-b-4 border-white' : ''
                }`}
                onClick={() => handleLinkClick(link.text)}
              >
                {link.text}
              </a>
            ))}
        </Popover.Group>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <Popover.Group className="space-y-2 py-6">
                {links.map((link) => (
                    <a
                      key={link.text}
                      href={link.href}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black hover:bg-gray-50 ${isScrolled ? 'opacity-0' : ''} ${
                        activeLink === link.text ? 'border-b-4 border-white' : ''
                      }`}
                      onClick={() => handleLinkClick(link.text)}
                    >
                      {link.text}
                    </a>
                  ))}
              </Popover.Group>

                {/* <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Work
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  About
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Service
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Ideas
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Careers
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Contact
                </a> */}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}

export default Header
