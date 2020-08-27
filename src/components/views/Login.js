import React from "react"

import { useFormik } from "formik"

import * as Yup from "yup"

export const Login = () => {
  const formik = useFormik({
    // This is like 'setState'
    initialValues: {
      email: "",
      name: "",
      pass: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required!"),
      email: Yup.string()
        .email("Invalid email address!")
        .required("Email is required!"),
      pass: Yup.string().min(6).required("Pass is required!"),
    }),
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
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      {formik.touched.name && formik.errors.name ? (
        <p>{formik.errors.name}</p>
      ) : null}

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <p>{formik.errors.email}</p>
      ) : null}

      <label htmlFor="pass">Password</label>
      <input
        type="password"
        id="pass"
        name="pass"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.pass}
      />
      {formik.touched.pass && formik.errors.pass ? (
        <p>{formik.errors.pass}</p>
      ) : null}

      <button type="submit">Submit</button>
    </form>
  )
}
