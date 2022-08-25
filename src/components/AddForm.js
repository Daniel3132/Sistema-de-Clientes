import React from 'react'
import { Formik, Form, Field } from 'formik';
import '../styles/addForm.scss'
import { SignupSchema } from './helpers/FormValidation';


const AddForm = () => {

    const handleSubmit = (values) => {
        console.log(values)
    }

    return (
        <section className='addForm'>
            <Formik
                initialValues={
                    {
                        nombre: '',
                        apellido: '',
                        fecha: '',
                        telefono: '',
                        email: '',
                    }
                }
                validationSchema={SignupSchema}
                onSubmit={(values) => handleSubmit(values)}
                >
                {({ errors, touched, handleReset }) => (
                    <Form>
                        <h1>Registro de clientes</h1>
                        <div>
                            <label htmlFor="nombre">Nombre:</label>
                            <Field name="nombre" type="text" />
                            {errors.nombre && touched.nombre ?
                                (<small className='errorMessage'>{errors.nombre}</small>) : null}
                        </div>

                        <div>
                            <label htmlFor="apellido">Apellido:</label>
                            <Field name="apellido" type="text" />
                            {errors.apellido && touched.apellido ?
                                (<small className='errorMessage'>{errors.apellido}</small>) : null}

                        </div>

                        <div>
                            <label htmlFor="telefono">Telefono:</label>
                            <Field name="telefono" type="number" />
                            {errors.telefono && touched.telefono ?
                                (<small className='errorMessage'>{errors.telefono}</small>) : null}
                        </div>

                        <div>
                            <label htmlFor="nombre">Correo electronico:</label>
                            <Field name="email" type="email" />
                            {errors.email && touched.email ?
                                (<small className='errorMessage'>{errors.email}</small>) : null}
                        </div>

                        <div>
                            <label htmlFor="fecha">Fecha de nacimiento:</label>
                            <Field name="fecha" type="date" />
                            {errors.fecha && touched.fecha ?
                                (<small className='errorMessage'>{errors.fecha}</small>) : null}
                        </div>

                        <button type="submit">Enviar</button>
                        <button className='btnLimpiar' type="submit" onClick={handleReset}>Limpiar</button>
                    </Form>
                )}
            </Formik>
        </section>
    )
}

export default AddForm