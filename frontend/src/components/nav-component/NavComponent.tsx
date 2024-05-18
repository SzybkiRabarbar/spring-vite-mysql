import { Button, Form, Image } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, Outlet } from 'react-router-dom';
import logo from '../../assets/shoe-prints-solid.svg';
import '../../utils/aElementNoneDecoration.scss';
import './NavComponent.scss';


function NavComponent() {

  const dropdownLinks = [
    ['Add photo', '/add-image'],
    ['Check gallery', '/added-images']
  ]

  return (
    <>
      <Navbar sticky='top' className="bg-body-tertiary no-a-decorators">
        <Container>
          <Navbar.Brand>
            <Nav.Link>
              <Link to={ '/' }>
                <Image src={logo} width='30px' />
              </Link>
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link  to={ '/about' }>
                  <div className='expand'>
                   About
                  </div>
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link  to={ '/items' }>
                  <div className='expand'>
                    Our catalog
                  </div>
                </Link>
              </Nav.Link>
              <NavDropdown title="Show us Your sneakers!" id="basic-nav-dropdown">
                {dropdownLinks.map((data, key) => (
                  <NavDropdown.Item key={key}>  
                    <Link  to={data[1]}>
                      <div className='expand'>
                        { data[0] }
                      </div>
                    </Link>
                  </NavDropdown.Item>
                ))}
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link to={ '/about-photos' }>
                    <div className='expand'>
                      What is that?
                    </div>
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-primary">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <Outlet />
    </>
  )
}

export default NavComponent