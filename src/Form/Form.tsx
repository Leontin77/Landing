import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import "./Form.scss"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber  } from 'react-phone-number-input';
import logo from '../images/logo.png'
import axios from 'axios';

export interface IButtonProps {
    isPopUp?: boolean;
    closeForm?: () => void;
}

declare global {
    interface Window {
      fbq?: (eventType: string, eventName: string) => void,
    }
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
    phone: yup.string()
    .test('is-valid-phone', 'Введите действительный номер телефона', value => {
        if (value) {
            return isValidPhoneNumber(value);
        }
        return true;
    })
    .required('Номер телефона обязателен')
});

export const Form = ({isPopUp = false , closeForm = () => {}}: IButtonProps): JSX.Element => {
    const { control, handleSubmit, trigger, formState: { errors } } = useForm<FormData>({
        // @ts-ignore
        resolver: yupResolver(validationSchema),
    });
    const [step, setStep] = useState(1);

    let IPData: any = JSON.parse(localStorage?.getItem('IPData'))

    const onSubmit = (data: FormData) => {
        // e.preventDefault()
        console.log('#####', data)
        const message = `Новая заявка со страницы: ${window.location.href}\n\n` +
          "NEW FORM TEST Данные формы: \n" +
          "IP: " + IPData.usersIP + ' ' + IPData.usersCountry + ' ' + IPData.usersCity + "\n" +
          `Имя Фамилия: ${data.name + ' ' + data.lastName}\n` +
          `Email: ${data.email}\n` +
          `Телефон: ${data.phone}\n`
    
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', message);
        if (localStorage?.getItem('Id')) {
            window.fbq('init', localStorage?.getItem('Id'));    
            window.fbq('track', 'Lead');
        }

    //         axios.post("https://api.telegram.org/bot6312131562:AAErXlBgmHzS8fZVrhG6bq_U4_eA3a59VZc/sendMessage", {
    //   chat_id: "-1001647056777",
    //   text: message
    // })
    //   .then((response: any) => {
    //     if (localStorage.getItem('Id')) {
    //             window.fbq('init', localStorage?.getItem('Id'));    
    //             window.fbq('track', 'Lead');
            
    //       console.log('2222222222');
    //     //   window.location.href = window.location.href.replace(/[^/]*$/, `thankyou.html?id=${localStorage.getItem('Id')}`);
    //     } else {
    //       console.log('33333333333');
    //     //   window.location.href = window.location.href.replace(/[^/]*$/, 'thankyou.html');
    //     }
    //   })
    //   .catch((error: any) => console.error(error));


        setStep(2)
    };
  return (
      <div onClick={(e) => {
          if (e.target === e.currentTarget) {
              closeForm();
          }
      }} className={isPopUp ? "popUpForm" : ""}>
          <div className={`landing__form ${step === 2 && 'thankYou'}`}>
              { isPopUp && <div className="close-button hover" onClick={closeForm}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M17 17L1 1M1 17L17 1L1 17Z" stroke="#443E3E"/>
                  </svg>
              </div>}
              {step === 2 && <img src={logo} alt="" /> }
             
              {step === 1 && <div className="landing__form-header">
                  Зарегистрируйся, чтобы начать зарабатывать!
              </div>}
              {step === 2 && <span className="landing__form-header thankYou">
                Спасибо за регистрацию!
                <br />
                <br />
                Наши специалисты свяжутся с вами в ближайшее время!
              </span>}
              {step === 1 &&
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
                                  id='name'
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
                                  id='lastName'
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
                                  id='email'
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
          render={({ field: { onChange, value } }) => (
            <PhoneInput
            defaultCountry={IPData?.countryCode || 'PL'}
              placeholder="Enter phone number"
              value={IPData.phoneCode}
              onChange={onChange}
              className="landing__form-input"
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
              </form>}
             
          </div>

      </div>
  );
};
