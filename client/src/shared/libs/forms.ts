import { createField } from 'composable-forms';
import { combine, createEvent, createStore } from 'effector';
import type { Store } from 'effector';
import type { Schema, ValidationErrorItem } from 'joi';

export const createControl = <T>(config: {
  initialValue: T;
  schema?: Schema<unknown>;
}) => {
  const changed = createEvent<T>();
  const touched = createEvent<unknown>();

  const onValueChanged = createEvent<React.ChangeEvent<HTMLInputElement>>();

  const field = createField<T>({
    schema: config.schema,
    initialValue: config.initialValue,
  });

  const $isTouched = createStore(false)
    .on(touched, () => true)
    .reset(field.restored);

  field.$value.on(changed, (_, value) => value);

  if (typeof config.initialValue === 'string') {
    //@ts-expect-error
    field.$value.on(onValueChanged, (_, evt) => evt.target.value);
  }

  return {
    changed,
    touched,
    ...field,
    onValueChanged,
    $isTouched,
  };
};

export const failureMessage = (errors: Store<ValidationErrorItem[]>) => {
  return errors.map((failures) =>
    failures.map((error) => error.message).join('')
  );
};

export const checkError = (
  errors: Store<ValidationErrorItem[]>,
  touched: Store<boolean>
) => {
  return combine([errors, touched], ([errors, touched]) => {
    if (!touched) return false;
    if (!errors.length) return false;
    return true;
  });
};
