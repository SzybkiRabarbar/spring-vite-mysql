import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import fetchSearch from '../../utils/fetchSearch';

export function SearchItem() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState<string | null>(searchParams.get('query'));

  useEffect(() => {
    if (query) {
      const { isLoading, error, data } = useQuery(['products', query, 0, 6], () => fetchSearch(query, 0, 6));
    }
  }, [query]);

  return (<>
    <Form>

    </Form>
    {/* {query &&
          <ProductsCards products={} />
        } */}
  </>);
}
