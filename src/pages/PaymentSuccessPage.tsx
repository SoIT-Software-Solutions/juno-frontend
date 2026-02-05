import { useEffect } from "react";
import { useParams } from "react-router-dom";

const WHATSAPP_LINK = "https://chat.whatsapp.com/H65JITps7qwF6ELa4s9D0B";

const isMobile = () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

const PaymentSuccessPage = () => {
  const { day } = useParams<{ day: string }>();

  useEffect(() => {
    if (isMobile()) {
      window.location.href = WHATSAPP_LINK;
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-3xl font-bold mb-4">Payment Successful!!</h1>

      <p className="text-gray-300 mb-6">
        Your payment has been received successfully. Join the WhatsApp group to
        stay updated.
      </p>

      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="primary-btn py-4 px-8 rounded-xl text-xl font-bold"
      >
        Join WhatsApp Group
      </a>

      <p className="text-sm text-gray-400 mt-4">
        On desktop? If WhatsApp Web isn’t logged in, open this link on your
        phone or log in via WhatsApp Web.
      </p>
    </div>
  );
};

export default PaymentSuccessPage;
