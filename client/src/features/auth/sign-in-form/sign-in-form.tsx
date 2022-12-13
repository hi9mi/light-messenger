import { reflect } from '@effector/reflect';
import { useUnit } from 'effector-react';

import { Button, Heading, Input, InputProps } from '@lm-client/shared/ui';
import { checkError, failureMessage } from '@lm-client/shared/libs';
import * as model from './model';

export const SignInForm = () => {
  const submit = useUnit(model.formSubmitted);

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit();
  };

  return (
    <>
      <SignInFailureMessage />
      <form onSubmit={handleSubmitForm} className="mb-6 flex flex-col gap-y-40">
        <EmailField />
        <PasswordField />
        <SubmitButton />
      </form>
    </>
  );
};

const SignInFailureMessage = reflect({
  view: Heading,
  bind: {
    as: 'h2',
    size: 'md',
    children: model.$signInFailureMessage,
    className: 'text-red text-center mb-40 empty:hidden',
  },
});

const EmailField = reflect({
  view: Input,
  bind: {
    onChange: model.email.onValueChanged,
    value: model.email.$value,
    helperText: failureMessage(model.email.$errors),
    onBlur: model.email.touched,
    placeholder: 'Your email',
    inputMode: 'email',
    type: 'text',
    id: 'email',
    label: 'Email field',
    isInvalid: checkError(model.email.$errors, model.email.$isTouched),
    endAdornment: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-18 w-18"
      >
        <path
          strokeLinecap="round"
          d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
        />
      </svg>
    ),
    fullWidth: true,
  },
});

EmailField.displayName = 'EmailField';

const PasswordInput = ({
  togglePasswordField,
  type,
  ...inputProps
}: {
  togglePasswordField: () => void;
} & InputProps) => (
  <Input
    type={type}
    endAdornment={
      <button type="button" onClick={togglePasswordField}>
        {type === 'password' ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-18 w-18"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-18 w-18"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
        )}
      </button>
    }
    autoComplete="current-password"
    {...inputProps}
  />
);

const PasswordField = reflect({
  view: PasswordInput,
  bind: {
    value: model.password.$value,
    onChange: model.password.onValueChanged,
    helperText: failureMessage(model.password.$errors),
    onBlur: model.password.touched,
    isInvalid: checkError(model.password.$errors, model.password.$isTouched),
    placeholder: 'Your password',
    id: 'password',
    label: 'Password field',
    type: model.$passwordFieldType,
    inputMode: 'text',
    fullWidth: true,
    togglePasswordField: model.toggledPasswordField,
  },
});

PasswordField.displayName = 'PasswordField';

const SubmitButton = reflect({
  view: Button,
  bind: {
    color: 'blue',
    size: 'lg',
    type: 'submit',
    className: 'self-end',
    disabled: model.$disabledSubmitButton,
    children: 'Sign In',
  },
});

SubmitButton.displayName = 'SubmitButton';
