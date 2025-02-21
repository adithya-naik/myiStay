import React, { useEffect, useState, useCallback, useMemo } from "react";
import Slider from "react-slick";
import {
  AlertCircle, Star, CheckCircle, MoreVertical, Wifi, Tv, DollarSign,
  Users, Maximize, X, Calendar, Share, Heart, HeartOff, Flag, Filter,
  Search, ChevronDown, Square, CheckSquare, Info
} from "lucide-react";
import debounce from 'lodash/debounce';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "../components/RoomsLoading";

const FeaturedRooms = () => {
  // State Management
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [optionsMenu, setOptionsMenu] = useState({ visible: false, roomId: null });
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // Filter states
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 10000 },
    capacity: "",
    rating: "",
    amenities: [],
    status: "all"
  });
  
  const [sortBy, setSortBy] = useState("recommended");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);

  // Slider Settings
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

  // Data fetching
  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://localhost/hotel-api/api/rooms.php");
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (Array.isArray(data)) {
        const prices = data.map(room => parseFloat(room.price));
        setRooms(data);
        setFilteredRooms(data);
        setMinPrice(Math.min(...prices));
        setMaxPrice(Math.max(...prices));
        setFilters(prev => ({
          ...prev,
          priceRange: { min: Math.min(...prices), max: Math.max(...prices) }
        }));
      } else {
        throw new Error('Data is not in the expected format');
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setError("Failed to load rooms. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Search handling with debounce
  const debouncedSearch = useCallback(
    debounce((searchValue) => {
      setSearchTerm(searchValue);
    }, 300),
    []
  );

  const handleSearchInput = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSearchInput(value);
    debouncedSearch(value);
  };

  // Filter application
  const applyFiltersAndSort = useCallback(() => {
    let filtered = [...rooms];

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(room => {
        const searchFields = [
          room.room_type,
          room.description,
          ...(JSON.parse(room.amenities || "[]")),
        ].map(field => (field || "").toLowerCase());
        
        return searchFields.some(field => field.includes(searchLower));
      });
    }

    // Apply filters
    filtered = filtered.filter(room => {
      const price = parseFloat(room.price) || 0;
      const discount = parseFloat(room.discount || 0);
      const discountedPrice = price - (price * discount / 100);
      const roomAmenities = JSON.parse(room.amenities || "[]");
      const roomCapacity = parseInt(room.capacity) || 0;
      const roomRating = parseFloat(room.rating) || 0;

      return (
        discountedPrice >= filters.priceRange.min &&
        discountedPrice <= filters.priceRange.max &&
        (filters.capacity === "" || roomCapacity >= parseInt(filters.capacity)) &&
        (filters.rating === "" || roomRating >= parseFloat(filters.rating)) &&
        (filters.status === "all" || room.status === filters.status) &&
        (filters.amenities.length === 0 || 
          filters.amenities.every(amenity => roomAmenities.includes(amenity)))
      );
    });

    // Sorting
    const sortingFunctions = {
      "price-low": (a, b) => {
        const priceA = parseFloat(a.price) * (1 - parseFloat(a.discount || 0) / 100);
        const priceB = parseFloat(b.price) * (1 - parseFloat(b.discount || 0) / 100);
        return priceA - priceB;
      },
      "price-high": (a, b) => {
        const priceA = parseFloat(a.price) * (1 - parseFloat(a.discount || 0) / 100);
        const priceB = parseFloat(b.price) * (1 - parseFloat(b.discount || 0) / 100);
        return priceB - priceA;
      },
      "rating": (a, b) => parseFloat(b.rating || 0) - parseFloat(a.rating || 0),
      "capacity": (a, b) => parseInt(b.capacity || 0) - parseInt(a.capacity || 0),
      "recommended": (a, b) => parseFloat(b.rating || 0) - parseFloat(a.rating || 0)
    };

    filtered.sort(sortingFunctions[sortBy] || sortingFunctions.recommended);
    setFilteredRooms(filtered);
  }, [rooms, searchTerm, filters, sortBy]);

  // Event Handlers
  const toggleOptionsMenu = (roomId, e) => {
    e.stopPropagation();
    setOptionsMenu(prev => ({
      visible: prev.roomId !== roomId || !prev.visible,
      roomId: roomId
    }));
  };

  const handleBookNow = (room, e) => {
    e.stopPropagation();
    if (room.status === "available") {
      alert(`Starting booking process for ${room.room_type}`);
    }
  };

  const handleToggleWishlist = (room, e) => {
    e.stopPropagation();
    const savedRooms = JSON.parse(localStorage.getItem('savedRooms') || '[]');
    const isAlreadySaved = savedRooms.some(r => r.id === room.id);
    
    if (!isAlreadySaved) {
      savedRooms.push(room);
      setWishlist([...wishlist, room.id]);
      localStorage.setItem('savedRooms', JSON.stringify(savedRooms));
      alert(`${room.room_type} added to your wishlist!`);
    } else {
      const updatedSavedRooms = savedRooms.filter(r => r.id !== room.id);
      setWishlist(wishlist.filter(id => id !== room.id));
      localStorage.setItem('savedRooms', JSON.stringify(updatedSavedRooms));
      alert(`${room.room_type} removed from your wishlist`);
    }
    
    setOptionsMenu({ visible: false, roomId: null });
  };

  const handleShareRoom = (room, e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: `${room.room_type} at Our Hotel`,
        text: `Check out this amazing ${room.room_type} at Our Hotel: ${room.description}`,
        url: window.location.href,
      }).catch(error => console.log('Error sharing:', error));
    } else {
      alert(`Share this link: ${window.location.href}`);
    }
    setOptionsMenu({ visible: false, roomId: null });
  };

  const handleReportIssue = (room, e) => {
    e.stopPropagation();
    const issue = prompt("Please describe the issue with this listing:");
    if (issue) {
      alert(`Thank you for reporting. Your feedback about ${room.room_type} has been recorded.`);
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

  // Utility Functions
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

  // Effects
  useEffect(() => {
    fetchRooms();
    const savedWishlist = JSON.parse(localStorage.getItem('savedRooms') || '[]');
    setWishlist(savedWishlist.map(room => room.id));
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [applyFiltersAndSort]);

  // Filter Section Component
  const FilterSection = () => (
    <div className="bg-white p-6 rounded-xl shadow-md mb-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {/* Search Bar */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
          <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Seacrh</label>
            <Search className="absolute left-3 top-2/3 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search rooms..."
              value={searchInput}
              onChange={handleSearchInput}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Price Range */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
          <div className="flex gap-4">
            <input
              type="number"
              value={filters.priceRange.min}
              onChange={(e) => {
                const value = Math.max(0, parseInt(e.target.value) || 0);
                setFilters(prev => ({
                  ...prev,
                  priceRange: { ...prev.priceRange, min: value }
                }));
              }}
              className="w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              min={minPrice}
              max={maxPrice}
            />
            <input
              type="number"
              value={filters.priceRange.max}
              onChange={(e) => {
                const value = Math.min(maxPrice, parseInt(e.target.value) || 0);
                setFilters(prev => ({
                  ...prev,
                  priceRange: { ...prev.priceRange, max: value }
                }));
              }}
              className="w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              min={minPrice}
              max={maxPrice}
            />
          </div>
        </div>

        {/* Capacity Filter */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Capacity</label>
          <select
            value={filters.capacity}
            onChange={(e) => setFilters(prev => ({ ...prev, capacity: e.target.value }))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Any</option>
            <option value="1">1 Person</option>
            <option value="2">2 People</option>
            <option value="3">3 People</option>
            <option value="4">4+ People</option>
          </select>
        </div>

        {/* Rating Filter */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
          <select
            value={filters.rating}
            onChange={(e) => setFilters(prev => ({ ...prev, rating: e.target.value }))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Any</option>
            <option value="4.5">4.5+ ⭐</option>
            <option value="4">4+ ⭐</option>
            <option value="3.5">3.5+ ⭐</option>
            <option value="3">3+ ⭐</option>
          </select>
        </div>

        {/* Sort Options */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="recommended">Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
            <option value="capacity">Capacity</option>
          </select>
        </div>
        </div>
    </div>
  );

  // Room Card Component
  const RoomCard = ({ room }) => {
    const isInWishlist = wishlist.includes(room.id);
    const roomAmenities = parseAmenities(room.amenities);
    const discountedPrice = parseFloat(room.price) * (1 - parseFloat(room.discount || 0) / 100);

    return (
      <div 
        className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition hover:scale-[1.02]"
        onClick={(e) => showRoomDetails(room, e)}
      >
        {/* Room Images Slider */}
        <div className="relative h-64">
          <Slider {...sliderSettings}>
            {JSON.parse(room.images).map((image, index) => (
              <div key={index} className="h-64">
                <img
                  src={`http://localhost/hotel-api/images/${image}`}
                  alt={`${room.room_type} - View ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </Slider>
          
          {/* Status Badge */}
          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium
            ${room.status === 'available' ? 'bg-green-100 text-green-800' :
              room.status === 'booked' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'}`}>
            {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
          </div>
          
         {/* Discount Badge */}
          {room.discount && parseFloat(room.discount) > 0 && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {parseInt(room.discount)}% OFF
            </div>
          )}

        </div>

        <div className="p-6">
          {/* Room Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{room.room_type}</h3>
              <div className="flex items-center mt-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="ml-1 text-gray-600">{room.rating}</span>
              </div>
            </div>
            
            <div className="relative">
              <button
                onClick={(e) => toggleOptionsMenu(room.id, e)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <MoreVertical className="w-5 h-5 text-gray-500" />
              </button>
              
              {optionsMenu.visible && optionsMenu.roomId === room.id && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <button
                      onClick={(e) => handleToggleWishlist(room, e)}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {isInWishlist ? (
                        <>
                          <HeartOff className="w-4 h-4 mr-2" />
                          Remove from Wishlist
                        </>
                      ) : (
                        <>
                          <Heart className="w-4 h-4 mr-2" />
                          Add to Wishlist
                        </>
                      )}
                    </button>
                    <button
                      onClick={(e) => handleShareRoom(room, e)}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Share className="w-4 h-4 mr-2" />
                      Share
                    </button>
                    <button
                      onClick={(e) => handleReportIssue(room, e)}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Flag className="w-4 h-4 mr-2" />
                      Report Issue
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Room Details */}
          <div className="space-y-4">
            <p className="text-gray-600 line-clamp-2">{room.description}</p>
            
            {/* Amenities */}
            <div className="flex items-center space-x-4">
              {roomAmenities.slice(0, 3).map((amenity, index) => (
                <div key={index} className="flex items-center text-gray-500">
                  {getAmenityIcon(amenity)}
                  <span className="ml-1 text-sm">{amenity}</span>
                </div>
              ))}
              {roomAmenities.length > 3 && (
                <span className="text-sm text-gray-500">+{roomAmenities.length - 3} more</span>
              )}
            </div>

            {/* Price and Action */}
            <div className="flex items-center justify-between">
              <div>
                {room.discount && parseFloat(room.discount) > 0 ? (
                  <div>
                    <span className="text-2xl font-bold text-gray-900">
                      ${discountedPrice.toFixed(2)}
                    </span>
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      ${parseFloat(room.price).toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-gray-900">
                    ${parseFloat(room.price).toFixed(2)}
                  </span>
                )}
                <span className="text-sm text-gray-500">/night</span>
              </div>
              
              <button
                onClick={(e) => handleBookNow(room, e)}
                disabled={room.status !== 'available'}
                className={`px-4 py-2 rounded-lg font-medium
                  ${room.status === 'available'
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Details Modal Component
  const DetailsModal = () => {
    if (!selectedRoom || !showDetails) return null;

    const roomAmenities = parseAmenities(selectedRoom.amenities);
    const discountedPrice = parseFloat(selectedRoom.price) * (1 - parseFloat(selectedRoom.discount || 0) / 100);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{selectedRoom.room_type}</h2>
              <button
                onClick={closeDetailsModal}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Image Slider */}
            <div className="mb-8">
              <Slider {...sliderSettings}>
                {JSON.parse(selectedRoom.images).map((image, index) => (
                  <div key={index} className="h-96">
                    <img
                      src={`http://localhost/hotel-api/images/${image}`}
                      alt={`${selectedRoom.room_type} - View ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </Slider>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Room Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-gray-500 mr-2" />
                    <span>Capacity: {selectedRoom.capacity} persons</span>
                  </div>
                  <div className="flex items-center">
                    <Maximize className="w-5 h-5 text-gray-500 mr-2" />
                    <span>Size: {selectedRoom.size} sq ft</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 mr-2" />
                    <span>Rating: {selectedRoom.rating}/5</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mt-8 mb-4">Description</h3>
                <p className="text-gray-600">{selectedRoom.description}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                <div className="grid grid-cols-2 gap-4">
                  {roomAmenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      {getAmenityIcon(amenity)}
                      <span className="ml-2">{amenity}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Pricing</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-gray-900">
                        ${discountedPrice.toFixed(2)}
                      </span>
                      <span className="text-gray-500 ml-2">/night</span>
                    </div>
                    {selectedRoom.discount && parseFloat(selectedRoom.discount) > 0 && (
                      <div className="mt-2">
                        <span className="text-gray-500 line-through">
                          ${parseFloat(selectedRoom.price).toFixed(2)}
                        </span>
                        <span className="ml-2 text-red-500">
                          {selectedRoom.discount}% off
                        </span>
                      </div>
                    )}
                    <button
                      onClick={(e) => handleBookNow(selectedRoom, e)}
                      disabled={selectedRoom.status !== 'available'}
                      className={`w-full mt-4 px-4 py-2 rounded-lg font-medium
                        ${selectedRoom.status === 'available'
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main Render
  return (
    <div className="container mx-auto px-4 py-8">
      <FilterSection />
      
      {error ? (
        <div className="flex items-center justify-center p-4 bg-red-50 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
          <p className="text-red-700">{error}</p>
        </div>
      ) : loading ? (
        <Loading />
      ) : (
        <>
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredRooms.length} {filteredRooms.length === 1 ? 'Room' : 'Rooms'} Available
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </>
      )}
      
      <DetailsModal />
    </div>
  );
};

export default FeaturedRooms;