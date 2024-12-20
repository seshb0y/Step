import { Form, Formik, Field } from 'formik'
import React from 'react'
import style from './Form.module.css'
const Checkbox = () => {
  return (
    <Formik
        initialValues={{
            remember: false,
            toggle: false,
        }}
        onSubmit={(values) => {console.log(values)}}>

        {({values, setFieldValue}) => (
            <Form >
                <div className={style.checkbuttons}>
                    <label htmlFor="">
                    <Field className={style.box} type="checkbox" name="remember" />
                    Remember Me
                    </label>
                </div>
                <div className={style.checkbuttons}>
                    <label>
                    <Field
                        className={style.box}
                        type="checkbox"
                        name="toggle"
                        onChange={() => setFieldValue('toggle', !values.toggle)}
                    />
                    <span></span>
                    <span>{values.toggle ? 'On' : 'Off'}</span>
                    </label>
                </div>
            </Form>
        )}
    </Formik>
  )
}

export default Checkbox