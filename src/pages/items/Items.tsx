import { useMutation } from "react-query";
import fetchSortedItemsWithinRange from "../../utils/fetchSortedItemsWithinRange";
import { useEffect, useState } from "react";
import fetchSettings from "../../interfaces/fetchSettings";
import Spinner from 'react-bootstrap/Spinner';
import ErrorComponent from "../../components/error-component/ErrorComponent";


var defaultFetchSettings = {
  from: 0,
  to: 10,
  sortBy: 'reviews',
  desc: false
}


function Items() {
  const itemsMutation = useMutation<Product[], unknown, fetchSettings>(fetchSortedItemsWithinRange);
  const [settings, setSettings] = useState<fetchSettings>(defaultFetchSettings);

  useEffect(() => {
    itemsMutation.mutate(settings)
  }, []);

  return (<>
    {itemsMutation.isLoading &&
      <Spinner animation="grow" />
    }
    {itemsMutation.isError &&
      <ErrorComponent />
    }
    {itemsMutation.data && 
      itemsMutation.data.map((product, key) => (
        <div key={key}>
          { product.productName }
        </div>
      ))
    }
  </>)
}

export default Items