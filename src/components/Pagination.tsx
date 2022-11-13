import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import { usePagination } from './usePagination';

type PaginationProps = {
  lastPage: number;
  limit: number;
  currentPage: number;
  onChange: any;
  // React.ChangeEvent<..뭘 넣어야 될지 공부해야될 듯> ?
};

const Pagination = ({
  lastPage,
  limit,
  currentPage = 1,
  onChange,
}: PaginationProps): JSX.Element => {
  const { pages, firstGroup, lastGroup, clickPageBtn, clickPrevBtn, clickNextBtn } = usePagination({
    lastPage,
    limit,
    currentPage,
    onChange,
  });

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
      <Button onClick={clickPrevBtn} disabled={firstGroup}>
        <VscChevronLeft />
      </Button>
      <PageWrapper>
        {pages.map((page) => (
          <Page
            key={page}
            selected={page === currentPage}
            disabled={page === currentPage}
            onClick={clickPageBtn}
          >
            {page}
          </Page>
        ))}
      </PageWrapper>
      <Button onClick={clickNextBtn} disabled={lastGroup}>
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
