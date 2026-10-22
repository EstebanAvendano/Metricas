import type { Kpi } from "../../Models/Kpi.ts";
import { useEffect, useState } from "react";
import TarjetaKpi from "../TarjetaKpi/TarjetaKpi.tsx";
import "./PaginaKpi.css";
import {
  obtenerKpi,
  periodoMesActual,
  type RespuestaKpi,
} from "../../Services/IndicadoresApi.ts";

type PaginaKpisProps = {
  titulo: string;
  subtitulo: string;
  kpis: Kpi[];
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

function PaginaKpis({ titulo, subtitulo, kpis }: PaginaKpisProps) {
  const [kpisconDatos, setKpisConDatos] = useState<Kpi[]>(kpis);
  const [error, setError] = useState<string | null>(null);

  const [periodo] = useState(periodoMesActual);
  useEffect(() => {
    let cancelado = false;
    Promise.all(
      kpis.map(async (kpi) => {
        if (!kpi.ruta) return kpi;
        const respuesta = await obtenerKpi(kpi.ruta, periodo);
        return combinar(kpi, respuesta);
      }),
    )

      .then((resultado) => {
        if (cancelado) return;
        setKpisConDatos(resultado);
        setError(null);
      })
      .catch((e: Error) => {
        if (!cancelado) setError(e.message);
      });
    return () => {
      cancelado = true;
    };
  }, [kpis, periodo]);

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
