import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import '../styles/addForm.scss'


const AddForm = () => {

    const SignupSchema = Yup.object().shape({
        nombre: Yup.string().min(2, 'El nombre es muy corto').max(50, 'excede el maximo').required('El campo nombre es obligatorio'),
        apellido: Yup.string().min(2, 'El apellido es muy corto').max(50, 'excede el maximo').required('El campo apellido es obligatorio'),
        fecha: Yup.date().required('El campo fecha es obligatorio'),
        telefono: Yup.number().min(10, 'El número de telefono es muy corto').max(10, 'excede el maximo').required('El campo telefono es obligatorio'),
        email: Yup.string().email('Debe ser de tipo email ej: ana@gmail.com').min(5, 'email muy corto').max(50, 'excede el maximo').required('El campo email es obligatorio'),
    });

    const handleSubmit = (values) => {
        console.log(values)
    }


    return (
        <section className='addForm'>
            <h1>Registro de clientes</h1>
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
                        <Field name="nombre" placeholder="Nombre" type="text" />
                        {errors.nombre && touched.nombre ?
                            (<small className='errorMessage'>{errors.nombre}</small>) : null}

                        <Field name="apellido" placeholder="Apellido" type="text" />
                        {errors.apellido && touched.apellido ?
                            (<small className='errorMessage'>{errors.apellido}</small>) : null}


                        <Field name="telefono" placeholder="Telefono" type="number" />
                        {errors.telefono && touched.telefono ?
                            (<small className='errorMessage'>{errors.telefono}</small>) : null}

                        <Field name="email" placeholder="Email" type="email" />
                        {errors.email && touched.email ?
                            (<small className='errorMessage'>{errors.email}</small>) : null}

                        <div>
                            <label htmlFor="fecha">Fecha de nacimiento:</label>
                            <Field name="fecha" placeholder="Fecha de nacimiento" type="date" />
                            {errors.fecha && touched.fecha ?
                                (<small className='errorMessage'>{errors.fecha}</small>) : null}
                        </div>

                        <button type="submit">Enviar</button>
                        <button type="submit" onClick={handleReset}>Limpiar</button>
                    </Form>
                )}
            </Formik>
        </section>
    )
}

export default AddForm