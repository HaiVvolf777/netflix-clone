import { useState } from "react";
import BackgroundImg from "../components/BackgroundImg";
import Header from "../components/layout/Header";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "../utils/Firebase-config";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formVales, setformValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const { email, password } = formVales;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
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
          <div className="body flex flex-col items-center justify-center ">
            <div className="text flex flex-col text-white gap-y-6 text-center px-[15rem]">
              <h1 className="text-6xl font-bold">
                Unlimited Movies, TV shows and more
              </h1>
              <h4 className="text-4xl font-semibold">
                Watch anyWhere , Cancle anytime
              </h4>
              <h6 className="text-2xl font-medium">
                Ready to watch? Enter Email to create or restart membership
              </h6>
            </div>
            <div className="grid grid-cols-2 w-[60%] h-[50px] mt-6">
              <input
                className="border  outline-none px-2"
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
              {showPassword && (
                <input
                  className="border outline-none px-2"
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
              )}
              {!showPassword && (
                <button
                  onClick={() => setShowPassword(true)}
                  className="px-4 bg-[#e50914] border-none cursor-pointer text-base text-white  font-semibold"
                >
                  Get Started
                </button>
              )}
            </div>
            <button
              onClick={handleSignIn}
              className="px-6 py-3 rounded-md mt-6 bg-[#e50914] border-none cursor-pointer text-base text-white  font-semibold"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
