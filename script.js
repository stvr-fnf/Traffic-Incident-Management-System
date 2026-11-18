// 1. Authorized Government Officers Array (Objects)
var authorizedOfficers = [
  { email: "controller@traffic.gov.in", pass: "Control@123", name: "Rajesh Kulkarni", role: "Traffic Controller", initials: "RK" },
  { email: "dispatch@traffic.gov.in", pass: "Dispatch@123", name: "Ananya Sharma", role: "Dispatch Officer", initials: "AS" },
  { email: "supervisor@traffic.gov.in", pass: "Field@123", name: "Vikram Rathore", role: "Field Supervisor", initials: "VR" }
];

// 2. Initial Traffic Incidents Database (Objects with Method)
var incidents = [
  {
    id: "INC001",
    category: "Accident",
    location: "Main Gate Road",
    severity: "Critical",
    team: "Police / Ambulance",
    date: "2026-11-18",
    time: "09:15 AM",
    status: "Assigned",
    notes: "Two-car collision blocking north lane.",
    getSummary: function() {
      return this.id + " - " + this.category + " at " + this.location;
    }
  },
  {
    id: "INC002",
    category: "Vehicle Breakdown",
    location: "Sector 5 Crossing",
    severity: "Medium",
    team: "Recovery Team",
    date: "2026-11-18",
    time: "10:30 AM",
    status: "In Progress",
    notes: "City bus stalled near signal.",
    getSummary: function() {
      return this.id + " - " + this.category + " at " + this.location;
    }
  },
  {
    id: "INC003",
    category: "Traffic Congestion",
    location: "Highway Junction NH-44",
    severity: "High",
    team: "Traffic Control",
    date: "2026-11-18",
    time: "11:45 AM",
    status: "Reported",
    notes: "Heavy afternoon bottleneck at flyover entry.",
    getSummary: function() {
      return this.id + " - " + this.category + " at " + this.location;
    }
  },
  {
    id: "INC004",
    category: "Road Closure",
    location: "Market Road",
    severity: "Critical",
    team: "Road Maintenance",
    date: "2026-11-18",
    time: "12:20 PM",
    status: "Assigned",
    notes: "Water pipeline repair barrier setup.",
    getSummary: function() {
      return this.id + " - " + this.category + " at " + this.location;
    }
  },
  {
    id: "INC005",
    category: "Vehicle Breakdown",
    location: "Ring Road East",
    severity: "Low",
    team: "Recovery Team",
    date: "2026-11-17",
    time: "04:10 PM",
    status: "Resolved",
    notes: "Delivery van towed to service lane.",
    getSummary: function() {
      return this.id + " - " + this.category + " at " + this.location;
    }
  }
];

var nextIncidentNumber = 6;

// 3. Initialize Event Listeners when DOM is Ready
window.onload = function() {
  var demoButtons = document.querySelectorAll(".demo-item");
  for (var i = 0; i < demoButtons.length; i++) {
    demoButtons[i].addEventListener("click", function() {
      var email = this.getAttribute("data-email");
      var pass = this.getAttribute("data-pass");
      selectDemoAccount(this, email, pass);
    });
  }

  var loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleSignIn);
  }

  var signUpForm = document.getElementById("signUpForm");
  if (signUpForm) {
    signUpForm.addEventListener("submit", handleSignUp);
  }

  var incidentForm = document.getElementById("incidentForm");
  if (incidentForm) {
    incidentForm.addEventListener("submit", handleIncidentSubmit);
  }

  var logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  }

  var forgotLink = document.getElementById("forgotPassLink");
  if (forgotLink) {
    forgotLink.addEventListener("click", function(e) {
      e.preventDefault();
      alert("Contact Central Control Room IT Desk at 1800-110-450 to reset credentials.");
    });
  }
};

// 4. Fill Form When Tapping Any Sample Account Card
function selectDemoAccount(clickedCard, email, password) {
  var emailInput = document.getElementById("loginEmail");
  var passInput = document.getElementById("loginPassword");

  emailInput.value = email;
  passInput.value = password;

  var allCards = document.querySelectorAll(".demo-item");
  for (var i = 0; i < allCards.length; i++) {
    allCards[i].classList.remove("selected-demo");
    var badge = allCards[i].querySelector(".demo-tap-badge");
    if (badge) {
      badge.innerText = "Tap to Fill";
    }
  }

  clickedCard.classList.add("selected-demo");
  var activeBadge = clickedCard.querySelector(".demo-tap-badge");
  if (activeBadge) {
    activeBadge.innerText = "Selected ✓";
  }

  document.getElementById("signInBtn").focus();
}

// 5. Toggle Between Sign In and Sign Up Panels on Welcome Screen
function toggleAuthMode(mode) {
  var signInPanel = document.getElementById("signInPanel");
  var signUpPanel = document.getElementById("signUpPanel");
  var tabSignIn = document.getElementById("tabBtnSignIn");
  var tabSignUp = document.getElementById("tabBtnSignUp");

  if (mode === "signup") {
    signInPanel.classList.add("hidden");
    signUpPanel.classList.remove("hidden");
    tabSignIn.classList.remove("active");
    tabSignUp.classList.add("active");
    document.getElementById("regName").focus();
  } else {
    signUpPanel.classList.add("hidden");
    signInPanel.classList.remove("hidden");
    tabSignUp.classList.remove("active");
    tabSignIn.classList.add("active");
  }
}

// 6. Unlock Dashboard Helper
function openDashboardForOfficer(officer) {
  document.getElementById("officerInitials").innerText = officer.initials;
  document.getElementById("officerNameDisplay").innerText = officer.name;
  document.getElementById("officerRoleDisplay").innerText = officer.role;
  document.getElementById("welcomeOfficerName").innerText = officer.name;
  document.getElementById("welcomeOfficerRole").innerText = officer.role;

  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("dashboardScreen").classList.remove("hidden");
  renderDashboard();
}

// 7. Handle Officer Sign-In
function handleSignIn(event) {
  if (event) {
    event.preventDefault();
  }

  var enteredEmail = document.getElementById("loginEmail").value.trim().toLowerCase();
  var enteredPass = document.getElementById("loginPassword").value.trim();
  var matchedOfficer = null;

  for (var i = 0; i < authorizedOfficers.length; i++) {
    if (authorizedOfficers[i].email === enteredEmail && authorizedOfficers[i].pass === enteredPass) {
      matchedOfficer = authorizedOfficers[i];
      break;
    }
  }

  if (matchedOfficer !== null) {
    openDashboardForOfficer(matchedOfficer);
  } else {
    alert("Invalid email or password. Tap one of the Demo Accounts below the form to auto-fill valid credentials.");
  }
}

// 8. Handle Officer Sign-Up (New Account Registration)
function handleSignUp(event) {
  if (event) {
    event.preventDefault();
  }

  var fullName = document.getElementById("regName").value.trim();
  var badgeId = document.getElementById("regBadge").value.trim().toUpperCase();
  var role = document.getElementById("regRole").value;
  var email = document.getElementById("regEmail").value.trim().toLowerCase();
  var pass = document.getElementById("regPassword").value;
  var confirmPass = document.getElementById("regConfirmPassword").value;

  if (pass.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  if (pass !== confirmPass) {
    alert("Passwords do not match! Please re-enter the same password.");
    return;
  }

  for (var i = 0; i < authorizedOfficers.length; i++) {
    if (authorizedOfficers[i].email === email) {
      alert("An account with this email already exists. Please use Sign In instead.");
      toggleAuthMode("signin");
      document.getElementById("loginEmail").value = email;
      return;
    }
  }

  var parts = fullName.split(" ");
  var initials = parts[0].charAt(0).toUpperCase();
  if (parts.length > 1) {
    initials += parts[parts.length - 1].charAt(0).toUpperCase();
  } else {
    initials += "O";
  }

  var newOfficer = {
    email: email,
    pass: pass,
    name: fullName,
    role: role + " (" + badgeId + ")",
    initials: initials
  };

  authorizedOfficers.push(newOfficer);
  alert("Account created successfully for " + fullName + " (" + badgeId + ")! Signing you in...");
  document.getElementById("signUpForm").reset();
  openDashboardForOfficer(newOfficer);
}

// 9. Handle Logout
function handleLogout() {
  if (confirm("Are you sure you want to sign out of Traffic ControlDesk?")) {
    document.getElementById("dashboardScreen").classList.add("hidden");
    document.getElementById("loginScreen").classList.remove("hidden");
  }
}

// 10. Switch Sidebar Navigation Tabs
function switchTab(tabName) {
  var tabs = ["overview", "report", "map", "teams", "history"];
  var titles = {
    overview: "Dashboard",
    report: "Report Incident",
    map: "City Map View",
    teams: "Response Teams",
    history: "Incident History"
  };

  for (var i = 0; i < tabs.length; i++) {
    var current = tabs[i];
    document.getElementById("tab-" + current).classList.add("hidden");
    document.getElementById("nav-" + current).classList.remove("active");
  }

  document.getElementById("tab-" + tabName).classList.remove("hidden");
  document.getElementById("nav-" + tabName).classList.add("active");
  document.getElementById("pageHeading").innerText = titles[tabName];
}

// 11. Auto-Suggest Response Team using switch statement
function autoSuggestTeam() {
  var cat = document.getElementById("incCategory").value;
  var teamSelect = document.getElementById("incTeam");

  switch (cat) {
    case "Accident":
      teamSelect.value = "Police / Ambulance";
      break;
    case "Vehicle Breakdown":
      teamSelect.value = "Recovery Team";
      break;
    case "Traffic Congestion":
      teamSelect.value = "Traffic Control";
      break;
    case "Road Closure":
      teamSelect.value = "Road Maintenance";
      break;
    default:
      teamSelect.value = "Police / Ambulance";
  }
}

// 12. Submit New Traffic Incident
function handleIncidentSubmit(event) {
  if (event) {
    event.preventDefault();
  }

  var cat = document.getElementById("incCategory").value;
  var loc = document.getElementById("incLocation").value;
  var sev = document.getElementById("incSeverity").value;
  var dt = document.getElementById("incDate").value;
  var tm = document.getElementById("incTeam").value;
  var notes = document.getElementById("incNotes").value || "Dispatched by control room.";

  var paddedNum = nextIncidentNumber < 10 ? "00" + nextIncidentNumber : (nextIncidentNumber < 100 ? "0" + nextIncidentNumber : nextIncidentNumber);
  var newId = "INC" + paddedNum;
  nextIncidentNumber++;

  var newIncident = {
    id: newId,
    category: cat,
    location: loc,
    severity: sev,
    team: tm,
    date: dt,
    time: "Just Now",
    status: "Reported",
    notes: notes,
    getSummary: function() {
      return this.id + " - " + this.category + " at " + this.location;
    }
  };

  incidents.unshift(newIncident);
  document.getElementById("incidentForm").reset();
  document.getElementById("incDate").value = "2026-11-18";

  alert("Incident " + newId + " recorded and assigned to " + tm + "!");
  renderDashboard();
  switchTab("overview");
}

// 13. Advance Incident Status Workflow
function advanceStatus(index) {
  var currentStatus = incidents[index].status;

  if (currentStatus === "Reported") {
    incidents[index].status = "Assigned";
  } else if (currentStatus === "Assigned") {
    incidents[index].status = "In Progress";
  } else if (currentStatus === "In Progress") {
    incidents[index].status = "Resolved";
  } else {
    alert("Incident " + incidents[index].id + " is already Resolved.");
    return;
  }

  renderDashboard();
}

// 14. Delete Incident Record
function deleteIncident(index) {
  if (confirm("Remove record " + incidents[index].id + " from the log?")) {
    incidents.splice(index, 1);
    renderDashboard();
  }
}

// 15. Helper for Status Badge CSS Class
function getStatusBadgeClass(status) {
  switch (status) {
    case "Reported": return "badge badge-reported";
    case "Assigned": return "badge badge-assigned";
    case "In Progress": return "badge badge-progress";
    case "Resolved": return "badge badge-resolved";
    default: return "badge";
  }
}

// 16. Render All Dashboard Views (KPIs, Feed, Map Pins, Table)
function renderDashboard() {
  var total = incidents.length;
  var active = 0;
  var critical = 0;
  var reportedCount = 0;
  var assignedCount = 0;
  var progressCount = 0;
  var resolvedCount = 0;

  for (var i = 0; i < incidents.length; i++) {
    var item = incidents[i];
    if (item.status !== "Resolved") {
      active++;
    }
    if (item.severity === "Critical" && item.status !== "Resolved") {
      critical++;
    }

    if (item.status === "Reported") reportedCount++;
    else if (item.status === "Assigned") assignedCount++;
    else if (item.status === "In Progress") progressCount++;
    else if (item.status === "Resolved") resolvedCount++;
  }

  document.getElementById("kpiTotal").innerText = total;
  document.getElementById("kpiActive").innerText = active;
  document.getElementById("kpiCritical").innerText = critical;
  document.getElementById("kpiResolved").innerText = resolvedCount;
  document.getElementById("donutTotalText").innerText = total;

  document.getElementById("countReported").innerText = reportedCount;
  document.getElementById("countAssigned").innerText = assignedCount;
  document.getElementById("countProgress").innerText = progressCount;
  document.getElementById("countResolved").innerText = resolvedCount;

  // Live Dispatch Feed (Top 4 incidents)
  var feedHtml = "";
  var limit = incidents.length < 4 ? incidents.length : 4;
  for (var j = 0; j < limit; j++) {
    var f = incidents[j];
    feedHtml += "<li class='feed-item'>" +
      "<div class='feed-time'>" + f.time + "</div>" +
      "<div class='feed-details'>" +
        "<div class='feed-title'>" + f.category + " &mdash; " + f.location + "</div>" +
        "<div class='feed-meta'>" + f.id + " &middot; " + f.team + " &middot; Severity: " + f.severity + "</div>" +
      "</div>" +
      "<span class='" + getStatusBadgeClass(f.status) + "'>" + f.status + "</span>" +
    "</li>";
  }
  document.getElementById("liveFeedList").innerHTML = feedHtml;

  // SVG City Map Pins
  var coords = {
    "Main Gate Road": { x: 150, y: 170 },
    "Sector 5 Crossing": { x: 275, y: 90 },
    "Highway Junction NH-44": { x: 405, y: 170 },
    "Market Road": { x: 535, y: 90 },
    "Ring Road East": { x: 660, y: 170 }
  };

  var mapHtml = "";
  for (var m = 0; m < incidents.length; m++) {
    var inc = incidents[m];
    if (inc.status === "Resolved") continue;

    var pos = coords[inc.location] || { x: 400, y: 240 };
    var pinColor = "#166534";
    if (inc.severity === "Critical") pinColor = "#991b1b";
    else if (inc.severity === "High") pinColor = "#c2410c";
    else if (inc.severity === "Medium") pinColor = "#b8860b";

    mapHtml += "<g style='cursor:pointer;' onclick=\"alert('" + inc.getSummary() + "\\nSeverity: " + inc.severity + "\\nTeam: " + inc.team + "\\nStatus: " + inc.status + "')\">" +
      "<circle cx='" + pos.x + "' cy='" + pos.y + "' r='14' fill='" + pinColor + "' stroke='#ffffff' stroke-width='2.5'/>" +
      "<text x='" + pos.x + "' y='" + (pos.y + 4) + "' text-anchor='middle' font-family='Arial' font-size='10' font-weight='bold' fill='#ffffff'>" + inc.id.replace("INC", "") + "</text>" +
    "</g>";
  }
  document.getElementById("mapPinsLayer").innerHTML = mapHtml;

  // Filterable Incident History Table
  var searchVal = document.getElementById("searchInput").value.toLowerCase();
  var statusVal = document.getElementById("statusFilter").value;
  var rowsHtml = "";
  var visibleCount = 0;

  for (var k = 0; k < incidents.length; k++) {
    var row = incidents[k];
    var matchesText = row.id.toLowerCase().indexOf(searchVal) !== -1 ||
                      row.location.toLowerCase().indexOf(searchVal) !== -1 ||
                      row.category.toLowerCase().indexOf(searchVal) !== -1;
    var matchesStatus = (statusVal === "ALL" || row.status === statusVal);

    if (matchesText && matchesStatus) {
      visibleCount++;
      var sevClass = "sev-" + row.severity.toLowerCase();
      var actionBtn = row.status !== "Resolved"
        ? "<button type='button' class='btn-sm btn-advance' onclick='advanceStatus(" + k + ")'>Advance</button>"
        : "<span style='font-size:11px; color:#166534; font-weight:bold; margin-right:6px;'>Closed</span>";

      rowsHtml += "<tr>" +
        "<td><strong>" + row.id + "</strong></td>" +
        "<td>" + row.category + "</td>" +
        "<td>" + row.location + "</td>" +
        "<td class='" + sevClass + "'>" + row.severity + "</td>" +
        "<td>" + row.team + "</td>" +
        "<td>" + row.date + "</td>" +
        "<td><span class='" + getStatusBadgeClass(row.status) + "'>" + row.status + "</span></td>" +
        "<td>" + actionBtn + "<button type='button' class='btn-sm btn-delete' onclick='deleteIncident(" + k + ")'>Delete</button></td>" +
      "</tr>";
    }
  }

  if (visibleCount === 0) {
    rowsHtml = "<tr><td colspan='8' style='text-align:center; color:#6e5d58;'>No matching traffic incidents found.</td></tr>";
  }

  document.getElementById("incidentTableBody").innerHTML = rowsHtml;
  document.getElementById("tableFooterSummary").innerText = "Showing " + visibleCount + " of " + total + " total incident records";
}