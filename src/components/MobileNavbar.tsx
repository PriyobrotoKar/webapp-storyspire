"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaCompass,
  FaRegBookmark,
  FaRegCompass,
  FaRegUser,
} from "react-icons/fa6";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useToggleNavbar from "@/hooks/useToggleNavbar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { FiChevronRight, FiLogOut } from "react-icons/fi";
import { GoHome, GoHomeFill, GoSearch } from "react-icons/go";
import { LuLogIn, LuSettings } from "react-icons/lu";
import { PiNotePencil, PiNotePencilFill } from "react-icons/pi";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const MobileNavbar = ({ session }: { session: Session | null }) => {
  const showNav = useToggleNavbar();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <motion.div
      variants={{
        visible: { y: 0 },
        hidden: { y: "150%" },
      }}
      animate={showNav ? "visible" : "hidden"}
      transition={{ duration: 0.2, ease: "easeIn" }}
      style={{
        x: "-50%",
      }}
      className="fixed bottom-6 left-1/2 z-20   sm:hidden"
    >
      <nav className="w-fit rounded-xl bg-white/50 px-6 py-4 shadow-xl backdrop-blur">
        <ul className="flex items-center gap-8">
          <li className="relative text-[1.8rem]">
            <Link href={"/"}>
              {pathname === "/" ? (
                <GoHomeFill className="text-primary" />
              ) : (
                <GoHome />
              )}
            </Link>
          </li>
          <li className="relative text-[1.7rem]">
            <Link href={"/search"}>
              <GoSearch className={pathname === "/search" && "font-bold"} />
            </Link>
          </li>
          <li className="relative text-[1.8rem]">
            <Link href={"/write"}>
              {pathname === "/write" ? (
                <PiNotePencilFill className="text-primary" />
              ) : (
                <PiNotePencil />
              )}
            </Link>
          </li>
          <li className="relative text-xl">
            <Link href={"/explore"}>
              {pathname === "/explore" ? (
                <FaCompass className="text-primary" />
              ) : (
                <FaRegCompass />
              )}
            </Link>
          </li>
          <li className="relative text-xl">
            {session ? (
              <Drawer shouldScaleBackground={true}>
                <DrawerTrigger asChild>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user.image} />
                    <AvatarFallback>
                      <Image
                        width={42}
                        height={42}
                        src="/images/avatarFallback.png"
                        alt=""
                      />
                    </AvatarFallback>
                  </Avatar>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={session.user.image} />
                      <AvatarFallback>
                        <Image
                          width={42}
                          height={42}
                          src="/images/avatarFallback.png"
                          alt=""
                        />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <DrawerTitle className="text-left">
                        {session.user.name}
                      </DrawerTitle>
                      <DrawerDescription>
                        {session.user.email}
                      </DrawerDescription>
                    </div>
                  </DrawerHeader>
                  <Separator />
                  <DrawerFooter>
                    <DrawerClose>
                      <Button
                        className="w-full justify-between  gap-2"
                        variant="secondary"
                        onClick={() =>
                          router.push(`/@${session.user.username}`)
                        }
                      >
                        <div className="flex items-center gap-2">
                          <FaRegUser />
                          Profile
                        </div>
                        <FiChevronRight />
                      </Button>
                    </DrawerClose>
                    <DrawerClose>
                      <Button
                        className="w-full justify-between  gap-2"
                        variant="secondary"
                        onClick={() => router.push(`/bookmarks`)}
                      >
                        <div className="flex items-center gap-2">
                          <FaRegBookmark className="" />
                          Bookmarks
                        </div>
                        <FiChevronRight />
                      </Button>
                    </DrawerClose>
                    <DrawerClose>
                      <Button
                        className="w-full justify-between  gap-2"
                        variant="secondary"
                        onClick={() => router.push(`/account`)}
                      >
                        <div className="flex items-center gap-2">
                          <LuSettings className="text-lg" />
                          Settings
                        </div>
                        <FiChevronRight />
                      </Button>
                    </DrawerClose>
                    <DrawerClose>
                      <Button
                        onClick={() => signOut()}
                        className="w-full gap-2"
                        variant="destructive"
                      >
                        <FiLogOut />
                        Logout
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            ) : (
              <Link href={`/login?callbackUrl=${BASE_URL + pathname}`}>
                <LuLogIn />
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </motion.div>
  );
};

export default MobileNavbar;
