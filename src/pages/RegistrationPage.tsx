import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getEventByDays } from "../common/utils/eventUtils";
import { RegistrationForm } from "../components/RegistrationForm/RegistrationForm";
import { apiClient } from "../common/utils/apiClient";
import { RegistrationData } from "../common/types/eventTypes";

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
  const { day } = useParams<{ day: string }>();
  const [searchParams] = useSearchParams();

  const dayNumber = Number(day);
  const events = Number.isNaN(dayNumber) ? [] : getEventByDays(dayNumber);

  const eventParam = searchParams.get("event");
  const preselectEventId = eventParam ? Number(eventParam) : undefined;

  const [profile, setProfile] = useState<RegistrationData | null>(null);
  const [profileLocked, setProfileLocked] = useState(false);
  const [alreadyRegisteredEventIds, setAlreadyRegisteredEventIds] = useState<
    number[]
  >([]);
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
        setProfileLocked(Boolean(profileRes.data.college_name));
        setAlreadyRegisteredEventIds(regRes.data?.event_ids ?? []);
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
        await apiClient.post(`/event/register`, {
          day_id: dayNumber,
          event_Ids: data.events,
        });

        setAlreadyRegisteredEventIds((prev) => [...prev, ...data.events]);
      }

      if (!profileLocked) {
        console.log(data.college);
        console.log(data.department);
        console.log(data.academicYear);
        console.log(data.phone);
        console.log(data.name);
        await apiClient.post("/profile/participant/update", {
          participant_name: data.name,
          college_name: data.college,
          department: data.department,
          academic_year:
            data.academicYear === "others" ? data.otherYear : data.academicYear,
          contact_number: data.phone,
        });

        setProfileLocked(true);
      }

      alert("Submission success!");
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
        profileLocked={profileLocked}
        submitting={submitting}
        onFormChange={setProfile}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
