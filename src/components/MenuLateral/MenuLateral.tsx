import "./MenuLateral.css";

const areas = [
  "Desarrollo",
  "Sistemas de Información",
  "CRM",
  "Procesos",
  "Front",
];

type MenuLateralProps = {
  areaActiva: string;
  alCambiarArea: (area: string) => void;
};

function MenuLateral({ areaActiva, alCambiarArea }: MenuLateralProps) {
  return (
    <aside className="menu-lateral">
      <div className="menu-lateral-marca">
        <img src="/favicon.svg" alt="" className="menu-lateral-logo" />
        Indicadores EDM
      </div>

      <p className="menu-lateral-seccion">Áreas & KPIs</p>
      <ul className="menu-lateral-lista">
        {areas.map((area) => (
          <li key={area}>
            <button
              type="button"
              className={
                area === areaActiva
                  ? "menu-lateral-item activo"
                  : "menu-lateral-item"
              }
              onClick={() => alCambiarArea(area)}
            >
              {area}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default MenuLateral;
