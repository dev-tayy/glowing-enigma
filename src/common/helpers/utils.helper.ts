import * as jwt from 'jsonwebtoken';

export function errorIfNull<T>(item: T | null, error_message?: string) {
  if (item === null || item === undefined || item === '') {
    throw new Error(error_message || 'Item is null or undefined');
  }
  return item;
}

export function verifyJWT(token: string, secret: string): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(decoded as string);
    });
  });
}

export async function generateJWT(
  data: { type: string },
  setup: {
    secret: string;
  },
): Promise<{}> {
  const { secret } = setup;

  return new Promise((resolve, reject) => {
    jwt.sign(
      data,
      secret,
      {
        expiresIn: 60 * 60 * 24 * 14,
        algorithm: 'HS256',
        issuer: 'unideals',
        audience: 'authenticated',
        subject: data.type,
      },
      (err, token) => {
        if (err) {
          return reject(err);
        }
        return resolve(token);
      },
    );
  });
}
