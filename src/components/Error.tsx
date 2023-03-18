export interface ErrorProps {
  className?: string;
}

function Error({ className }: ErrorProps) {
  return <div className={className}>Error</div>;
}

export default Error;
