import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { FiPlus, FiUpload, FiInfo, FiAlertCircle } from "react-icons/fi";
import { apiClient } from "../common/utils/apiClient";

const PaymentPage = () => {
  const { day } = useParams<{ day: string }>();
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const res = await apiClient.get(
          `/event/register/payment/status?day_id=${day}`,
        );

        const state = res.data.state;

        if (
          state === "PAYMENT_DONE" ||
          state === "VERIFIED_PAYMENT" ||
          state === "NOT_REGISTERED"
        ) {
          navigate(`/register/${day}`, { replace: true });
          return;
        }

        setChecking(false);
      } catch {
        navigate("/google", { replace: true });
      }
    };

    if (day) {
      checkPaymentStatus();
    }
  }, [day, navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    const selected = e.target.files[0];
    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
    setError(null);
  };

  const submitPayment = async () => {
    if (!file || !day) {
      setError("Missing file or day");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("day_id", day);

    try {
      setUploading(true);
      await apiClient.post("/event/register/payment", formData);
      navigate(`/register/${day}/payment/success`, { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.error || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (checking) {
    return (
      <div className="pt-40 text-center text-white min-h-screen">
        Checking payment status...
      </div>
    );
  }

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
          {/* Background Glow */}
          <div className="absolute top-0 -left-20 w-80 h-80 bg-orange-600/20 rounded-full blur-[120px] -z-10 animate-pulse" />
          <div className="absolute bottom-0 -right-20 w-80 h-80 bg-yellow-600/10 rounded-full blur-[120px] -z-10" />

          <div className="p-6 md:p-10 flex flex-col lg:flex-row gap-8 items-stretch lg:min-h-[650px]">
            {/* LEFT SIDE — QR + Instructions */}
            <div className="flex-[1.2] flex flex-col gap-6">
              <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-[32px] overflow-hidden p-10 shadow-inner">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative p-4 bg-white rounded-2xl shadow-xl"
                >
                  <img
                    src="https://xbyquowixvhvfohybrni.supabase.co/storage/v1/object/sign/misc/juno%20payment%20qr.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNmEzM2U4Zi1mNzM3LTQ3YTgtODFmOS1mNzgyMjI5NjliMmIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtaXNjL2p1bm8gcGF5bWVudCBxci5qcGVnIiwiaWF0IjoxNzcwMjcwNzUwLCJleHAiOjE3NzI4NjI3NTB9.AuWGxILAHLLXGgPgC4nZ_rfSwJzOzpUmZeoWEzIKLIQ"
                    alt="Payment QR Code"
                    className="w-full max-w-[280px] md:max-w-[320px] aspect-square object-contain"
                  />
                </motion.div>
                <p className="mt-8 text-black/40 font-bold tracking-[0.2em] text-sm uppercase">
                  Scan to pay via UPI
                </p>
              </div>

              {/* Instructions */}
              <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 backdrop-blur-md">
                <h4 className="text-orange-500 font-bold mb-3 tracking-widest text-sm flex items-center gap-2">
                  <FiInfo /> INSTRUCTIONS
                </h4>
                <ul className="text-white/70 text-sm space-y-2">
                  <li>• Scan the QR code and pay ₹100.</li>
                  <li>• Take a clear screenshot of confirmation.</li>
                  <li>• Upload it on the right side.</li>
                </ul>
              </div>
            </div>

            {/* RIGHT SIDE — Upload */}
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
                      <div className="text-center">
                        <FiUpload className="text-5xl text-white mx-auto mb-3" />
                        <p className="text-white font-black uppercase tracking-[0.2em] text-lg">
                          Change Image
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-8 flex flex-col items-center justify-center">
                    <FiPlus className="text-9xl text-orange-500 mb-6 opacity-80" />
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
                  disabled={uploading}
                />
              </label>

              {/* Warning */}
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-4 flex items-center gap-4">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <FiAlertCircle className="text-black text-xl" />
                </div>
                <p className="text-white text-sm">
                  Make sure your{" "}
                  <span className="text-orange-500 font-bold">
                    Transaction ID
                  </span>{" "}
                  is clearly visible.
                </p>
              </div>

              {error && (
                <p className="text-red-400 text-center font-semibold">
                  {error}
                </p>
              )}

              {file && (
                <motion.button
                  onClick={submitPayment}
                  disabled={uploading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="primary-btn py-6 rounded-[24px] text-xl font-black tracking-[0.2em] uppercase w-full"
                >
                  {uploading ? "UPLOADING..." : "Confirm Payment"}
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentPage;
