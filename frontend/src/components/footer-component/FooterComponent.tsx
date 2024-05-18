import { Image, Navbar } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { Outlet } from 'react-router-dom';
import './Footer.scss';
import ContactPopup from '../contact-popup/ContactPopup';


function FooterComponent() {

  const links = [
    ['react', 'https://react.dev/'],
    ['github', 'https://github.com/'],
    ['gitlab', 'https://gitlab.com/'],
    // ['', ''],
    ['linkedin', 'https://www.linkedin.com/'],
    ['facebook', 'https://www.facebook.com/'],
    ['instagram', 'https://www.instagram.com/'],
    ['twitter', 'https://www.twitter.com/'],
  ];

  return (
    <>
      <Navbar fixed='bottom'>
        <Nav
            // className='footer-nav-bg'
            // activeKey="/home"
        >
          {links.map((data: string[], key) => (<>
            {data[0] &&
              <Nav.Item key={key} 
                className='footer-nav-bg'
              >
                <a href={ data[1] } target='_blank'>
                  <Image 
                    src={`/logos/${data[0]}.svg`}
                    alt={data[0]}
                    width='30px'
                    height='30px'
                  />
                </a>
              </Nav.Item>
            }
          </>))}
        </Nav>
        <Nav
            // onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        >
          <ContactPopup />
        </Nav>
      </Navbar>

      <Outlet />
    </>
  )
}

export default FooterComponent