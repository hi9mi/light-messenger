import { vi } from 'vitest';
import * as model from './model';

describe('feature sign up', () => {
  beforeEach(() => {
    model.signUpForm.restored();
  });

  test('In the case of incorrect fields, do not submit sign up', () => {
    model.email.changed('invalid email');
    model.phoneNumber.changed('714231');
    model.username.changed('ai');
    model.password.changed('12345');

    expect(model.email.$isValid.getState()).toBeFalsy();
    expect(model.phoneNumber.$isValid.getState()).toBeFalsy();
    expect(model.username.$isValid.getState()).toBeFalsy();
    expect(model.password.$isValid.getState()).toBeFalsy();
    expect(model.signUpForm.$hasErrors.getState()).toBeTruthy();

    model.formSubmitted();
  });

  test('submitted the form if all fields are filled out successfully', () => {
    const signUpFxMock = vi.fn();

    model.signUpFx.use(signUpFxMock);

    model.username.changed('hi9mi');
    model.email.changed('hi9mi@gmail.com');
    model.phoneNumber.changed('+7 (777) 777 777');
    model.password.changed('superSecretPassword');

    expect(model.signUpForm.$value.getState()).toMatchObject({
      username: 'hi9mi',
      email: 'hi9mi@gmail.com',
      phoneNumber: '+7 (777) 777 777',
      password: 'superSecretPassword',
    });

    model.formSubmitted();

    expect(signUpFxMock).toBeCalledTimes(1);
  });
});
