import React from "react"

import { Formik } from "formik"

import * as Yup from "yup"

export const Login = () => (
  <Formik
    initialValues={{
      email: "",
      name: "",
      pass: "",
    }}
    validationSchema={Yup.object({
      name: Yup.string().required("Name is required!"),
      email: Yup.string()
        .email("Invalid email address!")
        .required("Email is required!"),
      pass: Yup.string().min(6).required("Pass is required!"),
    })}
    onSubmit={(values, { setSubmitting }) => {
      console.log("submission", values)
      setSubmitting(false)
    }}
  >
    {(formik) => (
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" {...formik.getFieldProps("name")} />
        {formik.touched.name && formik.errors.name ? (
          <p>{formik.errors.name}</p>
        ) : null}

        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...formik.getFieldProps("email")} />
        {formik.touched.email && formik.errors.email ? (
          <p>{formik.errors.email}</p>
        ) : null}

        <label htmlFor="pass">Password</label>
        <input type="password" id="pass" {...formik.getFieldProps("pass")} />
        {formik.touched.pass && formik.errors.pass ? (
          <p>{formik.errors.pass}</p>
        ) : null}

        <button type="submit">Submit</button>
      </form>
    )}
  </Formik>
)
