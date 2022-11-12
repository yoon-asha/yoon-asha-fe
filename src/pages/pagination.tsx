import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import products from '../api/data/products.json';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';

const PaginationPage: NextPage = () => {
  const router = useRouter();
  // const { page } = router.query;
  const page = Number(router.query.page);
  const [selectPage, setSelectPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  // const [page, setPage] = useState(1);

  console.log(router.query.page, 'rotuer');

  const productsFetch = async (page: number) => {};

  const changePage = (page: number) => {
    router.push(`pagination?page=${page}`, undefined, { shallow: true, scroll: true });
  };

  useEffect(() => {
    if (page) {
      setSelectPage(page);
    }
  }, [page]);

  return (
    <>
      <Container>
        <ProductList products={products} />
        <Pagination totalPost={products.length} limit={5} selectPage={page} onChange={changePage} />
      </Container>
    </>
  );
};

export default PaginationPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
