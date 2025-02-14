import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    image: "https://via.placeholder.com/100",
    rating: 5,
    review: "Amazing stay! The rooms were clean, and the service was top-notch.",
  },
  {
    id: 2,
    name: "Ananya Rao",
    image: "https://via.placeholder.com/100",
    rating: 4,
    review: "Great experience! Loved the ambience and hospitality.",
  },
  {
    id: 3,
    name: "Vikram Singh",
    image: "https://via.placeholder.com/100",
    rating: 5,
    review: "Best hotel in town! Highly recommended for a relaxing stay.",
  },
];

const TestimonialsSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="bg-gray-100 py-10 px-5">
      <h2 className="text-3xl font-bold text-center mb-6">Guest Testimonials</h2>
      <div className="max-w-3xl mx-auto">
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-lg text-center">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mx-auto mb-3"
              />
              <h3 className="text-lg font-semibold">{testimonial.name}</h3>
              <p className="text-yellow-500 text-xl">
                {"⭐".repeat(testimonial.rating)}
              </p>
              <p className="text-gray-600 mt-2">{testimonial.review}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TestimonialsSection;
