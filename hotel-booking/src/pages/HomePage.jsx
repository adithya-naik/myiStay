import React, { useState, useEffect } from "react";
import { 
  // Core functionality icons
  Calendar, 
  Clock, 
  Users, 
  Hotel, 
  ChevronRight, 
  ChevronLeft,
  Search,
  ArrowRight,

  // Contact section icons
  Phone, 
  MapPin, 
  Mail,

  // Services section icons
  Wifi,
  Car,
  Coffee,
  Dumbbell,

  // Entertainment section icons
  Film,  // for theater
  HeartPulse,  // for spa/wellness
  Waves,  // for pool
  Ticket
} from "lucide-react";
import TestimonialsSection from "../components/TestimonialsSection";


function Homepage() {
  // Previous state and data
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchParams, setSearchParams] = useState({
    checkIn: "",
    checkOut: "",
    guests: "2",
    roomType: "all"
  });
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Slider Data
  const slides = [
    {
      image: "/api/placeholder/1920/1080",
      title: "Experience Luxury Living",
      subtitle: "Where comfort meets elegance"
    },
    {
      image: "/api/placeholder/1920/1080",
      title: "Exquisite Dining",
      subtitle: "Culinary excellence at its finest"
    },
    {
      image: "/api/placeholder/1920/1080",
      title: "Premium Amenities",
      subtitle: "Everything you need for a perfect stay"
    }
  ];

  // Auto Slide Effect
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [isAnimating]);

  // Slider Controls
  const nextSlide = () => {
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Search State
  // const [searchParams, setSearchParams] = useState({
  //   checkIn: "",
  //   checkOut: "",
  //   guests: "2",
  //   roomType: "all"
  // });

  // Statistics Data
  const statistics = [
    { value: "15+", label: "Years of Excellence", icon: "🏆" },
    { value: "500+", label: "Luxury Rooms", icon: "🛏️" },
    { value: "50k+", label: "Happy Guests", icon: "😊" },
    { value: "100%", label: "Satisfaction Rate", icon: "⭐" }
  ];

  // Room Types Data
  const roomTypes = [
    {
      name: "Deluxe Suite",
      price: "₹12,000",
      image: "/api/placeholder/400/300",
      features: ["Ocean View", "King Bed", "Private Balcony", "Mini Bar"]
    },
    {
      name: "Premium Room",
      price: "₹8,000",
      image: "/api/placeholder/400/300",
      features: ["City View", "Queen Bed", "Work Desk", "Room Service"]
    },
    {
      name: "Executive Suite",
      price: "₹15,000",
      image: "/api/placeholder/400/300",
      features: ["Mountain View", "King Bed", "Jacuzzi", "Lounge Access"]
    }
  ];
  const hotelServices = [
    {
      icon: <Wifi className="w-8 h-8" />,
      title: "Free Wi-Fi",
      description: "High-speed internet access throughout the property"
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "Valet Parking",
      description: "Complimentary valet parking service for all guests"
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      title: "24/7 Room Service",
      description: "Round-the-clock dining and beverage service"
    },
    {
      icon: <Dumbbell className="w-8 h-8" />,
      title: "Fitness Center",
      description: "State-of-the-art equipment and personal trainers"
    },
    {
      icon: <HeartPulse className="w-8 h-8" />,
      title: "Luxury Spa",
      description: "Relaxing treatments and wellness programs"
    },
    {
      icon: <Waves className="w-8 h-8" />,
      title: "Swimming Pool",
      description: "Indoor and outdoor pools with lounging area"
    }
  ];


  // Entertainment Options Data
  const entertainmentOptions = [
    {
      icon: <Film className="w-6 h-6" />,
      title: "Theater Experience",
      price: "₹2,500",
      timing: "7:00 PM - 10:00 PM",
      description: "Enjoy our in-house theater with premium movie screenings and live performances",
      available: true
    },
    {
      icon: <HeartPulse className="w-6 h-6" />,
      title: "Luxury Spa Package",
      price: "₹4,000",
      timing: "10:00 AM - 8:00 PM",
      description: "3-hour spa treatment including massage, facial, and aromatherapy",
      available: true
    },
    {
      icon: <Waves className="w-6 h-6" />,
      title: "Pool Side Party",
      price: "₹3,000",
      timing: "2:00 PM - 6:00 PM",
      description: "Private pool access with refreshments and lounging amenities",
      available: true
    }
  ];


  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Hero Section with Slider */}
      <section className="relative h-screen overflow-hidden">
        {/* Slider Navigation */}
        <button 
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-30 bg-white/20 p-3 rounded-full hover:bg-white/30 transition-all transform hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-30 bg-white/20 p-3 rounded-full hover:bg-white/30 transition-all transform hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Slider Content */}
        <div className="relative h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-black/40 z-10"></div>
              <img
                src={slide.image}
                alt={slide.title}
                className="object-cover w-full h-full"
              />
              <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-center px-4 text-center">
                <h1 className="text-6xl font-bold text-white mb-6 animate-fade-in">
                  {slide.title}
                </h1>
                <p className="text-2xl text-white mb-8">{slide.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-white w-8" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Enhanced Search Section */}
      <section className="relative -mt-24 z-40 container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="grid md:grid-cols-5 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Check In</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  value={searchParams.checkIn}
                  onChange={(e) => setSearchParams({...searchParams, checkIn: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Check Out</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  value={searchParams.checkOut}
                  onChange={(e) => setSearchParams({...searchParams, checkOut: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Guests</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none"
                  value={searchParams.guests}
                  onChange={(e) => setSearchParams({...searchParams, guests: e.target.value})}
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4+ Guests</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Room Type</label>
              <div className="relative">
                <Hotel className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none"
                  value={searchParams.roomType}
                  onChange={(e) => setSearchParams({...searchParams, roomType: e.target.value})}
                >
                  <option value="all">All Rooms</option>
                  <option value="deluxe">Deluxe Suite</option>
                  <option value="premium">Premium Room</option>
                  <option value="executive">Executive Suite</option>
                </select>
              </div>
            </div>
            <button className="bg-green-600 text-white rounded-lg px-8 py-3 h-12 mt-6 hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Search Rooms
            </button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-green-600">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-white">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Room Types Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Luxury Accommodations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our selection of premium rooms and suites
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {roomTypes.map((room, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{room.name}</h3>
                  <p className="text-green-600 font-bold">{room.price}<span className="text-sm text-gray-500">/night</span></p>
                </div>
                <ul className="space-y-2 mb-6">
                  {room.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-green-600 text-white rounded-lg px-6 py-3 hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                  Book Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Premium Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience world-class amenities and services designed for your ultimate comfort and convenience
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {hotelServices.map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="text-green-600 mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Entertainment Booking Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Entertainment & Events</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Enhance your stay with our curated selection of entertainment options
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {entertainmentOptions.map((event, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl p-6 shadow-lg ${
                  !event.available ? 'opacity-75' : 'hover:shadow-xl'
                } transition-shadow`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    {event.icon}
                  </div>
                  <span className="text-lg font-bold text-green-600">{event.price}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Clock className="w-4 h-4" />
                  <span>{event.timing}</span>
                </div>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <button 
                  className={`w-full ${
                    event.available 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-gray-400 cursor-not-allowed'
                  } text-white rounded-lg px-6 py-3 transition-colors flex items-center justify-center gap-2`}
                  onClick={() => event.available && setSelectedEvent(event)}
                  disabled={!event.available}
                >
                  {event.available ? (
                    <>
                      Book Now
                      <Ticket className="w-4 h-4" />
                    </>
                  ) : (
                    'Sold Out'
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Experience Luxury Today</h2>
            <p className="text-lg text-gray-300 mb-8">
              Book your stay now and get exclusive offers on our premium rooms and dining experiences.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors">
                Book Now
              </button>
              <button className="border-2 border-white px-8 py-3 rounded-lg hover:bg-white hover:text-gray-900 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>


      <TestimonialsSection />


      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Have questions? We're here to help you plan your perfect stay.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Call Us</p>
                    <p className="text-gray-600">+91 123 456 7890</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Email Us</p>
                    <p className="text-gray-600">contact@myistay.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600">123 Luxury Avenue, Paradise City, 400001</p>
                  </div>
                </div>
              </div>
            </div>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                  <input
                    type="email"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <button className="w-full bg-green-600 text-white rounded-lg px-6 py-3 hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                Send Message
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Homepage;