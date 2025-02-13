export const userSchema = {
  type: 'object',
  required: ['email', 'username', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    username: {
      type: 'string',
    },
    password: {
      type: 'string',
      format: 'password',
    },
  },
};

export const loginUserSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      format: 'password',
    },
  },
};
