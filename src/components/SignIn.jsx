import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProviders';
import { Link } from 'react-router-dom';

const SignIn = () => {
    const { signInUser } = useContext(AuthContext);


    const handleSignIn = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        
        signInUser(email, password)
            .then(result => {
                console.log(result.user);


                // update last login time
                const lastSignInTime = result?.user?.metadata?.lastSignInTime;
                const loginInfo = { email, lastSignInTime }
            
                fetch(`http://localhost:5000/users/${email}`, {
                    method: 'patch',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(loginInfo)
                        .then(res => res.json())
                        .then(data => {
                            console.log('sign in info updated in db', data);
                        })

           
                })
                    .catch(error => {
                        console.log(error);
                    });
            }
        )}

    return (
        <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign In now!</h1>
          <p className="py-6">
            The Sign-In feature for the Coffee Store application allows users to
            create an account, enabling them to access personalized features
            like managing orders, viewing favorites, and saving preferences. Key
            Features: User-Friendly Form: Simple input fields for name, email,
            and password. Validations to ensure required fields are filled and
            data is accurate. Backend Integration: A secure API endpoint
            (/api/signIn) processes the user registration request. Passwords are
            encrypted for security before being stored in the database.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSignIn} className="card-body">
           
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign In</button>
                        </div>
                        <p>New to coffee drinker:<Link to="/signUp"></Link>Sign Up</p>
          </form>
        </div>
      </div>
    </div>
    );
};

export default SignIn;