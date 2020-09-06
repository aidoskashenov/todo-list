import React, { useEffect, useState } from "react"

import { Formik, Field, Form, ErrorMessage } from "formik"

import { useHistory, useLocation } from "react-router-dom"

import * as Yup from "yup"

import api from "api"
import auth from "auth"

import { Options } from "./Options"

const usersAPI = api("users")

export const Login = () => {
  const history = useHistory()
  const { state } = useLocation()

  // Either we got here by clicking 'get started' or we need to check for an existing user
  const [status, setStatus] = useState(state?.status || "Loading...")

  const handleStatus = ({
    target: {
      dataset: { status },
    },
  }) => {
    setStatus(status)
  }

  useEffect(() => {
    // We are trying to login b/c there was no 'status' for 'initial state.'
    if (status === "Loading...") {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const { uid } = user
            const { name } = await usersAPI.show(uid)
            history.push(`/todos/${uid}`, { name })
          } catch (err) {
            console.error(err)
          }
        }
        // No 'user' - proceed with login.
        setStatus("Login")
      })
    } else {
      /**
       * We must be creating a new account as
       * "Loading..." was not set 👆🏽 b/c there was a 'status.'
       *
       * Let's make sure to logout any motherclucker that might be logged in and
       * let the user create an account.
       */
      auth.signOut()
    }
  })

  return status === "Loading..." ? (
    <div className="is-active pageloader">
      <span className="title">{status}</span>
    </div>
  ) : (
    <section className="box center mt-4 section">
      <h2 className="has-text-centered title">{status}</h2>
      <Formik
        initialValues={{
          email: "",
          name: "",
          pass: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address!")
            .required("Email is required!"),
          name:
            status === "Create Account" &&
            Yup.string().required("Name is required!"),
          pass:
            status !== "Reset Password" &&
            Yup.string().min(6).required("Password is required!"),
        })}
        onSubmit={({ name, email, pass }, { setSubmitting }) => {
          switch (status) {
            case "Reset Password":
              auth
                .sendPasswordResetEmail(email)
                .then(() => {
                  // TODO: Create a notification to tell them to check their ✉️
                })
                .catch((err) => {
                  console.error(err)
                })
              break
            case "Login":
              auth
                .signInWithEmailAndPassword(email, pass)
                .then(({ user: { uid } }) => {
                  // Got the user - need the name from the database.
                  // TODO: 😖 Server gets hit 2-3 times for the same request!
                  usersAPI.show(uid)
                  return uid
                })
                .then((uid) => {
                  setSubmitting(false)
                  // We have all of the info we need
                  history.push(`/todos/${uid}`, { name })
                })
                .catch((err) => {
                  setSubmitting(false)
                  console.error(err)
                })
              break
            default:
              auth
                .createUserWithEmailAndPassword(email, pass)
                .then(({ user: { uid } }) => {
                  usersAPI.create({ uid, name })
                })
                .then(() => {
                  setSubmitting(false)
                  setStatus("Loading...")
                })
                .catch((err) => {
                  setSubmitting(false)
                  setStatus(`
                    ${err.message}
                    Unable to create a user ATM! 😞🙇🏽‍♂️
                    Please check your internet connection and/or try again later! 🤞🏽
                  `)
                })
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {status !== "Login" && status !== "Reset Password" ? (
              <div className="field">
                <label htmlFor="name" className="ml-2">
                  Name
                </label>
                <div className="control mx-2 my-1">
                  <Field name="name" type="text" className="w-100" />
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
                <Field name="email" type="email" className="w-100" />
                <p className="help is-danger">
                  <ErrorMessage name="email" />
                </p>
              </div>
            </div>

            {status !== "Reset Password" ? (
              <div className="field">
                <label htmlFor="pass" className="ml-2">
                  Password
                </label>
                <div className="control mx-2 my-1">
                  <Field name="pass" type="password" className="w-100" />
                  <p className="help is-danger">
                    <ErrorMessage name="pass" />
                  </p>
                </div>
              </div>
            ) : null}

            <button
              type="submit"
              className="button is-success ml-2 mt-2"
              disabled={isSubmitting}
            >
              {status}
            </button>
          </Form>
        )}
      </Formik>
      <Options status={status} handler={handleStatus} />
    </section>
  )
}
