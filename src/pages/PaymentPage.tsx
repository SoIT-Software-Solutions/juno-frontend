import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { apiClient } from "../common/utils/apiClient";

const PaymentPage = () => {
  const { day } = useParams<{ day: string }>();
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
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

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
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
      // window.location.href = "https://chat.whatsapp.com/H65JITps7qwF6ELa4s9D0B";
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
    <div className="min-h-screen pt-24 px-4 flex justify-center">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold mb-10 gold-text uppercase">
          Payment ₹100
        </h1>

        <div className="card-glass rounded-3xl p-8 flex flex-col md:flex-row gap-8">
          <div className="flex-1 bg-gray-200 rounded-2xl p-6 flex justify-center items-center">
            <img
              src="https://xbyquowixvhvfohybrni.supabase.co/storage/v1/object/sign/misc/juno%20payment%20qr.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNmEzM2U4Zi1mNzM3LTQ3YTgtODFmOS1mNzgyMjI5NjliMmIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtaXNjL2p1bm8gcGF5bWVudCBxci5qcGVnIiwiaWF0IjoxNzcwMjcwNzUwLCJleHAiOjE3NzI4NjI3NTB9.AuWGxILAHLLXGgPgC4nZ_rfSwJzOzpUmZeoWEzIKLIQ"
              alt="Payment QR"
              className="max-w-full"
            />
          </div>

          <div className="flex-1 flex flex-col items-center">
            <input
              type="file"
              id="file-upload"
              accept="image/*"
              onChange={onFileChange}
              className="hidden"
              disabled={uploading}
            />

            <label
              htmlFor="file-upload"
              className={`primary-btn py-4 px-6 rounded-xl text-xl font-bold cursor-pointer mb-6 text-center ${
                uploading ? "hidden" : ""
              }`}
            >
              {file ? "Change File" : "Upload Payment Proof"}
            </label>

            {preview && (
              <img
                src={preview}
                alt="Payment preview"
                className="w-full max-h-[400px] object-contain rounded-xl mb-6"
              />
            )}

            {error && (
              <p className="text-red-400 font-semibold mb-4 text-center">
                {error}
              </p>
            )}

            {file && (
              <motion.button
                onClick={submitPayment}
                disabled={uploading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="primary-btn py-4 rounded-xl text-xl font-bold disabled:opacity-50 w-full"
              >
                {uploading ? "UPLOADING..." : "Submit Payment"}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
