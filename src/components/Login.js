import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


const LoginSchema = Yup.object().shape({
  email: Yup.string()
         .email()
         .required("Email Required"),
  password: Yup.string()
           .required("Password Required")
           .min(6, "Password must be of atleast 6 characters")
});

const initialValues = {
  email: "",
  password: ""
};

export const Login = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      
      onSubmit={(values) => {
        fetch("/api/v2/users/tokens/", {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },

       body: JSON.stringify({
        email: values.email,
        password: values.password
      })
    })
     .then( (response) => { 
     let token = response.headers.map.authorization;
     localStorage.setItem("token", token);
     console.log(token);
     window.location.href="/users";
      
});
      }}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <div className="container">
            <h1>Skand IO Login</h1>
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
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className={
                    errors.password && touched.password ? "input-error" : null
                  }
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className="error"
                />
              </div>

              <button
                type="submit"
                className={!(dirty && isValid) ? "disabled-btn" : ""}
                disabled={!(dirty && isValid)}
              >
                Sign In
              </button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};


