import { HeartIcon } from '@heroicons/react/24/solid';
import Slider from 'react-slick';
interface CarouselProps {
  days: string[];
}

const Carousel = (
  { days }: CarouselProps
) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false

  };

  return (
    <Slider {...settings} className='w-max'>
      {days.map(day => {
        return (
          <div className="flex-col w-[90px] h-[94px] bg-indigo-500 rounded-lg text-center" key={day}>
            <div className="px-3 py-3">
              <p className="text-white font-bold">{day.slice(0, 3)}</p>
              <p className='text-white font-light pb-1'>5 Feb</p>
              <div className='flex justify-center items-center gap-1 bg-white rounded-lg'>
                <p className='font-bold text-base text-indigo-800'>2</p><HeartIcon className="h-4 w-4 text-indigo-500" />
              </div>
            </div>
          </div>
        )
      }
      )}
    </Slider>
  );
};

export default Carousel;