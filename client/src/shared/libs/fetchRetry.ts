type FetchRetryFilter = ((code: number) => boolean) | boolean;

type FetchRetryOptions = {
  delay?: number;
  tries?: number;
  fetchOptions?: RequestInit;
  filter?: FetchRetryFilter;
};

const wait = (delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

export const fetchRetry = async (
  url: string,
  { delay = 500, tries = 5, fetchOptions = {}, filter }: FetchRetryOptions
) => {
  async function onError(error: unknown): Promise<Response> {
    if (filter) {
      // @ts-ignore
      if (typeof filter === 'function' && !filter(error.code)) {
        throw error;
      }
      throw error;
    }

    const triesLeft = tries - 1;
    if (!triesLeft) {
      throw error;
    }
    if (delay !== 0) {
      await wait(delay);
    }
    return await fetchRetry(url, { delay, tries: triesLeft, fetchOptions });
  }

  try {
    return await fetch(url, fetchOptions);
  } catch (error) {
    return onError(error);
  }
};
