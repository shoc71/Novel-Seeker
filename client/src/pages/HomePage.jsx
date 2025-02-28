// import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Car_Libraries } from '../components/CarouselData';

const HomePage = () => {
  return (
    <div className="container py-5">
      <Carousel>
        {Car_Libraries.map((CarouselData, index) => (
          <Carousel.Item key={index}>
            <a href={CarouselData.renderLink} target="_blank" rel="noopener noreferrer">
              <img
                className="d-block w-100"
                src={CarouselData.image}
                alt={CarouselData.title}
                style={{ objectFit: 'cover', height: '400px' }}
              />
              <Carousel.Caption>
                <div className="carousel-title-box">
                  <h3>{CarouselData.title}</h3>
                </div>
              </Carousel.Caption>
            </a>
          </Carousel.Item>
        ))}
      </Carousel>

      <section className="mt-5">
        <h2>Famous Libraries from around the World!</h2>
        <p>
          We hope that through our app, Novel Seeker, we can help you find the book that you were looking for, or maybe even one you didnt know you wanted to read yet!
        </p>
      </section>

      <style>
        {`
          .carousel-title-box {
            display: inline-block;
            padding: 10px 20px;
            background-color: rgba(0, 0, 0, 0.5);
            border: 2px solid #fff;
            border-radius: 5px;
          }
          .carousel-title-box h3 {
            margin: 0;
            color: #fff;
            font-weight: bold;
          }
        `}
      </style>
    </div>
  );
}

export default HomePage;