import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import products from '../api/data/products.json';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';

const PaginationPage: NextPage = () => {
  const router = useRouter();
  const page = Number(router.query.page);
  const [selectPage, setSelectPage] = useState(1);

  // 페이지 이동 시 보여줄 products
  const lastPage = page * 10; // 10개씩 보여줄거니까
  const firstPage = lastPage - 10;

  console.log(router.query.page, 'rotuer');

  // url 바꾸기
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
        <ProductList products={products.slice(firstPage, lastPage)} />
        <Pagination
          totalPost={products.length}
          limit={5}
          selectPage={selectPage}
          onChange={changePage}
        />
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
