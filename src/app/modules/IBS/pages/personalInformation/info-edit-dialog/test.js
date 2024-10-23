import React, { useRef, useState, useEffect } from "react";

export function ExampleComponent(props) {
  const [count, setCount] = useState(1);
  const data = useRef({
    a: 1,
    b: 2,
  });
  useEffect(() => {
    console.log("use Effect called");
    setCount((count) => count + 1);
    // logic
  }, [data.current]);

  return <>hello</>;
}
