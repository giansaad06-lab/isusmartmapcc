const programs = [
  {
    name:"BS in Information Technology",
    college: "College of CCSICT",
    location: "CCSICT Building",
    link: "programs/bsit.html",
    image: "ccsict.png"
  },
  {
    name: "BS in Agriculture",
    college: "College of Agriculture",
    location: "IAT Building",
    link: "programs/agri.html",
    image: "agri.jpg"
  },
  {
    name: "BS in Political Science",
    college: "College of Law",
    location: "SAS Building",
    link: "programs/polsci.html",
    image: "polsci.png"
  },
  {
    name: "BS in Business Administration",
    college: "College of Business and Management",
    location: "New Building",
    link: "programs/bsba.html",
    image: "cbm.jpg"
  },
  {
    name: "BS in Secondary Education",
    college: "College of Education",
    location: "CED Old Building",
    link: "programs/secondary-ed.html",
    image: "secondaryeduc.jpg"
  },
  {
    name: "BS in Criminology",
    college: "College of Criminal and Justice Education",
    location: "CCJE Building",
    link: "programs/crim.html",
    image: "crim.jpg"
  },
  {
    name: "BS in Automotive",
    college: "College of Polytechnic",
    location: "PS Building",
    link: "programs/auto.html",
    image: "auto.png"
  }
];

function filterPrograms() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const filter = document.getElementById("collegeFilter").value;
  const list = document.getElementById("programList");
  list.innerHTML = "";

  const filtered = programs.filter(p => {
    const textMatch = (
      p.name.toLowerCase().includes(search) ||
      p.college.toLowerCase().includes(search) ||
      p.location.toLowerCase().includes(search)
    );
    const collegeMatch = filter === "all" || p.college === filter;
    return textMatch && collegeMatch;
  });

  if (filtered.length === 0) {
    list.innerHTML = `<p style="text-align: center; color: #999;">No results found.</p>`;
    return;
  }

  filtered.forEach(p => {
    const div = document.createElement("div");
    div.className = "program-card";
    div.innerHTML = `
      <a href="${p.link}" style="text-decoration: none; color: inherit;">
        <img src="${p.image}" alt="${p.name}" />
        <h3>${p.name}</h3>
        <p>${p.college}</p>
        <p>Located at: ${p.location}</p>
      </a>
    `;
    list.appendChild(div);
  });
}

window.onload = function () {
  filterPrograms();

  const map = L.map('map').setView([16.9385, 121.7645], 18);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const locations = [
    { name: "College of CCSICT", lat: 16.9379686, lng: 121.7639893 },
    { name: "College of Agriculture", lat: 16.9401390, lng: 121.7647525 },
    { name: "College of Law", lat: 16.9373171, lng: 121.7637492 },
    { name: "College of Business and Management", lat: 16.9360109, lng: 121.7645025 },
    { name: "College of Education", lat: 16.9365611, lng: 121.7646828 },
    { name: "College of Criminology", lat: 16.9393644, lng: 121.7652884 },
    { name: "College of Polytechnic", lat: 16.9387236, lng: 121.7642303 }
  ];

  const bounds = [];

  locations.forEach(loc => {
    const marker = L.marker([loc.lat, loc.lng]).addTo(map)
      .bindPopup(`<b>${loc.name}</b>`);
    bounds.push([loc.lat, loc.lng]);
  });

  map.fitBounds(bounds);
};