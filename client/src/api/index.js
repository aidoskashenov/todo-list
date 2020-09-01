export default {
  async index() {
    const res = await fetch(
      "https://my-json-server.typicode.com/Claim-Academy-JS/todos/todos"
    )

    return await res.json()
  }
}
