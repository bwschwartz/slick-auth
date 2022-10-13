import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session'
import { Redirect } from 'react-router-dom'
import SlackIcon from '../../assets/slick_icon1.png'
import './SignUpForm.css';



export const SignUpFormPage = () => {
  const dispatch = useDispatch();
  const user = useSelector( (state) => state.session.user );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (user) return <Redirect to="/" />;


  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmationPassword) {
      setErrors([]);
      return dispatch(sessionActions.signUp({ email, password }))
        .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
        console.log(`data erros: ${data.errors}`)
      });
    }
    else {
      return setErrors(['Password and confirmation password don\'t match, bro'])
    }
  }

  const errorsList = errors.map( (error) => <li key={ error } >{ errors }</li>)


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
            <h4 id="new">Already have an Account</h4>
            <a id="create-account" href="/login">Sign in instead</a>
           </div>
        </div>
      </header>

    <div id="sign-up-form">
      <h1>Join <span id="suave">Google Magenta</span></h1>

      <form
      onSubmit= { handleSubmit }>
        <label htmlFor="email">Email</label>
        <input id="email"
          type="text"
          value={ email }
          placeholder=" your email"
          onChange={ (e) => setEmail(e.target.value) } />

        <label htmlFor="password">Password</label>
        <input id="password"
          type="password"
          value={ password }
          placeholder=" (e.g., your social security number)"
          onChange={ (e) => setPassword(e.target.value) } />

        <label htmlFor="password-confirmation">Confirm Password</label>
        <input id="password-confirmation"
          type="password"
          value={ confirmationPassword }
          placeholder=" (e.g., your social security number)"
          onChange={ (e) => setConfirmationPassword(e.target.value) } />

        <ul> { errorsList } </ul>

        {/* <input type="submit" value="Sign Up" id="form-button"/> */}
        <input type="submit" value="Sign Up" id="sign-up-button"/>
{/*  */}

      </form>
      </div>
    </>
  )
}




export default SignUpFormPage;