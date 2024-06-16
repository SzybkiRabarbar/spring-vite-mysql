import { useMutation } from "react-query";
import fetchSortedItemsWithinRange from "../../utils/fetchSortedItemsWithinRange";
import { useEffect, useState } from "react";
import fetchSettings from "../../interfaces/fetchSettings";
import Spinner from 'react-bootstrap/Spinner';
import ErrorComponent from "../../components/error-component/ErrorComponent";
import ProductsCards from "../../components/products-cards/ProductsCards";
import SortByRadio from "../../components/sort-by-radio/SortByRadio";
import { PAGE_SIZE } from "../../utils/consts";
import ChangePageButtons from "../../components/change-page-buttons/ChangePageButtons";
import Product from "../../interfaces/Product";


var defaultFetchSettings = {
  pageNum: 0,
  pageSize: PAGE_SIZE,
  sortBy: 'productName',
  desc: true
}


function Items() {
  const itemsMutation = 
    useMutation<Product[], unknown, fetchSettings>(fetchSortedItemsWithinRange);
  const [settings, setSettings] = useState<fetchSettings>(defaultFetchSettings);

  useEffect(() => {
    itemsMutation.mutate(settings)
  }, [settings]);


  return (<>
    <SortByRadio setSettings={setSettings}/>
    {itemsMutation.isLoading &&
      <Spinner animation="grow" />
    }
    {itemsMutation.isError &&
      <ErrorComponent />
    }
    {itemsMutation.data && <>
      <ProductsCards products={itemsMutation.data} />
      <ChangePageButtons settings={settings} setSettings={setSettings}/>
    </>}
  </>)
}

export default Items