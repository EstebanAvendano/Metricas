import type { CSSProperties } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import type { Kpi, OperadorMeta } from "../../Models/Kpi.ts";

import "./TarjetaKpi.css";

const simbolos: Record<OperadorMeta, string> = {
  ">": ">",
  ">=": "≥",
  "<": "<",
  "<=": "≤",
};

function cumpleMeta(
  resultado: number,
  operador: OperadorMeta,
  meta: number,
): boolean {
  if (operador === ">") return resultado > meta;
  if (operador === ">=") return resultado >= meta;
  if (operador === "<") return resultado < meta;
  return resultado <= meta;
}
function calcularProgreso(kpi: Kpi): number {
  if (kpi.operador === ">" || kpi.operador === ">=") {
    return (kpi.resultado / kpi.meta) * 100;
  }
  if (kpi.resultado === 0) return 100;
  return (kpi.meta / kpi.resultado) * 100;
}
function formato(numero: number): string {
  return numero.toLocaleString("es-CO", { maximumFractionDigits: 2 });
}

function TarjetaKpi({ kpi }: { kpi: Kpi }) {
  const cumple = cumpleMeta(kpi.resultado, kpi.operador, kpi.meta);
  const progreso = calcularProgreso(kpi);
  const menorEsMejor = kpi.operador === "<" || kpi.operador === "<=";

  const diferencia = kpi.resultado - kpi.meta;
  const signo = diferencia > 0 ? "+" : "";
  const unidadDiferencia = kpi.unidad === "%" ? " pp" : "vs ";

  const Icono = kpi.icono;
  const IconoEstado = cumple ? CheckCircle : XCircle;

  return (
    <article
      className="tarjeta-kpi"
      style={{ "--color-kpi": kpi.color } as CSSProperties}
    >
      <header className="tarjeta-kpi-encabezado">
        <div className="tarjeta-kpi-titulo">
          <span className="tarjeta-kpi-icono">
            <Icono size={18} />
          </span>
          <h3 className="tarjeta-kpi-nombre">{kpi.nombre}</h3>
        </div>
        <span className="tarjeta-kpi-meta">
          Meta: {simbolos[kpi.operador]} {formato(kpi.meta)}
          {kpi.unidad}
          {menorEsMejor && <small>(Menor es mejor)</small>}
        </span>
      </header>

      <div className="tarjeta-kpi-cifras">
        <span className="tarjeta-kpi-resultado">
          {formato(kpi.resultado)}
          <span className={kpi.unidad === "%" ? "" : "tarjeta-kpi-unidad"}>
            {kpi.unidad}
          </span>
        </span>
        <span
          className={
            cumple
              ? "tarjeta-kpi-estado cumple"
              : "tarjeta-kpi-estado no-cumple"
          }
        >
          <IconoEstado size={16} />
          {signo}
          {formato(diferencia)}
          {unidadDiferencia} vs meta
        </span>
      </div>

      <div className="tarjeta-kpi-formula">
        <div className="tarjeta-kpi-formula-encabezado">
          <span>Fórmula de negocio</span>
          <span className="tarjeta-kpi-fuente">{kpi.fuente}</span>
        </div>
        <code>{kpi.formula}</code>
        <p>{kpi.nota}</p>
      </div>

      <div className="tarjeta-kpi-apoyo">
        <span className="tarjeta-kpi-etiqueta">{kpi.apoyo.etiqueta}</span>
        <strong>{kpi.apoyo.valor}</strong>
      </div>

      <div className="tarjeta-kpi-progreso">
        <div className="tarjeta-kpi-progreso-texto">
          <span>Cumplimiento de la meta</span>
          <span>{formato(progreso)}%</span>
        </div>
        <div className="tarjeta-kpi-barra">
          <div
            className="tarjeta-kpi-barra-relleno"
            style={{ width: `${Math.min(progreso, 100)}%` }}
          />
        </div>
      </div>
    </article>
  );
}

export default TarjetaKpi;
