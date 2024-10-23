'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Up({
  width = 40,
  height = 40,
}: {
  width: number;
  height: number;
}) {
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setIsVisible(!pathname.startsWith('/dashboard'));
  }, [pathname]);

  if (!isVisible) return null;
  
  return (
    <button>
      <Link href={"#header"}>
        <svg
          fill="#000000"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#000000"
          width={width}
          height={height}
          transform="rotate(-45)matrix(1, 0, 0, 1, 0, 0)"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <circle
              id="secondary"
              cx="12"
              cy="12"
              r="9"
              style={{ fill: "#000000", strokeWidth: 2 }}
            ></circle>
            <polyline
              id="primary"
              points="9.17 10.59 13.41 10.59 13.41 14.83"
              style={{
                fill: "none",
                stroke: "#ffffff",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
              }}
            ></polyline>
            <circle
              id="primary-2"
              data-name="primary"
              cx="12"
              cy="12"
              r="9"
              style={{
                fill: "none",
                stroke: "#00000000",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
              }}
            ></circle>
          </g>
        </svg>
      </Link>
    </button>
  );
}
