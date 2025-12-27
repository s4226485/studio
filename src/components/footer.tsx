import type { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="py-6 mt-12">
      <div className="container mx-auto text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} 面相財運. 保留所有權利。</p>
        <p className="mt-1">免責聲明：此應用程式僅供娛樂。如需醫療建議，請諮詢專業人士。</p>
      </div>
    </footer>
  );
};

export default Footer;
