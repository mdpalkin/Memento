import {Button, Typography} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import Input from "antd/lib/input/Input";
import Checkbox from "antd/lib/checkbox/Checkbox";
import s from './Login.module.css'
import {Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./auth.reducer.ts";
import {ThunkDispatch} from "redux-thunk";
import {AppRootState, StoreType} from "../../app/store.ts";
import {UnknownAction} from "redux";
import { redirect } from "react-router-dom";

export const Login = () => {

    const isLoggedIn = useSelector<AppRootState>(state => state.auth.isLoggedIn)

    const dispatch = useDispatch<ThunkDispatch<StoreType, never, UnknownAction>>()

    if (isLoggedIn) {
        redirect("/todolists")
    }

    return (
        <Formik
            initialValues={{email: '', password: '', rememberMe: false}}
            onSubmit={values => {
                dispatch(loginTC(values))
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
                        prefix={<UserOutlined className="site-form-item-icon"/>}
                        placeholder="Username"
                        name={'email'}
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.email && touched.email &&
                        <div className={s.errorMessage}>{errors.email}</div>}

                    <Input
                        prefix={<LockOutlined className="site-form-item-icon"/>}
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
                    <Button htmlType={'submit'} typeof={'primary'} type="primary" disabled={!!errors.password || !!errors.email}>
                        Log in
                    </Button>
                </form>
            )}
        </Formik>
    )
}