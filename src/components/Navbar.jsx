import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className=" my-3 border-b sm:text-center sm:items-center flex justify-between py-5 px-10">
      <Link to={isAuthenticated ? "/turnos" : "/ingreso"}>
        <h1 className="hover:text-cyan-300 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300 text-2xl font-bold">
          {isAuthenticated ? `Hola! ${user.username}` : "Sistema de turnos"}
        </h1>
      </Link>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>
              <Link
                className="transition ease-in-out delay-150 antialiased font-bold hover:text-cyan-300 text-white px-4 py-2"
                to="/turnos"
              >
                Mis turnos
              </Link>
            </li>
            <li>
              <Link
                className="transition ease-in-out delay-150 antialiased font-bold hover:text-cyan-300 text-white px-4 py-2"
                to="/solicitar-turno"
              >
                Solicitar turno
              </Link>
            </li>
            <li>
              <Link
                className="transition ease-in-out delay-150 antialiased font-bold hover:text-cyan-300 text-white px-4 py-2"
                onClick={() => logout()}
                to="/ingreso"
              >
                Cerrar sesión
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                className="transition ease-in-out delay-150 antialiased font-bold hover:text-emerald-300 text-white px-4 py-2"
                to="/ingreso"
              >
                Ingresar
              </Link>
            </li>
            <li>
              <Link
                className="transition ease-in-out delay-150 antialiased font-bold hover:text-emerald-300 text-white px-4 py-2"
                to="/registro"
              >
                Registrarme
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
