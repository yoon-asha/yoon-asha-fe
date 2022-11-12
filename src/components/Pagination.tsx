import React, { useState } from 'react';
import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

const Pagination = ({ totalPost, limit, selectPage }: number | any): JSX.Element => {
  // pageList - 그냥 반복문으로 할 때
  // const pageList: number[] = [];
  // for (let i = 1; i <= Math.ceil(totalPost / 10); i++) {
  //   pageList.push(i);
  // }
  // console.log('list', pageList)

  console.log('total', Math.ceil(totalPost / 10));
  // pageList - range 함수 직접 만들어서 쓸 때
  const range = (size: number, start: number) => {
    return Array(size)
      .fill(start)
      .map((x, y) => x + y);
  };

  const [nowPage, setNowPage] = useState(1);
  const lastPage = Math.ceil(totalPost / limit);
  console.log('last', lastPage);
  selectPage = Number(selectPage);
  console.log(selectPage, 'select');

  // state
  const [show, setShow] = useState(true);

  /** clickPrev
   * 5씩 숫자가 바뀔거니까(1-5, 6-10)
   * 이전페이지는 -5
   */
  const clickPrev = () => {};

  /** clickNext
   * 다음페이지는 +5
   */
  const clickNext = () => {};

  return (
    <Container>
      {/* 
      1이면 
      < 비활성화
       > 활성화

      5보다 크고 끝이 아니면 
      < 활성화 
      > 비활성화
      */}
      <Button disabled={show} onClick={clickPrev}>
        <VscChevronLeft />
      </Button>
      <PageWrapper>
        {[1, 2, 3, 4, 5].map((page) => (
          <Page key={page} selected={page === selectPage} disabled={page === selectPage}>
            {page}
          </Page>
        ))}
      </PageWrapper>
      <Button disabled={!show} onClick={clickNext}>
        <VscChevronRight />
      </Button>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 40px;
  margin-left: -20px;
`;

const Button = styled.button`
  cursor: pointer;
  &:disabled {
    color: #e2e2ea;
    cursor: default;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  margin: 0 16px;
`;

type PageType = {
  selected: boolean;
};

const Page = styled.button<PageType>`
  padding: 4px 6px;
  background-color: ${({ selected }) => (selected ? '#000' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: 20px;
  cursor: pointer;
  & + & {
    margin-left: 4px;
  }

  &:disabled {
    cursor: default;
  }
`;
