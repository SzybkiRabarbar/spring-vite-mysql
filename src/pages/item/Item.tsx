import { useParams } from "react-router"
import useProduct from "../../utils/useProduct";
import ErrorComponent from "../../components/error-component/ErrorComponent";
import parseImages from "../../utils/parseImages";
import { Carousel, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import './Item.scss';
import WhiteSpace from "../../components/white-space/WhiteSpace";
import { Rating } from "@smastrom/react-rating";
import ProductsCards from "../../components/products-cards/ProductsCards";
import { useEffect } from "react";
import { useMutation } from "react-query";
import Product from "../../interfaces/Product";
import fetchSettings from "../../interfaces/fetchSettings";
import fetchSortedItemsWithinRange from "../../utils/fetchSortedItemsWithinRange";


var randomSettings = {
  pageNum: 0,
  pageSize: 4,
  sortBy: 'random',
  desc: true
}


function Item() {
  let { productId } = useParams();

  const { data: product, error, isLoading} = useProduct(productId);

  const randomMutation = useMutation<Product[], unknown, fetchSettings>(fetchSortedItemsWithinRange);

  useEffect(() => {
    randomMutation.mutate(randomSettings);
  }, []);


  return (<>
    {isLoading &&
      <div>Loading...</div>
    }
    {error && 
      <ErrorComponent />
    }
    {product && 
    <Container fluid>
    <Row className="item-container">
      <Col className="carousel-container">
        <Carousel variant="dark">
          {parseImages(product).map((imageSrc, key) => (
            <Carousel.Item key={key}>
              <Image
                src={imageSrc}
                alt={key + imageSrc}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </Col>
      <Col className="details-container">
        <WhiteSpace />
        <h1>{ product.productName }</h1>
        <div className="rating">
          <Rating 
            style={{maxWidth: 155}}
            value={ product.rating }
            readOnly
          />
          <span>{` Reviews: ${product.reviews} `}</span>
        </div>
        <WhiteSpace />
        <p className="description">{ product.description }</p>
        <WhiteSpace />
        <div className="user-rating">
          <span>Rate this sneakers:</span>
          <Rating 
            style={{maxWidth: 100}}
            value={0}
          />
        </div>
      </Col>
    </Row>
    <WhiteSpace /><WhiteSpace />
    <Row>
      <h1>See also:</h1>
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
    }
  </>)
}

export default Item