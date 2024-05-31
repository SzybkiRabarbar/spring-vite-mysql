import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SlideshowImage from '../../components/slideshow-image/SlideshowImage';
import WhiteSpace from '../../components/white-space/WhiteSpace';
import { useMutation } from 'react-query';
import Product from '../../interfaces/Product';
import fetchSettings from '../../interfaces/fetchSettings';
import fetchSortedItemsWithinRange from '../../utils/fetchSortedItemsWithinRange';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import ErrorComponent from '../../components/error-component/ErrorComponent';
import ProductsCards from '../../components/products-cards/ProductsCards';


var randomSettings = {
  pageNum: 0,
  pageSize: 3,
  sortBy: 'random',
  desc: true
}


function About() {

  const randomMutation = 
    useMutation<Product[], unknown, fetchSettings>(fetchSortedItemsWithinRange);

  useEffect(() => {
    randomMutation.mutate(randomSettings);
  }, []);

  return (
    <Container>
      <WhiteSpace />
      <Row>
        <Col>
          <SlideshowImage 
            images={["https://assets-global.website-files.com/6179bd8bf2c3bb015c1fa461/636bce571bf3fbc13e8ec271_6.jpg"]}
          />
        </Col>
        <Col style={{display: "flex", 
                     justifyContent: "center", 
                     alignItems: "center",
                    }}
        >
          Welcome to our urban streetwear store! We're passionate about
          sneakers, apparel, and the vibrant street culture. Whether you're a
          sneakerhead, a fashion enthusiast, or just someone who appreciates
          unique style, you've come to the right place.
          <br /><br />
          Discover an extensive range of sneakers that blend comfort, style, and
          individuality. From classic Air Jordans to limited-edition Yeezys,
          we've got something for every taste. Our curated selection includes
          high-tops, low-tops, and everything in between. Step up your sneaker
          game with our exclusive releases.
          <br /><br />
          Follow us on social media to stay in the loop! We share sneak peeks of
          upcoming releases, style inspiration, and behind-the-scenes glimpses.
          Join our community of streetwear enthusiasts and be part of the
          conversation.
        </Col>
      </Row>
      <WhiteSpace />
      <Row>
        <h1>See our products!</h1>
      </Row>
      <Row>
        {randomMutation.isLoading &&
          <Spinner animation="grow" />
        }
        {randomMutation.isError &&
          <ErrorComponent />
        }
        {randomMutation.data && 
          <ProductsCards products={randomMutation.data} />
        }
      </Row>
    </Container>
  );
}

export default About;