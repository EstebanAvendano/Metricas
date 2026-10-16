import { CircleHelp, Lock, ShieldCheck } from "lucide-react";

import ResumenLogin from "../../assets/ResumenLogin.png";

import "./Login.css";

type LoginProps = {
  alIniciarSesion: () => void;
};

function Login({ alIniciarSesion }: LoginProps) {
  return (
    <div className="login">
      <aside className="login-marca">
        <div className="login-logo">
          <img src="/favicon.svg?v=2" alt="" />
          <div>
            <strong>Indicadores EDM</strong>
            <span>Estudio de Moda</span>
          </div>
        </div>

        <div className="login-marca-centro">
          <span className="login-etiqueta">Inteligencia operativa</span>
          <h1 className="login-frase">
            Tu operación,
            <br />
            en un solo instante.
          </h1>
          <p className="login-descripcion">
            Conecta tus datos, monitorea tus KPIs y toma decisiones con una
            visión clara de tu área.
          </p>
          <img src={ResumenLogin} alt="" className="login-resumen" />

          <p className="login-confianza">
            <ShieldCheck size={18} />
            Datos confiables. Decisiones con respaldo.
          </p>
        </div>
      </aside>

      <main className="login-panel ">
        <header className="login-panel-superior">
          <span className=" login-acceso-seguro">
            <Lock size={14} />
            Acceso seguro
          </span>
          <a href="#" className="login-enlace">
            <CircleHelp size={16} />
            ¿Necesitas ayuda?
          </a>
        </header>
        <div className="login-panel-centro">
          <section className="login-tarjeta">
            <h2 className="login-titulo">Bienvenido a Indicadores EDM</h2>
            <p className="login-subtitulo">
              Usa tus credenciales corporativas para acceder a tus indicadores
            </p>

            <button
              type="button"
              className="login-boton"
              onClick={alIniciarSesion}
            >
              Iniciar sesión
            </button>

            <p className="Login.aviso">
              <ShieldCheck size={16} />
              Acceso exclusivo para usuarios autorizados.
            </p>
          </section>
          <p className="login-sin-acceso">
            ¿Aún no tienes acceso?
            <a href="#" className="login-sin-acceso-enlace">
              Contacta al administrador de tu organización
            </a>
          </p>
        </div>

        <footer className="login-panel-pie">
          <span>
            © {new Date().getFullYear()} Indicadores EDM · Estudio de Moda
          </span>
          <nav className="login-panel-legal">
            <a href="#">Privacidad</a>
            <a href="#">Términos de uso</a>
          </nav>
        </footer>
      </main>
    </div>
  );
}

export default Login;
