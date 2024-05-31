import TextCarousel from '../../components/text-carousel/TextCarousel';
import carouselItems from '../../content/carouselItems';
import './AboutPhotos.scss';

function AboutPhotos() {
  return (
    <div>
      {carouselItems.map((items, key1) => (
        <div className="hover-effect" key={key1}>
          <TextCarousel carouselItems={items}/>
        </div>
      ))}
    </div>
  );
}

export default AboutPhotos;
