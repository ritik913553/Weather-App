import { useState } from "react";
import HomePage from "./components/Home/HomePage";
import Routing from "./utils/Routing";
import toast, { Toaster } from "react-hot-toast";

function App() {

  return (
    <>
      <Routing />
      <Toaster position="bottom-left" reverseOrder={false} />
    </>
  );
}

export default App;
