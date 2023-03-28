export interface HomeProps {
  className?: string;
}

function Home({ className }: HomeProps) {
  return <div className={className}>Welcome to my portfolio</div>;
}

export default Home;
