export default function French({
  height = 10,
  width = 10,
}: {
  height: number;
  width: number;
}) {
  return (
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="#000000"
    >
      <g>
        <path
          style={{ fill: "#41479B" }}
          d="M182,377.15H25.6c-4.8,0-8.6-3.9-8.6-8.6V61.45c0-4.8,3.9-8.6,8.6-8.6H182V377.15z"
        ></path>
        <rect
          x="182"
          y="52.75"
          style={{ fill: "#F5F5F5" }}
          width="165"
          height="324.3"
        ></rect>
        <path
          style={{ fill: "#FF4B55" }}
          d="M503.4,377.15H347V52.75h156.4c4.8,0,8.6,3.9,8.6,8.6v307.1C512,373.25,508.1,377.15,503.4,377.15z"
        ></path>
        <path
          style={{ fill: "#2E3033" }}
          d="M19.7,494.85L19.7,494.85c-10.9,0-19.7-8.8-19.7-19.7V36.65c0-10.8,8.7-19.5,19.5-19.5h0.2 c10.9,0,19.7,8.8,19.7,19.7v438.4C39.4,486.05,30.5,494.85,19.7,494.85z"
        ></path>
      </g>
    </svg>
  );
}
