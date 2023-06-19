import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import { styled as mStyled } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getFragment, scrollIntoViewWithOffset } from '../utils/functions';
import { routes } from '../utils/routes';
import HeaderContext from './header/HeaderContext';

export interface AboutProps {
  className?: string;
}

function About({ className }: AboutProps) {
  const location = useLocation();
  const { headerHeight } = useContext(HeaderContext);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [section, setSection] = useState<HTMLElement>();

  // set current section to the url fragment
  useEffect(() => {
    let flag = true;

    const fragment =
      document.getElementById(getFragment(location.hash)) ??
      document.getElementById(getFragment(routes.welcome));

    flag && fragment && setSection(fragment);

    return () => {
      flag = false;
    };
  }, [location.hash]);

  // scroll to the current section; use smooth to scroll between the different
  // sections while user is on the page, but scroll instantly on initial load
  useEffect(() => {
    let flag = true;

    if (section) {
      scrollIntoViewWithOffset(section, 0, pageLoaded ? 'smooth' : 'auto');

      flag && !pageLoaded && setPageLoaded(true);
    }

    return () => {
      flag = false;
    };
  }, [section]);

  return (
    <Container className={className}>
      <Welcome id={getFragment(routes.welcome)} headerHeight={headerHeight}>
        <Attribution
          target="/"
          href="https://www.freepik.com/free-photo/blue-sky-with-puffy-white-clouds_1139087.htm#query=blue%20sky%20background&position=22&from_view=search&track=ais"
        >
          Image by nikitabuida on Freepik
        </Attribution>
        <h1>
          Welcome to Joe&apos;s portfolio (a.k.a.&nbsp;&quot;Portfolijo!&quot;)
        </h1>
        <div>portfolijoe.com was already taken 😔</div>
      </Welcome>
      <MyStory id={getFragment(routes.myStory)} headerHeight={headerHeight}>
        <h2>My Story</h2>
      </MyStory>
      <Skills id={getFragment(routes.skills)} headerHeight={headerHeight}>
        <h2>Skills</h2>
      </Skills>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Section = styled.section<{ headerHeight: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: ${(props) => `calc(100vh - ${props.headerHeight}px)`};
`;

const Welcome = styled(Section)`
  position: relative;
  padding-top: 10vh;
  background-color: rgba(0, 120, 215, 0.5);
  color: white;
  text-align: center;
  background-image: url('/images/blue-sky-with-puffy-white-clouds.jpg');
  background-size: cover;

  h1 {
    margin-bottom: 8px;
  }
`;

const Attribution = styled.a`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 8px;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.3);
`;

const MyStory = mStyled(Section, {
  shouldForwardProp: (prop: string) =>
    isPropValid(prop) && prop !== 'headerHeight'
})(({ theme }) => ({
  backgroundColor: 'white',
  color: theme.palette.primary.dark
}));

const Skills = mStyled(Section, {
  shouldForwardProp: (prop: string) =>
    isPropValid(prop) && prop !== 'headerHeight'
})(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText
}));

export default About;
