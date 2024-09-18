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
    <div className="flex h-[calc(85vh-100px)] items-center justify-center">
      <div className=" max-w-md w-full p-10 rounded-m">
        <h1 className="text-[#9473FE] text-center text-2xl font-semibold mb-6">
          Registro
        </h1>
        {authErrors.map((error, i) => (
          <p key={i}>{error}</p>
        ))}
        <form onSubmit={onSubmit}>
          {errors.username && (
            <p className="text-[#684DBE] ">El usuario es requerido.</p>
          )}
          <input
            className="mb-3 text-zinc-800 border-[#805CFF] border w-full px-4 py-2 rounded-md my-2"
            {...register("username", { required: true })}
            type="text"
            placeholder="Nombre"
          />
          {errors.email && (
            <p className="text-[#684DBE] ">El email es requerido.</p>
          )}
          <input
            className="mb-3 text-zinc-800 border-[#805CFF] border w-full px-4 py-2 rounded-md my-2"
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
          />
          {errors.password && (
            <p className="text-[#684DBE]">La contraseña es requerida.</p>
          )}
          <input
            className="text-zinc-800 border-[#805CFF] border w-full px-4 py-2 rounded-md my-2"
            {...register("password", { min: 5, required: true })}
            type="password"
            placeholder="Contraseña"
          />

          {formLoading ? "Cargando..." : ""}
          <button
            disabled={formLoading}
            className="mt-6 m-auto flex bg-[#9473FE] hover:opacity-90 rounded-full text-white px-8 py-3"
            type="submit"
          >
            Registrar
          </button>
        </form>
        <p className="mt-5 text-[#9070FF] text-center">
          Ya tenés cuenta?{" "}
          <Link className="font-semibold" to="/ingreso">
            Ingresar
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
