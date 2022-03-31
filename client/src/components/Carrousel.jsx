



import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const items = [
  {
    src: 'https://cdn.domestika.org/c_limit,dpr_1.0,f_auto,q_auto,w_820/v1570664576/content-items/003/328/205/corner-ecobio-junio_06-original.jpg?1570664576',
    altText: 'Slide 1',
    caption: ' '
  },
  {
    src: 'https://cdn.domestika.org/c_limit,dpr_1.0,f_auto,q_auto,w_820/v1570664565/content-items/003/328/198/drasanvi-full_es-original.jpg?1570664565 ',
    altText: 'Slide 2',
    caption: ' '
  },
  {
    src: 'https://cdn.domestika.org/c_limit,dpr_1.0,f_auto,q_auto,w_820/v1570664553/content-items/003/328/192/gold-oct-full_pt-original.jpg?1570664553  ',
    altText: 'Slide 3',
    caption: ' '
  }
];

class Slides extends Component {
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

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img  src={item.src} alt={item.altText} />
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });

    return (
        <div style={{marginTop:"130px"}}>
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl  color="black" direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
      </div>
    );
  }
}


export default Slides;