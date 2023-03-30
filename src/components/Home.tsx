import styled from '@emotion/styled';

export interface HomeProps {
  className?: string;
}

function Home({ className }: HomeProps) {
  return (
    <Container className={className}>
      <Welcome>
        <Attribution
          target="/"
          href="https://www.freepik.com/free-photo/blue-sky-with-puffy-white-clouds_1139087.htm#query=blue%20sky%20background&position=22&from_view=search&track=ais"
        >
          Image by nikitabuida on Freepik
        </Attribution>
        <h1>{'Welcome to Joe\'s portfolio (a.k.a. "Portfolijo!")'}</h1>
        <div>{'portfolijoe.com was already taken 😔'}</div>
      </Welcome>
      <MyStory>
        <h2>My Story</h2>
      </MyStory>
      <Resume>
        <h2>My Skills</h2>
      </Resume>
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

const Resume = styled(Section)`
  background-color: lightgray;
`;

export default Home;
