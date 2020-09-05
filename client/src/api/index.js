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

    } catch (err) {
      console.error(err)
    }
  },

  async show(id) {
    try {
      const res = await fetch(`${baseURL}/${route}/${id}`)
    return res.json()
    } catch (err) {
      console.error(err)
    }
  },

  getAll() {
    console.log('tring to get all', route)
  },

  update(payload, id) {},

  delete(id) {},
})
