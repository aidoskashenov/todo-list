const baseURL = process.env.REACT_APP_CLOUDINARY_URL

export default {
  async upload(payload) {
    const res = await fetch(`${baseURL}/upload`, {
      method: "POST",
      body: payload
    })

    return res
  }
}
