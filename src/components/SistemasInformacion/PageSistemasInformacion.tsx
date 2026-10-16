import PaginaKpis from "../PaginaKpi/PaginaKpi.tsx";

import { kpisSistemasInformacion } from "./kpisSistemasInformacion.ts";

function PageSistemasInformacion() {
  return (
    <PaginaKpis
      titulo="KPIs y Métricas — Sistemas de Información"
      subtitulo="Atención de soporte funcional,Disponibilidad de servicios criticos,Tiempo de resolución de fallas en servicios críticos (ETL, Vtex) "
      kpis={kpisSistemasInformacion}
    />
  );
}
export default PageSistemasInformacion;
