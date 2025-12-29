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
          className="h-8 w-8 text-primary"
        >
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" fill="currentColor"/>
          <path d="M12 4a8 8 0 1 1 0 16 4 4 0 0 0 0-8 4 4 0 0 1 0-8z" fill="white"/>
          <circle cx="12" cy="7" r="1.5" fill="currentColor" />
          <circle cx="12" cy="17" r="1.5" fill="white" />
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
