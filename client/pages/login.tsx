import { useState } from "react";
import login from "../utils/login";
import { useDispatch } from "react-redux";
import { setUser } from "../state/userSlice";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = await login(username, password);
    if (user._id) {
      dispatch(setUser(user));
      console.log(user);
    }
  };
  return (
    <form action="" className="bg-gray-900 flex flex-col gap-y-2 p-4">
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        type="password"
        name="username"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button type="submit" className="bg-green-500" onClick={handleLogin}>
        Login
      </button>
    </form>
  );
}
