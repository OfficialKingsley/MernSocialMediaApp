import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="">
      <div className="dark:bg-zinc-900">
        <header>
          <Navbar />
        </header>
        {children}
      </div>
    </div>
  );
};

export default Layout;
