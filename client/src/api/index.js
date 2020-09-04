import dotenv from "dotenv"
dotenv.config()

const baseURL = process.env.REACT_APP_BASE_URL

// Factory Function
export default (route) => ({
  async create(payload) {
    const res = await fetch(`${baseURL}/${route}/create` , {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })

    return res.json()
  },

  show(id) {},

  getAll() {
    console.log('tring to get all', route)
  },

  update(payload, id) {},

  delete(id) {},
})
