"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [x, setX] = useState(0); // Lưu x vào state

  useEffect(() => {
    async function r5() {
      setX((prevX) => {
        const newX = prevX + 1;
        console.log(newX);
        return newX;
      });
      return 5;
    }

    (async () => {
      const result = await r5();
      setX((prevX) => {
        const newX = prevX + result;
        console.log(newX);
        return newX;
      });
    })();
  }, []);

  return <div>Kết quả: {x}</div>;
}
