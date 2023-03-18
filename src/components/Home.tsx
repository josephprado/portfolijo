export interface HomeProps {
  className?: string;
}

function Home({ className }: HomeProps) {
  return <div className={className}>Home</div>;
}

export default Home;
