
import './NavBar.css';
import { logout } from '../../store/session'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'
import Clock from '../../assets/transparent-clock-right-color.png'
import Question from '../../assets/quesiton-mark-trans.png'

const NavBar = () => {
  const dispatch = useDispatch();

  const user = useSelector ( (state) => state.session.user )

  if (!user) return  <Redirect to="/login"/>
  const logOutUser= () => {
    return dispatch(logout())
  }

  return (
    <>
     <div id="nav-bar-container">

      <div id="left-nav">
        <div className="icon-holder">
          <img id="clock" src={ Clock }/>
        </div>
      </div>

      <div id="center-nav">
        <div id="search-bar">
          <span>Search Google Magenta</span>
        </div>
      </div>

      <div id="right-nav">
        <div className="icon-holder">
          <img id="clock" src={ Question }/>
        </div>
        <div id="logout">
          <button id="logout-button"
            onClick={ logOutUser }>
            Log Out!
          </button>
          </div>
      </div>

    </div>
    </>

  )
}
export default NavBar;