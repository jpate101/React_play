import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const setMessage = (type, message) => {
    let cssProps = {
        position: 'bottom-center',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        hideProgressBar: true,
        style: {
          background: '#438ac1',
          color: '#ffffff',
          minHeight: 'unset'
        }
    };

    switch (type) {
        case 'info':
            toast.info(message, cssProps)
            return
        case 'success':
            toast.info(message, cssProps)
            return
        case 'warning':
            toast.warning(message, cssProps)
            return
        case 'err':
            toast.error(message, cssProps)
            break
        default:
            break
    }

}