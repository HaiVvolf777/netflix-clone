/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const Header = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between items-center px-5">
        <div>
          <img
            className="w-[6rem] h-[6rem] object-contain"
            src={logo}
            alt="Logo"
          />
        </div>
        <button
          className="py-2 h-[40px] px-4 bg-[#e50914] border-none cursor-pointer text-base text-white rounded-md font-semibold"
          onClick={() => navigate(props.login ? "/login" : "/signup")}
        >
          {props.login ? "Log In" : "Sign Up"}
        </button>
      </div>
    </>
  );
};

export default Header;
