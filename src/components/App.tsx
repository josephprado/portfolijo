import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

function App() {
  const headerHeight = 48;

  return (
    <Container headerHeight={headerHeight}>
      <Header height={headerHeight}>
        <Navbar>Nav</Navbar>
      </Header>
      <ScrollContainer>
        <Main>
          <Outlet />
        </Main>
        <Footer>Footer</Footer>
      </ScrollContainer>
    </Container>
  );
}

const Container = styled.div<{ headerHeight: number }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding-top: ${(props) => `${props.headerHeight}px`};
`;

const Header = styled.header<{ height: number }>`
  position: fixed;
  top: 0;
  display: flex;
  width: 100%;
  height: ${(props) => `${props.height}px`};
  background-color: grey;
`;

const Navbar = styled.nav`
  display: flex;
`;

const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const Main = styled.main`
  flex-grow: 1;
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  background-color: grey;
`;

export default App;
