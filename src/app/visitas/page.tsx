'use client'

import useWindowSize from "@/utils/SizeWindow";
import { useEffect } from "react";
import Mobile from "./Mobile";
import Tablet from "./Tablet";
import Laptop from "./Laptop";
import LaptopL from "./LaptopL";
import 'aos/dist/aos.css';
import AOS from 'aos';

export default function Visitas() {
  const window = useWindowSize();

  useEffect(() => {
    AOS.init({
      mirror: true,
    });
  }, []);

  if (window.width > 1024) return (<LaptopL />); // Laptops with more than 1024px of window size

  if (window.width > 768) return (<Laptop />); // Laptops with less than 1024px of window size

  if (window.width > 425) return (<Tablet />); // Tablets with 768px or less of window size

  if (window.width <= 425) return (<Mobile />); // Mobile  with 425px or less of window size
}
