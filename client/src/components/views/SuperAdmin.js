import React, { useEffect, useState } from "react"

import { useHistory } from "react-router"

import { auth, googleAuth } from "auth"

import { Notification } from "components/base"

export const SuperAdmin = () => {
  const history = useHistory()

  const [notification, setNotification] = useState(null)
  const [secs, setSecs] = useState(3)

  const updateNotification = (secs = 3) => {
    setNotification({
      className: "is-danger",
      text: `Redirecting to login page in ${secs} seconds...`,
    })
  }

  useEffect(() => {
    if (!notification) {
      auth
        .signInWithPopup(googleAuth)
        .then(({ user: { email } }) => {
          if (email !== process.env.REACT_APP_SUPER_ADMIN_EMAIL) {
            throw new Error()
          }
        })
        .catch(() => {
          updateNotification()
        })
    } else {
      auth.signOut().then()
    }
  }, [notification])

  useEffect(() => {
    if (notification) {
      while (secs >= 0) {
        const intervalID = setInterval(() => {
          setSecs((prevSecs) => prevSecs - 1)
          updateNotification(secs)
        }, 1000)

        // Cleanup function
        return () => {
          clearInterval(intervalID)
        }
      }
      history.push("/login")
    }
  }, [history, notification, secs])

  return notification ? (
    <div className="container">
      <Notification notification={notification} />
    </div>
  ) : null
}
