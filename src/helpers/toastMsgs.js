import { Bounce, toast } from "react-toastify";

export const alertMessage = (message, type) => {
    return toast(message, {
        type: type,
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
}
