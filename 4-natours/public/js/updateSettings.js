/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  console.log('Data to update:', data);
  try {
    const url =
      type === 'password'
        ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword'
        : 'http://127.0.0.1:3000/api/v1/users/updateMe';
    const res = await axios({
      method: 'PATCH',
      url,
      data
    });
    console.log('Response from server:', res);
    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} update successfully!`);
    }
  } catch (err) {
    console.error('Error:', err); // Log the error
    const message =
      err.response.data.message || 'An unexpected error occurred!';
    showAlert('error', err.response.data.message);
  }
};
