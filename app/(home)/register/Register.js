"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";

import Api from '@/app/_library/Api';
import validation from '@/app/_library/validation';

//=== import images ====
import logo from "@/app/assets/img/logo.png";
import SbButton from "@/app/_components/common/SbButton";

const Register = () => {

  const __data = {
    name: '',
    email: '',
    password: ''
  }
  const __errors = {
    name: '',
    email: '',
    password: ''
  }

  const [data, set_data] = useState(__data)
  const [disablebutton, set_disablebutton] = useState(false);
  const [success_message, set_success_message] = useState("")
  const [common_error, set_common_error] = useState("")
  const [errors, set_errors] = useState(__errors)

  const router = useRouter();

  useEffect(() => {

  }, [])

  const handleChange = (e) => {
    const field_name = e.target.name;
    const field_value = e.target.value;
    set_data({ ...data, [field_name]: field_value })
  }

  const validate_name = (value) => {
    let err = '';
    let name = value ?? data.name
    if (!name) {
      err = 'Name is required';
    }
    set_errors({
      ...errors,
      name: err
    });
    return err;
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

    let name = validate_name()
    if (name !== '') {
      errors.name = name;
      isValid = false;
    }

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
        const res = await Api.register({
          role_id: '686903a9cabda31330bc327f',
          name: data.name,
          email: data.email,
          password: data.password
        });

        console.log(res)

        if (res && (res.status === 200)) {
          set_data(__data)
          set_success_message(resData.message)
          //router.push("/");
        }
        else {
          const resData = res.data;
          const error = resData.error ?? ''
          const message = resData.message ?? ''
          set_common_error((error) ? error : message)
        }
        set_disablebutton(false)

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
                      <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                      <p className="text-center small">Enter your personal details to create account</p>
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
                    {success_message &&
                      <div className="alert alert-success alert-dismissible fade show">
                        {success_message}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => {
                          set_success_message('')
                        }}>
                          <span aria-hidden="true"></span>
                        </button>
                      </div>
                    }
                    <form className="row g-3" method="post" onSubmit={handleSubmit}>

                      <div className="col-12">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          id="name"
                          name="name"
                          value={data.name}
                          onChange={(e) => {
                            handleChange(e)
                            validate_name(e.target.value)
                          }}
                          autoComplete="off" />
                        {errors.name &&
                          <div className="error-msg">{errors.name}</div>
                        }
                      </div>

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


                      <div className="col-12">
                        <SbButton data={{
                          type: "submit",
                          text: "Create account",
                          class: "btn btn-primary w-100",
                          disabled: disablebutton,
                        }} />
                      </div>
                      <div className="col-12">
                        <p className="small mb-0">Already have an account? <Link href="/">Login</Link></p>
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
export default Register
