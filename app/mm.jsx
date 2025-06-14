// "use client";
// import { useRef, useState, useEffect } from "react";
// import './api/Register.css';


// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

// export default function Register() {
//   const userRef = useRef();
//   const passrRef = useRef();
//   const errRef = useRef();

//   const [user, setUser] = useState('');
//   const [validUser, setValidUser] = useState(false);
//   const [userFocus, setUserFocus] = useState(false);

//   const [pwd, setPwd] = useState('');
//   const [validPwd, setValidPwd] = useState(false);
//   const [pwdFocus, setPwdFocus] = useState(false);

//   const [matchPwd, setMatchPwd] = useState('');
//   const [validMatch, setValidMatch] = useState(false);
//   const [matchFocus, setMatchFocus] = useState(false);

//   const [errMsg, setErrMsg] = useState('');
//   const [success, setSuccess] = useState(false);

//   // Autofocus username input on mount
//   useEffect(() => {
//     userRef.current.focus();
//   }, []);

//   // Validate username
//   useEffect(() => {
//     setValidUser(USER_REGEX.test(user));
//     if(USER_REGEX.test(user)){passrRef.current.focus()}
//   }, [user]);

//   // Validate password and match
//   useEffect(() => {
//     setValidPwd(PWD_REGEX.test(pwd));
//     setValidMatch(pwd === matchPwd);
//   }, [pwd, matchPwd]);

//   // Clear error on input change
//   useEffect(() => {
//     setErrMsg('');
//   }, [user, pwd, matchPwd]);

//   // Prevent password typing before username
//   const handlePwdFocus = () => {
//     if (!user) {
//       setErrMsg('Please enter username first');
//       userRef.current.focus();
//       return;
//     }
//     setPwdFocus(true);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const v1 = USER_REGEX.test(user);
//     const v2 = PWD_REGEX.test(pwd);
//     if (!v1 || !v2 || !validMatch) {
//       setErrMsg("Invalid Entry");
//       errRef.current.focus();
//       return;
//     }
//     setSuccess(true);
//     setUser('');
//     setPwd('');
//     setMatchPwd('');
//   };

//   return (
//     <>
//       {success ? (
//         <section>
//           <h1>Success!</h1>
//           <p><a href="#">Sign In</a></p>
//         </section>
//       ) : (
//         <section>
//           <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
//           <h1>Register</h1>
//           <form onSubmit={handleSubmit}>
//             {/* Username */}
//             <label htmlFor="username">
//               Username:
//               <span className={validUser ? "valid" : "hide"}>✔</span>
//               <span className={user && !validUser ? "invalid" : "hide"}>✖</span>
//             </label>
//             <input
//               type="text"
//               id="username"
//               ref={userRef}
//               autoComplete="off"
//               onChange={(e) => setUser(e.target.value)}
//               value={user}
//               required
//               aria-invalid={validUser ? "false" : "true"}
//               aria-describedby="uidnote"
//               onFocus={() => setUserFocus(true)}
//               onBlur={() => setUserFocus(false)}
//             />
//             <p id="uidnote" className={userFocus && user && !validUser ? "instructions" : "offscreen"}>
//               4 to 24 characters.<br />
//               Must begin with a letter.<br />
//               Letters, numbers, underscores, hyphens allowed.
//             </p>

//             {/* Password */}
//             <label htmlFor="password">
//               Password:
//               <span className={validPwd ? "valid" : "hide"}>✔</span>
//               <span className={pwd && !validPwd ? "invalid" : "hide"}>✖</span>
//             </label>
//             <input
//               type="password"
//               id="password"
//               ref={passrRef}
//               onChange={(e) => setPwd(e.target.value)}
//               onFocus={handlePwdFocus}
//               onBlur={() => setPwdFocus(false)}
//               value={pwd}
//               required
//               aria-invalid={validPwd ? "false" : "true"}
//               aria-describedby="pwdnote"
//             />
//             <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
//               8 to 24 characters.<br />
//               Must include uppercase and lowercase letters, a number, and a special character.<br />
//               Allowed: ! @ # $ %
//             </p>

//             {/* Confirm Password */}
//             <label htmlFor="confirm_pwd">
//               Confirm Password:
//               <span className={validMatch && matchPwd ? "valid" : "hide"}>✔</span>
//               <span className={matchPwd && !validMatch ? "invalid" : "hide"}>✖</span>
//             </label>
//             <input
//               type="password"
//               id="confirm_pwd"
//               onChange={(e) => setMatchPwd(e.target.value)}
//               onFocus={() => setMatchFocus(true)}
//               onBlur={() => setMatchFocus(false)}
//               value={matchPwd}
//               required
//               aria-invalid={validMatch ? "false" : "true"}
//               aria-describedby="confirmnote"
//             />
//             <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
//               Must match the first password input field.
//             </p>

//             <button disabled={!validUser || !validPwd || !validMatch}>Sign Up</button>
//           </form>
//           <p>
//             Already registered?<br />
//             <span className="line">
//               <a href="#">Sign In</a>
//             </span>
//           </p>
//         </section>
//       )}
//     </>
//   );
// }













/*



import React from "react";
import ImageCard from "./components/ImageCard";
import "./ImageGrid.css";

const App = () => {
  const images = [
    "/OP.jpg",
    "/OP1.jpg",
    "/OP2.jpg",
    "/OP3.jpg",
    "/OP4.jpg",
    "/OP5.jpg",
    "/OP6.jpg",
  ];

  return (
   <>
    <div className="image-grid">
      {images.map((img, idx) => (
        <ImageCard key={idx} imageSrc={img} />
      ))}
    </div>
    <br/>    <br/>    <br/>    <br/>    <br/>    <br/>
    </>
  );
};

export default App;


import React from "react";
import "./ImageCard.css";


const ImageCard = ({ imageSrc }) => {
  return (
    <div className="image-card">
      <img src={imageSrc} alt="Random from Unsplash" className="image-card__img" />
      <div className="image-card__content">
        <h3 className="image-card__title">Stunning View</h3>
        <p className="image-card__desc">
          A beautiful, randomly selected image from Unsplash.
        </p>
      </div>
    </div>
  );
};

export default ImageCard;


// .image-card {
//   width: 320px;
//   border-radius: 16px;
//   /* overflow: hidden; */
//   background-color: #781978;
//   box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
//   cursor: pointer;
//   display: flex;
//   flex-direction: row;
//   transition: box-shadow 0.3s ease;
// }

// .image-card__img {
//   width: 50%;
//   height: auto;
//   display: block;
//   transition: transform 0.3s ease;
//   object-fit: cover;
//   background-color: blue;
// }

// /* Image hover effect only */
// .image-card__img:hover {
//   transform: scale(1.05);
// }

// .image-card__content {
//   padding: 16px;
//   width: 100%;
// }

// .image-card__title {
//   font-size: 1.25rem;
//   font-weight: bold;
//   margin: 0 0 8px;
// }

// .image-card__desc {
//   font-size: 0.95rem;
//   color: #555;
//   margin: 0;
// }




// */


/**.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem; 
  background-color: black;
}
 */