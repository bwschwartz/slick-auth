
import { useContext, useState } from 'react'
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
  const user = useSelector(state => state.session.user? state.session.user.email : null )
  const profPic = useSelector(state => state.session.user? state.session.user.photoUrl :  null)
  const [showDropDown, setShowDropDown] = useState(false)

  if (!user) return  <Redirect to="/login"/>

  const arrayEquals = (arr1, arr2) => {
    return arr1.every((e, i, arr) =>{
       return e === arr2[i]
     })
   }
   const showProf = () => {
     const dims = arrayEquals(showProfileEdit, [20, 80, 0]) ? [20, 55, 25] : [20, 80, 0]
     setShowProfileEdit(dims)
   }

  const logOutUser= () => {
    console.log("loggingOutUser")
    showProf()
    // dispatch(clearChannels())
    // return dispatch(logout())
  }

  const filterList = () => {
    console.log("i'm filtering honey")
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

          <input type="text" id="search-input"
          autoComplete="off"
          onKeyUp={filterList}
          onFocus={() => setShowDropDown(true)}
          onBlur={() => setTimeout(() => {
          setShowDropDown(false)}, 100)
          }
          placeholder="&#xF002; &nbsp; Search for a full-stack developer"
          style={{fontFamily:"Arial, FontAwesome"}}>
          </input>

         {showDropDown && <ul id="dev-links">
            <li><a href="https://github.com/bwschwartz">
            <i className="fa-brands fa-github dev-link-icon"></i>
             Github</a></li>
            <li><a href="#">
            <i className="fa-brands fa-linkedin dev-link-icon"></i>
            LinkedIn</a></li>
            <li><a href="#">
            <i className="fa-solid fa-palette dev-link-icon"></i>
            Portfolio Site</a></li>
          </ul>}

        </div>
      </div>

      <div id="right-nav">
        <div className="icon-holder">
        </div>
        <div id="logout">

          <button id="logout-button" style={profPic? {backgroundColor:"transparent"} : {backgroundColor:"rgb(70, 86, 97)"}}
            onClick={ logOutUser }>
              {profPic? <img src={profPic} style={{width:"26px", height:"26px", borderRadius:"5px"}}/> : user[0].toUpperCase() }
            <div className="availability-circle"></div>
          </button>

          </div>
      </div>

    </div>
    </>

  )
}
export default NavBar;