import type { Kpi } from "../../Models/Kpi.ts";
import TarjetaKpi from "../TarjetaKpi/TarjetaKpi.tsx";
import "./PaginaKpi.css";

type PaginaKpisProps = {
  titulo: string;
  subtitulo: string;
  kpis: Kpi[];
};

function PaginaKpis({ titulo, subtitulo, kpis }: PaginaKpisProps) {
  return (
    <section>
      <header className="pantalla-encabezado">
        <h1 className="pantalla-titulo">{titulo}</h1>
        <p className="pantalla-subtitulo">{subtitulo}</p>
      </header>
      <div className="pantalla-tarjetas">
        {kpis.map((kpi) => (
          <TarjetaKpi key={kpi.id} kpi={kpi} />
        ))}
      </div>
    </section>
  );
}

export default PaginaKpis;
