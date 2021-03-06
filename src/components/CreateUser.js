import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CREATE_USER_REQUESTED } from '../redux/actions/user-action';
import Header from './Header';
import { Button, Title } from './Theme';

// Schema definition for Yup validation
const UserSchema = Yup.object().shape({
  email: Yup.string().email().required('Email Required'),
  first_name: Yup.string()
    .required('First Name Required')
    .min(2, 'First name must be of atleast 2 characters'),
  last_name: Yup.string()
    .required('Last Name Required')
    .min(2, 'Last Name must be of atleast 2 characters'),
  jobs_count: Yup.number().required('Jobs Count Required').default(0),
  active: Yup.boolean().required('Status Required').default(false),
  slack_username: Yup.string().required('Slack Username Required').default(null),
});


//Initial values for formik
const initialValues = {
  email: '',
  first_name: '',
  last_name: '',
  jobs_count: '',
  active: '',
  slack_username: '',
};

const CreateUser = ({ user: { loading, users }, createUser }) => {
  const [created, setCreated] = useState(false);

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={UserSchema}
        onSubmit={(values) => {
          createUser(values);
          setCreated(true);
        }}
      >
        {(formik) => {
          const { errors, touched, isValid, dirty } = formik;
          return (
            <>
              <Header />

              {loading && (
                <div className="preloader-wrapper big active">
                  <div className="spinner-layer spinner-blue-only">
                    <div className="circle-clipper left">
                      <div className="circle" />
                    </div>
                    <div className="gap-patch">
                      <div className="circle" />
                    </div>
                    <div className="circle-clipper right">
                      <div className="circle" />
                    </div>
                  </div>
                </div>
              )}

              {created && (
                <>
                  <Title>User created Successfully</Title>
                </>
              )}

              <Link to="/users">
                <Button>Back</Button>
              </Link>

              {/* Display create form till new user new created to avoid refresh and clear state */}
              {!created && (
                <div className="container">
                  <h1>Add New User</h1>
                  <Form>
                    <div className="form-row">
                      <label htmlFor="email">Email</label>
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        className={errors.email && touched.email ? 'input-error' : null}
                      />
                      <ErrorMessage name="email" component="span" className="error" />
                    </div>{' '}
                    <br />
                    <div className="form-row">
                      <label htmlFor="first_name">First Name</label>
                      <Field
                        type="text"
                        name="first_name"
                        id="first_name"
                        className={errors.first_name && touched.first_name ? 'input-error' : null}
                      />
                      <ErrorMessage name="first_name" component="span" className="error" />
                    </div>{' '}
                    <br />
                    <div className="form-row">
                      <label htmlFor="last_name">Last Name</label>
                      <Field
                        type="text"
                        name="last_name"
                        id="last_name"
                        className={errors.last_name && touched.last_name ? 'input-error' : null}
                      />
                      <ErrorMessage name="last_name" component="span" className="error" />
                    </div>{' '}
                    <br />
                    <div className="form-row">
                      <label htmlFor="jobs_count">Jobs Count</label>
                      <Field
                        type="text"
                        name="jobs_count"
                        id="jobs_count"
                        className={errors.jobs_count && touched.jobs_count ? 'input-error' : null}
                      />
                      <ErrorMessage name="jobs_count" component="span" className="error" />
                    </div>{' '}
                    <br />
                    <div className="form-row">
                      <label htmlFor="active">Active</label>
                      <Field
                        type="text"
                        name="active"
                        id="active"
                        className={errors.active && touched.active ? 'input-error' : null}
                      />
                      <ErrorMessage name="active" component="span" className="error" />
                    </div>{' '}
                    <br />
                    <div className="form-row">
                      <label htmlFor="slack_username">Slack Username</label>
                      <Field
                        type="text"
                        name="slack_username"
                        id="slack_username"
                        className={
                          errors.slack_username && touched.slack_username ? 'input-error' : null
                        }
                      />
                      <ErrorMessage name="slack_username" component="span" className="error" />
                    </div>{' '}
                    <br />
                    <Button
                      type="submit"
                      className={!(dirty && isValid) ? 'disabled-btn' : ''}
                      disabled={!(dirty && isValid)}
                    >
                      Add
                    </Button>
                  </Form>
                </div>
              )}
            </>
          );
        }}
      </Formik>
    </>
  );
};

CreateUser.propTypes = {
  createUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  createUser: (payload) => dispatch({ type: CREATE_USER_REQUESTED, payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
