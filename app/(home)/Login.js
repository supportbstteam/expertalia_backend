"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { permanentRedirect } from 'next/navigation'
import Api from '@/app/_library/Api';
import validation from '@/app/_library/validation';

//=== import images ====
import logo from "@/app/assets/img/logo.png";
import SbButton from "@/app/_components/common/SbButton";

import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '@/app/_library/redux/slice/userReducer'

const Login = () => {

  const __data = {
    email: '',
    password: ''
  }
  const __errors = {
    email: '',
    password: ''
  }

  const dispatch = useDispatch()

  const [data, set_data] = useState(__data)
  const [disablebutton, set_disablebutton] = useState(false);
  const [checked, set_checked] = useState(false)
  const [common_error, set_common_error] = useState("")
  const [errors, set_errors] = useState(__errors)

  const router = useRouter();

  useEffect(() => {

    if (localStorage.getItem(process.env.APP_PREFIX + 'remember_me')) {
      set_checked(true);
      set_data({
        ...data,
        email: localStorage.getItem(process.env.APP_PREFIX + 'email') ? localStorage.getItem(process.env.APP_PREFIX + 'email') : '',
        password: localStorage.getItem(process.env.APP_PREFIX + 'password') ? localStorage.getItem(process.env.APP_PREFIX + 'password') : '',
      })
    }

  }, [])

  const handleChange = (e) => {
    const field_name = e.target.name;
    const field_value = e.target.value;
    set_data({ ...data, [field_name]: field_value })
  }

  const handleRememberMe = (e) => {
    if (checked) {
      set_checked(false);
    }
    else {
      set_checked(true);
    }
  }

  const validate_email = (value) => {
    let err = '';
    let email = value ?? data.email
    if (!email) {
      err = 'Email is required';
    }
    else if (!validation.validateEmail(email)) {
      err = 'Email is not valid!';
    }
    set_errors({
      ...errors,
      email: err
    });
    return err;
  }

  const validate_password = (value) => {
    let err = '';
    let password = value ?? data.password
    if (!password) {
      err = 'Password is required';
    }
    set_errors({
      ...errors,
      password: err
    });
    return err;
  }

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    let email = validate_email()
    if (email !== '') {
      errors.email = email;
      isValid = false;
    }

    let password = validate_password()
    if (password !== '') {
      errors.password = password;
      isValid = false;
    }
    set_errors(errors);
    return isValid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {

      set_disablebutton(true)

      try {
        const res = await Api.login({
          email: data.email,
          password: data.password
        });

        if (res && (res.status === 200)) {

          const resData = res.data;
          const token = resData.token;
          localStorage.setItem(process.env.APP_PREFIX + 'access_token', token);
          dispatch(fetchUser())

          if (checked) {
            localStorage.setItem(process.env.APP_PREFIX + 'remember_me', '1');
            localStorage.setItem(process.env.APP_PREFIX + 'email', data.email);
            localStorage.setItem(process.env.APP_PREFIX + 'password', data.password);
          }
          else {
            localStorage.removeItem(process.env.APP_PREFIX + 'remember_me');
            localStorage.removeItem(process.env.APP_PREFIX + 'email');
            localStorage.removeItem(process.env.APP_PREFIX + 'password');
          }
          router.push("/dashboard");
          router.refresh();
          //location.href = '/dashboard' 
        }
        else if (res && (res.status === 400)) {
          const resData = res.data;
          set_common_error(resData.message ?? '')
          set_disablebutton(false)
        }

      }
      catch (err) {
        set_common_error(err)
        set_disablebutton(false)
      }

    }
  }

  return (
    <>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex justify-content-center py-4">
                  <Image src={logo} className="logo" alt="" />
                </div>
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                      <p className="text-center small">Enter your Email & password to login</p>
                    </div>

                    {common_error &&
                      <div className="alert alert-danger alert-dismissible fade show">
                        {common_error}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => {
                          set_common_error('')
                        }}>
                          <span aria-hidden="true"></span>
                        </button>
                      </div>
                    }
                    <form className="row g-3 needs-validation" method="post" onSubmit={handleSubmit}>

                      <div className="col-12">
                        <label className="form-label">Email</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          id="email"
                          name="email"
                          value={data.email}
                          onChange={(e) => {
                            handleChange(e)
                            validate_email(e.target.value)
                          }}
                          autoComplete="off" />
                        {errors.email &&
                          <div className="error-msg">{errors.email}</div>
                        }
                      </div>

                      <div className="col-12">
                        <label htmlFor="yourPassword" className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder=""
                          id="password"
                          name="password"
                          value={data.password}
                          onChange={(e) => {
                            handleChange(e)
                            validate_password(e.target.value)
                          }}
                          autoComplete="off" />
                        {errors.password &&
                          <div className="error-msg">{errors.password}</div>
                        }
                      </div>

                      <div className="col-12" style={{ display: "flex", justifyContent: "space-between" }}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="rememberMe"
                            id="rememberMe"
                            value="1"
                            checked={checked}
                            onChange={handleRememberMe} />
                          <label className="form-check-label">Remember me</label>
                        </div>
                        <div>
                          <Link href="/forgot-password">Forgot password ?</Link>
                        </div>
                      </div>
                      <div className="col-12">
                        <SbButton data={{
                          type: "submit",
                          text: "Login",
                          class: "btn btn-primary w-100",
                          disabled: disablebutton,
                        }} />
                      </div>
                      <div className="col-12">
                        <p className="small mb-0">Don't have account? <Link href="/register">Create an account</Link></p>
                      </div>
                    </form>

                  </div>
                </div>


              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
export default Login
