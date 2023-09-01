import { toast } from "react-hot-toast";
import { authenticate } from './helper';
import profanity from 'leo-profanity';

// User Validation
export async function usernameValidate(values) {
    const errors = {};

    if (!values.username) {
        errors.username = toast.error('Username Required...!');
    } else if (values.username.includes(" ")) {
        errors.username = toast.error('Invalid Username...!');
    } else {
        const { status } = await authenticate(values.username);
        if (status !== 200) {
            errors.exist = toast.error('User does not exist...!');
        }
    }

    return errors;
}

// Password Validation
export const passwordValidation = async (values) => {
    const errors = {};
    if (!values.password) {
        errors.empty = toast.error('Form is Empty ....!');
    } else if (values.password.includes(' ')) {
        errors.blank = toast.error("Invalid Password ... !");
    } else if (values.password.length < 6) {
        errors.length = toast.error("Password should be at least 6 characters long");
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password)) {
        errors.special = toast.error("Password must contain at least one special character");
    }
    return errors;
}

// Reset validation
export const resetValidation = (values) => {

    const errors = {};

    if (!values.password) {
       errors.blank = toast.error("Password is required");
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password)) {
        errors.special =toast.error("Password must contain at least one special character");
    } else if (values.password !== values.confirm_password) {
        errors.notmatch =toast.error("Passwords do not match");
    }
    return errors;
};

// Registration Validation

export const registerValidation = (values) => {
    const errors = { };
    if (values.username.includes(' '))
    {
       errors.blank= toast.error("Username is Blank")
    } else if (values.email.includes(' '))
    {
        errors.blank =toast.error("Email is Blank")
    } else if (values.password.includes(' '))
    {
        errors.blank =toast.error("Password is Blank")
    } else if (values.secret_key.includes(' '))
    {
       errors.blank = toast.error("SecretKey is Blank")
    } else if (!values.username)
    {
        errors.blank =toast.error("Username is Blank")
    } else if (!values.email)
    {
        errors.blank = toast.error("Email is Blank")
    } else if (!values.password)
    {
       errors.blank = toast.error("Password is Blank")
    } else if (!values.secret_key)
    {
        errors.special =toast.error("SecretKey is Blank")
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password))
    {
        errors.key =toast.error("Password Should Contain Special Characters");
    } else if (values.password.length < 8)
    {
        errors.length =toast.error("Password Should Be of atleast 8 characters")
    }
    return errors
}

// Encrypting Validation

export const excryptValidation = (values) => {
  const errors = {};
   profanity.add(['b00b', 'b@@b', 'mc','bc' , 'fk','fuck','randi','rankle','chake','machuda','pussy','m@derchod','gandu','jhatu','asshole','makeakk','yourmom',' zavadeya','land','lavde','machuda','tatti','lulli','chake','bhosdike','bhadwa','bhosdiwala','jhaatu','bhen ke lovde','zavadeya','madarchot','bsdk','bkl']);
  if (values.plainText) {
    if (profanity.check(values.plainText)) {
        errors.plainText = toast.error("Your message contains offensive words.");
    }
  }

  return errors;
};
