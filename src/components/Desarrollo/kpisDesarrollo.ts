import { Bug, Smile, Clock } from "lucide-react";

import type { Kpi } from "../../Models/Kpi.ts";

export const kpisDesarrollo: Kpi[] = [
  {
    id: "tiempo-resolucion",
    nombre: "Tiempo de resolución de soporte",
    resultado: null,
    estado: "sin_datos",
    meta: 3,
    unidad: "días",
    operador: "<=",
    color: "#f59e0b",
    icono: Clock,
    fuente: "PRISMA",
    formula:
      "Promedio  de tiempo de resolucion entre Fecha creación y Fecha cierre",
    nota: 'Solo tickets "Caso de soporte" cerrados, filtrados por fecha de cierre',
    apoyo: { etiqueta: "Tickets cerrados", valor: "—" },
    ruta: "desarrollo/tiempo-resolucion",
    textoApoyo: (d) => `${d.ticketsCerrados} tickets cerrados`,
  },
  {
    id: "resolucion-fallas",
    nombre: "Resolución de fallas",
    resultado: null,
    estado: "sin_datos",
    meta: 15,
    unidad: "%",
    color: "#7c3aed",
    icono: Bug,
    fuente: "PRISMA",
    operador: "<",
    formula: 'Tickets "Caso de soporte" / Tickets totales × 100',
    nota: 'Tickets con la etiqueta "Caso de soporte" registrados en PRISMA.',
    apoyo: { etiqueta: "Tickets del período", valor: "—" },
    ruta: "desarrollo/resolucion-fallas",
    textoApoyo: (d) =>
      `${d.ticketsFallas} fallas de ${d.ticketsTotales} tickets`,
  },
  {
    id: "satisfaccion",
    nombre: "Satisfacción cliente interno",
    resultado: null,
    estado: "sin_datos",
    meta: 4,
    unidad: " / 5",
    operador: ">=",
    color: "#10b981",
    icono: Smile,
    fuente: "PRISMA",

    formula: "Suma de calificaciones (1 a 5) / N.º de respuestas",
    nota: "Calificación de la Solución",
    apoyo: { etiqueta: "Muestra", valor: "—" }, // satisfacción
    ruta: "desarrollo/satisfaccion",
    textoApoyo: (d) => `${d.calificaciones} calificaciones`,
  },
];
