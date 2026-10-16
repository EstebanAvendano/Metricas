import MenuLateral from "./components/MenuLateral/MenuLateral.tsx";
import BarraSuperior from "./components/BarraSuperior/BarraSuperior.tsx";
import PageDesarrollo from "./components/Desarrollo/PageDesarrollo.tsx";
import PageSistemasInformacion from "./components/SistemasInformacion/PageSistemasInformacion.tsx";
import { useState } from "react";
import Login from "./components/Login/Login.tsx";
import "./App.css";

function App() {
  const [sesionIniciada, setSesionIniciada] = useState(false);
  const [areaActiva, setAreaActiva] = useState("Desarrollo");
  if (!sesionIniciada) {
    return <Login alIniciarSesion={() => setSesionIniciada(true)} />;
  }

  function mostrarPantalla() {
    if (areaActiva === "Desarrollo") return <PageDesarrollo />;
    if (areaActiva === "Sistemas de Información")
      return <PageSistemasInformacion />;

    return (
      <p className="app-en-construccion">
        Indicadores de {areaActiva} en construcción
      </p>
    );
  }
  return (
    <div className="app">
      <MenuLateral areaActiva={areaActiva} alCambiarArea={setAreaActiva} />
      <div className="app-principal">
        <BarraSuperior />
        <main className="app-contenido">{mostrarPantalla()}</main>
      </div>
    </div>
  );
}

export default App;
