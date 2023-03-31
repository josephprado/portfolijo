import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getFragment } from '../utils/functions';
import { routes } from '../utils/routes';

export interface AboutProps {
  className?: string;
}

function About({ className }: AboutProps) {
  const location = useLocation();
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
      section.scrollIntoView({
        block: 'start',
        inline: 'start',
        behavior: pageLoaded ? 'smooth' : 'auto'
      });

      flag && !pageLoaded && setPageLoaded(true);
    }

    return () => {
      flag = false;
    };
  }, [section]);

  return (
    <Container className={className}>
      <Welcome id={getFragment(routes.welcome)}>
        <Attribution
          target="/"
          href="https://www.freepik.com/free-photo/blue-sky-with-puffy-white-clouds_1139087.htm#query=blue%20sky%20background&position=22&from_view=search&track=ais"
        >
          Image by nikitabuida on Freepik
        </Attribution>
        <h1>{'Welcome to Joe\'s portfolio (a.k.a. "Portfolijo!")'}</h1>
        <div>{'portfolijoe.com was already taken 😔'}</div>
      </Welcome>
      <MyStory id={getFragment(routes.myStory)}>
        <h2>My Story</h2>
      </MyStory>
      <Skills id={getFragment(routes.skills)}>
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

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100vh - 37.6px); // TODO: dynamically calculate header height
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

const MyStory = styled(Section)`
  background-color: white;
`;

const Skills = styled(Section)`
  background-color: lightgray;
`;

export default About;
