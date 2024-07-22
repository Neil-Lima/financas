import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Rotas from "./routes/Rotas";
import { ThemeProvider } from "./context/contextTheme";

function App() {
  return (
    <ThemeProvider>      
      <Rotas />
    </ThemeProvider>
  );
}

export default App;
