import React from "react";
import Image from "next/image";
import {
  SearchIcon,
  plusCircleIcon,
  USerGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { modalState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [open, setOpen] = useRecoilState(modalState);
  console.log(open);
  return (
    <div className="shadow-sm border-b bg-white sticky  top-0 z-50">
      <div className="max-w-5xl flex justify-between items-center mx-5 lg:mx-auto">
        <div
          className="relative hidden  w-24 lg:inline-grid cursor-pointer "
          onClick={() => router.push("/")}
        >
          {/* <Image
            src="https://assets.turbologo.com/blog/en/2019/09/19084953/instagram-logo-illustration-958x575.png"
            layout="fill"
            objectFit="contain"



          ></Image> */}

          <img src="https://thumbs.dreamstime.com/b/print-204012274.jpg"></img>
        </div>

        <div
          className="w-12 flex-shrink-0 lg:hidden cursor-pointer mt-3"
          onClick={() => router.push("/")}
        >
          <img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png"></img>
        </div>

        {/* middle  */}
        <div className="max-w-xs">
          <div className="relative mt-1 p-3  rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>

            <input
              type="text"
              placeholder="Search"
              className="bg-gray-50 pl-10 w-full block  border-gray-300  focus:ring-black focus:border-black rounded-md sm:text-sm"
            ></input>
          </div>
        </div>

        {/* right */}

        <div className="flex space-x-4 items-center">
          <HomeIcon className="navBtn" onClick={() => router.push("/")} />
          <MenuIcon className="h-7 w-7 md:hidden cursor-pointer" />

          {session ? (
            <>
              <div className="relative navBtn">
                <PaperAirplaneIcon className=" navBtn rotate-45" />
                <div className="hidden absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white animate-pulse lg:inline-flex">
                  3
                </div>
              </div>

              <PlusCircleIcon
                className="navBtn"
                onClick={() => setOpen(true)}
              />
              <UserCircleIcon className="navBtn" />
              <HeartIcon className="navBtn" />

              <img
                src={session?.user?.image}
                // alt="profile-img"
                className="h-10 rounded-full cursor-pointer"
                onClick={signOut}
              ></img>
            </>
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
