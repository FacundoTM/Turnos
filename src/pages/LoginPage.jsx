import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, authErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/turnos");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-m">
        {authErrors.map((error, i) => (
          <p key={i}>{error}</p>
        ))}
        <h1 className="text-2xl font-bold">Iniciar sesión</h1>
        <form onSubmit={onSubmit}>
          <input
            className="text-white bg-zinc-700 w-full px-4 py-2 rounded-md my-2"
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
          />
          {errors.email && <p>El email es requerido.</p>}
          <input
            className="text-white bg-zinc-700 w-full px-4 py-2 rounded-md my-2"
            {...register("password", { min: 5, required: true })}
            type="password"
            placeholder="Contraseña"
          />
          {errors.password && <p>La contraseña es requerida.</p>}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2"
            type="submit"
          >
            Ingresar
          </button>
        </form>
        <p className="mt-5">
          No tenés cuenta?{" "}
          <Link className="text-red-400" to="/registro">
            Registrarme
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
