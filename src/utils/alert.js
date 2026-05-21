import Swal from 'sweetalert2';

const constructToast = (timer) => {
  return Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: timer,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
};

const initialWarning = async () => {
  const result = await Swal.fire({
    title: 'Projeto em Construção',
    text: 'Algumas funcionalidades ainda não estão disponíveis, e erros podem ocorrer durante o uso.',
    icon: 'warning',
  });

  if (result.isConfirmed) {
    const Toast = constructToast(10000);

    Toast.fire({
      icon: 'warning',
      title: 'Só um instante, estamos preparando os produtos para você!',
    });
  }
};

const featUnavailable = () => {
  const Toast = constructToast(2000);

  Toast.fire({
    icon: 'warning',
    title: 'Funcionalidade ainda não disponível!',
  });
};

const toLogin = () => {
  Swal.fire({
    position: 'top',
    icon: 'warning',
    title: 'Por Favor, Faça login para continuar!',
    showConfirmButton: false,
    timer: 2000,
  });
};

const showError = (icon, title, text) => {
  Swal.fire({
    position: 'top',
    icon: icon,
    title: title,
    text: text,
    showConfirmButton: false,
    timer: 2800,
  });
};

const showErrorToast = (icon, title) => {
  const Toast = constructToast(3500);
  Toast.fire({
    icon: icon,
    title: title,
  });
};

const showSuccess = (title) => {
  Swal.fire({
    position: 'top',
    icon: 'success',
    title: title,
    showConfirmButton: false,
    timer: 1500,
  });
};

const showSuccessToast = (title) => {
  const Toast = constructToast(3500);
  Toast.fire({
    icon: 'success',
    title: title,
  });
};

const alert = {
  login: toLogin,
  initial: initialWarning,
  unavailable: featUnavailable,
  error: showError,
  errorToast: showErrorToast,
  success: showSuccess,
  successToast: showSuccessToast,
};

export default alert;
