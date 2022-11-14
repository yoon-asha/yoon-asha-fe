import Link from 'next/link';
import styled from 'styled-components';

import { Product } from '../types/product';
import ProductItem from './ProductItem';

type ProductListProps = {
  products: Product[];
};

const ProductList = ({ products }: ProductListProps) => {
  return (
    <>
      <Container>
        {products.map((product) => {
          return (
            <>
              <Link href={`/products/${product.id}`}>
                <a>
                  <ProductItem key={product.id} product={product} />
                </a>
              </Link>
            </>
          );
        })}
      </Container>
    </>
  );
};

export default ProductList;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  margin-left: -20px;
`;
