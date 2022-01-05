import {useCallback, useEffect, useState} from 'react';

const useFieldUpdate = (
  initialValue,
  validator = value => {
    return false;
  },
  component,
) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');
  const changeHandler = useCallback(text => {
    setValue(text);
  }, []);

  // validator must return the message if its not valid
  useEffect(() => {
    let stateError = validator(value, component);
    setError(stateError);
  }, [value]);

  return {value, changeHandler, error};
};

export default useFieldUpdate;
