import { useState } from "react";
import PlayGround from "./pages/playground";
import Card from "./pages/card";
import Card__Alt from "./pages/card-alt";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <PlayGround />
      <Card />
      <Card__Alt />
    </>
  );
}

export default App;
