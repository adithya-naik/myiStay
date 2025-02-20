import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import {
  AlertCircle,
  Star,
  CheckCircle,
  MoreVertical,
  Wifi,
  Tv,
  DollarSign,
  Users,
  Maximize,
  X,
  Save,
  Info,
  Calendar,
  Share,
  Heart,
  HeartOff,
  Flag
} from "lucide-react";
import { FaHotel } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "../components/RoomsLoading";

const FeaturedRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [optionsMenu, setOptionsMenu] = useState({ visible: false, roomId: null });
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Load wishlist from localStorage
    const savedWishlist = JSON.parse(localStorage.getItem('savedRooms') || '[]');
    setWishlist(savedWishlist.map(room => room.id));
    
    setLoading(true);
    fetch("http://localhost/hotel-api/api/rooms.php")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRooms(data);
          setFilteredRooms(data);
        } else {
          console.error("Invalid data format:", data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
        setLoading(false);
      });
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  const toggleOptionsMenu = (roomId, e) => {
    e.stopPropagation();
    if (optionsMenu.visible && optionsMenu.roomId === roomId) {
      setOptionsMenu({ visible: false, roomId: null });
    } else {
      setOptionsMenu({ visible: true, roomId });
    }
  };

  const handleBookNow = (room, e) => {
    e.stopPropagation();
    // Implement booking functionality - redirect to booking page or show booking form
    if (room.status === "available") {
      alert(`Starting booking process for ${room.room_type}`);
      // Redirect to booking page with room ID
      // window.location.href = `/booking/${room.id}`;
    }
  };

  const handleToggleWishlist = (room, e) => {
    e.stopPropagation();
    const savedRooms = JSON.parse(localStorage.getItem('savedRooms') || '[]');
    const isAlreadySaved = savedRooms.some(r => r.id === room.id);
    
    if (!isAlreadySaved) {
      // Add to wishlist
      savedRooms.push(room);
      setWishlist([...wishlist, room.id]);
      localStorage.setItem('savedRooms', JSON.stringify(savedRooms));
      alert(`${room.room_type} added to your wishlist!`);
    } else {
      // Remove from wishlist
      const updatedSavedRooms = savedRooms.filter(r => r.id !== room.id);
      setWishlist(wishlist.filter(id => id !== room.id));
      localStorage.setItem('savedRooms', JSON.stringify(updatedSavedRooms));
      alert(`${room.room_type} removed from your wishlist`);
    }
    
    setOptionsMenu({ visible: false, roomId: null });
  };

  const handleShareRoom = (room, e) => {
    e.stopPropagation();
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: `${room.room_type} at Our Hotel`,
        text: `Check out this amazing ${room.room_type} at Our Hotel: ${room.description}`,
        url: window.location.href,
      })
      .catch(error => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support navigator.share
      const shareUrl = window.location.href;
      alert(`Share this link: ${shareUrl}`);
    }
    
    setOptionsMenu({ visible: false, roomId: null });
  };

  const handleReportIssue = (room, e) => {
    e.stopPropagation();
    // Implement report functionality
    const issue = prompt("Please describe the issue with this listing:");
    if (issue) {
      alert(`Thank you for reporting. Your feedback about ${room.room_type} has been recorded.`);
      // Here you would normally send this to your backend
      console.log(`Issue reported for room ${room.id}: ${issue}`);
    }
    
    setOptionsMenu({ visible: false, roomId: null });
  };

  const showRoomDetails = (room, e) => {
    e.stopPropagation();
    setSelectedRoom(room);
    setShowDetails(true);
    setOptionsMenu({ visible: false, roomId: null });
  };

  const closeDetailsModal = () => {
    setShowDetails(false);
    setSelectedRoom(null);
  };

  if (loading) {
    return <Loading />;
  }

  const parseAmenities = (amenitiesString) => {
    try {
      return JSON.parse(amenitiesString || "[]");
    } catch (error) {
      console.error("Error parsing amenities:", error);
      return [];
    }
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-4 h-4" />;
      case 'tv':
        return <Tv className="w-4 h-4" />;
      case 'minibar':
        return <DollarSign className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 bg-gray-50">
      <h2 className="text-4xl font-bold mb-8 text-green-700 flex items-center">
        <FaHotel className="mr-2 text-green-600" />
        Featured Rooms
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRooms.map((room) => {
          let images = [];
          try {
            images = JSON.parse(room.images || "[]");
          } catch (error) {
            console.error("Error parsing images:", error);
          }

          const discount = room.discount ? parseFloat(room.discount) : 0;
          const discountedPrice = parseFloat(room.price) - (parseFloat(room.price) * discount) / 100;
          const amenities = parseAmenities(room.amenities);
          const isAvailable = room.status === "available";
          const isInWishlist = wishlist.includes(room.id);

          return (
            <div
              key={room.id}
              className="bg-white shadow-lg rounded-2xl border border-gray-100 transition-all transform hover:shadow-xl relative overflow-hidden"
            >
              {images.length > 0 ? (
                <Slider {...sliderSettings}>
                  {images.map((img, index) => (
                    <div className="relative" key={index}>
                      <img
                        src={`http://localhost/hotel-api/images/${img}`}
                        alt={room.room_type}
                        className="w-full h-64 object-cover"
                      />
                      {discount > 0 && (
                        <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg font-semibold shadow-md">
                          {discount}% OFF
                        </span>
                      )}
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="flex items-center justify-center w-full h-64 bg-gray-100">
                  <AlertCircle className="w-10 h-10 text-gray-400" />
                  <span className="ml-2 text-gray-500">No Image Available</span>
                </div>
              )}

              <div className="p-5">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-bold text-green-800 mb-2">
                    {room.room_type}
                  </h3>
                  <div className="relative">
                    <button 
                      onClick={(e) => toggleOptionsMenu(room.id, e)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label="Room options"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                    
                    {optionsMenu.visible && optionsMenu.roomId === room.id && (
                      <div className="absolute right-0 top-10 w-48 bg-white shadow-lg rounded-lg z-10 border overflow-hidden">
                        <button 
                          onClick={(e) => handleToggleWishlist(room, e)}
                          className="w-full flex items-center p-3 hover:bg-gray-50 text-left"
                        >
                          {isInWishlist ? (
                            <>
                              <HeartOff className="w-4 h-4 mr-2 text-red-500" />
                              <span>Remove from Wishlist</span>
                            </>
                          ) : (
                            <>
                              <Heart className="w-4 h-4 mr-2 text-red-500" />
                              <span>Add to Wishlist</span>
                            </>
                          )}
                        </button>
                        <button 
                          onClick={(e) => showRoomDetails(room, e)}
                          className="w-full flex items-center p-3 hover:bg-gray-50 text-left border-t"
                        >
                          <Info className="w-4 h-4 mr-2 text-blue-600" />
                          <span>View Room Details</span>
                        </button>
                        <button 
                          onClick={(e) => handleShareRoom(room, e)}
                          className="w-full flex items-center p-3 hover:bg-gray-50 text-left border-t"
                        >
                          <Share className="w-4 h-4 mr-2 text-green-600" />
                          <span>Share Room</span>
                        </button>
                        <button 
                          onClick={(e) => handleReportIssue(room, e)}
                          className="w-full flex items-center p-3 hover:bg-gray-50 text-left border-t"
                        >
                          <Flag className="w-4 h-4 mr-2 text-orange-500" />
                          <span>Report Issue</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                  {room.description}
                </p>
                
                <div className="flex justify-between mb-3">
                  <div className="text-lg font-bold text-green-700">
                    {discount > 0 && (
                      <span className="text-gray-400 line-through mr-2 text-sm">
                        ₹{parseFloat(room.price).toLocaleString()}
                      </span>
                    )}
                    <span className="text-xl">₹{discountedPrice.toFixed(0)}</span>
                    <span className="text-sm text-gray-500 font-normal"> / night</span>
                  </div>
                  
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 font-semibold text-yellow-700">
                      {parseFloat(room.rating).toFixed(1)}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    {isAvailable ? (
                      <div className="flex items-center bg-green-50 px-2 py-1 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="ml-1 font-medium text-green-700 text-sm">Available</span>
                      </div>
                    ) : (
                      <div className="flex items-center bg-red-50 px-2 py-1 rounded-lg">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="ml-1 font-medium text-red-700 text-sm">Booked</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center bg-gray-50 px-2 py-1 rounded-lg">
                    <Users className="w-4 h-4 text-gray-600" />
                    <span className="ml-1 text-sm text-gray-700">{room.capacity} guests</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {amenities.slice(0, 3).map((amenity, index) => (
                    <div key={index} className="flex items-center bg-blue-50 px-2 py-1 rounded-lg">
                      {getAmenityIcon(amenity)}
                      <span className="ml-1 text-xs text-blue-700">{amenity}</span>
                    </div>
                  ))}
                  {amenities.length > 3 && (
                    <div className="flex items-center bg-gray-50 px-2 py-1 rounded-lg">
                      <span className="text-xs text-gray-500">+{amenities.length - 3} more</span>
                    </div>
                  )}
                </div>
                
                {/* Book Now Button - Outside Three Dots Menu */}
                <button 
                  onClick={(e) => handleBookNow(room, e)}
                  disabled={!isAvailable}
                  className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center transition-colors ${
                    isAvailable 
                      ? "bg-green-600 hover:bg-green-700 text-white" 
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  {isAvailable ? "Book Now" : "Currently Unavailable"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Room Details Modal */}
      {showDetails && selectedRoom && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70" onClick={closeDetailsModal}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto m-4" onClick={e => e.stopPropagation()}>
            <div className="relative">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-5 border-b">
                <h3 className="text-2xl font-bold text-green-800">
                  {selectedRoom.room_type} - Detailed View
                </h3>
                <button 
                  onClick={closeDetailsModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              {/* Modal Content */}
              <div className="p-5">
                {/* Image Gallery */}
                <div className="mb-6">
                  <Slider {...sliderSettings}>
                    {(() => {
                      let images = [];
                      try {
                        images = JSON.parse(selectedRoom.images || "[]");
                      } catch (error) {
                        console.error("Error parsing images:", error);
                      }
                      
                      if (images.length === 0) {
                        return (
                          <div className="flex items-center justify-center w-full h-80 bg-gray-100">
                            <AlertCircle className="w-10 h-10 text-gray-400" />
                            <span className="ml-2 text-gray-500">No Images Available</span>
                          </div>
                        );
                      }
                      
                      return images.map((img, index) => (
                        <div key={index}>
                          <img
                            src={`http://localhost/hotel-api/images/${img}`}
                            alt={`${selectedRoom.room_type} view ${index + 1}`}
                            className="w-full h-80 object-cover rounded-lg"
                          />
                        </div>
                      ));
                    })()}
                  </Slider>
                </div>
                
                {/* Room Description */}
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Description</h4>
                  <p className="text-gray-700">
                    {selectedRoom.description}
                  </p>
                </div>
                
                {/* Room Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Pricing Section */}
                  <div className="bg-green-50 p-4 rounded-xl">
                    <h4 className="text-lg font-semibold text-green-800 mb-3">Pricing Information</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Regular Price:</span>
                        <span className="font-medium">₹{parseFloat(selectedRoom.price).toLocaleString()}</span>
                      </div>
                      
                      {parseFloat(selectedRoom.discount) > 0 && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Discount:</span>
                            <span className="font-medium text-red-600">{selectedRoom.discount}%</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="text-gray-600">You Pay:</span>
                            <span className="font-bold text-green-700">
                              ₹{(parseFloat(selectedRoom.price) - (parseFloat(selectedRoom.price) * parseFloat(selectedRoom.discount)) / 100).toFixed(0)}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Room Features */}
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <h4 className="text-lg font-semibold text-blue-800 mb-3">Room Features</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-blue-700 mr-2" />
                        <span className="text-gray-700">Capacity: <strong>{selectedRoom.capacity} guests</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Maximize className="w-4 h-4 text-blue-700 mr-2" />
                        <span className="text-gray-700">Room Size: <strong>{selectedRoom.room_size} sq ft</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-2" />
                        <span className="text-gray-700">Rating: <strong>{parseFloat(selectedRoom.rating).toFixed(1)}/5</strong></span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-gray-700">Status: <strong className={selectedRoom.status === "available" ? "text-green-600" : "text-red-600"}>
                          {selectedRoom.status.charAt(0).toUpperCase() + selectedRoom.status.slice(1)}
                        </strong></span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Amenities */}
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">Amenities</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {(() => {
                      let amenities = [];
                      try {
                        amenities = JSON.parse(selectedRoom.amenities || "[]");
                      } catch (error) {
                        console.error("Error parsing amenities:", error);
                      }
                      
                      return amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center bg-gray-50 p-3 rounded-lg">
                          {getAmenityIcon(amenity)}
                          <span className="ml-2 text-gray-700">{amenity}</span>
                        </div>
                      ));
                    })()}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-4 mt-6">
                  <button 
                    onClick={(e) => handleBookNow(selectedRoom, e)}
                    disabled={selectedRoom.status !== "available"}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold flex items-center justify-center ${
                      selectedRoom.status === "available" 
                        ? "bg-green-600 hover:bg-green-700 text-white" 
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    {selectedRoom.status === "available" ? "Book Now" : "Currently Unavailable"}
                  </button>
                  <button 
                    onClick={(e) => handleToggleWishlist(selectedRoom, e)}
                    className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-semibold transition-colors"
                  >
                    {wishlist.includes(selectedRoom.id) ? (
                      <>
                        <HeartOff className="w-5 h-5 mr-2 text-red-500" />
                        Remove
                      </>
                    ) : (
                      <>
                        <Heart className="w-5 h-5 mr-2 text-red-500" />
                        Wishlist
                      </>
                    )}
                  </button>
                  <button 
                    onClick={(e) => handleShareRoom(selectedRoom, e)}
                    className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-semibold transition-colors"
                  >
                    <Share className="w-5 h-5 mr-2 text-green-600" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedRooms;