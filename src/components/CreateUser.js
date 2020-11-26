import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


const UserSchema = Yup.object().shape({
  email: Yup.string()
         .email()
         .required("Email Required"),
  first_name: Yup.string()
           .required("First Name Required")
           .min(2, "First name must be of atleast 2 characters"),
  last_name: Yup.string()
           .required("Last Name Required")
           .min(2, "Last Name must be of atleast 2 characters"),
  jobs_count: Yup.number()
           .default(0),
  active: Yup.boolean()
           .default(false),
  slack_username: Yup.string()
           .default(null)           
});

const initialValues = {
  email: "",
  first_name: "",
  last_name: "",
  jobs_count: "",
  active: "",
  slack_username: "",
};

export const CreateUser = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={UserSchema}

      
      onSubmit={(values) => {

        let token = localStorage.getItem("token");
      
        fetch("/api/v2/users", {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token
        },

       body: JSON.stringify({
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        jobs_count: values.jobs_count,
        active: values.active,
        slack_username: values.slack_username
      })
    })
     .then( (response) => { 
       console.log(response);
      
});
      }}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <div className="container">
            <h1>Add New User</h1>
            <Form>
              <div className="form-row">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className={
                    errors.email && touched.email ? "input-error" : null
                  }
                />
                <ErrorMessage name="email" component="span" className="error" />
              </div>

              <div className="form-row">
                <label htmlFor="first_name">First Name</label>
                <Field
                  type="text"
                  name="first_name"
                  id="first_name"
                  className={
                    errors.first_name && touched.first_name ? "input-error" : null
                  }
                />
                <ErrorMessage
                  name="first_name"
                  component="span"
                  className="error"
                />
              </div>

              <div className="form-row">
                <label htmlFor="last_name">Last Name</label>
                <Field
                  type="text"
                  name="last_name"
                  id="last_name"
                  className={
                    errors.last_name && touched.last_name ? "input-error" : null
                  }
                />
                <ErrorMessage
                  name="last_name"
                  component="span"
                  className="error"
                />
              </div>

              <div className="form-row">
                <label htmlFor="jobs_count">Jobs Count</label>
                <Field
                  type="text"
                  name="jobs_count"
                  id="jobs_count"
                  className={
                    errors.jobs_count && touched.jobs_count ? "input-error" : null
                  }
                />
                <ErrorMessage
                  name="jobs_count"
                  component="span"
                  className="error"
                />
              </div>

              <div className="form-row">
                <label htmlFor="active">Active</label>
                <Field
                  type="text"
                  name="active"
                  id="active"
                  className={
                    errors.active && touched.active ? "input-error" : null
                  }
                />
                <ErrorMessage
                  name="active"
                  component="span"
                  className="error"
                />
              </div>

              <div className="form-row">
                <label htmlFor="slack_username">Slack Username</label>
                <Field
                  type="text"
                  name="slack_username"
                  id="slack_username"
                  className={
                    errors.slack_username && touched.slack_username ? "input-error" : null
                  }
                />
                <ErrorMessage
                  name="slack_username"
                  component="span"
                  className="error"
                />
              </div>

              <button
                type="submit"
                className={!(dirty && isValid) ? "disabled-btn" : ""}
                disabled={!(dirty && isValid)}
              >
                Add
              </button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};


