import type { FC } from 'react';

const Header: FC = () => {
  return (
    <header className="py-6">
      <div className="container mx-auto flex items-center justify-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8 text-primary"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a7 7 0 1 0 10 10" />
          <path d="M12 22a7 7 0 1 1-10-10" />
          <circle cx="12" cy="7" r="1.5" />
          <circle cx="12" cy="17" r="1.5" />
        </svg>
        <h1 className="font-headline text-4xl font-bold text-primary">
          面相財運
        </h1>
      </div>
      <p className="text-center text-muted-foreground mt-2">透過古老的面相學藝術探索您的命運。</p>
    </header>
  );
};

export default Header;
