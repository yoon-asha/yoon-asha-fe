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
  const [currentPage, setCurrentPage] = useState(1);

  // 페이지 이동 시 보여줄 products
  const lastPage = page * 10; // 10개씩 보여줄거니까
  const firstPage = lastPage - 10;

  // url 바꾸기
  const changePage = (page: number) => {
    router.push(`pagination?page=${page}`, undefined, { shallow: true, scroll: true });
  };

  useEffect(() => {
    if (page) {
      setCurrentPage(page);
    }
  }, [page]);

  // 존재하지 않는 페이지에 들어갔을 때
  if (page < 1 || page > Math.ceil(products.length / 10)) {
    console.log('hello');
    return <div style={{ textAlign: 'center', margin: 50 }}>존재하지 않는 페이지입니다.</div>;
  }

  return (
    <>
      <Container>
        <ProductList products={products.slice(firstPage, lastPage)} />
        <Pagination
          lastPage={Math.ceil(products.length / 10)}
          limit={5}
          currentPage={currentPage}
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
