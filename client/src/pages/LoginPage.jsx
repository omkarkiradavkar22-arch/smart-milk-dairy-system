import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");


  const handleLogin = async () => {

    try {

      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      // save token
      localStorage.setItem(
        "token",
        response.data.token
      );
      toast.success("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Login Failed"
      );

    }

  };

  return (

    <div
      className="
        h-screen
        flex
        items-center
        justify-center
        bg-gray-100
      "
    >

      <div
        className="
          bg-white
          p-10
          rounded-xl
          shadow-lg
          w-full
max-w-[350px]
mx-5
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            mb-6
            text-center
          "
        >
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
          "
        />

        <button
          onClick={handleLogin}
          className="
            w-full
            bg-black
            text-white
            p-3
            rounded-lg
          "
        >
          Login
        </button>

      </div>

    </div>

  );

}

export default LoginPage;