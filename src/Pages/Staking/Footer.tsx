import PageLayout from '../../Components/PageLayout';
import PlaygroundTitle from '../../Assets/Images/PlaygroundTitle.png';

const Footer: React.FC = () => {
  const handleOnClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <>
      <div className="w-full h-[85.76px] justify-between items-center inline-flex pb-40 md:pb-32 lg:pb-28 px-2 md:px-6 lg:px-8">
        <img className="w-[80px] md:w-[100px] lg:w-[120px] xl:w-[140px] 2xl:w-[180px] h-auto" src={PlaygroundTitle} />
        <div className="flex-grow text-center text-[#a2845e] text-xs font-bold font-comic-sans-ms">
          (C)2024. MOONDOG. All Right Reserved.
        </div>
        <div className="w-[100px] md:w-[120px] lg:w-[150px] h-8 flex flex-row justify-between items-center">
          <div className="w-[20px] md:w-[30px] lg:w-[35px] h-8 cursor-pointer" onClick={() => handleOnClick('')}>
            <svg height="33" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="Icon/Home">
                <rect x="1.5" y="1.38086" width="31" height="31" stroke="#A2845E" />
                <path
                  id="Vector 142"
                  d="M32.0246 13.6459L16.6749 2.98535L1.77417 14.713C2.46066 14.713 2.87318 15.0079 3.78533 15.283C4.69749 15.5581 5.03561 15.3106 5.26334 15.8613C5.76217 17.0677 5.05222 26.9895 5.70427 30.4144H12.7846C12.7846 30.4144 12.7846 25.9858 12.7846 23.6992C12.7846 21.4127 13.4525 19.7549 13.4525 19.7549C15.8173 19.4287 21.029 19.4532 21.1268 20.2361C21.2247 21.0189 22.0956 26.3779 22.0548 30.4144H29.4661M32.0246 13.6459L33 14.3233H29.9231C29.9231 14.3233 29.9231 27.2132 30.5196 30.4144C28.1617 30.4144 29.4661 30.4144 29.4661 30.4144M32.0246 13.6459C31.0714 13.4201 29.0948 13.104 28.8139 13.6459C28.4627 14.3233 29.1149 25.4381 29.4661 30.4144"
                  stroke="#A2845E"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </svg>
          </div>
          <div className="w-[20px] md:w-[30px] lg:w-[35px] h-8 cursor-pointer" onClick={() => handleOnClick('')}>
            <svg height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="Icon/Paper plane">
                <rect x="1.5" y="1.38086" width="31" height="31" stroke="#A2845E" />
                <path
                  id="Vector 139"
                  d="M29.8247 4.87939C29.8247 10.0169 27.1146 28.8825 27.1146 28.8825L17.4018 20.4045M29.8247 4.87939L29.7501 6.7797L17.4018 20.4045M29.8247 4.87939C28.5999 5.28168 28.4348 5.32326 27.1138 5.75933M17.4018 20.4045C16.1785 23.8249 14.5996 27.54 12.3101 28.8825C10.9285 27.0693 10.454 21.1271 10.4899 17.8826M10.4899 17.8826L1.69678 14.9782C9.12147 12.3615 19.7806 8.17993 27.1138 5.75933M10.4899 17.8826L27.1138 5.75933"
                  stroke="#A2845E"
                  stroke-width="3"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </svg>
          </div>
          <div className="w-[20px] md:w-[30px] lg:w-[35px] h-8 cursor-pointer" onClick={() => handleOnClick('')}>
            <svg height="35" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="Icon/Twitter">
                <g id="Vector 322">
                  <path
                    d="M12.8411 2.39016C12.9741 2.26404 13.1271 2.1686 13.3013 2.10711C13.1475 2.19084 12.994 2.2854 12.8411 2.39016C10.1344 4.95633 15.6732 20.2209 18.0709 20.4815C18.8547 20.208 22.8937 19.158 21.4066 16.2703C19.5477 12.6608 20.6956 10.5278 24.7427 9.92625C26.2589 9.70087 26.9614 10.9742 27.6966 12.0946C27.9346 12.4572 32.0165 10.4185 32.1686 10.8447C32.2989 11.2096 28.5109 14.0334 28.577 14.4192C28.6514 14.8538 32.1774 14.6843 32.1686 15.1134C32.1617 15.4508 28.6362 16.3912 28.577 16.7064C28.4536 17.3627 28.2159 17.9531 27.86 18.4032C28.0788 19.8252 30.1576 25.5454 21.4066 31.2332C12.6556 36.9209 1.82727 29.2319 1.82727 29.2319C1.82727 29.2319 6.34199 28.8489 6.53531 27.7535C6.72862 26.658 2.4838 22.6691 2.4838 22.6691C4.92679 24.5832 15.6278 26.1176 10.2083 22.6691C3.96131 18.6941 8.10087 5.63849 12.8411 2.39016Z"
                    fill="#A2845E"
                  />
                  <path
                    d="M13.3013 2.10711C9.58236 3.41968 15.5554 20.2081 18.0709 20.4815C18.8547 20.208 22.8937 19.158 21.4066 16.2703C19.5477 12.6608 20.6956 10.5278 24.7427 9.92625C26.2589 9.70087 26.9614 10.9742 27.6966 12.0946C27.9346 12.4572 32.0165 10.4185 32.1686 10.8447C32.2989 11.2096 28.5109 14.0334 28.577 14.4192C28.6514 14.8538 32.1774 14.6843 32.1686 15.1134C32.1617 15.4508 28.6362 16.3912 28.577 16.7064C28.4536 17.3627 28.2159 17.9531 27.86 18.4032C28.0788 19.8252 30.1576 25.5454 21.4066 31.2332C12.6556 36.9209 1.82727 29.2319 1.82727 29.2319C1.82727 29.2319 6.34199 28.8489 6.53531 27.7535C6.72862 26.658 2.4838 22.6691 2.4838 22.6691C4.92679 24.5832 15.6278 26.1176 10.2083 22.6691C3.75984 18.5659 8.37868 4.78693 13.3013 2.10711Z"
                    stroke="#A2845E"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
