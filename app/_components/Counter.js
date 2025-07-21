"use client";

import { useState } from "react";

function Counter({ usersCount }) {
  const [count, setCount] = useState(usersCount || 0);

  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}

export default Counter;
