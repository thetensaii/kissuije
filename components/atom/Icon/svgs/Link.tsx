type Props = {
  width: number;
  height: number;
} & React.SVGAttributes<SVGElement>;

export const Link = ({ width, height, ...props }: Props): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M9.94969 18.2927L7.12165 21.1207C5.94921 22.2932 4.05053 22.2932 2.87907 21.121C1.70737 19.9493 1.70737 18.0504 2.87883 16.8789L8.53588 11.2219C9.70734 10.0504 11.6062 10.0504 12.7777 11.2219C13.1682 11.6124 13.8014 11.6124 14.1919 11.2219C14.5824 10.8314 14.5824 10.1982 14.1919 9.80767C12.2394 7.85513 9.0742 7.85513 7.12165 9.80767L1.46465 15.4647C-0.487892 17.4172 -0.487892 20.5824 1.46465 22.5349C3.41696 24.4885 6.58235 24.4885 8.53593 22.5349L11.364 19.7069C11.7545 19.3164 11.7545 18.6832 11.364 18.2927C10.9734 17.9021 10.3402 17.9022 9.94969 18.2927Z" />
      <path d="M22.5354 1.46441C20.5828 -0.488136 17.4166 -0.488136 15.4641 1.46441L12.0711 4.85743C11.6806 5.24794 11.6806 5.88114 12.0711 6.27165C12.4616 6.66217 13.0948 6.66217 13.4853 6.27165L16.8783 2.87863C18.0498 1.70713 19.9496 1.70713 21.1211 2.87863C22.2926 4.05009 22.2926 5.94896 21.1211 7.12042L14.8991 13.3425C13.7276 14.514 11.8288 14.514 10.6573 13.3425C10.2668 12.952 9.6336 12.952 9.24308 13.3425C8.85257 13.733 8.85257 14.3662 9.24308 14.7567C11.1956 16.7093 14.3608 16.7093 16.3133 14.7567L22.5354 8.5347C24.4879 6.58216 24.4879 3.41695 22.5354 1.46441Z" />
    </svg>
  );
};