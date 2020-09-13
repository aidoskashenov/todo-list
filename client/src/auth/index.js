import * as firebase from "firebase/app"
import "firebase/auth"

import { firebaseApp } from "./client"

export const auth = firebaseApp.auth()

export const googleAuth = new firebase.auth.GoogleAuthProvider()
