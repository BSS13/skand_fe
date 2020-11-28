import React, { useEffect,useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {  GET_SPECIFIC_USER_REQUESTED, UPDATE_USER_REQUESTED } from '../redux/actions/user-action';
import { Link } from 'react-router-dom';


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


const UpdateUser = ({
  user: {loading, users},
  getSpecificUser,
  updateUser 
}) => {
  
  const uid = useParams().uid;
  

  useEffect(()=>{
    getSpecificUser(uid);
},[]);

const initialValues = {
  email: "",
  first_name: "",
  last_name: "",
  jobs_count: "",
  active: "",
  slack_username: "",
};



  return (<>
    {loading && <h1>Loading</h1>}
    <button><Link to="/users">Back</Link></button>
    {users && <Formik enableReinitialize={true}
      initialValues={users || initialValues}
      validationSchema={UserSchema}

      
      onSubmit={(values) => {
       values.id = uid;
       updateUser(values);
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
                Update
              </button>
            </Form>
          </div>
        );
      }}
    </Formik>}
    </>);
};

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  getSpecificUser: (uid) => dispatch({type: GET_SPECIFIC_USER_REQUESTED, payload: uid}),
  updateUser: (payload) => dispatch({type: UPDATE_USER_REQUESTED, payload: payload})
})

export default connect(mapStateToProps,mapDispatchToProps)(UpdateUser)



