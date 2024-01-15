"use client";

import { usePathname } from "next/navigation";

const username = () => {
  const pathname = usePathname();
  console.log(pathname, "pathname");

  return (
    <>
    <h2>hello, this is {pathname} page</h2>
    
    </>
  );
};

export default username;