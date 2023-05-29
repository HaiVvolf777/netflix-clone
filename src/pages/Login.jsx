import { useState } from "react";
import BackgroundImg from "../components/BackgroundImg";
import Header from "../components/layout/Header";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../utils/Firebase-config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formVales, setformValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { email, password } = formVales;
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentuser) => {
    if (currentuser) navigate("/");
  });

  return (
    <>
      <div className="relative">
        <BackgroundImg />
        <div className="absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] h-[100vh] w-[100vw]">
          <Header login />
          <div className="flex flex-col items-center justify-center h-[85vh]  ">
            <div className="flex flex-col gap-y-6 p-16 bg-[rgba(0,0,0,0.5)]">
              <input
                className="border outline-none px-2 h-[40px]"
                type="email"
                placeholder="Email Address"
                name="email"
                value={formVales.email}
                onChange={(e) =>
                  setformValues({
                    ...formVales,
                    [e.target.name]: e.target.value,
                  })
                }
              />

              <input
                className="border outline-none px-2 h-[40px]"
                type="password"
                placeholder="Password"
                name="password"
                value={formVales.password}
                onChange={(e) =>
                  setformValues({
                    ...formVales,
                    [e.target.name]: e.target.value,
                  })
                }
              />

              <button
                onClick={handleLogin}
                className="px-4 bg-[#e50914] border-none rounded h-[40px] cursor-pointer text-base text-white  font-semibold"
              >
                log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
