"use client";

import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

const ScrollToHash = () => {
  //   const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  //   useEffect(() => {
  //     const hash = router.asPath.split("#")[1];
  //     if (hash) {
  //       const element = document.getElementById(hash);
  //       if (element) {
  //         element.scrollIntoView({ behavior: "smooth" });
  //       }
  //     }
  //   }, [router.asPath]);

  useEffect(() => {
    // Mark component as client-side
    setIsClient(true);

    if (isClient) {
      const hash = window.location.hash;
      if (hash) {
        const element = document.getElementById(hash.substring(1)); // Remove '#' from hash
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, [isClient]);

  return null;
};

export default ScrollToHash;
