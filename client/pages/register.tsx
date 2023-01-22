import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import Container from "../components/components/Container";
import register from "../utils/register";
import styles from "../variables/styles";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const router = useRouter();

  const resetInputs = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setUsername("");
    setPassword1("");
  };

  const hadleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    if (!firstName) {
      toast("Your First Name is Required");
    }
    if (!email || !email.length) {
      toast("An email is required");
    }
    if (!password1) {
      toast("Please type in a password", { type: "warning" });
    }
    if (!password2) {
      toast("Please Confirm Your Password");
    }
    if (password1 != password2) {
      toast("Passwords do not match");
    }
    if (
      firstName &&
      email &&
      username &&
      password1 &&
      password2 &&
      password1 === password2
    ) {
      const reqBody = {
        firstName,
        lastName,
        phone,
        email,
        username,
        password: password2,
      };
      const user = await register(reqBody);
      if (user._id) {
        toast("Registration was successful", {
          type: "success",
          autoClose: 3000,
        });
        router.push("/login");
      } else if (user.message) {
        toast(user.message, {
          type: "error",
          autoClose: 3000,
          hideProgressBar: false,
        });
      }
    }
  };
  return (
    <div className="h-screen">
      <Container>
        <div className="flex items-center justify-center h-full border border-black">
          <form className={styles.authForm}>
            <h3 className="text-3xl text-white text-center pb-3">Register</h3>
            <div className="flex my-2 gap-x-4">
              <div>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  name="firstName"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  className={styles.formInput}
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  className={styles.formInput}
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                className={styles.formInput}
                placeholder={"Phone Number (Optional)"}
              />
            </div>
            <div className="flex gap-x-4 my-2">
              <div>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  placeholder={"Email Address"}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className={styles.formInput}
                />
              </div>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  placeholder="Username"
                  className={styles.formInput}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="password1">Password</label>
              <input
                type="password"
                name="password"
                id="password1"
                value={password1}
                onChange={(e) => {
                  setPassword1(e.target.value);
                }}
                className={styles.formInput}
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="password2">Confirm Password</label>
              <input
                type="password"
                name="password"
                id="password2"
                value={password2}
                onChange={(e) => {
                  setPassword2(e.target.value);
                }}
                className={styles.formInput}
                placeholder={"Confirm Password"}
              />
            </div>
            <button
              type="submit"
              className={`bg-green-900 ${styles.formInput} text-white`}
              onClick={hadleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}
