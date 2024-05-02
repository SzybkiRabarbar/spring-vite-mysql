import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import SlideshowImage from '../slideshow-image/SlideshowImage';
import { Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ProductCards.scss';
import { Rating } from '@smastrom/react-rating';


function ProductsCards(props: {products: Product[]}) {
  return (
    <Container fluid>
      <Row>
        {props.products.map((product, key) => {
          let images: string[];
          if (product.images) {
            images = JSON.parse(product.images);
          } else {
            images = ["/no-image.jpg"];
          }
          return (
            <Col key={key}>
              <Card style={{ width: '26rem', margin: 'auto' }}>
                <SlideshowImage images={images} />
                <Card.Body>
                  <Card.Title className='text-truncate'>{ product.productName }</Card.Title>
                  <Card.Text className='text-3line-truncate'>{ product.description }</Card.Text>
                  <Stack direction='horizontal'>
                    <Link 
                      to={"/product/" + product.productId}
                    >
                      <Button className="p-2" variant="primary">Check!</Button>
                    </Link>
                    <div className='p-2 ms-auto'>
                      <Rating 
                        style={{maxWidth: 155}}
                        value={ product.rating }
                        readOnly
                      />
                      {/* <span>
                        ({ product.reviews })
                      </span> */}
                    </div>
                    <div className='p-2 ms-auto'>
                      ${ product.salePrice / 100 }
                    </div>
                  </Stack>
                </Card.Body>
              </Card>
            </Col>
        )})}
      </Row>
    </Container>
  )
}

export default ProductsCards