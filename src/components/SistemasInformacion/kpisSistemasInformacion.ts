import { Headset, Server, Timer } from "lucide-react";
import type { Kpi } from "../../Models/Kpi.ts";

export const kpisSistemasInformacion: Kpi[] = [
  {
    id: "disponibilidad",
    nombre: "disponibilidad de servicios criticos",
    resultado: 97.22,
    meta: 95,
    unidad: "%",
    operador: ">=",
    color: "#10b981",
    icono: Server,
    fuente: "PRISMA",
    formula: "(Horas del mes − Horas de corrección) / Horas del mes × 100",
    nota: 'Horario laboral de 8,5 h por día. Horas de los tickets con etiqueta "corrección indisponibilidad".',
    apoyo: {
      etiqueta: "Horas de corrección",
      valor: "5,2 h de 187 h laborales",
    },
  },
  {
    id: "resolucion-fallas-criticas",
    nombre: "Tiempo de resolución de fallas en servicios criticos (ETL, Vtex",
    resultado: 72,
    meta: 100,
    unidad: "%",
    operador: ">=",
    color: "#7c3aed",
    icono: Timer,
    fuente: "PRISMA",
    formula:
      "# de horas para solucionar la falla/# de horas disponibles para fallas × 100",
    nota: ' Servicios críticos (ETL,Vtex):tickets con etiquetas "Proyectos ETL" e "Integraciones".',
    apoyo: {
      etiqueta: "Horas de corrección",
      valor: "18 h de 25 h disponibles",
    },
  },
  {
    id: "atencion-de-soporte-funcional",
    nombre: "Atención de soporte funcional",
    resultado: 85,
    meta: 83.33,
    unidad: "%",
    operador: ">=",
    color: "#0ea5e9",
    icono: Headset,
    fuente: "PRISMA",
    formula:
      "solicitudes de soporte a la operacion atendida/ solicitudes de soporte a la operacion recibidad x 100",
    nota: 'Tickets con etiqueta "Solicitud de soporte" y resueltos dentro del SLA.',
    apoyo: {
      etiqueta: "Solicitudes del período",
      valor: "41 atendidas de 46 recibidas",
    },
  },
];
