import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

export const toast = {
  success(message) {
    Toastify({
      text: message,
      duration: 3000,
      gravity: 'top',
      position: 'right',
      close: true,
      style: {
        background: '#28a745',
        color: '#fff',
        borderRadius: '8px',
      },
    }).showToast()
  },

  error(message) {
    Toastify({
      text: message,
      duration: 3000,
      gravity: 'top',
      position: 'right',
      close: true,
      style: {
        background: '#dc3545',
        color: '#fff',
        borderRadius: '8px',
      },
    }).showToast()
  },

  warning(message) {
    Toastify({
      text: message,
      duration: 3000,
      gravity: 'top',
      position: 'right',
      close: true,
      style: {
        background: '#ffc107',
        color: '#000',
        borderRadius: '8px',
      },
    }).showToast()
  },

  info(message) {
    Toastify({
      text: message,
      duration: 3000,
      gravity: 'top',
      position: 'right',
      close: true,
      style: {
        background: '#0dcaf0',
        color: '#000',
        borderRadius: '8px',
      },
    }).showToast()
  },
}
