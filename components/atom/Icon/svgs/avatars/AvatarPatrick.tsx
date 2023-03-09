type Props = {
  width: number;
  height: number;
} & React.SVGAttributes<SVGElement>;

export const AvatarPatrick = ({ width, height, ...props }: Props): JSX.Element => {
  return (
    <svg width={width} height={height} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clip-path="url(#clip0_17_205)">
        <mask id="mask0_17_205" maskUnits="userSpaceOnUse" x="0" y="0" width="80" height="80">
          <path
            d="M80 40C80 17.9086 62.0914 0 40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80C62.0914 80 80 62.0914 80 40Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0_17_205)">
          <path d="M80 0H0V80H80V0Z" fill="#F42272" />
          <path
            d="M5.60841 59.8907L66.8119 78.6024C75.2624 81.186 84.2072 76.43 86.7907 67.9795L105.503 6.77601C108.086 -1.67443 103.33 -10.6193 94.8796 -13.2028L33.6761 -31.9146C25.2257 -34.4982 16.2808 -29.7421 13.6973 -21.2917L-5.01453 39.9118C-7.59809 48.3623 -2.84203 57.3071 5.60841 59.8907Z"
            fill="#232E21"
          />
          <path
            d="M41.9731 38.5406C46.6553 40.2046 51.0666 39.663 55.2071 36.9157"
            stroke="white"
            stroke-width="2.22222"
            stroke-linecap="round"
          />
          <path
            d="M37.0398 25.7129C36.8902 24.4947 36.0283 23.5982 35.1147 23.7103C34.2011 23.8225 33.5817 24.901 33.7313 26.1191C33.8808 27.3373 34.7427 28.2338 35.6563 28.1217C36.5699 28.0095 37.1893 26.931 37.0398 25.7129Z"
            fill="white"
          />
          <path
            d="M59.0964 23.0047C58.9468 21.7865 58.0849 20.89 57.1713 21.0021C56.2577 21.1143 55.6383 22.1928 55.7879 23.4109C55.9375 24.6291 56.7994 25.5256 57.713 25.4135C58.6266 25.3013 59.246 24.2228 59.0964 23.0047Z"
            fill="white"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_17_205">
          <rect width="80" height="80" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
