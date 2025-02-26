import React from "react";

// Sample data
const teamData = [
  {
    name: "Abhijith A Kumar",
    profilePic: "profile1.jpg",
    schedule: [
      { date: 5, type: "leave" }, // Sky Blue
      { date: 12, type: "wfh" }   // Violet
    ]
  },
  {
    name: "Adarsh V",
    profilePic: "profile2.jpg",
    schedule: [
      { date: 7, type: "wfh" },   // Violet
      { date: 15, type: "leave" } // Sky Blue
    ]
  }
];

// Get all days in the month (February 2025)
const daysInMonth = Array.from({ length: 28 }, (_, i) => i + 1);

// Function to determine weekends (Sat & Sun)
const isWeekend = (day) => {
  const date = new Date(2025, 1, day); // February 2025 (Month 1)
  return date.getDay() === 0 || date.getDay() === 6; // Sunday (0) or Saturday (6)
};

const weekendName = (day) => {
  const date = new Date(2025, 1, day); // February 2025 (Month index 1)
  const dayOfWeek = date.getDay(); // Get the day of the week (0-6)
  
  if (dayOfWeek === 0) return "Su";
  if (dayOfWeek === 1) return "Mo";
  if (dayOfWeek === 2) return "Tu";
  if (dayOfWeek === 3) return "We";
  if (dayOfWeek === 4) return "Th";
  if (dayOfWeek === 5) return "Fr";
  if (dayOfWeek === 6) return "Sa";
  return "Not a weekend";
};

const getScheduleType = (day, schedule) => {
  for (let s of schedule) {
    if (day >= s.start && day <= s.end) {
      return s.type; // "leave" or "wfh"
    }
  }
  return null;
};

const TeamCalendar = () => {
  return (
    <div className="bg-gray-900 text-white p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <button className="px-3 py-1 bg-purple-500 rounded-md">&lt;</button>
        <h2 className="text-lg">February 2025</h2>
        <button className="px-3 py-1 bg-purple-500 rounded-md">&gt;</button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-[200px_repeat(28,_minmax(30px,_1fr))] gap-1 mt-4">
        
        {/* Header Row - Dates */}
        <div></div>
        {daysInMonth.map((day) => (
          <div key={day} className="text-center text-sm text-gray-400">
            {weekendName(day)}
          </div>
        ))}

        {/* Team Rows */}
        {teamData.map((member, index) => (
          <React.Fragment key={index}>
            {/* Member Info */}
            <div className="flex items-center gap-2">
              <img src={member.profilePic} alt={member.name} className="w-8 h-8 rounded-full" />
              <span>{member.name}</span>
            </div>

            {/* Calendar Days for Each Member */}
            {daysInMonth.map((day) => {
              const schedule = member.schedule.find((s) => s.date === day);
              const bgColor = schedule
                ? schedule.type === "leave"
                  ? "bg-sky-500" // Sky Blue for Leave
                  : "bg-violet-500" // Violet for WFH
                : isWeekend(day)
                ? "bg-yellow-500" // Yellow for weekends
                : "bg-transparent"; // Default

              return (
                <div key={day} className={`h-8 w-8 flex justify-center items-center rounded-full ${bgColor}`}>
                  {day}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TeamCalendar;
