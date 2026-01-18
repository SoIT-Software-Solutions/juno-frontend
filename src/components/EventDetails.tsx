import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getEventByID } from "../common/utils/eventUtils";
import { EventType } from "../common/types/eventTypes";

function EventDetails() {
  const { id } = useParams<{ id: string }>();

  const event: EventType | undefined = id
    ? getEventByID(parseInt(id))
    : undefined;

  if (!event) {
    return (
      <div className="h-[90vh] flex flex-col items-center justify-center gap-6">
        <p className="gold-text text-7xl font-black">Event not found</p>
        <a
          href="mailto:juno@gurunanakcollege.edu.in"
          className="px-6 py-3 border border-yellow-500 rounded-lg hover:bg-yellow-500/10"
        >
          Contact us
        </a>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-10 mt-20">
      <div className="flex justify-between items-center flex-wrap py-6">
        <motion.h1
          className="text-4xl font-bold gold-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {event.name}
        </motion.h1>

        <Link
          to={`/register/${event.day}?event=${event.id}`}
          className="bg-[var(--gold)] text-black px-16 py-3 rounded-lg"
        >
          Register
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <img
            src={event.image}
            className="rounded-xl border-4 border-yellow-500"
            alt={event.name}
          />

          <div className="bg-black/70 mt-6 p-6 rounded-lg border border-yellow-500">
            <table className="text-gray-200 w-full">
              <tbody>
                <tr>
                  <td>Venue:</td>
                  <td>{event.venue}</td>
                </tr>
                <tr>
                  <td>Date:</td>
                  <td>{event.date}</td>
                </tr>
                <tr>
                  <td>Contact:</td>
                  <td>{event.contact}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          className="bg-black/70 p-6 rounded-lg border border-yellow-500"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <img src={event.rule} alt="Rules" className="rounded-lg" />
        </motion.div>
      </div>
    </div>
  );
}

export default EventDetails;
