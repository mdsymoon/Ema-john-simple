import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  handleFbSignIn,
  handleGoogleSignIn,
  handleSignOut,
  initializeLoginFramework,
  signInWithEmailAndPassword,
} from "./LoginManager";

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
  });

  initializeLoginFramework();

  const [loggedInUser, setloggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      setUser(res);
      setloggedInUser(res);
      history.replace(from);
      history.replace(from);
    });
  };

  const FbSignIn = () => {
    handleFbSignIn().then((res) => {
      setUser(res);
      setloggedInUser(res);
    });
  };

  const signOut = () => {
    handleSignOut().then((res) => {
      setUser(res);
      setloggedInUser(res);
    });
  };

  const handleBlur = (e) => {
    let isFormValid = true;
    if (e.target.name === "email") {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const isPassword = /\d{1}/.test(e.target.value);
      const isPasswordUppercase = /[A-Z]/.test(e.target.value);
      isFormValid = isPasswordUppercase && isPassword && isPasswordValid;
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  // create account---------------------

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          setUser(res);
          setloggedInUser(res);
          history.replace(from);
        }
      );
    }

    // log in account----------------

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((res) => {
        setUser(res);
        setloggedInUser(res);
        history.replace(from);
      });
    }

    e.preventDefault();
  };

  return (
    <div style={{ textAlign: "center" }}>
      {user.isSignedIn ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <button onClick={googleSignIn}>Sign In</button>
      )}
      <br />
      <button onClick={FbSignIn}>Sign in with Facebook</button>
      {user.isSignedIn && (
        <div>
          <p>welcome, {user.name}</p>
          <p>Your Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
      <h1>Our Own Authentication</h1>
      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
      ></input>
      <label htmlFor="newUser">New User</label>
      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            name="name"
            type="text"
            onBlur={handleBlur}
            placeholder="Your email"
          ></input>
        )}
        <br />
        <input
          onBlur={handleBlur}
          name="email"
          type="email"
          placeholder="your email"
          required
        ></input>
        <br />
        <input
          onBlur={handleBlur}
          name="password"
          type="password"
          placeholder="your password"
          required
        ></input>
        <br />
        <input type="submit" value={newUser ? "sign Up" : "sign in"}></input>
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          User {newUser ? "created" : "Logged In"} successfully
        </p>
      )}
    </div>
  );
}

export default Login;
