import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

function RegisterPage() {
  const [formLoading, setFormLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, authErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/turnos");
  }, [isAuthenticated]);

  useEffect(() => {
    if (!!authErrors.length) setFormLoading(false);
  }, [authErrors]);

  const onSubmit = handleSubmit(async (values) => {
    setFormLoading(true);
    signup(values);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-m">
        <h1 className="text-2xl font-bold">Registro</h1>
        {authErrors.map((error, i) => (
          <p key={i}>{error}</p>
        ))}
        <form onSubmit={onSubmit}>
          <input
            className="text-white bg-zinc-700 w-full px-4 py-2 rounded-md my-2"
            {...register("username", { required: true })}
            type="text"
            placeholder="Nombre"
          />
          {errors.username && <p>El usuario es requerido.</p>}
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
          {formLoading ? "Cargando..." : ""}
          <button
            disabled={formLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2"
            type="submit"
          >
            Registrar
          </button>
        </form>
        <p className="mt-5">
          Ya tenés cuenta?{" "}
          <Link className="text-green-400" to="/ingreso">
            Ingresar
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
