import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import '../styles/Styles.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegistrationForm: React.FC = () => {
  const initialValues: FormValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const navigate = useNavigate();


  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters long')
      .required('Please enter a username'),
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Please enter an email address'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Please enter a password'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Please confirm your password'),
  });

  const handleSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    try{
      console.log('Submitting values:', values);
      const response = await axios.post('https://678a47e1dd587da7ac2977c2.mockapi.io/users/users', values)
      console.log('User registered successfully:', response.data);
      formikHelpers.resetForm();
    }catch (error) {
      console.error('Error:', error);
      alert('Failed to register user. Please try again.');
    }finally{
      formikHelpers.setSubmitting(false); 
    }
    
  };

  return (
    <div>
      <h2>Registration</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="username">Username</label>
              <Field type="text" id="username" name="username" />
              <ErrorMessage name="username" component="div" />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </div>

            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field type="password" id="confirmPassword" name="confirmPassword" />
              <ErrorMessage name="confirmPassword" component="div"/>
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Register'}
            </button>

            <button type='button' onClick={() =>navigate(-1)}>Go back</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;
