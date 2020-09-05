import dotenv from "dotenv"
dotenv.config()

const baseURL = process.env.REACT_APP_BASE_URL

// Factory Function - 'encloses' 'route' inside of each method
export default (route) => ({
  async create(payload) {
    try {
      const res = await fetch(`${baseURL}/${route}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
      return await res.json()
    } catch (err) {
      console.error(err)
    }
  },

  async show(id) {
    try {
      const res = await fetch(`${baseURL}/${route}/${id}`)
      return await res.json()
    } catch (err) {
      console.error(err)
    }
  },

  async update(payload, id) {
    try {
      const res = await fetch(`${baseURL}/${route}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payload, id }),
      })
      return await res.json()
    } catch (err) {
      console.error(err)
    }
  },

  async delete(id) {
    try {
      const res = await fetch(`${baseURL}/${route}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      })
      return await res.json()
    } catch(err) {
      console.error(err)
  }
  },
})
