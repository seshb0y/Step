import { Form, Formik, Field } from 'formik'
import React from 'react'
import style from './Form.module.css'

export const RadioButtons = () => {
  return (
    <Formik
    initialValues={{
        choice: ''
    }}
    onSubmit={(values) => {console.log(values.choice)}}
    >
    {() => (
        <Form className={style.radioContainer}>
            <div>
                <label htmlFor="">
                    <Field className={style.radio} type="radio" name="choice" value="option1"/>
                    Radio selection 1
                </label>
            </div>
            <div>
                <label htmlFor="">
                    <Field className={style.radio} type="radio" name="choice" value="option2"/>
                    Radio selection 2
                </label>
            </div>
            <div>
                <label htmlFor="">
                    <Field className={style.radio} type="radio" name="choice" value="option3"/>
                    Radio selection 3
                </label>
            </div>
            
            
            
        </Form>
    )}

    </Formik>
  )
}
