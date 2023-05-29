/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/Firebase-config";
import { useDispatch } from "react-redux";
import { removeMovieFromLiked } from "../store";
import video from "../assets/FAST X - Official Trailer 2.mp4";

export default React.memo(function Card({ index, movieData, isLiked = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email);
    } else navigate("/login");
  });

  const addToList = async () => {
    try {
      await axios.post("http://localhost:5000/api/user/add", {
        email,
        data: movieData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="max-w-230 w-230 h-full cursor-pointer relative text-white"
   
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="card"
        onClick={() => navigate("/player")}
        className="rounded-md w-full h-full z-10"
      />

      {isHovered && (
        <div className="hover:z-99 hover:h-auto hover:w-80 hover:absolute hover:top-0 hover:left-0 hover:rounded-md hover:shadow hover:bg-gray-900 hover:transition hover:ease-in-out">
          <div className="relative">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt="card"
              onClick={() => navigate("/player")}
              className="rounded-md w-full h-32 object-cover"
            />
            <video
              src={video}
              autoPlay={true}
              loop
              muted
              onClick={() => navigate("/player")}
              className="rounded-md w-full h-32 object-cover absolute top-0"
            />
          </div>
          <div className="p-4 flex flex-col gap-2">
            <h3 className="text-white cursor-pointer" onClick={() => navigate("/player")}>
              {movieData.name}
            </h3>
            <div className="flex justify-between">
              <div className="flex gap-4">
                <IoPlayCircleSharp
                  title="Play"
                  onClick={() => navigate("/player")}
                  className="text-2xl cursor-pointer transition duration-300 hover:text-gray-300"
                />
                <RiThumbUpFill title="Like" className="text-2xl cursor-pointer transition duration-300 hover:text-gray-300" />
                <RiThumbDownFill title="Dislike" className="text-2xl cursor-pointer transition duration-300 hover:text-gray-300" />
                {isLiked ? (
                  <BsCheck
                    title="Remove from List"
                    onClick={() =>
                      dispatch(
                        removeMovieFromLiked({ movieId: movieData.id, email })
                      )
                    }
                    className="text-2xl cursor-pointer transition duration-300 hover:text-gray-300"
                  />
                ) : (
                  <AiOutlinePlus
                    title="Add to my list"
                    onClick={addToList}
                    className="text-2xl cursor-pointer transition duration-300 hover:text-gray-300"
                  />
                )}
              </div>
              <div className="info">
                <BiChevronDown title="More Info" className="text-2xl cursor-pointer transition duration-300 hover:text-gray-300" />
              </div>
            </div>
            <div className="genres flex">
              <ul className="flex gap-4">
                {movieData.genres.map((genre, index) => (
                  <li key={index}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
