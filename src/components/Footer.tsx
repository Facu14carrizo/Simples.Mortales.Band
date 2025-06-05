import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black py-8 border-t border-zinc-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a 
              href="#home" 
              className="text-white font-extrabold text-xl tracking-wider"
            >
              SIMPLES MORTALES
            </a>
          </div>
          
          <div className="text-zinc-500 text-sm">
            © {currentYear} Simples Mortales. All rights reserved.
          </div>
          
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="text-zinc-400 hover:text-red-500 transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-red-500 transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="https://github.com/Facu14carrizo" className="text-zinc-400 hover:text-red-500 transition-colors">
                  Credits
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;