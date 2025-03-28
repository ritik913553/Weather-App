import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { CgCloseO } from "react-icons/cg";
const ProfilePage = ({ bgColor, setIsProfileOpen }) => {
  const { user ,logout }= useAuth();
  return (
    <div
      className={`w-full  h-screen ${bgColor.mainBg} border-1 absolute top-0 right-0 ${bgColor.textColor} `}
    >
      <div className="flex justify-between items-center p-5">
        <h1 className="font-bold">Weather APP</h1>
        <h2
          onClick={() => setIsProfileOpen(false)}
          className="text-2xl cursor-pointer"
        >
          <CgCloseO />
        </h2>
      </div>{" "}
      <hr />
      <div className="p-5 flex gap-x-3">
        <div
          className={`rounded-full ${bgColor.secondaryBg}  flex h-13 w-12 font-bold text-2xl items-center justify-center `}
        >
          {user.name.split("")[0].toUpperCase()}
        </div>
        <div className="flex flex-col justify-center ">
          <h1 className=" leading-4 text-lg font-bold">{user.name}</h1>
          <p className="text-sm">{user.email}</p>
        </div>
      </div>
      <hr />
      <div className="p-5">
        <button
        onClick={async ()=>{
          await logout();
          setIsProfileOpen(false);
        }}
          className={`w-full py-2 mt-2  rounded-md text-lg ${bgColor.textColor} ${bgColor.secondaryBg} font-medium `}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
