import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import '../styles/Styles.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };

  const navigate = useNavigate();

  const checkUser = async (email:string, password: string) => {
    try{
      const response = await axios.get(`https://678a47e1dd587da7ac2977c2.mockapi.io/users/users?email=${email}`)
      const users = await response.data;
      const user = users.find((u: {email: string, password: string}) => u.password === password)
      return !!user
    }catch(error){
      console.log(error);
      return false;
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Password is required'),
  });

  const handleSubmit = async (
    values: LoginFormValues,
    formikHelpers: FormikHelpers<LoginFormValues>
  ) => {
    const {email, password} = values;

    try{
      const isValid = await checkUser(email, password);
      if(isValid){
        alert('Login successful')
        navigate('/foodSpin')
      }
      else{
        alert('Invalid email or password')
      }
    }catch(error){
      console.log(error)
    }finally{
      formikHelpers.setSubmitting(false)
    }
  };

  const handleRegistration = () => {
    navigate('/registration')
  }

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div"/>
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div"/>
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
            <button type='button' onClick={handleRegistration}>Registration</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
