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
      <div className="field">
        <label htmlFor="name">Name</label>
        <div className="control">
          <Field name="name" type="text" />
          <p className="help is-danger">
            <ErrorMessage name="name" />
          </p>
        </div>
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <div className="control">
          <Field name="email" type="email" />
          <ErrorMessage name="email" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="name">Password</label>
        <div className="control">
          <Field name="pass" type="password" />
          <ErrorMessage name="pass" />
        </div>
      </div>

      <button type="submit" className="button is-success">
        Submit
      </button>
    </Form>
  </Formik>
)
