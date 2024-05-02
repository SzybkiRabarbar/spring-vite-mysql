import { useMutation } from "react-query";
import fetchSortedItemsWithinRange from "../../utils/fetchSortedItemsWithinRange";
import { useEffect, useState } from "react";
import fetchSettings from "../../interfaces/fetchSettings";
import Spinner from 'react-bootstrap/Spinner';
import Button from "react-bootstrap/Button";
import ErrorComponent from "../../components/error-component/ErrorComponent";
import ProductsCards from "../../components/products-cards/ProductsCards";
import './Items.scss';
import WhiteSpace from "../../components/white-space/WhiteSpace";
import SortByRadio from "../../components/sort-by-radio/SortByRadio";


var defaultFetchSettings = {
  pageNum: 0,
  pageSize: 12,
  sortBy: 'productName',
  desc: true
}


function Items() {
  const itemsMutation = useMutation<Product[], unknown, fetchSettings>(fetchSortedItemsWithinRange);
  const [settings, setSettings] = useState<fetchSettings>(defaultFetchSettings);

  useEffect(() => {
    itemsMutation.mutate(settings)
  }, [settings]);

  const changePageNum = (n: number) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      pageNum: settings.pageNum + n
    }));
  };

  return (<>
    {/* <WhiteSpace /> */}
    <SortByRadio setSettings={setSettings}/>
    {itemsMutation.isLoading &&
      <Spinner animation="grow" />
    }
    {itemsMutation.isError &&
      <ErrorComponent />
    }
    {itemsMutation.data && <>
      <ProductsCards products={itemsMutation.data} />
      <div className="page-change-buttons-container">
          <Button 
            className="page-change-button"
            variant="outline-primary"
            onClick={() => changePageNum(-1)}
          >
            Prev
          </Button>
          <Button 
            className="page-change-button"
            variant="outline-primary"
            onClick={() => changePageNum(1)}
          >
            Next
          </Button>
      </div>

    </>}
  </>)
}

export default Items