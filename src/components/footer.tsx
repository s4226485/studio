import type { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="py-6 mt-12">
      <div className="container mx-auto text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Face Fortune. All rights reserved.</p>
        <p className="mt-1">Disclaimer: This app is for entertainment purposes only. For medical advice, please consult a professional.</p>
      </div>
    </footer>
  );
};

export default Footer;
