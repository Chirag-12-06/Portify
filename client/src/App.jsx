import { useState } from "react";
import { RouterProvider } from "react-router-dom";

import router from "./shared/router";
import LoadingScreen from "./shared/components/ui/LoadingScreen";

export default function App() {
  const [showLoader, setShowLoader] = useState(
    () => sessionStorage.getItem("app-loader-shown") !== "true",
  );

  const [animationDone, setAnimationDone] = useState(false);

  const shouldShowLoader = showLoader && !animationDone;

  return (
    <>
      {shouldShowLoader && (
        <LoadingScreen
          onDone={() => {
            setAnimationDone(true);
            sessionStorage.setItem("app-loader-shown", "true");
            setShowLoader(false);
          }}
        />
      )}

      <RouterProvider router={router} />
    </>
  );
}