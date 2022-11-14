import Link from 'next/link';
import styled from 'styled-components';

const Nav = () => {
  return (
    <>
      <Header>
        <Link href='/'>
          <Title>HAUS</Title>
        </Link>
        <Link href='/login'>
          <a>login</a>
        </Link>
      </Header>
    </>
  );
};

export default Nav;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
  cursor: pointer;
`;
