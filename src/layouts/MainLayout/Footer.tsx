import React from 'react';
import { LogoButton } from '@/layouts/MainLayout/HeaderLayout/logo-button';
import FooterList from '@/layouts/MainLayout/FooterLayout/footer-list';
import Copyright from '@/layouts/MainLayout/FooterLayout/copyright';
const Footer: React.FC = () => {
  return (
    <div className="w-full py-12 bg-[#F8F9FA] flex items-center justify-center">
      <div>
        <div className="flex mb-16 justify-center sm:gap-8 md:gap-16 lg:gap-40 xl-96">
          <LogoButton />
          <FooterList />
        </div>
        <div>
          <Copyright />
        </div>
      </div>
    </div>
  );
};

export default Footer;
