import {Button, Typography} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import Input from "antd/lib/input/Input";
import Checkbox from "antd/lib/checkbox/Checkbox";
import s from './Login.module.css'
import {Formik} from "formik";
import {useSelector} from "react-redux";
import {loginTC} from "./auth.reducer.ts";
import {useAppDispatch} from "../../app";
import {Navigate} from "react-router-dom";
import {selectIsLoggedIn} from "./auth.selectors.ts";

export const Login = () => {

    const isLoggedIn = useSelector(selectIsLoggedIn)

    const dispatch = useAppDispatch()


    if (isLoggedIn) {
        return <Navigate to={'/todolists'}/>
    }

    return (
        <Formik
            initialValues={{email: '', password: '', rememberMe: false}}
            onSubmit={async (values, formikHelpers) => {
                const action = await dispatch(loginTC(values))
                if (loginTC.rejected.match(action)) {
                    if (action.payload?.fieldsErrors?.length) {
                        const error = action.payload?.fieldsErrors[0]
                        formikHelpers.setFieldError(error?.field, error?.error)
                    }
                }
            }}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}  className={s.wrapper}>
                    <Typography.Title level={3}>Login In</Typography.Title>
                    <Input
                        prefix={<UserOutlined/>}
                        placeholder="Username"
                        name={'email'}
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.email && touched.email &&
                        <div className={s.errorMessage}>{errors.email}</div>}

                    <Input
                        prefix={<LockOutlined/>}
                        type="password"
                        placeholder="Password"
                        name={'password'}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.password && touched.password &&
                        <div className={s.errorMessage}>{errors.password}</div>}
                    <Checkbox
                        name={'rememberMe'}
                        checked={values.rememberMe}
                        onChange={handleChange}
                    >Remember me</Checkbox>
                    <Button htmlType={'submit'} type="primary" disabled={!!errors.password || !!errors.email}>
                        Log in
                    </Button>
                </form>
            )}
        </Formik>
    )
}