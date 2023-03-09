type Props = {
  width: number;
  height: number;
} & React.SVGAttributes<SVGElement>;

export const AvatarKaithleen = ({ width, height, ...props }: Props): JSX.Element => {
  return (
    <svg width={width} height={height} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clip-path="url(#clip0_17_206)">
        <mask id="mask0_17_206" maskUnits="userSpaceOnUse" x="0" y="0" width="80" height="80">
          <path
            d="M80 40C80 17.9086 62.0914 0 40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80C62.0914 80 80 62.0914 80 40Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0_17_206)">
          <path d="M80 0H0V80H80V0Z" fill="#5600FF" />
          <path
            d="M71.7501 89.0421L99.8059 31.5193C103.68 23.5771 100.381 13.9984 92.4391 10.1247L34.9163 -17.9311C26.974 -21.8048 17.3953 -18.5066 13.5216 -10.5643L-14.5341 46.9585C-18.4078 54.9007 -15.1096 64.4795 -7.16734 68.3532L50.3555 96.4089C58.2977 100.283 67.8764 96.9844 71.7501 89.0421Z"
            fill="#1789FC"
          />
          <path
            d="M41.562 37.0444C45.7498 39.7191 50.1699 40.1836 54.8223 38.4381"
            stroke="white"
            stroke-width="2.22222"
            stroke-linecap="round"
          />
          <path
            d="M41.8509 23.668C41.9791 22.4474 41.341 21.3799 40.4256 21.2837C39.5102 21.1875 38.6641 22.099 38.5358 23.3195C38.4075 24.5401 39.0456 25.6076 39.961 25.7038C40.8765 25.8 41.7226 24.8886 41.8509 23.668Z"
            fill="white"
          />
          <path
            d="M59.531 25.5263C59.6593 24.3057 59.0212 23.2382 58.1058 23.142C57.1903 23.0458 56.3442 23.9572 56.216 25.1778C56.0877 26.3984 56.7258 27.4659 57.6412 27.5621C58.5566 27.6583 59.4027 26.7468 59.531 25.5263Z"
            fill="white"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_17_206">
          <rect width="80" height="80" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
