// RoomsLoading.jsx
import React from "react";
import { BedSingle, Banknote, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const RoomsLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6 relative overflow-hidden">
      {/* Subtle background animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-green-100 to-green-200 opacity-30"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      ></motion.div>
      
      <div className="flex space-x-12 relative z-10">
        <motion.div
          className="flex flex-col items-center"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration:0.7 }}
        >
          <BedSingle className="w-12 h-12 text-green-500" />
          <p className="text-sm text-gray-600">Rooms</p>
        </motion.div>
        <motion.div
          className="flex flex-col items-center"
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
        >
          <CheckCircle className="w-12 h-12 text-green-500" />
          <p className="text-sm text-gray-600">Amenities</p>
        </motion.div>
        <motion.div
          className="flex flex-col items-center"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
        >
          <Banknote className="w-12 h-12 text-green-500" />
          <p className="text-sm text-gray-600">Prices</p>
        </motion.div>
      </div>
      <motion.p
        className="mt-6 text-xl font-semibold text-green-600 relative z-10"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
      >
        Loading rooms...
      </motion.p>
    </div>
  );
};

export default RoomsLoading;
