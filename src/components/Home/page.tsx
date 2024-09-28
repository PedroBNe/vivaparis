"use client";

import { useEffect } from "react";
import React from "react";
import 'aos/dist/aos.css';
import AOS from 'aos';
import useWindowSize from "@/utils/SizeWindow";
import Laptop from "./Laptop";
import Tablet from "./Tablet";
import Mobile from "./Mobile";
import LaptopL from "./LaptopL";

export default function Home() {
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
