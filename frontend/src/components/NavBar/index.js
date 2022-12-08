
import { useContext } from 'react'
import { logout } from '../../store/session'
import { clearChannels } from '../../store/channels'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'
import Clock from '../../assets/transparent-clock-right-color.png'
import Question from '../../assets/quesiton-mark-trans.png'
import ChatContext from '../../context/ChatContext'
import './NavBar.css';

const NavBar = () => {
  const dispatch = useDispatch();
  const { showProfileEdit, setShowProfileEdit } = useContext(ChatContext)

  const user = useSelector ( (state) => state.session.user? state.session.user.email : null )

  if (!user) return  <Redirect to="/login"/>

  const arrayEquals = (arr1, arr2) => {
    return arr1.every((e, i, arr) =>{
       return e === arr2[i]
     })
   }
   const showProf = () => {
     const dims = arrayEquals(showProfileEdit, [20, 80, 0]) ? [20, 50, 30 ] : [20, 80, 0 ]
     setShowProfileEdit(dims)
   }

  const logOutUser= () => {
    console.log("loggingOutUser")
    showProf()


    // dispatch(clearChannels())
    // return dispatch(logout())
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
          {/* <img id="clock" src={ Question }/> */}
        </div>
        <div id="logout">
          <button id="logout-button"
            onClick={ logOutUser }>
            {user[0].toUpperCase()}

          </button>
          </div>
      </div>

    </div>
    </>

  )
}
export default NavBar;