import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiUpload } from "react-icons/fi";

const Payment: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-6xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-12 gold-text tracking-widest uppercase">
          PAYMENT ₹ 100
        </h1>

        <div className="card-glass rounded-3xl p-6 md:p-10 flex flex-col md:flex-row gap-8 items-stretch md:min-h-[600px]">
          {/* Left Side: QR Code Area */}
          <div className="flex-[1.2] flex flex-col items-center justify-center bg-[#D9D9D9] rounded-2xl overflow-hidden p-8 shadow-2xl">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=JUNO_PAYMENT_DEFAULT"
              alt="Payment QR Code"
              className="w-full max-w-[320px] aspect-square object-contain"
            />
          </div>

          {/* Right Side: Upload Area */}
          <div className="flex-1 flex flex-col">
            <label
              htmlFor="screenshot-upload"
              className="flex-1 flex flex-col items-center justify-center border-[6px] border-[#FF8C00] rounded-[40px] cursor-pointer hover:bg-orange-500/5 transition-all duration-300 relative group"
            >
              {previewUrl ? (
                <div className="absolute inset-0 p-6">
                  <img
                    src={previewUrl}
                    alt="Screenshot Preview"
                    className="w-full h-full object-contain rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[34px]">
                    <div className="text-center">
                      <FiUpload className="text-4xl text-white mx-auto mb-2" />
                      <p className="text-white font-bold uppercase tracking-widest">
                        Change Screenshot
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-4">
                  <FiPlus className="text-[120px] md:text-[150px] text-[#FF8C00] font-light mb-8" />
                  <h3 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-[0.1em] leading-tight">
                    UPLOAD YOUR <br /> SCREENSHOOT
                  </h3>
                </div>
              )}
              <input
                id="screenshot-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {selectedFile && (
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 primary-btn py-5 rounded-2xl text-2xl font-bold tracking-[0.2em] shadow-xl"
              >
                SUBMIT PAYMENT
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Payment;
