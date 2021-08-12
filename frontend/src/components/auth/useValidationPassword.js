import { useState } from 'react';

const useValidationPassword = (e) => {
  const [ isValidPassword, setIsValidPassword ] = useState(false);
  const [ messageInputPassword, setMessageInputPassword ] = useState({
    isValidated: false,
    message: null,
    error: null
  });

  const password = e.target.value;

  const objectInput = validateString({ password });

  setIsValidPassword(objectInput.isValidated);
  setMessageInputPassword(objectInput);

  return {
    
  };
};

export default useValidationPassword;
