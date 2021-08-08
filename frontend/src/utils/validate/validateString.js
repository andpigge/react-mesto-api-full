// Шаблон валидации
const checkMinLengthInput = (string, minLength) => {
  return string.length > minLength ? true : false;
};

// Проверяет все ли символы латинские или кириллические
const checkInputСorrect = (string) => {
  const stringRegex = /^\w+$/gi;
  const stringRegexRus = /^[а-я]+$/gi;
  return stringRegex.test(string) || stringRegexRus.test(string);
};

const validateString = (string, minLength) => {
  const isValidMinLength = checkMinLengthInput(string, minLength);
  const isValidCorrect = checkInputСorrect(string);
  console.log(isValidCorrect)

  const result = {
    isValidated: isValidMinLength && isValidCorrect,
    message: null,
    error: null
  };

  if (isValidMinLength && isValidCorrect) {
    result.message = 'Успешно';
  } else if (!isValidMinLength) {
    result.error = 'Длина должна быть больше 2 символов';
  } else if (!isValidCorrect) {
    result.error = 'Символы должны быть латинскими или кириллическими';
  }

  return result;
};

export default validateString;
