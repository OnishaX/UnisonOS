let Applist = ["Music", "Files", "Mailbox", "Settings"]
let InstalledApps = ["Music", "Error", "Files", "Mailbox", "Cells", "Write", "Show", "Settings"]
let Systemlist = ["Clock", "AppDrawer"]
let wallpaper = "1.jpg"
let RunningApps = []
let temp
let user = "template"

function MinimiseWindow(minimisingApp) {
  minimisingApp.String
  temp = String("#" + minimisingApp)
  $(temp + "App").css({ "display": "none" })

}

function LaunchSystem(systemApp) {
  temp = (document.getElementById("Drawer").className)
  console.log(temp)
  if (systemApp === "AppDrawer") {
    if ( temp = (document.getElementById("Drawer").className) == "DrawerClosed") {
      document.getElementById("Drawer").className = "DrawerOpen";
      document.getElementById("Display").className = "WindowsOverview";
      console.log(temp)
    } else {
      document.getElementById("Drawer").className = "DrawerClosed";
      document.getElementById("Display").className = "WindowsNormal";
      console.log(temp)
    }

  }
}

function CloseWindow(closingApp) {
  closingApp.String
  temp = String("#" + closingApp)
  $(temp + "App").remove()
  RunningApps.splice(RunningApps.indexOf(closingApp, 0), 1)
}

function LaunchWindow(launchingApp) {
  
  temp = String(launchingApp)
  if (RunningApps.includes(temp, 0) == false) {
    RunningApps.push(launchingApp)
    temp = RunningApps[RunningApps.length - 1]
    $("#Windows").append('<div class="AppContainer" id="' + temp + 'App"></div>');
    $('#' + String(temp + 'App')).load('/data/' + user + '/Apps/' + temp + '/App.html');
  }
  else {
    temp = String("#" + launchingApp)
    $(temp + "App").css({ "display": "grid" })
    console.log(temp + " is already running")
  }
  document.getElementById("Drawer").className = "DrawerClosed";
  document.getElementById("Display").className = "WindowsNormal";
}

function init() {
  console.log(RunningApps)
  document.getElementById("Display").style.backgroundImage = String("url(/data/" + user + "/Backgrounds/1.jpg)");

  displayPinnedList(Applist);
  displayAppList(InstalledApps);
  displaySystem(Systemlist);
  console.log("Init Triggered");

  new Sortable(AppList, {
    animation: 300,
    direction: 'horizontal',
    ghostClass: "DockAppIconGhost"
  });

  new Sortable(Windows, {
    animation: 300,
    direction: 'horizontal',
    ghostClass: 'ghost'
  });
  new Sortable(System, {
    animation: 300,
    direction: 'horizontal',
    ghostClass: "DockAppIconGhost"
  });
}

function displayPinnedList(Applist) {
  console.log("displayAppList Triggered")
  let html = "";
  for (let app of Applist) {
    html += `
				<button type="button" class="DockAppIcon" id="${app}AppIcon" onClick='LaunchWindow(` + `"` + `${app}` + `"` + `)' style="background-image: url(/data/` + user + `/Apps/${app}/AppIcon.svg)"></button>`;
  }
  console.log("dock appended")
  $("#AppList").html(html)
}
function displayAppList(InstalledApps) {
  console.log("displayAppList Triggered")
  let html = "";
  for (let app of InstalledApps) {
    html += `
				<button type="button" class="DockAppIcon" id="${app}AppIcon" onClick='LaunchWindow(` + `"` + `${app}` + `"` + `)' style="background-image: url(/data/` + user + `/Apps/${app}/AppIcon.svg)"></button>`;
  }
  console.log("dock appended")
  $("#AllApps").html(html)
}

function displaySystem(Systemlist) {
  console.log("displaySystemList Triggered")
  let html = "";
  for (let app of Systemlist) {
    html += `
				<button type="button" class="DockAppIcon" id="${app}" onClick='LaunchSystem(` + `"` + `${app}` + `"` + `)' style="background-image: url(/data/` + user + `/System/${app}/AppIcon.svg)"></button>`;
  }
  console.log("dock appended")
  $("#System").html(html)
}

init();
console.log("Init Trigger")