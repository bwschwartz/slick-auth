import csrfFetch from './csrf.js'

export const SET_USER = 'session/SET_USER'
export const REMOVE_USER = 'session/REMOVE_USER'

const setUser = (user) => ({
  type: SET_USER,
  user
});

const removeUser = (user) => ({
  type: REMOVE_USER
});

const storeCSRFToken = (response) => {
  const csrfToken = response.headers.get("X-CSRF-Token")
  if (csrfToken) sessionStorage.setItem("X-CSRF_TOKEN", csrfToken)
}

const storeUser = (user) => {
  if (user) sessionStorage.setItem("user", JSON.stringify(user));
  else sessionStorage.removeItem("user");
}

const sessionReducer = (state={ user: null }, action) => {

  switch(action.type) {
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
  dispatch(setUser(data.user));
  return res;
}

export default sessionReducer;
//two action creators, set user in sessoin slice