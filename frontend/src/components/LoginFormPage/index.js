import { useState } from 'react';
import { useDispatch, useSelector } from 'react=redux';
import { login } from '../../store/session'

import './LoginForm.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector( (state) => state.sessionl.user )
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(login(user( { email, password })))
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
  // key={erorr} removed from lis
  const errors_list = errors.map(error => <li>{error}</li>)

  return (
    <>
      <h1>Log in Form</h1>
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
          <input type="text"
          value={ password }
          onChange = { (e) => setPassword(e.target.value) } />
        </label>

        <input type="submit" value="Submit"/>
      </form>
    </>
  )
}

export default LoginFormPage;