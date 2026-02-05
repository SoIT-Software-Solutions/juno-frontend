import React, { useEffect, useState, useMemo } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { getEventByDays } from "../common/utils/eventUtils";
import { RegistrationForm } from "../components/RegistrationForm/RegistrationForm";
import { apiClient } from "../common/utils/apiClient";
import { RegistrationData } from "../common/types/eventTypes";

const WHATSAPP_LINK = "https://chat.whatsapp.com/H65JITps7qwF6ELa4s9D0B";

const normalizeProfile = (data: any): RegistrationData => ({
  name: data.participant_name ?? "",
  phone: data.contact_number ?? "",
  college: data.college_name ?? "",
  department: data.department ?? "",
  email: data.email ?? "",
  academicYear: data.academic_year ?? "",
  otherYear: "",
  events: [],
});

export const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const { day } = useParams<{ day: string }>();
  const [searchParams] = useSearchParams();
  const dayNumber = Number(day);

  const events = useMemo(
    () => (Number.isNaN(dayNumber) ? [] : getEventByDays(dayNumber)),
    [dayNumber],
  );

  const eventParam = searchParams.get("event");
  const preselectEventId = useMemo(
    () => (eventParam ? Number(eventParam) : undefined),
    [eventParam],
  );

  const [profile, setProfile] = useState<RegistrationData | null>(null);
  const [alreadyRegisteredEventIds, setAlreadyRegisteredEventIds] = useState<
    number[]
  >([]);
  const [isFirstTimeForDay, setIsFirstTimeForDay] = useState<boolean>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string>("");

  const [showWhatsappCard, setShowWhatsappCard] = useState(true);

  useEffect(() => {
    if (Number.isNaN(dayNumber)) return;

    const load = async () => {
      setLoading(true);
      try {
        const [profileRes, regRes] = await Promise.all([
          apiClient.get("/profile/participant"),
          apiClient.get(`/event/registrations/${dayNumber}`),
        ]);

        setProfile(normalizeProfile(profileRes.data));

        const eventIds = regRes.data?.event_ids ?? [];
        setAlreadyRegisteredEventIds(eventIds);

        const firstTime = eventIds.length === 0;
        setIsFirstTimeForDay(firstTime);

        setInfoMessage(
          firstTime
            ? "Welcome! Please register for events."
            : "Payment received! Register for more events.",
        );

        setShowWhatsappCard(!firstTime);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [dayNumber]);

  const handleSubmit = async (data: RegistrationData) => {
    setSubmitting(true);
    try {
      if (data.events.length > 0) {
        await apiClient.post("/event/register", {
          day_id: dayNumber,
          event_Ids: data.events,
        });
        setAlreadyRegisteredEventIds((prev) => [
          ...prev,
          ...data.events.filter((e) => !prev.includes(e)),
        ]);
      }

      await apiClient.post("/profile/participant/update", {
        participant_name: data.name,
        college_name: data.college,
        department: data.department,
        academic_year:
          data.academicYear === "others" ? data.otherYear : data.academicYear,
        contact_number: data.phone,
      });

      setInfoMessage("Submission successful!");
      if (isFirstTimeForDay) navigate("payment", { replace: false });
    } catch {
      setInfoMessage("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!events.length) {
    return (
      <div className="pt-40 text-center text-white min-h-screen">
        Invalid link
      </div>
    );
  }

  if (loading || !profile) {
    return (
      <div className="pt-40 text-center text-white min-h-screen">Loading…</div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-6 lg:px-20 min-h-screen">
      {infoMessage && (
        <div className="mb-6 text-center text-sm text-yellow-400 font-medium">
          {infoMessage}
        </div>
      )}

      {infoMessage === "Payment received! Register for more events." &&
        showWhatsappCard && (
          <div className="mb-10 flex justify-center">
            <div className="relative w-full max-w-3xl rounded-2xl border border-green-500/30 bg-green-500/10 p-6 sm:p-8 text-center">
              <button
                onClick={() => setShowWhatsappCard(false)}
                aria-label="Close"
                className="absolute top-3 right-3 text-green-300 hover:text-green-100 text-xl leading-none"
              >
                ×
              </button>

              <h2 className="text-xl sm:text-2xl font-bold text-green-400 mb-2">
                Join the WhatsApp Group
              </h2>

              <p className="text-sm sm:text-base text-gray-300 mb-6">
                Stay updated with announcements, schedules, and important
                instructions for the events you’ve registered for.
              </p>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-black font-bold transition"
              >
                Join WhatsApp Group
              </a>
            </div>
          </div>
        )}

      <RegistrationForm
        title={`Day ${dayNumber} Registration`}
        events={events}
        defaultEventId={preselectEventId}
        alreadyRegisteredEventIds={alreadyRegisteredEventIds}
        initialData={profile}
        submitting={submitting}
        onSubmit={handleSubmit}
        isFirstTimeForDay={isFirstTimeForDay}
      />
    </div>
  );
};
