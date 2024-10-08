interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-full flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28">
      {children}
    </div>
  );
};

export default PageLayout;
