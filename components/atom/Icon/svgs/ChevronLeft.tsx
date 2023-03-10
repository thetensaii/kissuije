type Props = {
  width: number;
  height: number;
} & React.SVGAttributes<SVGElement>;

export const ChevronLeft = ({ width, height, ...props }: Props): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 35"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0.554943 16.1733L15.6854 1.04317C16.0353 0.692942 16.5025 0.5 17.0006 0.5C17.4987 0.5 17.9658 0.692942 18.3158 1.04317L19.43 2.15714C20.1551 2.88302 20.1551 4.06278 19.43 4.78756L6.72465 17.493L19.4441 30.2124C19.7941 30.5627 19.9873 31.0295 19.9873 31.5274C19.9873 32.0258 19.7941 32.4926 19.4441 32.8431L18.3299 33.9568C17.9797 34.3071 17.5128 34.5 17.0147 34.5C16.5166 34.5 16.0494 34.3071 15.6995 33.9568L0.554943 18.8129C0.204165 18.4615 0.0114994 17.9924 0.0126057 17.4938C0.0114994 16.9932 0.204165 16.5244 0.554943 16.1733Z" />
    </svg>
  );
};
