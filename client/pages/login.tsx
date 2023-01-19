import { useState } from "react";
import login from "../utils/login";
import { useDispatch } from "react-redux";
import { setUser } from "../state/userSlice";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Container from "../components/components/Container";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const resetInputs = () => {
    setUsername("");
    setPassword("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = await login(username, password);
    if (user._id) {
      resetInputs();
      dispatch(setUser(user));
      toast("Login successful", {
        autoClose: 3000,
        hideProgressBar: false,
        type: "success",
      });
      router.push("/");
    } else if (user.message) {
      resetInputs();
      toast(`${user.message}`, {
        autoClose: 3000,
        hideProgressBar: false,
        type: "error",
      });
    }
  };
  return (
    <div className="border h-screen">
      <Container>
        <div className="flex items-center justify-center h-full">
          <form
            action=""
            className="flex flex-col gap-y-2 p-4 bg-gray-600 rounded-xl w-full md:w-"
          >
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="p-2 outline-none rounded"
              placeholder="Username"
            />
            <input
              type="password"
              name="username"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="p-2 outline-none rounded"
              placeholder="Password"
            />
            <button
              type="submit"
              className="bg-green-500 p-2 outline-none rounded"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}
