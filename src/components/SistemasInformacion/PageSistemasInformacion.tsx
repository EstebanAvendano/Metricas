import PaginaKpis from "../PaginaKpi/PaginaKpi.tsx";

import { kpisSistemasInformacion } from "./kpisSistemasInformacion.ts";
import type { Periodo, Usuario } from "../../Services/IndicadoresApi.ts";

type PageSistemasInformacionProps = {
  periodo: Periodo;
  usuario: number | null;
  alRecibirUsuarios: (usuarios: Usuario[]) => void;
};

function PageSistemasInformacion({
  periodo,
  usuario,
  alRecibirUsuarios,
}: PageSistemasInformacionProps) {
  return (
    <PaginaKpis
      titulo="KPIs y Métricas — Sistemas de Información"
      subtitulo="Atención de soporte funcional,Disponibilidad de servicios criticos,Tiempo de resolución de fallas en servicios críticos (ETL, Vtex) "
      area="sistemas"
      kpis={kpisSistemasInformacion}
      usuario={usuario}
      alRecibirUsuarios={alRecibirUsuarios}
      periodo={periodo}
    />
  );
}
export default PageSistemasInformacion;
