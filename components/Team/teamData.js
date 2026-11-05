const teamRoles = [
  { id: "organizer", category: "core", title: "Organizer" },
  { id: "co-organizer", category: "core", title: "Co-Organizer" },
  { id: "chief-coordinator", category: "core", title: "Chief Coordinator" },
  { id: "executive", category: "core", title: "Executive" },
  { id: "secretary", category: "core", title: "Secretary" },
  { id: "web-development", category: "tech", title: "Web Development" },
  { id: "ai-ml", category: "tech", title: "AI & ML" },
  { id: "cloud-devops", category: "tech", title: "Cloud / DevOps" },
  { id: "marketing-social-media", category: "non-tech", title: "Marketing / Social Media" },
  { id: "design", category: "non-tech", title: "Design" },
  { id: "event-logistics", category: "non-tech", title: "Event & Logistics" },
];

const existingImages = [
  "/team-member-1.jpg",
  "/team-member-2.jpg",
  "/team-member-3.jpg",
  "/team-member-4.jpg",
  "/team-member-5.jpg",
];

const teamData = teamRoles.map((role, index) => ({
  ...role,
  image: existingImages[index % existingImages.length],
  imageAlt: "Portrait of a GDGC MCET team member",
}));

export default teamData;
