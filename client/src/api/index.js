import dotenv from "dotenv"
dotenv.config()

const baseURL = process.env.REACT_APP_BASE_URL

// Factory Function - 'encloses' 'route' inside of each method
export default (route) => ({
  async create(payload) {
    const res = await fetch(`${baseURL}/${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    return res
  },

  async show(id) {
    const res = await fetch(`${baseURL}/${route}/${id}`)
    return res
  },

  async update(payload, id) {
    const res = await fetch(`${baseURL}/${route}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload, id }),
    })
    return res
  },

  async delete(id) {
    const res = await fetch(`${baseURL}/${route}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
    return res
  },
})
