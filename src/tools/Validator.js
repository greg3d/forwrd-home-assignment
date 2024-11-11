// custom validator class
class Validator {

  _rules = new Map();

  add(fieldName, validatorFunction) {
    if (this._rules.has(fieldName)) throw new Error('Field name ' + fieldName + ' already exists');
    this._rules.set(fieldName, validatorFunction);
    return this;
  }

  validate(fieldName, value) {
    if (!this._rules.has(fieldName)) return {
      type: 'no_validator',
      message: 'Field ' + fieldName + ' has no validator',
    };

    if (value === undefined || value === null || !value.trim()) return {
      type: 'empty',
      message: 'Field ' + fieldName + ' is empty',
    };

    if (!this._rules.get(fieldName)(value)) return {
      type: 'invalid',
      message: 'Field ' + fieldName + ' is invalid',
    };
    return { type: 'valid', message: 'Field ' + fieldName + ' is valid' };
  }
}

// adding validation rules
const validator = new Validator();
validator
  .add('country', (value) => /^[A-Za-z\s]+$/.test(value))
  .add('name', (value) => /^[A-Za-z\s]+$/.test(value))
  .add('phone', (value) => /^[+][0-9-()]+$/.test(value))
  .add('email', (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));

export default validator;