import { useState } from "react";
import { AuthContext } from "./authContext";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { useCallback } from "react";

const initialState = {
  id: null,
  checking: true,
  logged: false,
  name: null,
  rol: null,
};

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState(initialState);

  const login = async ({ name, password }) => {
    const response = await fetchWithoutToken(
      "api/auth/login",
      { token: name, password },
      "POST"
    );
    if (response.ok) {
      localStorage.setItem("token", response.token);
      setAuth({
        id: response.user.id,
        checking: false,
        logged: true,
        name: response.user.name,
        rol: response.user.rol.name,
      });
    }
    return response;
  };

  const verifyToken = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuth({
        id: null,
        checking: false,
        logged: false,
        name: null,
        rol: null,
      });
      return false;
    }
    const response = await fetchWithToken("api/auth/renew");
    if (response.ok) {
      localStorage.setItem("token", response.token);
      setAuth({
        id: response.user.id,
        checking: false,
        logged: true,
        name: response.user.name,
        rol: response.user.rol,
      });
      return true;
    } else {
      setAuth({
        id: null,
        checking: false,
        logged: false,
        name: null,
        rol: null,
      });
      return false;
    }
  }, []);

  const logout = async () => {
    setAuth({
      id: null,
      checking: false,
      logged: false,
      name: null,
      rol: null,
    });

    // Luego limpiar localStorage
    localStorage.removeItem("token");

    // Finalmente hacer la llamada al servidor
    try {
      const response = await fetchWithToken("api/auth/logout", {}, "POST");
      return response;
    } catch (error) {
      console.error("Error en logout:", error);
      // Aunque falle la llamada al servidor, mantenemos el logout local
      return { ok: false };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        logout,
        verifyToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
