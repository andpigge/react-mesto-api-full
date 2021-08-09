// Шаблон валидации
const checkMinLengthInput = (string, minLength) => {
  return string.length > minLength ? true : false;
};

const checkMaxLengthInput = (string, maxLength) => {
  return string.length < maxLength ? true : false;
};

// Проверяет все ли символы латинские или кириллические
const checkInputСorrect = (string) => {
  const stringRegex = /^[\w]+\s?[\w]+$/;
  const stringRegexRus = /^[а-яё\d]+\s?[а-яё\d\s?]+$/gi;
  // const spaceRegex = /\s/;
  return (stringRegex.test(string) || stringRegexRus.test(string)) /* && spaceRegex.test(string) */;
  /* \s */
};

const validateString = ({ string, minLength, maxLength }) => {
  const isValidMinLength = checkMinLengthInput(string, minLength);
  const isValidMaxLength = checkMaxLengthInput(string, maxLength);
  const isValidCorrect = checkInputСorrect(string);

  const result = {
    isValidated: isValidMinLength && isValidCorrect && isValidMaxLength,
    message: null,
    error: null
  };

  if (result.isValidated) {
    result.message = 'Успешно';
  } else if (!isValidMinLength) {
    result.error = 'Длина должна быть больше 1 символа';
  } else if (!isValidCorrect) {
    result.error = 'Символы должны быть латинскими или кириллическими включая числа';
  } else if (!isValidMaxLength) {
    result.error = 'Длина не должна привышать 30 символов';
  }

  return result;
};

export default validateString;
