import { events } from "../../data/eventData";
import { EventType } from "../types/eventTypes";

export const getEventByDays = (day: number): EventType[] => {
  return events.filter((e) => e.day === day);
};

export const getEventByID = (id: string): EventType | undefined => {
  return events.find((e) => e.id === id);
};
