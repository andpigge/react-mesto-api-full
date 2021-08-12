const checkUrlСorrect = (url) => {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(url);
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
