import './index.css';

import { useRef } from 'react';
import { Input } from '@lm-client/shared/ui';
import { Button } from '@lm-client/shared/ui/button';

export const App = () => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="p-40">
        <Input
          ref={ref}
          label="Welcome to the App!!"
          placeholder="Welcome to the App!!"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-18 w-18"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
              />
            </svg>
          }
          error="Welcome to the App!!"
        />
        <div className="flex flex-col gap-y-20">
          <Button className="max-w-max" disabled>
            Welcome to the App!
          </Button>
          <Button variant="outlined" disabled>
            Welcome to the App!
          </Button>
          <Button variant="dangerous" disabled>
            Welcome to the App!
          </Button>
        </div>
        <h1 className="text-xl font-bold mb-40 first-letter:text-black-500">
          Welcome to the App!
        </h1>
        <p className="mb-5 text-14 text-blue-100 ">Welcome to the App!</p>
        <p className="mb-10 text-16 text-blue-200">Welcome to the App!</p>
        <p className="mb-13 text-18 text-blue-300">Welcome to the App!</p>
        <p className="mb-15 text-30 text-blue-400">Welcome to the App!</p>
        <p className="mb-30 text-35 text-blue-500">Welcome to the App!</p>
      </div>
    </>
  );
};
