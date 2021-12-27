export function nameValidator(value, ...rest) {
  if (value === '') {
    return 'name should not be empty';
  }
}

export function emailValidator(value, ...rest) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value === '') {
    return 'email should not be empty';
  }
  if (!re.test(value)) {
    return 'invalid email address';
  }
}

export function passwordValidator(value, ...rest) {
  const smallLetters = /[a-z]/g;
  const capitalLetters = /[A-z]/g;
  const numerical = /[0-9]/g;
  const symbol = /[^a-zA-Z\d]/g;
  if (value === '') {
    return 'password should not be empty';
  }
  if (rest[0] === 'login') {
    if (value.length <= 6) {
      return 'password must be atleast 6 characters';
    }
  } else {
    if (
      !smallLetters.test(value) ||
      !capitalLetters.test(value) ||
      !numerical.test(value) ||
      !symbol.test(value) ||
      value.length <= 6
    ) {
      return 'invalid password';
    }
  }
}

export function URLValidator(string) {
  var res = string.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
  );
  if (!res) {
    return 'Not valid URL';
  }
}

export function emptyValidator(value) {
  if (value === '') {
    return 'name should not be empty';
  }
}

export function numberValidator(value) {
  const number = /^[0-9]+$/;

  if (!number.test(value)) {
    return 'episodes must be a number';
  }
}
