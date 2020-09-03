import React, { useEffect, useState } from "react"

import { Formik, Field, Form, ErrorMessage } from "formik"

import { useHistory, useLocation } from "react-router-dom"

import * as Yup from "yup"

import auth from "auth"

import { Options } from "./Options"

export const Login = () => {
  const history = useHistory()
  const location = useLocation()

  const [forgotMode, setForgotMode] = useState(false)
  const [loginMode, setLoginMode] = useState(location.search.includes("login"))

  const handleToggle = (event) => {
    if (event.target.textContent.includes("Forgot")) {
      setForgotMode(true)
    } else {
      setForgotMode(false)
      setLoginMode((prev) => !prev)
    }
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        history.push("/todos", { currentUser: user.email })
      }
    })
  }, [history])

  return (
    <section className="box center mt-4 section">
      <h2 className="has-text-centered title">
        {loginMode ? "Login" : "Create Account"}
      </h2>
      <Formik
        initialValues={{
          email: "",
          name: "",
          pass: "",
        }}
        validationSchema={Yup.object({
          name: !loginMode && Yup.string().required("Name is required!"),
          email: Yup.string()
            .email("Invalid email address!")
            .required("Email is required!"),
          pass:
            !forgotMode && Yup.string().min(6).required("Pass is required!"),
        })}
        onSubmit={({ name, email, pass }, { setSubmitting }) => {
          if (forgotMode) {
            auth
              .sendPasswordResetEmail(email)
              .then((res) => {
                // TODO: Create a notification to tell them to check their ✉️
              })
              .catch((err) => {
                console.error(err)
              })
          } else if (loginMode) {
            auth
              .signInWithEmailAndPassword(email, pass)
              .then(() => {
                setSubmitting(false)
                history.push("/todos", { currentUser: email })
              })
              .catch((err) => {
                console.error(err)
              })
          } else {
            auth
              .createUserWithEmailAndPassword(email, pass)
              .then(() => {
                setSubmitting(false)
                // TODO: Use our api to send 'name' and any other deets over to Mongo
                // After this is sent to our Mongo...
                // try-catch
                // history.push("/todos", { currentUser: email })
              })
              .catch((err) => {
                console.log(err)
              })
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {!loginMode ? (
              <div className="field">
                <label htmlFor="name" className="ml-2">
                  Name
                </label>
                <div className="control mx-2 my-1">
                  <Field name="name" type="text" />
                  <p className="help is-danger">
                    <ErrorMessage name="name" />
                  </p>
                </div>
              </div>
            ) : null}

            <div className="field">
              <label htmlFor="email" className="ml-2">
                Email
              </label>
              <div className="control mx-2 my-1">
                <Field name="email" type="email" />
                <ErrorMessage name="email" />
              </div>
            </div>

            {!forgotMode ? (
              <div className="field">
                <label htmlFor="pass" className="ml-2">
                  Password
                </label>
                <div className="control mx-2 my-1">
                  <Field name="pass" type="password" />
                  <ErrorMessage name="pass" />
                </div>
              </div>
            ) : null}

            <button
              type="submit"
              className="button is-success ml-2 mt-2"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <Options
        forgotMode={forgotMode}
        loginMode={loginMode}
        handler={handleToggle}
      />
    </section>
  )
}
