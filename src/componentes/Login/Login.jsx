import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from '../../firebase/firebase.init';

const Login = () => {

    const [user, setUser] = useState(null);


    const auth = getAuth(app);

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleGoogleSignIn = () => {
        // console.log('google mama is coming');
        signInWithPopup(auth, googleProvider)
        .then(result => {
            const LoggedInUser = result.user;
            console.log(LoggedInUser);
            setUser(LoggedInUser);
        })
        .catch(error => {
            console.log('error', error.message);
        })
    }

    const handleSignOut = () =>{
        signOut(auth)
        .then(result => {
            setUser(null);
        })
        .catch(error => {
            console.log(error);
        })
    }

    // github
    const handleGithubSignIn = () =>{
        signInWithPopup(auth, githubProvider)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            setUser(loggedUser);
        })
        .catch(error =>{
            console.log(error);
        })
    }

    return (
        <div>
        {
                 user ? <button onClick={handleSignOut}>Sign Out</button>: 
                 <div>
                    <button onClick={handleGoogleSignIn}>Google Login</button>
                    <button onClick={handleGithubSignIn}>Github login</button>
                 </div>
                 
                
        }

            { user &&
                <div>
                <h3>User: {user.displayName}</h3>
                <p>Email: {user.email}</p>
                <img src={user.photoURL} alt="" />
            </div>
            }
        </div>
    );
};

export default Login;