"use client";

import { useState } from "react";

function Counter({ usersCount }) {
  const [count, setCount] = useState(usersCount || 0);
  console.log(usersCount);

  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}

export default Counter;
