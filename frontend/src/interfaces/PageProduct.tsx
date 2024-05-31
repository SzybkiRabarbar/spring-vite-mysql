import Product from "./Product";

interface PageWithProducts {
  content: Product[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}

export default PageWithProducts