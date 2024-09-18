import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

function LoginPage() {
  const [formLoading, setFormLoading] = useState(false);

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

  useEffect(() => {
    if (!!authErrors.length) setFormLoading(false);
  }, [authErrors]);

  const onSubmit = handleSubmit((data) => {
    signin(data);
    setFormLoading(true);
  });

  return (
    <div className="flex h-[calc(85vh-100px)] items-center justify-center">
      <div className=" max-w-md w-full p-10 rounded-m">
        <h1 className="text-[#9473FE] text-center text-2xl font-semibold mb-6">
          Iniciar sesión
        </h1>
        <form onSubmit={onSubmit}>
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
            <p className="text-[#684DBE] ">La contraseña es requerida.</p>
          )}
          <input
            className="text-zinc-800 border-[#805CFF] border w-full px-4 py-2 rounded-md my-2"
            {...register("password", { min: 5, required: true })}
            type="password"
            placeholder="Contraseña"
          />

          {authErrors.map((error, i) => (
            <p className="text-[#684DBE]" key={i}>
              {error}
            </p>
          ))}
          <small className="text-[#684DBE]">
            {formLoading ? `Cargando...` : ""}
          </small>
          <button
            disabled={formLoading}
            className="mt-6 m-auto flex bg-[#9473FE] hover:opacity-90 rounded-full text-white px-8 py-3"
            type="submit"
          >
            Ingresar
          </button>
        </form>
        <p className="mt-5 text-[#9070FF] text-center">
          No tenés cuenta?{" "}
          <Link className="font-semibold " to="/registro">
            Registrarme
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
