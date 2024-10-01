interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    // <div className="container mx-auto h-auto flex items-center justify-center mt-4 mb-32 px-28">
    //   <div>{children}</div>
    // </div>
    <div className="h-screen w-screen flex items-center justify-center px-28">
      <div className="w-full h-full">{children}</div>
    </div>
  );
};

export default PageLayout;
