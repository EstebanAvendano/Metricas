import PaginaKpis from "../PaginaKpi/PaginaKpi.tsx";

import { kpisDesarrollo } from "./kpisDesarrollo.ts";
import type { Periodo, Usuario } from "../../Services/IndicadoresApi.ts";

type PageDesarrolloProps = {
  periodo: Periodo;
  usuario: number | null;
  alRecibirUsuarios: (usuarios: Usuario[]) => void;
};

function PageDesarrollo({
  periodo,
  usuario,
  alRecibirUsuarios,
}: PageDesarrolloProps) {
  return (
    <PaginaKpis
      titulo="KPIs y Métricas — Desarrollo"
      subtitulo="Impacto de las mejoras, fallas reportadas y satisfacción del cliente interno."
      area="desarrollo"
      kpis={kpisDesarrollo}
      usuario={usuario}
      periodo={periodo}
      alRecibirUsuarios={alRecibirUsuarios}
    />
  );
}

export default PageDesarrollo;
