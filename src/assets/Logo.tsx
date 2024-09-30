export default function Logo({ color, width, height }: { width: number, height: number, color: string }) {
    return(
      <svg
      viewBox="0 0 512 512"
      id="Layer_1"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      width={width}
      height={height}
      >
        <g
        id="SVGRepo_bgCarrier"
        stroke-width="0">
        </g>
        <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round">
        </g>
        <g
        id="SVGRepo_iconCarrier">
        <style
        type="text/css">
        </style> <g> <g>
          <path
            d="M37.1,461.5h79c15.7-22.1,31.8-50,47.3-80.9h-60.1C83.3,410.2,61.3,437.9,37.1,461.5z M230.4,218.7h-41.8 c-12.3,29.3-26.6,60.2-42.8,90.7H196C208.7,279.3,220.4,248.4,230.4,218.7z M256,131.7c1.3,5.1,2.7,10.4,4.1,15.7h35.8 c-9.6-27.1-17-50.6-22.1-67.9c-3.4-11.6-5.8-20.5-7.3-25.9L256,50.5l-10.6,3.2c-1.4,5.4-3.8,14.3-7.3,25.9 c-5.1,17.3-12.5,40.7-22.1,67.9h35.8C253.3,142.1,254.7,136.8,256,131.7z M281.6,218.7c10,29.7,21.7,60.6,34.3,90.7h50.3 c-16.3-30.5-30.5-61.4-42.8-90.7H281.6z M408.8,380.6h-60.2c15.5,30.9,31.6,58.7,47.3,80.9h79 C450.7,437.9,428.7,410.2,408.8,380.6z M432,323.4H80v43.2h352V323.4z M359.5,161.5H152.5v43.2h207.1V161.5z">
          </path> </g> </g> </g>
      </svg>
    )
}
