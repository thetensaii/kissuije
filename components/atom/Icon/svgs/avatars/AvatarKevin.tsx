type Props = {
  width: number;
  height: number;
} & React.SVGAttributes<SVGElement>;

export const AvatarKevin = ({ width, height, ...props }: Props): JSX.Element => {
  return (
    <svg width={width} height={height} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clip-path="url(#clip0_17_204)">
        <mask id="mask0_17_204" maskUnits="userSpaceOnUse" x="0" y="0" width="80" height="80">
          <path
            d="M80 40C80 17.9086 62.0914 0 40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80C62.0914 80 80 62.0914 80 40Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0_17_204)">
          <path d="M80 0H0V80H80V0Z" fill="#32FC17" />
          <path
            d="M-23.2302 15.3953C-26.9196 41.647 -8.62928 65.9191 17.6224 69.6085C43.8741 73.2979 68.1461 55.0076 71.8356 28.7559C75.525 2.50427 57.2347 -21.7678 30.983 -25.4572C4.73134 -29.1467 -19.5407 -10.8564 -23.2302 15.3953Z"
            fill="#1789FC"
          />
          <path
            d="M25.4375 43.0851C30.148 44.6672 34.5492 44.0486 38.6411 41.2295"
            stroke="white"
            stroke-width="2.22222"
            stroke-linecap="round"
          />
          <path
            d="M18.0804 30.6548C17.9096 29.4394 17.0322 28.558 16.1207 28.6861C15.2091 28.8142 14.6087 29.9033 14.7795 31.1187C14.9503 32.334 15.8277 33.2154 16.7392 33.0873C17.6507 32.9592 18.2512 31.8701 18.0804 30.6548Z"
            fill="white"
          />
          <path
            d="M44.4876 26.9435C44.3168 25.7281 43.4394 24.8467 42.5279 24.9748C41.6164 25.1029 41.0159 26.192 41.1867 27.4074C41.3575 28.6227 42.2349 29.5041 43.1464 29.376C44.058 29.2479 44.6584 28.1588 44.4876 26.9435Z"
            fill="white"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_17_204">
          <rect width="80" height="80" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
