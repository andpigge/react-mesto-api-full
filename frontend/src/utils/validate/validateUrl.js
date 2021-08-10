const checkUrlСorrect = (url) => {
  const passwordRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return passwordRegex.test(url);
};

const validateUrl = ({ url }) => {
  const isValidReg = checkUrlСorrect(url);

  const result = {
    isValidated: isValidReg,
    message: null,
    error: null
  };

  if (result.isValidated) {
    result.message = 'Успешно';
  } else if (!isValidReg) {
    result.error = 'Неверный URL адрес';
  }

  return result;
};

export default validateUrl;
