import React, { useEffect, useState, useMemo } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { getEventByDays } from "../common/utils/eventUtils";
import { RegistrationForm } from "../components/RegistrationForm/RegistrationForm";
import { apiClient } from "../common/utils/apiClient";
import { RegistrationData } from "../common/types/eventTypes";

// Normalize profile
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
    } catch (err) {
      console.error(err);
      setInfoMessage("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!events.length)
    return (
      <div className="pt-40 text-center text-white min-h-screen">
        Invalid link
      </div>
    );
  if (loading || !profile)
    return (
      <div className="pt-40 text-center text-white min-h-screen">Loading…</div>
    );

  return (
    <div className="pt-28 pb-20 px-6 lg:px-20 min-h-screen">
      {infoMessage && (
        <div className="mb-6 text-center text-sm text-yellow-400 font-medium">
          {infoMessage}
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
