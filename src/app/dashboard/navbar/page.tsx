'use client';

import { useEffect, useState } from 'react';

type NavbarItem = {
  id: string;
  name: string;
  url: string;
};

export default function NavbarList() {
  const [navbarItems, setNavbarItems] = useState<NavbarItem[]>([]);

  useEffect(() => {
    const fetchNavbarItems = async () => {
      const res = await fetch('/api/navbar');
      const data = await res.json();
      setNavbarItems(data);
    };
    fetchNavbarItems();
  }, []);

  return (
    <div>
      <h1>Navbar Items</h1>
      <ul>
        {navbarItems.map((item) => (
          <li key={item.id}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
