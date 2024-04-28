import { ReactNode } from 'react';

import NavComponent from '../components/nav-component/NavComponent';
import FooterComponent from '../components/footer-component/FooterComponent';
import WhiteSpace from '../components/white-space/WhiteSpace';


function Layout({children}: {children: ReactNode}) {


  return (
    <>
      <NavComponent />
      {children}
      <WhiteSpace />
      <FooterComponent />
    </>
  )
}

export default Layout