import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiClock,
  FiPhone,
  FiArrowLeft,
  FiShield,
} from "react-icons/fi";
import { getEventByID } from "../common/utils/eventUtils";
import { EventType } from "../common/types/eventTypes";

function EventDetails() {
  const { id } = useParams<{ id: string }>();

  const event: EventType | undefined = id
    ? getEventByID(parseInt(id))
    : undefined;

  if (!event) {
    return (
      <div className="min-h-screen pt-40 flex flex-col items-center justify-center gap-8 relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[140px] -z-10" />

        <div className="text-center space-y-4">
          <p className="text-red-500 text-[10px] tracking-[0.8em] font-black uppercase">
            Error 404
          </p>
          <h1 className="gold-text text-6xl md:text-8xl font-black tracking-tighter uppercase">
            Not Found
          </h1>
        </div>

        <Link
          to="/events"
          className="flex items-center gap-3 px-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-white/60 hover:text-white hover:border-orange-500/50 transition-all uppercase text-[10px] tracking-[0.4em] font-black"
        >
          <FiArrowLeft className="text-lg" /> Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-40 pb-20 px-6 lg:px-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[140px] -z-10" />
      <div className="absolute bottom-1/4 -left-40 w-[500px] h-[500px] bg-yellow-600/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <Link
              to="/events"
              className="flex items-center gap-2 text-orange-500 text-[10px] tracking-[0.4em] font-black uppercase hover:translate-x-[-5px] transition-transform"
            >
              <FiArrowLeft /> Back to Events
            </Link>
            <h1 className="font-hanora text-5xl md:text-8xl gold-text uppercase font-normal">
              {event.name}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to={`/register/${event.day}?event=${event.id}`}
              className="primary-btn px-16 py-6 rounded-2xl inline-block"
            >
              REGISTER NOW
            </Link>
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Media & Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-12"
          >
            {/* Main Image */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-orange-500/10 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={event.image}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={event.name}
                />
              </div>
            </div>

            {/* Event Specs Card */}
            <div className="card-glass p-8 md:p-12 rounded-[3rem] border border-white/10 space-y-10">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-orange-500">
                    <div className="p-3 bg-orange-500/10 rounded-xl">
                      <FiMapPin className="text-xl" />
                    </div>
                    <span className="text-[10px] tracking-[0.4em] font-black uppercase">
                      Venue
                    </span>
                  </div>
                  <p className="text-white text-xl font-bold tracking-widest pl-2 uppercase">
                    {event.venue}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-orange-500">
                    <div className="p-3 bg-orange-500/10 rounded-xl">
                      <FiClock className="text-xl" />
                    </div>
                    <span className="text-[10px] tracking-[0.4em] font-black uppercase">
                      Schedule
                    </span>
                  </div>
                  <p className="text-white text-xl font-bold tracking-widest pl-2 uppercase">
                    {event.time}
                  </p>
                </div>
              </div>

              <div className="h-[1px] w-full bg-white/5" />

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-orange-500">
                  <div className="p-3 bg-orange-500/10 rounded-xl">
                    <FiPhone className="text-xl" />
                  </div>
                  <span className="text-[10px] tracking-[0.4em] font-black uppercase">
                    Event Coordinators
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 gap-6 pl-2">
                  {event.contact.map((c, i) => (
                    <div key={i} className="space-y-1">
                      <a href={`tel:${c.split("-")[0]}`} className="text-white/80 font-bold tracking-widest text-lg uppercase">
                        {c.split("-")[0]}
                      </a>
                      <a href={`tel:${c.split("-")[1]}`} className="text-orange-500/60 text-sm font-black tracking-widest uppercase">
                        {c.split("-")[1]}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Rules & Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-12"
          >
            <div className="card-glass p-8 md:p-8 rounded-[3rem] border border-white/10 space-y-10 relative overflow-hidden group">
              <FiShield className="absolute top-0 right-0 m-12 text-9xl text-orange-500 opacity-5 -rotate-12 transition-transform duration-700 group-hover:rotate-0" />

              <div className="space-y-0">
                <p className="text-orange-500 text-[10px] tracking-[0.6em] font-black uppercase">
                  Rulebook
                </p>
                <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">
                  Guidelines <br />{" "}
                  <span className="text-white/20 not-italic">
                    & Regulations
                  </span>
                </h2>
              </div>

              <div className="relative rounded-2xl overflow-hidden bg-black/40 border border-white/5">
                <img
                  src={event.rule}
                  alt="Rules"
                  className="w-full h-auto opacity-80"
                />
              </div>

              <p className="text-white/30 text-xs tracking-[0.2em] font-medium leading-relaxed uppercase">
                Note: Adherence to the specified guidelines is mandatory. Any
                violation may result in immediate disqualification from the
                session.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
