import Link from "next/link";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import { toast } from "react-toastify";

const Layout = ({ children }) => {
  const userState = useSelector((state) => state.userState);

  return (
    <div className="">
      {userState.user ? (
        <div className="dark:bg-zinc-900">
          <header>
            <Navbar />
          </header>
          {children}
        </div>
      ) : (
        <>
          No user please go to the{" "}
          <Link href="/login" className="bg-gray-900 text-white p-2">
            Login
          </Link>
        </>
      )}
    </div>
  );
};

export default Layout;
