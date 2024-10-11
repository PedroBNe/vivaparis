export default function Eifell({
  height = 10,
  width = 10,
  color = "#000000",
}: {
  height: number;
  width: number;
  color: string;
}) {
  return (
    <svg
      height={height}
      width={width}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill={color}
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path d="M432,512l-19.2-25.6c-32-44.8-56-81.6-73.6-118.4H352v-32h-25.6c-8-19.2-12.8-41.6-17.6-64H320v-32 h-17.6c-4.8-32-6.4-68.8-6.4-112h1.6h6.4V96h-8h-1.6l-8-64H272V0h-32v32h-14.4l-8,64H216h-8v32h6.4h1.6c0,43.2-3.2,80-6.4,112H192 v32h12.8c-4.8,22.4-9.6,44.8-17.6,64H160v32h12.8c-17.6,36.8-41.6,73.6-73.6,118.4L80,512h128v-16c0-27.2,20.8-48,48-48 s48,20.8,48,48v16H432z M254.4,64h3.2l3.2,32h-11.2L254.4,64z M248,128h16c0,43.2,3.2,80,6.4,112h-28.8C244.8,208,248,171.2,248,128 z M236.8,272h38.4c4.8,22.4,9.6,44.8,16,64h-72C227.2,316.8,232,294.4,236.8,272z M256,416c-38.4,0-70.4,27.2-78.4,64h-35.2 c27.2-40,49.6-75.2,65.6-112h96c16,36.8,36.8,72,65.6,112h-35.2C326.4,443.2,294.4,416,256,416z"></path>{" "}
      </g>
    </svg>
  );
}
