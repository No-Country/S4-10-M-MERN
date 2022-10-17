import { Field, Form, Formik, ErrorMessage  } from "formik";
import { Grid, Paper, Avatar, TextField, Typography, Link } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import { FormControlLabel } from '@mui/material';
import {Checkbox} from '@mui/material';
import * as Yup from "yup"
import "./index.css"
import { API } from "../../helpers/API";

const Login = ({ handleChange }) => {

    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }

    const initialValues = {
        username: '',
        password: '',
        remember: false
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
        password: Yup.string().required("Required")
    })
    const onSubmit = async (values, props) => {
        const res = await API.login(values.username, values.password);
        console.log(res)
        // setTimeout(() => {
        //     props.resetForm()
        //     props.setSubmitting(false)
        // }, 2000)

    }
    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockIcon /></Avatar>
                    <h2 className="Titulo">Inicio de sesión</h2>
                </Grid>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {(props) => (
                        <Form className="formclass">
                            <Field className="inputLogin"  as={TextField} label='Username' name="username"
                                placeholder='Enter username' fullWidth required
                                helperText={<ErrorMessage name="username" />} />
                            <Field className="inputLogin" as={TextField} label='Contraseña' name="password"
                                placeholder="********"  type='password' fullWidth required
                                helperText={<ErrorMessage name="password" />} />                             
                            <button className="buttonLogin" type='submit'>{props.isSubmitting ? "Loading" : "Sign in"}</button>
                        </Form>
                    )}
                </Formik>
                <Typography >
                    <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Do you have an account ?
                     <Link href="#" onClick={() => handleChange("event", 1)} >
                        Sign Up
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login