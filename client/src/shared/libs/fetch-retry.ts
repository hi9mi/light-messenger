type RetryOn = {
  url: string;
  statusCode: number;
  fetchOptions?: RequestInit;
};

type FetchRetryOptions = {
  delay?: number;
  tries?: number;
  fetchOptions?: RequestInit;
  retryOn?: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isRetryOnObject = (r: any): r is RetryOn => {
  return r.url !== undefined && r.statusCode !== undefined;
};

const wait = (delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

export const fetchRetry = async (
  url: string,
  { delay = 500, tries = 5, fetchOptions = {}, retryOn }: FetchRetryOptions
): Promise<Response> => {
  const onError = async (error: unknown) => {
    const triesLeft = tries - 1;

    if (!triesLeft) {
      throw error;
    }
    if (delay !== 0) {
      await wait(delay);
    }
    return fetchRetry(url, { delay, tries: triesLeft, fetchOptions });
  };

  try {
    const response = await fetch(url, fetchOptions);

    if (typeof retryOn === 'number' && retryOn === response.status) {
      const triesLeft = tries - 1;

      if (delay !== 0) {
        await wait(delay);
      }

      if (!triesLeft) {
        throw new Error('tries left');
      }

      return fetchRetry(url, {
        delay,
        tries: triesLeft,
        fetchOptions,
        retryOn,
      });
    }

    if (isRetryOnObject(retryOn) && retryOn.statusCode === response.status) {
      const triesLeft = tries - 1;

      if (delay !== 0) {
        await wait(delay);
      }

      if (!triesLeft) {
        throw new Error('tries left');
      }

      return fetchRetry(retryOn.url, {
        delay,
        tries: triesLeft,
        retryOn: retryOn,
        fetchOptions: retryOn.fetchOptions,
      });
    }

    return response;
  } catch (error) {
    return onError(error);
  }
};
