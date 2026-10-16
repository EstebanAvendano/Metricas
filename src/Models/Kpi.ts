import type { LucideIcon } from "lucide-react";

export type OperadorMeta = ">" | ">=" | "<" | "<=";

export type ApoyoKpi = {
  etiqueta: string;
  valor: string;
};

export type Kpi = {
  id: string;
  nombre: string;
  resultado: number;
  meta: number;
  unidad: string;
  operador: OperadorMeta;
  color: string;
  icono: LucideIcon;
  fuente: string;
  apoyo: ApoyoKpi;
  formula: string;
  nota: string;
};
