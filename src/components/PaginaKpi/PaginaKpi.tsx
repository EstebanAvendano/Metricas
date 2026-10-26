import type { Kpi } from "../../Models/Kpi.ts";
import { useEffect, useState } from "react";
import TarjetaKpi from "../TarjetaKpi/TarjetaKpi.tsx";
import "./PaginaKpi.css";
import {
  obtenerArea,
  type Periodo,
  type RespuestaKpi,
  type Usuario,
} from "../../Services/IndicadoresApi.ts";

type PaginaKpisProps = {
  titulo: string;
  subtitulo: string;
  area: string;

  kpis: Kpi[];
  periodo: Periodo;
  usuario: number | null;
  alRecibirUsuarios: (usuarios: Usuario[]) => void;
};

function combinar(kpi: Kpi, respuesta: RespuestaKpi): Kpi {
  return {
    ...kpi,
    resultado: respuesta.resultado,
    estado: respuesta.estado,
    meta: respuesta.meta,
    operador: respuesta.operador,
    apoyo: {
      ...kpi.apoyo,
      valor: kpi.textoApoyo
        ? kpi.textoApoyo(respuesta.detalle)
        : kpi.apoyo.valor,
    },
  };
}

function PaginaKpis({
  titulo,
  subtitulo,
  area,
  kpis,
  periodo,
  usuario,
  alRecibirUsuarios,
}: PaginaKpisProps) {
  const [kpisconDatos, setKpisConDatos] = useState<Kpi[]>(kpis);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let cancelado = false;
    obtenerArea(area, periodo, usuario)
      .then((respuesta) => {
        if (cancelado) return;
        setKpisConDatos(
          kpis.map((kpi) => {
            const datos = respuesta.kpis.find((r) => r.id === kpi.id);
            return datos ? combinar(kpi, datos) : kpi;
          }),
        );

        alRecibirUsuarios(respuesta.usuarios);
        setError(null);
      })
      .catch((e: Error) => {
        if (!cancelado) setError(e.message);
      });
    return () => {
      cancelado = true;
    };
  }, [area, kpis, periodo, usuario, alRecibirUsuarios]);

  return (
    <section>
      <header className="pantalla-encabezado">
        <h1 className="pantalla-titulo">{titulo}</h1>
        <p className="pantalla-subtitulo">{subtitulo}</p>
      </header>
      {error && <p className="pantalla-error">{error}</p>}
      <div className="pantalla-tarjetas">
        {kpisconDatos.map((kpi) => (
          <TarjetaKpi key={kpi.id} kpi={kpi} />
        ))}
      </div>
    </section>
  );
}

export default PaginaKpis;
