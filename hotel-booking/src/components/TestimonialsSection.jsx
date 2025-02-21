import React, { useEffect, useState } from "react";

const TestimonialsSection = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost/hotel-api/api/testimonials.php")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Testimonials data:", data);
                setTestimonials(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching testimonials:", error.message);
                setError("Failed to load testimonials.");
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading testimonials...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-white p-6 shadow-lg rounded-xl transition-transform transform hover:scale-105">
                        <div className="flex items-center mb-4">
                            <img src={testimonial.profile_picture || "/default-profile.png"} alt={testimonial.name} className="w-12 h-12 rounded-full mr-3" />
                            <div>
                                <p className="text-lg font-semibold">{testimonial.name}</p>
                                <p className="text-sm text-gray-500">Rating: {testimonial.rating} ⭐</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-3">{testimonial.message}</p>
                        <p className="text-xs text-gray-400 mb-2">Helpful: {testimonial.helpful_count}</p>

                        {testimonial.review_images?.length > 0 && (
                            <div className="flex space-x-2 mt-2">
                                {testimonial.review_images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={`/images/reviews/${image}`}
                                        alt={`Review ${index + 1}`}
                                        className="w-16 h-16 object-cover rounded-md border border-gray-200"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestimonialsSection;
