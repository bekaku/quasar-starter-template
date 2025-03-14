import { useLang } from './useLang';
import { validateEmail, isNumber, validateUsername } from '@/utils/appUtil';

export const useValidation = () => {
  const { t } = useLang();
  const rePwdStrong = /^(?=.*[A-Z])(?=.*\d)[A-Z\d]{8,}$/i;

  const required = (val: any) =>
    (val && val.length > 0) || t('error.validateRequireField');
  const requiredSelect = (val: any) =>
    !!val || t('error.validateRequireChoose');

  const requiredNumber = (val: string) =>
    isNumber(val) || t('error.validateNumber');

  const requiredPositiveNumber = (val: string) =>
    (isNumber(val) && Number.parseInt(val) > 0) || t('error.validatePositiveNumber');

  const requiredNotMinusNumber = (val: string) =>
    (isNumber(val) && Number.parseInt(val) >= 0) || t('error.validateMinusNumber');

  const requiredNotMinusNumberOrFloat = (val: string) =>
    (isNumber(val) && (Number.parseInt(val) || Number.parseFloat(val)) >= 0) || t('error.validateMinusNumber');

  const requiredPositiveFloatNumber = (val: string) =>
    (isNumber(val) && Number.parseFloat(val) > 0) || t('error.validatePositiveNumber');

  const requiredNotMinusFloatNumber = (val: string) =>
    (isNumber(val) && Number.parseFloat(val) >= 0) || t('error.validateMinusNumber');

  const requireField = (val: string, fieldName: string) =>
    (val && val.length > 0) || t('error.validateRequire', [fieldName]);

  const requireEmail = (val: any) =>
    (val && val.length > 0 && validateEmail(val) != null) ||
    t('error.emailValidate');

  const requireUsername = (val: any) =>
    !val
      ? true
      : (val && val.length > 0 && validateUsername(val) != null) ||
      t('error.usernameValidate');

  const validateMax = (val: string, max: number, fieldName: string) =>
    val.length <= max || t('error.validateMax', [fieldName, max]);

  const validateMaxValue = (val: number, max: number, fieldName: string) =>
    (val > 0 && val <= max) || t('error.validateMaxValue', [fieldName, max]);

  const validateMinValue = (val: number, min: number, fieldName: string) =>
    val >= min || t('error.validateMinValue', [fieldName, min]);

  const validateMinMaxValue = (val: any, min: number, max: number, fieldName: string) => {
    if (val == undefined) {
      return true;
    }
    const minState = validateMinValue(val, min, fieldName);
    if (minState != true) {
      return minState;
    }
    return validateMaxValue(val, max, fieldName);
  }

  const validatePasswordStrong = (pwd: string) => rePwdStrong.test(pwd);
  const validatePercentage = (val: number) => (val && val >= 0 && val <= 100) || t('error.percentageValueWrong');

  const validatePasswordStrongV2 = (password: string) => {
    // Initialize variables
    let strength = 0;
    let tips = '';

    // Check password length
    if (password.length < 8) {
      tips += 'Make the password longer. ';
    } else {
      strength += 1;
    }

    // Check for mixed case
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
      strength += 1;
    } else {
      tips += 'Use both lowercase and uppercase letters. ';
    }

    // Check for numbers
    if (password.match(/\d/)) {
      strength += 1;
    } else {
      tips += 'Include at least one number. ';
    }

    // Check for special characters
    if (password.match(/[^a-z\d]/i)) {
      strength += 1;
    } else {
      // eslint-disable-next-line unused-imports/no-unused-vars
      tips += 'Include at least one special character. ';
    }

    return strength > 2;
    // Return results
    // if (strength < 2) {
    //   // return 'Easy to guess. ' + tips;
    //   return false;
    // } else if (strength === 2) {
    //   // return 'Medium difficulty. ' + tips;
    //   return true;
    // } else if (strength === 3) {
    //   // return 'Difficult. ' + tips;
    //   return true;
    // } else {
    //   // return 'Extremely difficult. ' + tips;
    //   return true;
    // }
  };
  return {
    required,
    requiredSelect,
    requireField,
    requireEmail,
    validateMax,
    validateMaxValue,
    validateMinMaxValue,
    validatePasswordStrong,
    validateMinValue,
    requiredNumber,
    requiredPositiveNumber,
    requiredPositiveFloatNumber,
    requireUsername,
    validatePasswordStrongV2,
    validatePercentage,
    requiredNotMinusNumber,
    requiredNotMinusFloatNumber,
    requiredNotMinusNumberOrFloat,
  };
};
