import { Formik, Form, Field } from 'formik'
import React from 'react'
import style from './Form.module.css'

const Dropdowns = () => {
  return (
    <Formik
    initialValues={{dropdowns: ''}}
    onSubmit={(values) => {console.log(values.dropdowns)}}
    >
        <Form>
            <div className={style.dropdownContainer}>
                <label htmlFor="" className={style.label}>
                    Dropdown tittle
                </label>
                <Field as="select" name="color" className={style.dropdown}>
                    <option value="">Dropdown option</option>
                    <option value="Dropdown option 1">Dropdown option 1</option>
                    <option value="Dropdown option 2">Dropdown option 2</option>
                </Field>
            </div>
        </Form>
    </Formik>
  )
}

export default Dropdowns