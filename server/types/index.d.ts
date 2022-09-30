import type {
  SignPayloadType,
  FastifyJwtSignOptions,
  SignerCallback,
  SignOptions,
} from 'fastify';
import type {
  VerifyPayloadType,
  VerifierCallback,
  FastifyJwtVerifyOptions,
  FastifyJwtDecodeOptions,
} from '@fastify/jwt';
import type { Logger } from 'pino';
import type { PrismaClient } from '@prisma/client';

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PORT: string;
      HOST: string;
      CLIENT_BASE_URL: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
      REFRESH_TOKEN_EXPIRES_IN: string;
      ACCESS_TOKEN_EXPIRES_IN: string;
    };
    prisma: PrismaClient;
    authenticate: (request: FastifyRequest) => void;
    refresh: (request: FastifyRequest) => void;
  }

  type FastifyBaseLogger = Logger;

  interface FastifyRequest {
    userId: number;

    authJwtVerify<Decoded extends VerifyPayloadType>(
      options?: FastifyJwtVerifyOptions,
    ): Promise<Decoded>;
    authJwtVerify<Decoded extends VerifyPayloadType>(
      callback: VerifierCallback,
    ): void;
    authJwtVerify<Decoded extends VerifyPayloadType>(
      options: FastifyJwtVerifyOptions,
      callback: VerifierCallback,
    ): void;
    authJwtVerify<Decoded extends VerifyPayloadType>(
      options?: Partial<VerifyOptions>,
    ): Promise<Decoded>;
    authJwtVerify<Decoded extends VerifyPayloadType>(
      options: Partial<VerifyOptions>,
      callback: VerifierCallback,
    ): void;
    authJwtDecode<Decoded extends DecodePayloadType>(
      options?: FastifyJwtDecodeOptions,
    ): Promise<Decoded>;
    authJwtDecode<Decoded extends DecodePayloadType>(
      callback: DecodeCallback<Decoded>,
    ): void;
    authJwtDecode<Decoded extends DecodePayloadType>(
      options: FastifyJwtDecodeOptions,
      callback: DecodeCallback<Decoded>,
    ): void;

    refreshJwtVerify<Decoded extends VerifyPayloadType>(
      options?: FastifyJwtVerifyOptions,
    ): Promise<Decoded>;
    // refreshJwtVerify<Decoded extends VerifyPayloadType>(
    //   callback: VerifierCallback,
    // ): void;
    refreshJwtVerify<Decoded extends VerifyPayloadType>(
      options: FastifyJwtVerifyOptions,
      callback: VerifierCallback,
    ): void;
    refreshJwtVerify<Decoded extends VerifyPayloadType>(
      options?: Partial<VerifyOptions>,
    ): Promise<Decoded>;
    refreshJwtVerify<Decoded extends VerifyPayloadType>(
      options: Partial<VerifyOptions>,
      callback: VerifierCallback,
    ): void;
    refreshJwtDecode<Decoded extends DecodePayloadType>(
      options?: FastifyJwtDecodeOptions,
    ): Promise<Decoded>;
    refreshJwtDecode<Decoded extends DecodePayloadType>(
      callback: DecodeCallback<Decoded>,
    ): void;
    refreshJwtDecode<Decoded extends DecodePayloadType>(
      options: FastifyJwtDecodeOptions,
      callback: DecodeCallback<Decoded>,
    ): void;
  }

  interface FastifyReply {
    authJwtSign(
      payload: SignPayloadType,
      options?: FastifyJwtSignOptions,
    ): Promise<string>;
    authJwtSign(payload: SignPayloadType, callback: SignerCallback): void;
    authJwtSign(
      payload: SignPayloadType,
      options: FastifyJwtSignOptions,
      callback: SignerCallback,
    ): void;
    authJwtSign(
      payload: SignPayloadType,
      options?: Partial<SignOptions>,
    ): Promise<string>;
    authJwtSign(
      payload: SignPayloadType,
      options: Partial<SignOptions>,
      callback: SignerCallback,
    ): void;

    refreshJwtSign(
      payload: SignPayloadType,
      options?: FastifyJwtSignOptions,
    ): Promise<string>;
    refreshJwtSign(payload: SignPayloadType, callback: SignerCallback): void;
    refreshJwtSign(
      payload: SignPayloadType,
      options: FastifyJwtSignOptions,
      callback: SignerCallback,
    ): void;
    refreshJwtSign(
      payload: SignPayloadType,
      options?: Partial<SignOptions>,
    ): Promise<string>;
    refreshJwtSign(
      payload: SignPayloadType,
      options: Partial<SignOptions>,
      callback: SignerCallback,
    ): void;
  }
}
