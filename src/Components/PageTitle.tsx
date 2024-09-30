import './Components.css';
import PageTitle1 from '../Assets/Images/PageTitle1.png';
import PageTitle2 from '../Assets/Images/PageTitle2.png';

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <div className="flex justify-center items-center">
      <img src={PageTitle1} alt="Left" />
      <div className="label">
        <p className="text-wrapper">{title}</p>
      </div>
      <img src={PageTitle2} alt="Right" />
    </div>
  );
};

export default PageTitle;
