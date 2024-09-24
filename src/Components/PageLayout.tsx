interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto h-screen flex items-center justify-center">
      <div className="w-[90%] h-[90%] bg-white shadow-lg rounded-lg">{children}</div>
    </div>
  );
};

export default PageLayout;
