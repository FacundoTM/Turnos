import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="flex-col h-52 items-center flex justify-center py-5 px-10 bg-[#693AFF]">
      <Link to={isAuthenticated ? "/turnos" : "/ingreso"}>
        <h1 className="text-[42px] hover:text-[#ffffff] transition ease-in-out delay-150 duration-300 text-2xl font-bold">
          {isAuthenticated ? `Hola, ${user.username}!` : "Lavadero"}
        </h1>
      </Link>
      <ul className="flex flex-col items-center pt-6">
        {isAuthenticated ? (
          <>
            <li>
              <Link
                className="transition-all uppercase ease-in-out delay-150 antialiased font-light hover:font-bold text-white px-4 py-2"
                to="/turnos"
              >
                Mis turnos
              </Link>
            </li>
            <li>
              <Link
                className="transition-all uppercase ease-in-out delay-150 antialiased font-light hover:font-bold text-white px-4 py-2"
                to="/solicitar-turno"
              >
                Solicitar turno
              </Link>
            </li>
            <li>
              <Link
                className="transition-all uppercase ease-in-out delay-150 antialiased font-light hover:font-bold text-white px-4 py-2"
                onClick={() => logout()}
                to="/ingreso"
              >
                Cerrar sesión
              </Link>
            </li>
          </>
        ) : (
          <></>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
