export interface RightArrowProps {
  className?: string;
  fill?: string;
  width?: number;
}

function RightArrow({ className, fill = 'black', width = 6 }: RightArrowProps) {
  return (
    <svg
      className={className}
      width={width}
      height={width * 2}
      viewBox="0 0 7 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6.5 7.5L0.5 14.4282V0.571797L6.5 7.5Z" fill={fill} />
    </svg>
  );
}

export default RightArrow;
