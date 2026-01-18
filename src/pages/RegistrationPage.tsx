import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getEventByDays } from "../common/utils/eventUtils";
import { RegistrationForm } from "../components/RegistrationForm/RegistrationForm";
import { EventType } from "../common/types/eventTypes";

export const RegistrationPage: React.FC = () => {
  const { day } = useParams<{ day: string }>();
  const [searchParams] = useSearchParams();

  const dayNumber = day ? parseInt(day) : NaN;
  const events: EventType[] = isNaN(dayNumber) ? [] : getEventByDays(dayNumber);

  const preselectEvent = searchParams.get("event") || undefined;

  // Simulated "already registered" events for this user, for now frontend but backend work needed here
  const alreadyRegisteredEventIds: string[] = ["Paper_Presentation"];

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
          disabled: alreadyRegisteredEventIds.includes(e.id),
        }))}
        defaultEventId={preselectEvent}
        alreadyRegisteredEventIds={alreadyRegisteredEventIds}
        onSubmit={(data) =>
          console.log("SUBMIT DATA →", { day: dayNumber, ...data })
        }
      />
    </div>
  );
};
