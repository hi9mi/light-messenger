import { FromSchema } from 'json-schema-to-ts';

export const signUpBodySchema = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string' },
    phoneNumber: { type: 'string' },
    email: { type: 'string', format: 'email' },
  },
  required: ['username', 'password', 'phoneNumber', 'email'],
  additionalProperties: false,
} as const;

export const signInBodySchema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string' },
  },
  required: ['email', 'password'],
  additionalProperties: false,
} as const;

export const signUpReplySchema = {
  201: {
    type: 'object',
    properties: {
      user: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          username: { type: 'string' },
          email: { type: 'string' },
          phoneNumber: { type: 'string' },
        },
      },
      token: { type: 'string' },
    },
  },
};

export const signInReplySchema = {
  200: {
    type: 'object',
    properties: {
      user: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          username: { type: 'string' },
          email: { type: 'string' },
          phoneNumber: { type: 'string' },
        },
      },
      token: { type: 'string' },
    },
  },
};

export type SignUpBody = FromSchema<typeof signUpBodySchema>;
export type SignInBody = FromSchema<typeof signInBodySchema>;
