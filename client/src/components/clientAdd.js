import React from 'react'
import { Field, reduxForm } from 'redux-form'

let ContactForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <div>
            <Field name="firstName" component="input" type="text" />
        </div>
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <div>
            <Field name="lastName" component="input" type="text" />
        </div>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <div>
            <Field name="email" component="input" type="email" />
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

ContactForm = reduxForm({
  // a unique name for the form
  form: 'contact'
})(ContactForm)

export default ContactForm