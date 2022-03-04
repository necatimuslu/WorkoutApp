import { StatusBar } from "expo-status-bar";
import useCashedResources from "./hooks/useCashedResources";

import Navigation from "./navigation";

export default function App() {
  const loaded = useCashedResources();

  if (loaded) {
    return (
      <>
        <Navigation />
        <StatusBar style="auto" />
      </>
    );
  } else {
    return null;
  }
}
