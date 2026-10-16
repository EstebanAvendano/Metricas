import PaginaKpis from "../PaginaKpi/PaginaKpi.tsx";

import { kpisDesarrollo } from "./kpisDesarrollo.ts";

function PageDesarrollo() {
  return (
    <PaginaKpis
      titulo="KPIs y Métricas — Desarrollo"
      subtitulo="Impacto de las mejoras, fallas reportadas y satisfacción del cliente interno."
      kpis={kpisDesarrollo}
    />
  );
}

export default PageDesarrollo;
