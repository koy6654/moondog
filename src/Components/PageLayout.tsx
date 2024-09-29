interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto h-screen flex items-center justify-center">
      <div className="w-[90%] h-[90%] bg-opacity-10 shadow-lg rounded-lg">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default PageLayout;
