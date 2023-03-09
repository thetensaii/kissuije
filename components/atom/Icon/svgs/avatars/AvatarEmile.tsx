type Props = {
  width: number;
  height: number;
} & React.SVGAttributes<SVGElement>;

export const AvatarEmile = ({ width, height, ...props }: Props): JSX.Element => {
  return (
    <svg width={width} height={height} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clip-path="url(#clip0_17_203)">
        <mask id="mask0_17_203" maskUnits="userSpaceOnUse" x="0" y="0" width="80" height="80">
          <path
            d="M80 40C80 17.9086 62.0914 0 40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80C62.0914 80 80 62.0914 80 40Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0_17_203)">
          <path d="M80 0H0V80H80V0Z" fill="#1789FC" />
          <path
            d="M79.5901 75.022C89.8599 52.9982 80.3315 26.8191 58.3077 16.5492C36.284 6.2794 10.1048 15.8078 -0.165028 37.8316C-10.4349 59.8553 -0.906448 86.0345 21.1173 96.3043C43.1411 106.574 69.3202 97.0458 79.5901 75.022Z"
            fill="#F42272"
          />
          <path
            d="M27.0962 52.0626C27.2888 54.2643 28.6397 56.2738 30.8517 57.6491C33.0638 59.0243 35.9557 59.6526 38.8913 59.3958C41.827 59.139 44.5658 58.018 46.5054 56.2795C48.445 54.5411 49.4265 52.3275 49.2339 50.1258"
            fill="white"
          />
          <path
            d="M31.6623 40.5096C31.5553 39.2869 30.7252 38.3608 29.8083 38.441C28.8913 38.5213 28.2347 39.5774 28.3416 40.8001C28.4486 42.0227 29.2787 42.9488 30.1956 42.8686C31.1126 42.7884 31.7692 41.7322 31.6623 40.5096Z"
            fill="white"
          />
          <path
            d="M44.945 39.3474C44.838 38.1248 44.008 37.1987 43.091 37.2789C42.174 37.3592 41.5174 38.4153 41.6243 39.638C41.7313 40.8606 42.5614 41.7867 43.4783 41.7065C44.3953 41.6262 45.052 40.5701 44.945 39.3474Z"
            fill="white"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_17_203">
          <rect width="80" height="80" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};