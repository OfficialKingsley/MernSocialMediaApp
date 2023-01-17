import Container from "../components/Container";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { BsMoonFill, BsSunFill, BsPerson } from "react-icons/bs";
import Link from "next/link";
const Navbar = () => {
  return (
    <nav className="bg-gray-300 dark:bg-gray-900 dark:text-white">
      <Container>
        <div className="flex justify-between h-20 items-center">
          <div className="flex justify-between items-center gap-4">
            <h1 className="text-3xl text-blue-900 cursor-pointer">
              <Link href={"/"}>Twit-Gram</Link>
            </h1>
            <form
              action=""
              className="hidden md:flex bg-gray-400 items-center rounded-lg px-2 "
            >
              <input type="text" className="bg-transparent outline-none p-2" />
              <button type="submit" className="">
                <AiOutlineSearch className="text-2xl cursor-pointer" />
              </button>
            </form>
          </div>
          <ul className="flex gap-x-4 px-2">
            <li>
              <Link href="/">Feed</Link>
            </li>
            <li>
              <Link href="/friends">Friends</Link>
            </li>
          </ul>
          <div className="flex items-center gap-2">
            <span
              id="theme-button"
              className="w-10 h-10 p-2border flex items-center justify-center bg-gray-400 rounded-full hover:bg-gray-600 hover:text-white cursor-pointer"
            >
              <BsMoonFill className="dark:hidden" />
              <BsSunFill className="text-yellow-500 hidden dark:inline" />
            </span>
            <span className="w-10 h-10 p-2border flex items-center justify-center bg-gray-400 rounded-full cursor-pointer hover:bg-gray-600 hover:text-white">
              <BsPerson />
            </span>
          </div>
        </div>
      </Container>
    </nav>
  );
};
export default Navbar;
