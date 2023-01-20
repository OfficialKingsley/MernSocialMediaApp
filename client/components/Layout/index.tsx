import Link from "next/link";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";

const Layout = ({ children }) => {
  const router = useRouter();
  const userState = useSelector((state) => {
    return state.userState;
  });

  useEffect(() => {
    !userState.user && router.push("/login");
  }, []);

  return (
    <>
      {userState.user && (
        <div className="">
          <div className="dark:bg-zinc-900">
            <header>
              <Navbar />
            </header>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
