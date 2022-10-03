import { FromSchema } from 'json-schema-to-ts';

const userResponseWithToken = {
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
};

const signUpBodySchema = {
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

export const signUpSchema = {
  body: signUpBodySchema,
  response: {
    201: {
      type: 'object',
      properties: userResponseWithToken,
    },
    403: {
      type: 'object',
      properties: {
        statusCode: { type: 'number' },
        error: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
};

export const signInBodySchema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string' },
  },
  required: ['email', 'password'],
  additionalProperties: false,
} as const;

export const signInSchema = {
  body: signInBodySchema,
  response: {
    200: {
      type: 'object',
      properties: userResponseWithToken,
    },
    400: {
      type: 'object',
      properties: {
        statusCode: { type: 'number' },
        error: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
};

export const refreshTokenSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        token: { type: 'string' },
      },
    },
    401: {
      type: 'object',
      properties: {
        statusCode: { type: 'number' },
        code: { type: 'string' },
        error: { type: 'string' },
        message: { type: 'string' },
      },
    },
    403: {
      type: 'object',
      properties: {
        statusCode: { type: 'number' },
        error: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
};

export const logoutSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    401: {
      type: 'object',
      properties: {
        statusCode: { type: 'number' },
        code: { type: 'string' },
        error: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
};

export type SignUpBody = FromSchema<typeof signUpBodySchema>;
export type SignInBody = FromSchema<typeof signInBodySchema>;
