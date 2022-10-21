import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from 'yup';
import "./index.css"
import { API } from "../../helpers/API";
import { Link } from "react-router-dom";


const Signup = ({ handleChange }) => {

    const initialValues = {
        username: '',
        fullname: '',
        email: '',
        password: '',
        passwordConfirm: ''
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
        fullname: Yup.string().required("Required"),
        email: Yup.string().email('Please enter valid email').required("Required"),
        password: Yup.string()
            .min(6, 'at least 6 chars')
            .matches(/[a-z]/, 'at least one lowercase char')
            .matches(/[A-Z]/, 'at least one uppercase char')
            .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, 'at least 1 number or special char (@,!,#, etc).')
            .required("Required"),
        passwordConfirm: Yup.string().min(6, "Password must be at least 6 characters").required("Confirm Password is required").oneOf([Yup.ref("password"), null], "Passwords does not match")

    })
    const onSubmit = async (values, props) => {
        console.log(values)

        const res = await API.register(values.email, values.password, values.fullname, values.username);
        console.log(res)

        if (res.response === "Mail de usuario ya existente") { handleChange("event", 1) }
        if (res.response === "usuario ha sido creado");
        //si no se registra: alert de usuario registrado
        //si se registra. navigate al login
    }

    return (

        <div className="loginSignUpContainer">
            <main className={"loginContainer"}>
                <h2 className="loginTitle">Signup</h2>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {(props) => (
                        <Form className="formLoginContainer">
                            <Field className="inputLogin" fullWidth label='Username' name="username" placeholder="Enter your Username"
                                helperText={<ErrorMessage name="username" />} />
                            <Field className="inputLogin" fullWidth label='Full Name' name="fullname" placeholder="Enter your full name"
                                helperText={<ErrorMessage name="fullname" />} />
                            <Field className="inputLogin" fullWidth label='Email' name="email" placeholder="Enter your email"
                                helperText={<ErrorMessage name="email" />} />
                            <Field className="inputLogin" label='Contraseña' name="password"
                                placeholder="********" type='password' fullWidth required
                                helperText={<ErrorMessage name="password" />} />
                            <Field className="inputLogin" label='Confirma contraseña' name="passwordConfirm"
                                placeholder="********" type='password' fullWidth required
                                helperText={<ErrorMessage name="passwordConfirm" />} />
                            <button className="buttonLogin" type='submit'>{props.isSubmitting ? "Loading" : "Registro"}</button>
                        </Form>
                    )}
                </Formik>
                <p className="loginText">¿Ya tenés una cuenta? Ingresá haciendo click <Link to={"/login"} className="loginLink">Acá</Link></p>
            </main>
        </div>
    )
}

export default Signup;