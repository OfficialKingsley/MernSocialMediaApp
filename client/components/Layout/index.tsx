import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Layout = ({ children }) => {
  const router = useRouter();
  const userState = useSelector((state) => {
    return state.userState;
  });
  const theme = userState.theme;

  useEffect(() => {
    !userState.user && router.push("/login");
  }, []);

  return (
    <>
      {userState.user && (
        <div className={theme}>
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
