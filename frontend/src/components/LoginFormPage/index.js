import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session'
import { Redirect } from 'react-router-dom'

import './LoginForm.css';
import SlackIcon from '../../assets/slick_icon1.png'

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const user = useSelector( (state) => state.session.user )
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (user) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    // setErrors([]);
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
            <a id="create-account" href="google.com">Create an Account</a>
           </div>
        </div>
      </header>

      <div id="sign-up-form">
        <h1>Sign in to Slick</h1>
        <h6>We suggest using the email that makes you feel the most cool. </h6>
          <ul>
            {errors_list}
          </ul>
          <form onSubmit={ handleSubmit }>
            <label>
            Email:
              <input type="text"
              value={ email }
              onChange = { (e) => setEmail(e.target.value) } />
            </label>

            <label>
            Password:
              <input type="password"
              value={ password }
              onChange = { (e) => setPassword(e.target.value) } />
            </label>

            <input type="submit" value="Submit"/>
          </form>
      </div>
    </>
  )
}

export default LoginFormPage;