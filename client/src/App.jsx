import { useState } from "react";
import { RouterProvider } from "react-router-dom";

import router from "./shared/router";
import LoadingScreen from "./shared/components/ui/LoadingScreen";

export default function App() {
  const [booting, setBooting] = useState(true);

  return (
    <>
      {booting && <LoadingScreen onDone={() => setBooting(false)} />}

      <RouterProvider router={router} />
    </>
  );
}
