import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ErrorMessage = ({ errMsg, setErrMsg }) => {
    useEffect(() => {
        if (errMsg) {
            // Show an error notification using react-toastify
            toast.error(errMsg, { autoClose: 5000 });

            // Clear the error message
            setErrMsg('');
        }
    }, [errMsg, setErrMsg]);

    return (
        <ToastContainer position="top-right" />
    );
};

ErrorMessage.propTypes = {
    errMsg: PropTypes.string.isRequired,
    setErrMsg: PropTypes.func.isRequired,
};

export default ErrorMessage;
