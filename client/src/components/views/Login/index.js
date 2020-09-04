import React, { useEffect, useState } from "react"

import { Formik, Field, Form, ErrorMessage } from "formik"

import { useHistory, useLocation } from "react-router-dom"

import * as Yup from "yup"

// This is an outer function wrapping an inner function that returns out the 'api methods'
import api from "api"
import auth from "auth"

import { Options } from "./Options"

export const Login = () => {
  const history = useHistory()
  const location = useLocation()

  const [forgotMode, setForgotMode] = useState(false)
  const [loginMode, setLoginMode] = useState(location.search.includes("login"))

  const usersAPI = api("users")

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
        history.push("/todos", { currentUser: user.uid })
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
              .then(() => {
                // TODO: Create a notification to tell them to check their ✉️
              })
              .catch((err) => {
                console.error(err)
              })
          } else if (loginMode) {
            auth
              .signInWithEmailAndPassword(email, pass)
              .then(async ({ user: { uid } }) => {
                setSubmitting(false)
                // Got the user - we need the name from the database
                const { name } = await usersAPI.show(uid)

                history.push("/todos", { uid, name })
              })
              .catch((err) => {
                console.error(err)
              })
          } else {
            auth
              .createUserWithEmailAndPassword(email, pass)
              .then(({ user: { uid } }) => {
                // In 'then' - means we have a user.
                // Send to Mongo the 'uid' and 'name'.
                try {
                  usersAPI.create({ uid, name }).then(() => {
                    // TODO: Check Y this may be causing a mem 🧠 leak
                    setSubmitting(false)
                    history.push("/todos", { uid, name })
                  })
                } catch (err) {
                  console.error(err)
                }
              })
              .catch((err) => {
                setSubmitting(false)
                console.error(err.message)
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
