import { useContext, useEffect, useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setcredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const navigate = useNavigate();

  const { loading, error, dispatch } = useContext(AuthContext);
  const handleChange = (e) => {
    setcredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    // console.log(credentials);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    try {
      const res = await axios.post(
        "http://localhost:8800/auth/login",
        credentials,
        config
      );

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
      // console.log(credentials);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <>
      <div className="login">
        <div className="lContainer">
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            className="lInput"
          />
          <button disabled={loading} onClick={handleClick} className="lButton">
            Login
          </button>
          {error && <span>{error.message}</span>}
        </div>
      </div>
    </>
  );
};

export default Login;

// import axios from "axios";
// import { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
// import "./login.css";

// const Login = () => {
//   const [credentials, setCredentials] = useState({
//     username: undefined,
//     password: undefined,
//   });

//   const { loading, error, dispatch } = useContext(AuthContext);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
//   };

//   const handleClick = async (e) => {
//     e.preventDefault();
//     dispatch({ type: "LOGIN_START" });
//     try {
//       const res = await axios.post(
//         "http://localhost:8800/auth/login",
//         credentials
//       );
//       dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
//       navigate("/");
//     } catch (err) {
//       dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
//     }
//   };

//   return (
//     <div className="login">
//       <div className="lContainer">
//         <input
//           type="text"
//           placeholder="username"
//           id="username"
//           onChange={handleChange}
//           className="lInput"
//         />
//         <input
//           type="password"
//           placeholder="password"
//           id="password"
//           onChange={handleChange}
//           className="lInput"
//         />
//         <button disabled={loading} onClick={handleClick} className="lButton">
//           Login
//         </button>
//         {error && <span>{error.message}</span>}
//       </div>
//     </div>
//   );
// };

// export default Login;
