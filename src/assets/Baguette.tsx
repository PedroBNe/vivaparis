export default function Baguette({
  height = 100,
  width = 100,
  color = "#D99F4C",
}: {
  height: number;
  width: number;
  color: string;
}) {
  return (
    <svg
      height={`${height}px`}
      width={`${width}px`}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512.019 512.019"
      xmlSpace="preserve"
      fill={color}
      transform={`rotate(90)`}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <g transform="translate(0 -1)">
          <path
            style={{ fill: "#D99F4C" }}
            d="M503.428,8.894L503.428,8.894L503.428,8.894c-30.764-36.643-169.772,58.871-304.031,191.673 C64.812,333.696-27.692,469.155,7.724,504.598l0,0l0,0c38.232,38.232,170.964-58.606,304.031-191.673 C445.608,179.072,541.661,47.126,503.428,8.894"
          />
          <g>
            <path
              style={{ fill: "#EBC494" }}
              d="M316.166,240.051c-11.379,0-22.749-4.228-31.206-12.685c-10.161-10.143-27.304-10.143-37.455,0 c-3.452,3.452-9.039,3.452-12.482,0c-3.452-3.452-3.452-9.031,0-12.482c16.914-16.922,45.506-16.922,62.42,0 c10.143,10.143,27.295,10.143,37.455,0c3.443-3.452,9.031-3.452,12.482,0c3.443,3.452,3.443,9.039,0,12.482 C338.915,235.823,327.545,240.051,316.166,240.051"
            />
            <path
              style={{ fill: "#EBC494" }}
              d="M378.588,177.676c-11.917,0-23.005-4.52-31.214-12.729c-10.152-10.152-27.295-10.161-37.447,0 c-3.452,3.443-9.039,3.443-12.482,0c-3.452-3.452-3.452-9.039,0-12.482c16.914-16.931,45.506-16.922,62.411,0 c9.754,9.746,27.71,9.746,37.455,0c3.443-3.452,9.039-3.452,12.482,0c3.452,3.443,3.452,9.031,0,12.482 C401.584,173.157,390.505,177.676,378.588,177.676"
            />
            <path
              style={{ fill: "#EBC494" }}
              d="M441.006,115.254c-11.644,0-22.969-4.493-31.214-12.729c-8.289-8.298-21.839-9.984-32.212-4.008 c-4.228,2.419-9.622,0.98-12.059-3.249c-2.428-4.22-0.98-9.622,3.249-12.05c17.161-9.878,39.671-7.027,53.513,6.824 c6.497,6.497,16.296,9.075,25.556,6.7c4.723-1.209,9.534,1.651,10.734,6.374s-1.651,9.534-6.374,10.734 C448.5,114.795,444.731,115.254,441.006,115.254"
            />
            <path
              style={{ fill: "#EBC494" }}
              d="M253.748,302.474c-11.379,0-22.758-4.228-31.214-12.685c-9.746-9.754-27.701-9.754-37.447,0 c-3.443,3.443-9.039,3.443-12.482,0c-3.452-3.452-3.452-9.039,0-12.491c8.201-8.21,19.288-12.729,31.206-12.729 c11.917,0,23.005,4.52,31.206,12.729c10.152,10.143,27.295,10.152,37.455,0c3.452-3.443,9.039-3.443,12.482,0 c3.452,3.452,3.452,9.039,0,12.491C276.497,298.245,265.127,302.474,253.748,302.474"
            />
            <path
              style={{ fill: "#EBC494" }}
              d="M191.325,364.892c-11.379,0-22.749-4.228-31.214-12.685c-9.746-9.754-27.701-9.754-37.447,0 c-3.452,3.452-9.039,3.452-12.482,0c-3.452-3.452-3.452-9.031,0-12.482c8.201-8.21,19.288-12.729,31.206-12.729 s23.005,4.52,31.206,12.729c10.161,10.143,27.304,10.143,37.464,0c3.443-3.452,9.031-3.452,12.482,0 c3.443,3.452,3.443,9.039,0,12.482C214.074,360.663,202.704,364.892,191.325,364.892"
            />
            <path
              style={{ fill: "#EBC494" }}
              d="M129.023,427.306c-11.546,0-23.005-4.352-31.329-12.685c-6.497-6.497-16.305-9.066-25.565-6.7 c-4.705,1.245-9.525-1.642-10.734-6.365c-1.201-4.732,1.651-9.534,6.374-10.734c15.263-3.902,31.523,0.433,42.408,11.317 c8.307,8.298,21.848,9.984,32.221,4.017c4.22-2.428,9.622-0.98,12.058,3.24c2.428,4.228,0.98,9.622-3.249,12.058 C144.365,425.39,136.676,427.306,129.023,427.306"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
