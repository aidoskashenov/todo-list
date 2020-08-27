import React from "react"

import { Formik, Field, Form, ErrorMessage } from "formik"

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
    <Form>
      <label htmlFor="name">Name</label>
      <Field name="name" type="text" />
      <ErrorMessage name="name" />

      <label htmlFor="email">Email</label>
      <Field name="email" type="email" />
      <ErrorMessage name="email" />

      <label htmlFor="name">Password</label>
      <Field name="pass" type="password" />
      <ErrorMessage name="pass" />

      <button type="submit">Submit</button>
    </Form>
  </Formik>
)
