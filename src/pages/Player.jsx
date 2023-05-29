import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import video from "../assets/FAST X - Official Trailer 2.mp4";

const Player = () => {
  const navigate = useNavigate();

  return (
  
      <div className="player w-[100vw] h-[100vh]">
        <div className="back absolute p-8 z-10">
          <BsArrowLeft size={30} onClick={() => navigate(-1)} className=" cursor-pointer bg-white p-2 rounded-full text-black" />
        </div>
        <video src={video} autoPlay loop controls muted className="h-[100vh] w-[100vw] object-cover" />
      </div>
  );
}

export default Player