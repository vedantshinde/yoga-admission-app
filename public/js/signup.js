/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';

export function validatePassword() {
  const password_signup = document.getElementById('passwordSignup');
  const confirm_password_signup = document.getElementById(
    'passwordConfirmSignup'
  );
  if (password_signup.value != confirm_password_signup.value) {
    confirm_password_signup.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password_signup.setCustomValidity('');
  }
}

export const signup = async (
  name,
  email,
  password,
  passwordConfirm,
  role,
  photo,
  batch_id
) => {
  try {

    console.log(`bid: ${batch_id}`)

    // Set Start time & End Time
    var start_time = '6:00AM';
    var end_time = '7:00AM';

    switch(batch_id) {
      case '2':
          start_time = '7:00AM';
          end_time = '8:00AM';
          break;
      case '3':
          start_time = '8:00AM';
          end_time = '9:00AM'
          break;
      case '4':
          start_time = '5:00PM';
          end_time = '6:00PM'
          break;
      default:
          start_time = '6:00AM';
          end_time = '7:00AM';
  }

    const result = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
        role,
        photo,
      },
    });

    const user_id = result.data.data.user._id;

    await axios({
      method: 'POST',
      url: '/api/v1/batches/',
      data: {
        user: user_id,
        start_time,
        end_time,
      }
    })
    
    if (result.data.status === 'success') {
      showAlert('success', 'Account Created Successfully');

      window.setTimeout(() => {
        location.assign('/me');
      }, 500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
