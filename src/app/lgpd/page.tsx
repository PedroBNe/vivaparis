"use client";

import useWindowSize from "@/utils/SizeWindow";
import LaptopL from "./LaptopL";
import Laptop from "./Laptop";
import Tablet from "./Tablet";
import Mobile from "./Mobile";

export default function LGPD() {
  const window = useWindowSize();

  if (window.width > 1024) return <LaptopL />; // Laptops with more than 1024px of window size

  if (window.width > 768) return <Laptop />; // Laptops with less than 1024px of window size

  if (window.width > 425) return <Tablet />; // Tablets with 768px or less of window size

  if (window.width <= 425) return <Mobile />; // Mobile  with 425px or less of window size
}
