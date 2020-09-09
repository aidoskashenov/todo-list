import React, { useEffect, useState } from "react"

import { Formik, Field, Form, ErrorMessage } from "formik"

import { useHistory, useLocation } from "react-router-dom"

import * as Yup from "yup"

import api from "api/routes"
import auth from "auth"

import { Options } from "./Options"

import { Notification } from "components/base"

const usersAPI = api("users")

export const Login = () => {
  const history = useHistory()
  const { state } = useLocation()

  const [notification, setNotification] = useState(null)

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
    setNotification(null)
    /**
     * There was no 'state.status' set,
     * so we must be trying to login.
     *
     * R We already logged in?
     */
    if (status === "Loading...") {
      ;(async () => {
        // Returns 'null' when doing typing 'url' into browser bar. 🤷🏽‍♂️
        const { currentUser } = auth
        if (currentUser) {
          try {
            const { uid } = currentUser
            const res = await usersAPI.show(uid)
            const {
              body: { name },
            } = await res.json()
            history.push(`/todos/${uid}`, { name })
          } catch (err) {
            console.error(err)
          }
        } else {
          /**
           * No user found.
           * Proceed with 'login'
           */
          setStatus("Login")
        }
      })()
    } else {
      /**
       * We must be creating an account.
       * Log out any currently logged in user.
       */
      auth.signOut()
    }
  }, [history, status])

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
                  setSubmitting(false)
                  setNotification({
                    className: "is-info",
                    text: "Check ur ✉️!",
                  })
                })
                .catch((err) => {
                  setSubmitting(false)
                  setNotification({
                    className: "is-danger",
                    text:
                      err.message ||
                      `Unable to reset passwords ATM! 😞🙇🏽‍♂️
                    Please check your internet connection and/or try again later! 🤞🏽
                  `,
                  })
                })
              break
            case "Login":
              auth
                .signInWithEmailAndPassword(email, pass)
                .then(({ user: { uid } }) => usersAPI.show(uid))
                .then((res) => {
                  if (res.status > 400) {
                    throw new Error(`Unable to login ATM! 😞🙇🏽‍♂️
                    Please check your internet connection and/or contact support!
                  `)
                  }
                  return res.json()
                })
                .then(({ body: { uid, name } }) => {
                  history.push(`/todos/${uid}`, { name })
                })
                .catch((err) => {
                  setSubmitting(false)
                  setNotification({
                    className: "is-danger",
                    text: err.message,
                  })
                })
              break
            default:
              auth
                .createUserWithEmailAndPassword(email, pass)
                .then(({ user: { uid } }) => usersAPI.create({ uid, name }))
                .then((res) => {
                  if (res.status > 400) {
                    throw new Error(`Unable to create an account ATM! 😞🙇🏽‍♂️
                    Please check your internet connection and/or try again later! 🤞🏽
                  `)
                  }
                  return res.json()
                })
                .then(({ uid }) => {
                  history.push(`/todos/${uid}`, { name })
                })
                .catch((err) => {
                  setSubmitting(false)
                  auth.currentUser.delete().then(() => {
                    console.info(
                      "Removing any newly created auth user to preserve data integrity!"
                    )
                  })
                  setNotification({
                    className: "is-danger",
                    text: err.message,
                  })
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
      {notification ? <Notification notification={notification} /> : null}
    </section>
  )
}
