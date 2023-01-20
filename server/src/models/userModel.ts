import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, default: "" },
    email: {
      type: String,
      required: [true, "Your email is required"],
      unique: true,
    },
    username: {
      type: String,
      unique: true,
      min: 8,
      max: 20,
      required: [
        true,
        "A username is required for registration. Please a username",
      ],
    },
    phone: { type: String, default: "+234" },
    password: {
      type: String,
      required: [true, "A password is required for registration"],
      min: 8,
    },
    profileImagePath: {
      type: String,
      default: "",
    },
    friends: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    isAdmin: { type: Boolean, default: false },
    isSuperUser: { type: Boolean, default: false },
    token: {
      type: String,
      default: "",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    return next();
  } else {
    return next();
  }
});
const User = mongoose.model("User", userSchema);

export default User;
