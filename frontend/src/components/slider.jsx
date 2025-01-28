import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pictureframe from './pictureframe'
import bg1 from '/images/jblearphone.png'
import bg2 from '/images/jblt450.png'
import bg3 from '/images/roggamingheadset.png'
import bg4 from '/images/jblspeaker.png'

function Slider() {
  return (
    <div style={{ backgroundColor: 'black', padding: '0px' }}>
    <Carousel>
      <Carousel.Item interval={1000}>
        <Pictureframe imageUrl={bg1} />
        <Carousel.Caption>
          <h3>Ear buds</h3>
          <p>THE LIVE 300TWS</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={400}>
        <Pictureframe imageUrl={bg2}  />
        <Carousel.Caption>
          <h3>Headphones </h3>
          <p>THE JBL T450</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Pictureframe imageUrl={bg3} />
        <Carousel.Caption>
          <h3>Gaming Headphones</h3>
          <p>
            THE ASUS ROG DELTA .
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
} 

export default Slider;