import { useState, useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    async function fetchTestAPI(){
      const response = await fetch('/api/test/server-is-online');
      const data = await response.json();
      console.log(data);
    };

    fetchTestAPI();
  }, []);

  return (
    <>
      <h1>Hello World</h1>
    </>
  );
}

export default App;
