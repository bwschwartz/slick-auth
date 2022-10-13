
import './NavBar.css';
import { logout } from '../../store/session'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'


const NavBar = () => {
  const dispatch = useDispatch();

  const user = useSelector ( (state) => state.session.user )

  if (!user) return  <Redirect to="/login"/>
  const logOutUser= () => {
    console.log("log out")
    return dispatch(logout())
  }

  return (
    <>
      <button id="demo-button"
        onClick={ logOutUser }>
        Log Out
       </button>

       {/* {!user && <Redirect to="/login"/>} */}
    </>

  )
}
export default NavBar;