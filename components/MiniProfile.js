import { signOut, useSession } from "next-auth/react";
import React from "react";

const MiniProfile = () => {
  const { data: session } = useSession();
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img
        src={session?.user?.image}
        className="h-16 w-16 rounded-full object-contain
        border p-[2px]"
      ></img>
      <div className="flex-1 mx-4">
        <h2 className="font-bold">{session?.user.username}</h2>
        <h3 className="text-sm text-gray-400">Welcome to instagram</h3>
      </div>
      <button className="text-blue-400 text-sm font-semibold" onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
};

export default MiniProfile;
