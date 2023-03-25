import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import Header from './header/Header';

function App() {
  return (
    <Container>
      <Header />
      <ScrollContainer>
        <Main>
          <Outlet />
        </Main>
        <Footer>Footer</Footer>
      </ScrollContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
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
  padding-bottom: 2500px;
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  background-color: grey;
`;

export default App;
