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
});
