type Props = {
  width: number;
  height: number;
} & React.SVGAttributes<SVGElement>;

export const AvatarLora = ({ width, height, ...props }: Props): JSX.Element => {
  return (
    <svg width={width} height={height} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clip-path="url(#clip0_17_112)">
        <mask id="mask0_17_112" maskUnits="userSpaceOnUse" x="0" y="0" width="80" height="80">
          <path
            d="M80 40C80 17.9086 62.0914 0 40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80C62.0914 80 80 62.0914 80 40Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0_17_112)">
          <path d="M80 0H0V80H80V0Z" fill="#6BFF22" />
          <path
            d="M-4.03488 13.8669C-14.3047 35.8906 -4.7763 62.0698 17.2475 72.3396C39.2712 82.6095 65.4504 73.081 75.7202 51.0573C85.9901 29.0335 76.4616 2.85437 54.4379 -7.41548C32.4141 -17.6853 6.23496 -8.1569 -4.03488 13.8669Z"
            fill="#F42272"
          />
          <path
            d="M21.8604 37.1798C26.0942 39.7809 30.5217 40.1683 35.1429 38.3419"
            stroke="white"
            stroke-width="2.22222"
            stroke-linecap="round"
          />
          <path
            d="M23.9356 26.2078C24.0425 24.9852 23.3859 23.929 22.4689 23.8488C21.5519 23.7686 20.7219 24.6947 20.6149 25.9173C20.5079 27.1399 21.1646 28.1961 22.0816 28.2763C22.9985 28.3566 23.8286 27.4305 23.9356 26.2078Z"
            fill="white"
          />
          <path
            d="M37.2183 27.3699C37.3252 26.1473 36.6686 25.0911 35.7516 25.0109C34.8347 24.9306 34.0046 25.8567 33.8976 27.0794C33.7907 28.302 34.4473 29.3582 35.3643 29.4384C36.2812 29.5186 37.1113 28.5925 37.2183 27.3699Z"
            fill="white"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_17_112">
          <rect width="80" height="80" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
