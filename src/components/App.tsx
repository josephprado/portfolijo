import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import HeaderContext from './header/HeaderContext';
import { useContext, useEffect, useState } from 'react';
import { routes } from '../utils/routes';
import { type HeaderMenuProps } from './header/HeaderMenu';
import styled from '@emotion/styled';
import Footer from './footer/Footer';

const defaultMenus: HeaderMenuProps[] = [
  {
    label: 'About',
    to: routes.welcome,
    sub: {
      trigger: 'hover',
      items: [
        { label: 'My Story', to: routes.myStory },
        { label: 'Skills', to: routes.skills }
      ]
    }
  },
  {
    label: 'Projects',
    sub: {
      trigger: 'hover',
      items: [
        { label: 'Project 1', to: '/' },
        { label: 'Project 2', to: '/' },
        { label: 'Project 3', to: '/' }
      ]
    }
  },
  {
    label: 'Contact'
  }
];

function App() {
  const { headerHeight, setHeaderHeight } = useContext(HeaderContext);
  const [marginTop, setMarginTop] = useState(headerHeight);
  const headerId = 'app-header';

  // initializes the header height context
  useEffect(() => {
    let flag = true;

    const height = document
      .getElementById(headerId)
      ?.getBoundingClientRect().height;

    if (height && height !== headerHeight) {
      flag && setHeaderHeight(height);
      flag && setMarginTop(height);
    }

    return () => {
      flag = false;
    };
  }, [headerHeight]);

  return (
    <>
      <Header id={headerId} alignment="center" menus={defaultMenus} />
      <Main marginTop={marginTop}>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
}

const Main = styled.main<{ marginTop: number }>`
  margin-top: ${(props) => `${props.marginTop}px`};
`;

export default App;
