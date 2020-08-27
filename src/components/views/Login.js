import React from 'react'

import {useFormik} from "formik"

export const Login = () => {
  const formik = useFormik({
    // This is like 'setState'
    initialValues: {
      email: '',
      name: '',
      pass: ''
    },
    onSubmit: values => {
      // This is like utility fxn. that gathers all values
      console.log('submission', values)
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" onChange={formik.handleChange} value={formik.values.name} />

      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" onChange={formik.handleChange} value={formik.values.email} />

      <label htmlFor="pass">Password</label>
      <input type="password" id="pass" name="pass" onChange={formik.handleChange} value={formik.values.pass} />
      <button type="submit" >Submit</button>
    </form>
  )
}
