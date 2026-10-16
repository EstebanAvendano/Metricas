import { Bug, Smile, TrendingUp } from "lucide-react";

import type { Kpi } from "../../Models/Kpi.ts";

export const kpisDesarrollo: Kpi[] = [
  {
    id: "impacto-mejoras",
    nombre: "Impacto de mejoras",
    resultado: 34.5,
    meta: 30,
    unidad: "%",
    operador: ">",
    color: "#f59e0b",
    icono: TrendingUp,
    fuente: "Gobernanza SQL",
    formula: "(Tiempo inicial − Nuevo tiempo) / Tiempo inicial × 100",
    nota: "Línea base informada por el usuario en el ticket, bajo principio de confianza y veracidad.",
    apoyo: {
      etiqueta: "Ahorro mensual acumulado",
      valor: "48,5 h ahorradas / mes",
    },
  },
  {
    id: "resolucion-de-fallas",
    nombre: "Resolución de fallas",
    resultado: 9,
    meta: 15,
    unidad: "%",
    color: "#7c3aed",
    icono: Bug,
    fuente: "PRISMA",
    operador: "<",
    formula: 'Tickets "Caso de soporte" / Tickets totales × 100',
    nota: 'Tickets con la etiqueta "Caso de soporte" registrados en PRISMA.',
    apoyo: {
      etiqueta: "Tickets del período",
      valor: "18 fallas de 200 tickets",
    },
  },
  {
    id: "satisfaccion",
    nombre: "Satisfacción cliente interno",
    resultado: 4.4,
    meta: 4,
    unidad: " / 5",
    operador: ">=",
    color: "#10b981",
    icono: Smile,
    fuente: "Encuesta",

    formula: "Suma de calificaciones (1 a 5) / N.º de respuestas",
    nota: "Encuesta corta (3-4 preguntas) aplicada al cierre de cada entrega.",
    apoyo: { etiqueta: "Muestra", valor: "26 respuestas" },
  },
];
