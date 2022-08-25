import React from 'react'
import { Formik, Form, Field } from 'formik';
import '../styles/addForm.scss'
import { SignupSchema } from './helpers/FormValidation';
import { url } from './helpers/api';
import Swal from 'sweetalert2';


const AddForm = () => {

    const handleSubmit = (values) => {
        //Agregar un nuevo cliente a la api
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        });
        //Alerta de agregado
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Cliente ${values.nombre} agregado`,
            showConfirmButton: false,
            timer: 1500
        });

    }

    return (
        <section className='addForm'>
            <Formik
                initialValues={
                    {
                        nombre: '',
                        apellido: '',
                        telefono: '',
                        correo: '',
                        fecha: '',
                    }
                }
                validationSchema={SignupSchema}
                onSubmit={(values) => handleSubmit(values)}
            >
                {({ errors, touched, handleReset }) => (
                    <Form>
                        <h2>Registro de clientes</h2>
                        <div>
                            <label htmlFor="nombre">Nombre:</label>
                            <Field name="nombre" type="text" />
                            {errors.nombre && touched.nombre ?
                                (<small className='errorMessage'><span class="fa fa-circle-exclamation mx-1"></span>{errors.nombre}</small>) : null}
                        </div>

                        <div>
                            <label htmlFor="apellido">Apellido:</label>
                            <Field name="apellido" type="text" />
                            {errors.apellido && touched.apellido ?
                                (<small className='errorMessage'><span class="fa fa-circle-exclamation mx-1"></span>{errors.apellido}</small>) : null}

                        </div>

                        <div>
                            <label htmlFor="telefono">Telefono:</label>
                            <Field name="telefono" type="number" />
                            {errors.telefono && touched.telefono ?
                                (<small className='errorMessage'><span class="fa fa-circle-exclamation mx-1"></span>{errors.telefono}</small>) : null}
                        </div>

                        <div>
                            <label htmlFor="correo">Correo electronico:</label>
                            <Field name="correo" type="email" />
                            {errors.correo && touched.correo ?
                                (<small className='errorMessage'><span class="fa fa-circle-exclamation mx-1"></span>{errors.correo}</small>) : null}
                        </div>

                        <div>
                            <label htmlFor="fecha">Fecha de nacimiento:</label>
                            <Field name="fecha" type="date" />
                            {errors.fecha && touched.fecha ?
                                (<small className='errorMessage'><span class="fa fa-circle-exclamation mx-1"></span>{errors.fecha}</small>) : null}
                        </div>

                        <div className='buttons'>
                            <button type="submit">Enviar</button>
                            <button className='btnLimpiar' onClick={handleReset}>Limpiar</button>
                        </div>
                    </Form>
                )}
            </Formik>
            <div className="logo"></div>      
        </section>
    )
}

export default AddForm