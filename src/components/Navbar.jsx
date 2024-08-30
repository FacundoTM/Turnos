import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to={isAuthenticated ? "/turnos" : "/ingreso"}>
        <h1 className="text-2xl font-bold">
          {isAuthenticated
            ? `Bienvenido, ${user.username}`
            : "Sistema de turnos"}
        </h1>
      </Link>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>
              <Link
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2"
                to="/turnos"
              >
                Mis turnos
              </Link>
            </li>
            <li>
              <Link
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2"
                to="/solicitar-turno"
              >
                Solicitar turno
              </Link>
            </li>
            <li>
              <Link
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2"
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
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2"
                to="/ingreso"
              >
                Ingresar
              </Link>
            </li>
            <li>
              <Link
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2"
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
