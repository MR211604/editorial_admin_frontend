import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getImagePath } from "../../utils/imagePath";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    password: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, password } = form;
    const response = await login({ name, password });
    if (response.ok) {
      navigate("/dashboard", { replace: true });
    } else {
      toast.error(response?.error || "Error al iniciar sesión");
    }
  };

  return (
    <div
      className="container"
      style={{
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="card w-50">
        <div className="card-header text-center">
          {/* <h3>Iniciar sesión</h3> */}
          <img
            src={getImagePath("img/Logo_Normal.png")}
            style={{ maxWidth: "40%", height: "auto", objectFit: "contain" }}
            alt=""
          />
        </div>
        <form className="card-body p-4" onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Usuario
            </label>
            <input
              onChange={onChange}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="name"
              value={form.name}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Contraseña
            </label>
            <input
              onChange={onChange}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={form.password}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-success">
              Acceder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
