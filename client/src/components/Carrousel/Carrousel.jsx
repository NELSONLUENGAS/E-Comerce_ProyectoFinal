import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Carrousel.css';



const items = [
  
  {
    src: 'https://http2.mlstatic.com/D_NQ_943534-MLA49357104694_032022-OO.webp',
    className: 'adaptar',
    altText: 'Slide 1',
    caption: ' ',
    link:'https://us.vaio.com/'
    
    
  },
  {
    src: 'https://http2.mlstatic.com/D_NQ_977635-MLA49448974486_032022-OO.webp',
    className: 'adaptar',
    altText: 'Slide 2',
    caption: ' ',
    link:'http://localhost:3000/'
    
  },
  {
    src: 'https://http2.mlstatic.com/D_NQ_722488-MLA49531513472_032022-OO.webp',
    className: 'adaptar',
    altText: 'Slide 3',
    caption: ' ',
    link:'http://localhost:3000/'
    
  },
  {
    src: 'https://i.imgur.com/Pj5ylro.jpg',
    className: 'adaptar',
    altText: 'Slide 4',
    caption: ' ',
    link: 'https://www.soyhenry.com/'
  },
  
  
];


class Carrousel extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        {items.map((item) => {
          return (
            <CarouselItem
              onExiting={this.onExiting}
              onExited={this.onExited}
              key={item.src}
            >
              <img src={item.src} alt={item.altText} className={item.className} // insertar hipervinculo en una pestaña nueva
                onClick={() => window.open(item.link, '_blank')}
              />
                
              <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
            </CarouselItem>
          );
        })}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}


export default Carrousel;
