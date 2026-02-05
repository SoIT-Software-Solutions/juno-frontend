import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getEventByDays } from "../common/utils/eventUtils";
import { RegistrationForm } from "../components/RegistrationForm/RegistrationForm";
import { apiClient } from "../common/utils/apiClient";
import { RegistrationData } from "../common/types/eventTypes";
import { useNavigate } from "react-router-dom";

// This normalizeProfile made my day ngl
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
  const events = Number.isNaN(dayNumber) ? [] : getEventByDays(dayNumber);

  const eventParam = searchParams.get("event");
  const preselectEventId = eventParam ? Number(eventParam) : undefined;

  const [profile, setProfile] = useState<RegistrationData | null>(null);
  const [alreadyRegisteredEventIds, setAlreadyRegisteredEventIds] = useState<
    number[]
  >([]);
  const [isFirstTimeForDay, setIsFirstTimeForDay] = useState<boolean>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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

        if (firstTime) {
          alert("First time");
          alert(eventIds.length);
          console.log(regRes.data);
        } else {
          alert("You already did it");
        }
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

        setAlreadyRegisteredEventIds((prev) =>
          Array.from(new Set([...prev, ...data.events])),
        );
      }

      await apiClient.post("/profile/participant/update", {
        participant_name: data.name,
        college_name: data.college,
        department: data.department,
        academic_year:
          data.academicYear === "others" ? data.otherYear : data.academicYear,
        contact_number: data.phone,
      });

      alert("Submission success!");
      if (isFirstTimeForDay) {
        navigate("payment");
      }
    } catch (err) {
      console.error(err);
      alert("Submission failed");
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
      <RegistrationForm
        title={`Day ${dayNumber} Registration`}
        events={events}
        defaultEventId={preselectEventId}
        alreadyRegisteredEventIds={alreadyRegisteredEventIds}
        formData={profile}
        submitting={submitting}
        onFormChange={setProfile}
        onSubmit={handleSubmit}
        isFirstTimeForDay={isFirstTimeForDay}
      />
    </div>
  );
};
