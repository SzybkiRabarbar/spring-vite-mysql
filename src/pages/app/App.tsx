import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Image } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';

import { feed } from '../../content/feed';
import WhiteSpace from '../../components/white-space/WhiteSpace';


function App() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <Carousel>
              <Carousel.Item>
                <Image src='banners/seeour.png' width={'100%'}/>
              </Carousel.Item>
              <Carousel.Item>
                <Image src='banners/black.png' width={'100%'}/>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
        <WhiteSpace />
        <Row>
          {feed.map((data, key) => (
            <Col key={key}>
              <Card style={{ width: '26rem' }}>
                <Card.Img variant="top"
                  src={ data.imagePaths[0] } 
                  onMouseEnter={e => (e.currentTarget.src = data.imagePaths[4])}
                  onMouseLeave={e => (e.currentTarget.src = data.imagePaths[0])}
                />
                <Card.Body>
                  <Card.Title>{ data.title }</Card.Title>
                  <Card.Text>{ data.content }</Card.Text>
                  <Button variant="primary">Check!</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
}
export default App;