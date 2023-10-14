import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import "./Form.scss"

export interface IButtonProps {
    isPopUp?: boolean;
    closeForm?: () => void;
}
interface FormData {
    name: string;
    lastName: string;
    email: string;
    phone: string;
}

const validationSchema = yup.object().shape({
    name: yup.string().required('Имя обязательно'),
    lastName: yup.string().required('Фамилия обязательна'),
    email: yup.string().email('Введите действительный адрес электронной почты').required('Email обязателен'),
    phone: yup.string().matches(/^\d{10}$/, 'Введите действительный номер телефона (10 цифр)').required('Номер телефона обязателен'),
});

export const Form = ({isPopUp = false , closeForm = () => {}}: IButtonProps): JSX.Element => {
    const { control, handleSubmit, trigger, formState: { errors } } = useForm<FormData>({
        // @ts-ignore
        resolver: yupResolver(validationSchema),
        });
    const onSubmit = (data: FormData) => {

    };
  return (
      <div onClick={(e) => {
          if (e.target === e.currentTarget) {
              closeForm();
          }
      }} className={isPopUp ? "popUpForm" : ""}>
          <div className="landing__form">
              { isPopUp && <div className="close-button hover" onClick={closeForm}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M17 17L1 1M1 17L17 1L1 17Z" stroke="#443E3E"/>
                  </svg>
              </div>}
              <div className="landing__form-header">
                  Зарегистрируйся, чтобы начать зарабатывать!{" "}
              </div>
              <form className="landing__form-wrapper" onSubmit={handleSubmit(onSubmit)}>
                  <div className="landing__form-element">
                      <Controller
                          name="name"
                          control={control}
                          render={({ field }) => (
                              <input
                                  className="landing__form-input"
                                  placeholder="Имя"
                                  type="text"
                                  {...field}
                              />
                          )}
                      />
                      {errors.name && <p className="landing__form-error">{errors.name.message}</p>}
                  </div>
                  <div className="landing__form-element">
                      <Controller
                          name="lastName"
                          control={control}
                          render={({ field }) => (
                              <input
                                  placeholder="Фамилия"
                                  className="landing__form-input"
                                  type="text"
                                  {...field}
                              />
                          )}
                      />
                      {errors.lastName && <p className="landing__form-error">{errors.lastName.message}</p>}
                  </div>
                  <div className="landing__form-element">
                      <Controller
                          name="email"
                          control={control}
                          render={({ field }) => (
                              <input
                                  placeholder="Email"
                                  className="landing__form-input"
                                  type="text"
                                  {...field}
                              />
                          )}
                      />
                      {errors.email && <p className="landing__form-error">{errors.email.message}</p>}
                  </div>
                  <div className="landing__form-element">
                      <Controller
                          name="phone"
                          control={control}
                          render={({ field }) => (
                              <input
                                  placeholder="Номер телефона"
                                  className="landing__form-input"
                                  type="text" {...field}
                              />
                          )}
                      />
                      {errors.phone && <p className="landing__form-error">{errors.phone.message}</p>}
                  </div>
                  <button className="landing__form-button" type="submit">
                      <div className="landing__form-button-text">
                          Зарегистрироваться сейчас!{" "}
                      </div>
                  </button>
              </form>
          </div>

      </div>
  );
};
