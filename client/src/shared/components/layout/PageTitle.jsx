import { useEffect } from "react";
import { useMatches } from "react-router-dom";

export default function PageTitle() {
  const matches = useMatches();

  useEffect(() => {
    const title = [...matches]
      .reverse()
      .find((match) => match.handle?.title)?.handle.title;

    document.title = title || "Chirag Gupta";
  }, [matches]);

  return null;
}