import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session'
import { Redirect } from 'react-router-dom'

import './LoginForm.css';
import SlackIcon from '../../assets/slick_icon1.png'
import FredsFace from '../../assets/demo_user.PNG'

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const user = useSelector( (state) => state.session.user )
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (user) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ email, password }))
    .catch( async (res) => {
      let data;
      try {
        data = await res.clone().json();
      } catch {
        data = await res.text();
      }
      if (data?.errors) setErrors(data.errors);
      else if (data) setErrors([data]);
      else setErrors([res.statusText]);
    })
   }

  const loginDemoUser = () => {
    const email = 'benjamin.schwart123@gmail.com'
    const password = 'password123'
    return dispatch(sessionActions.login({ email, password }))
  }

  const errors_list = errors.map(error => <li key={error}>{error}</li>)

  return (
    <>
      <header>
        <div id="left-col">
          <h1></h1>
        </div>

        <div id="slick-icon">
          <img src={SlackIcon} width="134 " height="38"/>
        </div>

          <div id="right-column">
           <div id="right-column-text">
            <h4 id="new">New to Slick?</h4>
            <a id="create-account" href="/signup">Create an Account</a>
           </div>
        </div>
      </header>

      <div id="sign-up-form">
        <h1>Sign in to <span id="suave">Google Magenta</span></h1>

        <h6>We suggest using the
          <span id="rad"> email that makes you feel the most 😎</span>
        </h6>

        <ul>
          {errors_list}
        </ul>

        <div id="demo-div">
            <button id="demo-button"
            onClick={loginDemoUser} >
          <img id="freds-face" src={FredsFace} width="28" height="28"/>
            Sign in with a rad Demo User</button>
        </div>

        <div id="or">
        <hr size="1"></hr>
        OR
        <hr size="1"></hr>
        </div>

        <form onSubmit={ handleSubmit }>
          <label htmlFor="email">Email address</label>
          <input id="email" className="credential" type="text"
            placeholder="  name@google.com"
            value={ email }
            onChange = { (e) => setEmail(e.target.value) } />

            <label htmlFor="password">Password</label>
            <input id="password" className="credential" type="password"
            placeholder="  e.g. 'password'"
            value={ password }
            onChange = { (e) => setPassword(e.target.value) } />

          <input type="submit" value="Sign In" id="form-button"/>
        </form>
      </div>
    </>
  )
}

export default LoginFormPage;