import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import ProductsCards from '../../components/products-cards/ProductsCards';
import { useMutation } from 'react-query';
import fetchSearch from '../../utils/fetchSearch';
import SearchParams from '../../interfaces/fetchSearchParams';
import PageWithProducts from '../../interfaces/PageProduct';
import ErrorComponent from '../../components/error-component/ErrorComponent';

function SearchItem() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState<string | null>(searchParams.get('query'));
    const [pageNum, setPageNum] = useState<number>(0);
    const searchMutation = 
      useMutation<PageWithProducts, unknown, SearchParams>(fetchSearch);

  useEffect(() => {
    if (query) {
      searchMutation.mutate({query, pageNum});
    }
  }, [query, pageNum]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setPageNum(0);
  };

  const ChangePageNumButtons = () => {
    return (
      <div style={{ display: 'flex' }}>
        <Button onClick={() => setPageNum(pageNum-1)}
          variant='outline-primary'
          style={{ flex: 1, marginRight: '10px' }}
          disabled={searchMutation.data?.first}
        >
          Previous
        </Button>
        <Button onClick={() => setPageNum(pageNum+1)}
          variant='outline-primary'
          style={{ flex: 1 }}
          disabled={searchMutation.data?.last}
        >
          Next
        </Button>
      </div>
    );
  };

  return (<>
    <Form style={{margin: "20px"}}>
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        onChange={handleSearchChange}
      />
    </Form>
    <ChangePageNumButtons />
    {searchMutation.isError &&
     <ErrorComponent />
    }
    {searchMutation.data &&
      <ProductsCards products={searchMutation.data.content} />
    }
    <ChangePageNumButtons />
  </>)
}

export default SearchItem