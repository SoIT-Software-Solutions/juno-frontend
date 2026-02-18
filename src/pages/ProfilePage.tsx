import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../common/utils/apiClient";
import { RegistrationData } from "../common/types/eventTypes";
import { getEventByID } from "../common/utils/eventUtils";
import { FormInput } from "../components/RegistrationForm/FormInput";
import { AcademicYearSelector } from "../components/RegistrationForm/AcademicYearSelector";
import {
  FiEdit2,
  FiSave,
  FiX,
  FiCheckCircle,
  FiCalendar,
  FiArrowRight,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { PriBtn } from "../components/ui/PriBtn";

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

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<RegistrationData | null>(null);
  const [tempProfile, setTempProfile] = useState<RegistrationData | null>(null);
  const [day1Events, setDay1Events] = useState<number[]>([]);
  const [day2Events, setDay2Events] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/", { replace: true });
    window.location.reload();
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [profileRes, day1Res, day2Res] = await Promise.all([
        apiClient.get("/profile/participant"),
        apiClient.get("/event/registrations/1"),
        apiClient.get("/event/registrations/2"),
      ]);

      const normalized = normalizeProfile(profileRes.data);
      setProfile(normalized);
      setTempProfile(normalized);
      setDay1Events(day1Res.data?.event_ids ?? []);
      setDay2Events(day2Res.data?.event_ids ?? []);
    } catch (err) {
      console.error("Failed to load profile", err);
      navigate("/google", { replace: true });
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempProfile) return;

    setSubmitting(true);
    try {
      await apiClient.post("/profile/participant/update", {
        participant_name: tempProfile.name,
        college_name: tempProfile.college,
        department: tempProfile.department,
        academic_year:
          tempProfile.academicYear === "others"
            ? tempProfile.otherYear
            : tempProfile.academicYear,
        contact_number: tempProfile.phone,
      });
      setProfile(tempProfile);
      setIsEditing(false);
      setMessage({ type: "success", text: "Profile updated successfully!" });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({
        type: "error",
        text: "Failed to update profile. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const updateField = (key: keyof RegistrationData, value: string) => {
    if (!tempProfile) return;
    setTempProfile({ ...tempProfile, [key]: value });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-40 flex flex-col items-center justify-center space-y-6">
        <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
        <p className="text-white/60 text-xs font-black tracking-[0.5em] uppercase animate-pulse">
          Loading your profile
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-40 pb-20 px-6 lg:px-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[140px] -z-10" />
      <div className="absolute bottom-1/4 -left-40 w-[500px] h-[500px] bg-yellow-600/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-left space-y-4"
          >
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-8 bg-orange-500/30" />
              <FiUser className="text-orange-500" />
              <p className="text-orange-500 text-[10px] tracking-[0.6em] font-black uppercase">
                User Dashboard
              </p>
            </div>
            <h1 className="text-6xl md:text-8xl gold-text uppercase tracking-tighter leading-none">
              My <span className="text-white">Profile</span>
            </h1>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleLogout}
            className="flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 rounded-2xl transition-all group w-fit"
          >
            <FiLogOut className="text-white/40 group-hover:text-red-500 transition-colors" />
            <span className="text-[10px] font-black tracking-[0.3em] text-white/40 group-hover:text-red-500 uppercase transition-colors">
              Logout Session
            </span>
          </motion.button>
        </div>

        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`text-center p-4 rounded-2xl ${
                message.type === "success"
                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                  : "bg-red-500/10 text-red-400 border border-red-500/20"
              }`}
            >
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-1 gap-12 items-start">
          {/* Top: Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-8 w-full"
          >
            <div className="card-glass p-8 md:p-12 rounded-[3rem] border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <FiUser className="text-8xl rotate-12 text-orange-500" />
              </div>

              <div className="relative space-y-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black tracking-[0.5em] text-orange-500 uppercase flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    Personal Details
                  </h3>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-3 bg-white/5 hover:bg-orange-500/20 rounded-xl border border-white/10 transition-all text-orange-500"
                      title="Edit Profile"
                    >
                      <FiEdit2 />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setTempProfile(profile);
                      }}
                      className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all text-white/40"
                    >
                      <FiX />
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleUpdateProfile} className="space-y-10">
                    <div className="grid md:grid-cols-2 gap-8">
                      <FormInput
                        label="Name"
                        value={tempProfile?.name ?? ""}
                        onChange={(v) => updateField("name", v)}
                      />
                      <FormInput
                        label="Phone"
                        value={tempProfile?.phone ?? ""}
                        onChange={(v) => updateField("phone", v)}
                      />
                      <FormInput
                        label="College"
                        value={tempProfile?.college ?? ""}
                        onChange={(v) => updateField("college", v)}
                        className="md:col-span-2"
                      />
                      <FormInput
                        label="Department"
                        value={tempProfile?.department ?? ""}
                        onChange={(v) => updateField("department", v)}
                      />
                      <AcademicYearSelector
                        value={tempProfile?.academicYear ?? ""}
                        onChange={(v) => updateField("academicYear", v)}
                        otherValue={tempProfile?.otherYear ?? ""}
                        onOtherChange={(v) => updateField("otherYear", v)}
                      />
                    </div>
                    <div className="flex justify-end pt-6">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={submitting}
                        className="primary-btn px-10 py-4 rounded-xl flex items-center gap-2 text-xs font-black tracking-widest"
                      >
                        {submitting ? (
                          "SAVING..."
                        ) : (
                          <>
                            <FiSave /> SAVE CHANGES
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                ) : (
                  <div className="grid md:grid-cols-2 gap-y-10 gap-x-12">
                    <InfoField label="FULL NAME" value={profile?.name} />
                    <InfoField label="CONTACT" value={profile?.phone} />
                    <InfoField label="COLLEGE" value={profile?.college} />
                    <InfoField label="DEPARTMENT" value={profile?.department} />
                    <InfoField
                      label="ACADEMIC YEAR"
                      value={profile?.academicYear}
                    />
                    <InfoField label="EMAIL ADDR" value={profile?.email} />
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* bottom: Registration Status */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="w-full card-glass p-8 rounded-[3rem] border border-white/10 space-y-10 overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <FiCalendar className="text-6xl -rotate-12 text-orange-500" />
              </div>

              <div className="space-y-2">
                <p className="text-orange-500 text-[10px] tracking-[0.5em] font-black uppercase">
                  Schedule
                </p>
                <h3 className="text-3xl font-black text-white tracking-tighter uppercase italic">
                  Registered <br />{" "}
                  <span className="text-white/20 not-italic">Events</span>
                </h3>
              </div>

              <div className="space-y-8 relative">
                <RegistrationDay
                  day={1}
                  events={day1Events}
                  onAdd={() => navigate("/register/1")}
                />
                <div className="h-[1px] w-full bg-white/5" />
                <RegistrationDay
                  day={2}
                  events={day2Events}
                  onAdd={() => navigate("/register/2")}
                />
              </div>
            </div>

            <PriBtn onClick={() => navigate("/events")} className="w-full py-6">
              BROWSE ALL EVENTS
            </PriBtn>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const InfoField: React.FC<{ label: string; value: string | undefined }> = ({
  label,
  value,
}) => (
  <div className="space-y-1">
    <p className="text-[10px] tracking-[0.4em] text-white/20 font-black uppercase">
      {label}
    </p>
    <p className="text-white text-lg font-bold tracking-widest uppercase">
      {value || "—"}
    </p>
  </div>
);

const RegistrationDay: React.FC<{
  day: number;
  events: number[];
  onAdd: () => void;
}> = ({ day, events, onAdd }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h4 className="text-[10px] tracking-[0.4em] font-black uppercase text-orange-500/60">
        Day 0{day}
      </h4>
      <span className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-black tracking-widest text-white/40 border border-white/5">
        {events.length} EVENTS
      </span>
    </div>

    <div className="space-y-2">
      {events.length > 0 ? (
        events.map((id) => {
          const event = getEventByID(id);
          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between group/item hover:border-orange-500/30 transition-all"
            >
              <p className="text-xs font-bold tracking-widest text-white/80 group-hover/item:text-white uppercase transition-colors">
                {event?.name ?? `Event ${id}`}
              </p>
              <FiCheckCircle className="text-green-500 opacity-60" />
            </motion.div>
          );
        })
      ) : (
        <div className="p-4 bg-white/5 rounded-2xl border border-dashed border-white/10 text-center">
          <p className="text-[10px] tracking-widest text-white/20 font-bold">
            NO REGISTRATIONS
          </p>
        </div>
      )}

      <button
        onClick={onAdd}
        className="w-full p-4 rounded-2xl border border-white/5 hover:border-orange-500/20 hover:bg-orange-500/5 transition-all group/add flex items-center justify-center gap-3"
      >
        <span className="text-[9px] font-black tracking-[0.3em] text-white/20 group-hover/add:text-orange-500 transition-colors uppercase">
          {events.length > 0 ? "Add More" : "Register Now"}
        </span>
        <FiArrowRight className="text-white/10 group-hover/add:text-orange-500 group-hover/add:translate-x-1 transition-all" />
      </button>
    </div>
  </div>
);
