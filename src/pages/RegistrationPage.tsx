import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getEventByDays } from "../common/utils/eventUtils";
import { RegistrationForm } from "../components/RegistrationForm/RegistrationForm";
import { apiClient } from "../common/utils/apiClient";

export const RegistrationPage: React.FC = () => {
  const { day } = useParams<{ day: string }>();
  const [searchParams] = useSearchParams();

  const dayNumber = Number(day);
  const events = Number.isNaN(dayNumber) ? [] : getEventByDays(dayNumber);

  const eventParam = searchParams.get("event");
  const preselectEventId =
    eventParam && !Number.isNaN(Number(eventParam))
      ? Number(eventParam)
      : undefined;

  const [alreadyRegisteredEventIds, setAlreadyRegisteredEventIds] = useState<
    number[]
  >([]);
  const [loadingRegistrations, setLoadingRegistrations] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (Number.isNaN(dayNumber)) return;

    const fetchRegistrations = async () => {
      setLoadingRegistrations(true);
      try {
        const res = await apiClient.get(`/event/registrations/${dayNumber}`);
        setAlreadyRegisteredEventIds(res.data?.event_ids ?? []);
      } catch (err) {
        console.error("Failed to fetch registrations", err);
      } finally {
        setLoadingRegistrations(false);
      }
    };

    fetchRegistrations();
  }, [dayNumber]);

  const registrationFormOnSubmit = async (events: number[]) => {
    setSubmitting(true);
    try {
      await apiClient.post("/event/register", {
        day_id: dayNumber,
        event_Ids: events,
      });

      const res = await apiClient.get(`/event/registrations/${dayNumber}`);
      setAlreadyRegisteredEventIds(res.data?.event_ids ?? []);

      alert("Registered successfully!");
    } catch (err: any) {
      const status = err.response?.status;
      const message = err.response?.data?.message || "Something went wrong";

      if (status == 409) {
        alert(message);
      } else if (status == 500) {
        alert("Internal Server Error!");
      } else {
        alert(message);
      }
      console.error("Registration error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!events.length) {
    return (
      <div className="pt-40 text-center text-white">
        Invalid registration link
      </div>
    );
  }

  if (loadingRegistrations) {
    return <div className="pt-40 text-center text-white">Loading Form</div>;
  }

  return (
    <div className="pt-28 pb-20 px-6 lg:px-20 min-h-screen">
      <RegistrationForm
        title={`Day ${dayNumber} Registration`}
        events={events.map((e) => ({
          id: e.id,
          name: e.name,
          image: e.image,
        }))}
        defaultEventId={preselectEventId}
        alreadyRegisteredEventIds={alreadyRegisteredEventIds}
        submitting={submitting}
        onSubmit={(data) => registrationFormOnSubmit(data.events)}
      />
    </div>
  );
};
