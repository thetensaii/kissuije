type Props = {
  width: number;
  height: number;
} & React.SVGAttributes<SVGElement>;

export const ChevronRight = ({ width, height, ...props }: Props): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 35"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M19.4451 16.1733L4.31463 1.04317C3.96468 0.692942 3.49753 0.5 2.99942 0.5C2.50131 0.5 2.03416 0.692942 1.68421 1.04317L0.569959 2.15714C-0.155092 2.88302 -0.155092 4.06278 0.569959 4.78756L13.2754 17.493L0.555862 30.2124C0.205913 30.5627 0.0126953 31.0295 0.0126953 31.5274C0.0126953 32.0258 0.205913 32.4926 0.555862 32.8431L1.67011 33.9568C2.02034 34.3071 2.48721 34.5 2.98532 34.5C3.48343 34.5 3.95058 34.3071 4.30053 33.9568L19.4451 18.8129C19.7958 18.4615 19.9885 17.9924 19.9874 17.4938C19.9885 16.9932 19.7958 16.5244 19.4451 16.1733Z" />
    </svg>
  );
};
