export function nameValidator(value) {
  if (value === '') {
    return 'name should not be empty';
  }
}

export function emailValidator(value) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value === '') {
    return 'email should not be empty';
  }
  if (!re.test(value)) {
    return 'invalid email address';
  }
}

export function passwordValidator(value) {
  if (value === '') {
    return 'password should not be empty';
  }
  if (value.length < 6) {
    return 'password must be atleast 6 characters';
  }
}
