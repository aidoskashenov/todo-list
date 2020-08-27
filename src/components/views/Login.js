import React from "react"

import { useFormik } from "formik"

export const Login = () => {
  const validate = (values) => {
    const errors = {}

    if (!values.name) {
      errors.name = "Name is required!"
    } if (!values.email) {
      errors.email = "Email is required!"
    } if (!values.pass) {
      errors.pass = "Email is required!"
    }

    return errors
  }

  const formik = useFormik({
    // This is like 'setState'
    initialValues: {
      email: "",
      name: "",
      pass: "",
    },
    validate,
    onSubmit: (values) => {
      // This is like utility fxn. that gathers all values
      console.log("submission", values)
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      {formik.errors.name ? <p>{formik.errors.name}</p> : null}

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.errors.email ? <p>{formik.errors.email}</p> : null}

      <label htmlFor="pass">Password</label>
      <input
        type="password"
        id="pass"
        name="pass"
        onChange={formik.handleChange}
        value={formik.values.pass}
      />
      {formik.errors.pass ? <p>{formik.errors.pass}</p> : null}

      <button type="submit">Submit</button>
    </form>
  )
}
