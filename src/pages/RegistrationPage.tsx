import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getEventByDays } from "../common/utils/eventUtils";
import { RegistrationForm } from "../components/RegistrationForm/RegistrationForm";
import { apiClient } from "../common/utils/apiClient";
// import { EventType } from "../common/types/eventTypes";

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

  const alreadyRegisteredEventIds: number[] = [6];

  const registrationFormOnSubmit = async (events: number[]) => {
    try {
      const res = await apiClient.post("/event/register", {
        day_id: dayNumber,
        event_Ids: events,
      });

      alert("Registered successfully");
      console.log(res);
    } catch (err: any) {
      const status = err.response?.status;
      const message = err.response?.data;

      if (status == 409) {
        alert(message);
      } else if (status == 500) {
        alert("Internal Server Error!");
      } else {
        alert("Something went wrong");
      }

      console.error("Registration error:", err);
    }
  };

  if (!events.length) {
    return (
      <div className="pt-40 text-center text-white">
        Invalid registration link
      </div>
    );
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
        onSubmit={(data) => {
          console.log("SUBMIT DATA →", {
            day: dayNumber,
            events: [data.events],
          });
          registrationFormOnSubmit(data.events);
        }}
      />
    </div>
  );
};
