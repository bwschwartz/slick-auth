import csrfFetch from './csrf.js'

export const updateUser = async (updatedInfo) => {
  const id = updatedInfo.get('user[id]')
  const res = await csrfFetch(`/api/users/${id}`, {
    method: "PATCH",
    body: updatedInfo
  })

  const data = await res.json();
  return data
}