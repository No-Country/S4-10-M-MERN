import { Field, Form, Formik, ErrorMessage  } from "formik";
import { Grid, Paper, Avatar, TextField, Typography, Link } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import { FormControlLabel } from '@mui/material';
import {Checkbox} from '@mui/material';
import * as Yup from "yup"
import "./index.css"
import { API } from "../../helpers/API";
import { useNavigate } from "react-router-dom";

const Login = ({ handleChange }) => {
    const navigate = useNavigate()
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }

    const initialValues = {
        email: '',
        password: ''        
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Please enter valid email').required("Required"),
        password: Yup.string().required("Required")
    })
    const onSubmit = async (values, props) => {
        console.log(values.email, values.password)
        
        const res = await API.login(values.email, values.password);
        console.log(res.response.message);
        console.log(res)
            
       
        if(res.response.message === "usuario logeado") navigate("/");
        else alert(res.response)
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
                            <Field className="inputLogin"  as={TextField} label='Email' name="email"
                                placeholder='Enter email' fullWidth required
                                helperText={<ErrorMessage name="email" />} />
                            <Field className="inputLogin" as={TextField} label='Contraseña' name="password"
                                placeholder="********"  type='password' fullWidth required
                                helperText={<ErrorMessage name="password" />} />                             
                            <button className="buttonLogin" type='submit'>{props.isSubmitting ? "Loading" : "Sign in"}</button>
                        </Form>
                    )}
                </Formik>
              {/*   <Typography >
                    <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography> */}
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