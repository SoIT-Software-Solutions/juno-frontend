import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiUpload, FiInfo, FiAlertCircle } from "react-icons/fi";

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

        <div className="card-glass rounded-[40px] p-2 md:p-3 shadow-2xl overflow-hidden backdrop-blur-3xl border border-white/10 relative">
          {/* Animated Background Orbs */}
          <div className="absolute top-0 -left-20 w-80 h-80 bg-orange-600/20 rounded-full blur-[120px] -z-10 animate-pulse" />
          <div className="absolute bottom-0 -right-20 w-80 h-80 bg-yellow-600/10 rounded-full blur-[120px] -z-10" />

          <div className="p-6 md:p-10 flex flex-col lg:flex-row gap-8 items-stretch lg:min-h-[650px]">
            {/* Left Side: QR Code & Info Area */}
            <div className="flex-[1.2] flex flex-col gap-6">
              <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-[32px] overflow-hidden p-10 shadow-inner group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white -z-10" />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative p-4 bg-white rounded-2xl shadow-xl"
                >
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=JUNO_PAYMENT_DEFAULT"
                    alt="Payment QR Code"
                    className="w-full max-w-[280px] md:max-w-[320px] aspect-square object-contain"
                  />
                </motion.div>
                <p className="mt-8 text-black/40 font-bold tracking-[0.2em] text-sm uppercase">
                  Scan to pay via UPI
                </p>
              </div>

              {/* Instructions Box */}
              <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 backdrop-blur-md">
                <h4 className="text-orange-500 font-bold mb-3 tracking-widest text-sm flex items-center gap-2">
                  <FiInfo /> INSTRUCTIONS
                </h4>
                <ul className="text-white/70 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    Scan the QR code and pay the exact amount.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    Take a clear screenshot of the confirmation.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    Upload it using the section on the right.
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Side: Upload Area */}
            <div className="flex-1 flex flex-col gap-6">
              <label
                htmlFor="screenshot-upload"
                className="flex-1 flex flex-col items-center justify-center border-[3px] border-dashed border-orange-500/50 hover:border-orange-500 rounded-[40px] cursor-pointer bg-white/5 hover:bg-orange-500/10 transition-all duration-500 relative group overflow-hidden"
              >
                {previewUrl ? (
                  <div className="absolute inset-0 p-4 flex items-center justify-center">
                    <motion.img
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      src={previewUrl}
                      alt="Screenshot Preview"
                      className="w-full h-full object-contain rounded-3xl"
                    />
                    <div className="absolute inset-0 bg-orange-600/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <FiUpload className="text-5xl text-white mx-auto mb-3" />
                        <p className="text-white font-black uppercase tracking-[0.2em] text-lg">
                          Change Image
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-8 flex flex-col items-center justify-center">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut",
                      }}
                    >
                      <FiPlus className="text-9xl text-orange-500 font-thin mb-6 opacity-80" />
                    </motion.div>
                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-[0.1em] leading-tight">
                      UPLOAD <br />
                      <span className="text-orange-500">SCREENSHOT</span>
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

              {/* Enhanced Warning */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-4 flex items-center gap-4"
              >
                <div className="bg-orange-500 p-2 rounded-lg">
                  <FiAlertCircle className="text-black text-xl" />
                </div>
                <div>
                  <p className="text-orange-500 font-bold text-xs tracking-widest uppercase mb-1">
                    Warning
                  </p>
                  <p className="text-white text-sm font-medium leading-relaxed">
                    Make sure your{" "}
                    <span className="text-orange-500 font-bold">
                      Transaction ID
                    </span>{" "}
                    is clearly visible in the screenshot.
                  </p>
                </div>
              </motion.div>

              {selectedFile && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(249, 115, 22, 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="primary-btn py-6 rounded-[24px] text-xl font-black tracking-[0.3em] uppercase w-full shadow-2xl"
                >
                  Confirm Payment
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Payment;
