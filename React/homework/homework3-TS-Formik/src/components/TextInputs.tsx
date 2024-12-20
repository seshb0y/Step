import { Form, Formik, Field, ErrorMessage} from 'formik';
import React from 'react'
import * as Yup from 'yup';
import style from './Form.module.css'

export const TextInputs = () => {
  const SignUpSchema = Yup.object().shape({
    username: Yup.string().min(6, 'Min 6 characters').required('required field'),
    password: Yup.string().min(6, 'Min 6 characters').required('required field'),
    text: Yup.string().max(30,'Max 30 characters').required('required field')
  });

  return (
    <Formik
    initialValues={{username: '', password: '', text: ''}}
    validationSchema={SignUpSchema}
    onSubmit={(values) => {console.log(values)}}
    >
      {() => (
        <Form>
          <div className={style.inputContainer}>
            <label htmlFor="" className={style.label}>Username</label>
            <Field type="text" name="username" placeholder="Enter username" className={style.input}/>
            <ErrorMessage name="username" component="div"/>
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="" className={style.label}>Password</label>
            <Field type="password" name="password" placeholder="Enter password" className={style.input}/>
            <ErrorMessage name="password" component="div"/>
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="" className={style.label}>Text</label>
            <Field type="text" name="text" placeholder="Enter text" className={style.input}/>
            <ErrorMessage name="text" component="div"/>
          </div>
        </Form>
      )}
    </Formik>
  )
}
