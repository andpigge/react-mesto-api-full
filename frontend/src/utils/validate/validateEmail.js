const checkEmailCorrect = (email) => {
  const emailRegex = /^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+@[a-z]+\.[a-z]+$/;
  return emailRegex.test(email);
};

const validateEmail = ({ email }) => {
  const isValidReg = checkEmailCorrect(email);

  const result = {
    isValidated: isValidReg,
    message: null,
    error: null
  };

  if (result.isValidated) {
    result.message = 'Успешно';
  } else if (!isValidReg) {
    result.error = 'Некорректный Email адрес';
  }

  return result;
};

export default validateEmail;
