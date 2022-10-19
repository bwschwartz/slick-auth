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

const initialState = {
  user: JSON.parse(sessionStorage.getItem("currentUser"))
};

const sessionReducer = (state=initialState, action) => {
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
  console.log("in login")
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
  console.log("hit logout")
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
  const { email, password } = user;
  console.log("above")
  const res = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({email, password})
  })
  console.log("below")

  const data = await res.json();
  storeUser(data.user);
  dispatch(setUser(data.user));
  console.log(`res is: ${res}`)
  console.log(res);

  return res;
}

export default sessionReducer;
