import { useEffect, useState } from "react";
import NavBar from "../components/layout/NavBar";
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/Firebase-config";
import Slider from "../components/Slider";

const Netflix = () => {

  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "all" }));
    }

    console.log(genres)
  }, [genresLoaded]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setIsAuth(true);
    } else {
      navigate("/login");
    }
  });
  

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };


  return (
    isAuth && (
    <>
    <div>
      <NavBar isScrolled={isScrolled} />
      <div className=" relative ">
        <img
          src={backgroundImage}
          alt="background"
          className="w-screen h-screen object-cover"
        />
        <div className="absolute bottom-20 ml-20">
          <div className="logo">
            <img src={MovieLogo} alt="Movie Logo" />
          </div>
          <div className="buttons flex mt-14 gap-x-4 ">
            <button
              onClick={() => navigate("/player")}
              className="flex justify-center items-center text-black bg-white gap-x-1 px-4 py-1 rounded-sm transition duration-200 ease-in-out hover:opacity-80"
            >
              <FaPlay />
              Play
            </button>
            <button className="flex bg-[rgba(0,0,0,0.5)] px-4 py-1 rounded-sm gap-x-1 justify-center items-center text-white transition duration-200 ease-in-out hover:opacity-80">
              <AiOutlineInfoCircle />
              More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies} />
    </div>
    </>
    )
  );
};

export default Netflix;
