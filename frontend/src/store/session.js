import csrfFetch from './csrf.js'
export const SET_USER = 'session/SET_USER'
export const REMOVE_USER = 'session/REMOVE_USER'
const EDIT_USER = 'session/EDIT_USER'

//for heroku

const setUser = (user) => ({
  type: SET_USER,
  user
});

const removeUser = (user) => ({
  type: REMOVE_USER
});


const editUser = (user) => ({
  type: EDIT_USER,
  user
})

export const updateUser = (updatedInfo) => async(dispatch)=> {
  const id = updatedInfo.get('user[id]')
  const res = await csrfFetch(`/api/users/${id}`, {
    method: "PATCH",
    body: updatedInfo
  })
  const data = await res.json();
  console.log("data is firing", data)
  dispatch(editUser(data))
  return data
}

const initialState = {
  user: JSON.parse(sessionStorage.getItem("currentUser"))
};

const sessionReducer = (state=initialState, action) => {
  const nextState = {...state};
  switch(action.type) {
    case EDIT_USER:

      return {...state[action.user] = action.user}
    case SET_USER:
      return {...state, user: action.user}
    case REMOVE_USER:
      return {...state, user: null}
    default:
      return state;
  }
}

export const login = (user) => async (dispatch) => {
  const { email, password } = user;
  const res = await csrfFetch('/api/session', {
    method: "POST",
    body: JSON.stringify({email, password}),
    headers: {'Content-Type': 'application/json'}
  })
  const data = await res.json();
  storeUser(data.user)
  dispatch(setUser(data.user));
  return res;
}

export const logout = (user) => async (dispatch) => {
  const res = await csrfFetch('/api/session', { method: 'DELETE'});
  storeUser(null);
  dispatch(removeUser())
  return res;
}

export const restoreSession = () => async (dispatch) => {
  const res = await csrfFetch("/api/session");
  storeCSRFToken(res);
  const data = await res.json();
  storeUser(data.user);
  dispatch(setUser(data.user));
  return res;
}

const storeCSRFToken = (response) => {
  const csrfToken = response.headers.get("X-CSRF-Token")
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken)
}

const storeUser = (user) => {
  if (user) sessionStorage.setItem("user", JSON.stringify(user));
  else sessionStorage.removeItem("user");
}


export const signUp = (user) => async (dispatch) => {
  const res = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({...user})
  })

  const data = await res.json();
  storeUser(data.user);
  dispatch(setUser(data.user));

  return res;
}

export default sessionReducer;
