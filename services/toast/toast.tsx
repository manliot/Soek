import toast from "react-hot-toast";
import { Toast } from "react-hot-toast";

const initialOptions: Partial<Pick<Toast, "id" | "icon" | "duration" | "ariaProps" | "className" | "style" | "position" | "iconTheme">> = {
  duration: 3000,
  position: 'top-center',
}

export const toastMessage = (
  type: 'success' | 'error' | 'info',
  message: string,
  extra_options?: Partial<Pick<Toast, "id" | "icon" | "duration" | "ariaProps" | "className" | "style" | "position" | "iconTheme">>
) => {
  const options = Object.assign({}, initialOptions, extra_options);
  if (type === 'success')
    return toast.success(message, options)
  if (type === 'error')
    return toast.error(message, options)
  if (type === 'info')
    return toast(message, options)
};

export const toastLoading = (
  promise: Promise<any>,
  loadingMsg: string = 'Cargando...',
  successMsg: string = `Listo!`,
  errorMsg: string = 'ocurrió un error, intenta de nuevo.'
) => {
  return toast.promise(promise, {
    loading: loadingMsg,
    success: (res) => successMsg,
    error: (err) => errorMsg
  })
}
