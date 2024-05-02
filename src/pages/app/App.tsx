import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Image, Spinner } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';

import WhiteSpace from '../../components/white-space/WhiteSpace';
import { useMutation } from 'react-query';
import fetchSettings from '../../interfaces/fetchSettings';
import fetchSortedItemsWithinRange from '../../utils/fetchSortedItemsWithinRange';
import { useEffect } from 'react';
import ProductsCards from '../../components/products-cards/ProductsCards';
import ErrorComponent from '../../components/error-component/ErrorComponent';

var bestSellersSettings = {
  pageNum: 0,
  pageSize: 4,
  sortBy: 'reviews',
  desc: true
}

var mostLovedSettings = {
  pageNum: 0,
  pageSize: 4,
  sortBy: 'rating',
  desc: true
}


function App() {
  const bestSellersMutation = useMutation<Product[], unknown, fetchSettings>(fetchSortedItemsWithinRange);
  const mostLovedMutation = useMutation<Product[], unknown, fetchSettings>(fetchSortedItemsWithinRange);

  useEffect(() => {
    bestSellersMutation.mutate(bestSellersSettings);
    mostLovedMutation.mutate(mostLovedSettings);
  }, []);

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
          <h1>Best sellers:</h1>
        </Row>
        <Row>
          {bestSellersMutation.isLoading &&
            <Spinner animation="grow" />
          }
          {bestSellersMutation.isError &&
            <ErrorComponent />
          }
          {bestSellersMutation.data && 
            <ProductsCards products={bestSellersMutation.data} />
          }
        </Row>
        <WhiteSpace />
        <Row>
          <h1>Best rated:</h1>
        </Row>
        <Row>
          {mostLovedMutation.isLoading &&
            <Spinner animation="grow" />
          }
          {mostLovedMutation.isError &&
            <ErrorComponent />
          }
          {mostLovedMutation.data && 
            <ProductsCards products={mostLovedMutation.data} />
          }
        </Row>
      </Container>
    );
}
export default App;