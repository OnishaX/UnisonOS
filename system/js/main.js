let Applist = ["Scour", "Music", "Mailbox", "Settings"]
let InstalledApps = ["Scour", "Music", "Error", "Files", "Mailbox", "Cells", "Write", "Pitch", "Settings"]
let Systemlist = ["Clock", "AppDrawer"]
let wallpaper = "Swirl.png"
let RunningApps = []
let temp
let user = "template"

function init() {

  // import { LowSync, LocalStorage } from 'lowdb'

  // const adapter = new LocalStorage('db')
  // const db = new LowSync(adapter)

  // db.read()
  // db.data ||= { posts: [] }

  // db.data.posts.push({ title: 'lowdb' })

  // db.write()



  console.log(RunningApps)
  temp = document.getElementById("Display");
  temp.style.backgroundImage = String("url(/users/" + user + "/Backgrounds/" + wallpaper);

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
  var audio = new Audio('/system/sounds/Login.mp3');
  audio.play();
}



function FillWindow() {
  if (temp = (document.getElementById("Display").className) == "DisplayNormal") {
    document.getElementById("Display").className = "DisplayFullscreen";
  } else {
    document.getElementById("Drawer").className = "DrawerClosed";
    document.getElementById("Display").className = "DisplayNormal";
  }

}

function MinimiseWindow(minimisingApp) {
  minimisingApp.String
  temp = String("#" + minimisingApp)
  $(temp + "App").addClass('miniApp')
  sleep(500).then(() => {
    $(temp + "App").css({ "display": "none" })
    document.getElementById("Drawer").className = "DrawerClosed";
      document.getElementById("Dock").className = "";
      document.getElementById("Windows").className = "";
      document.getElementById("AllApps").className = "";
    document.getElementById("Display").className = "DisplayNormal";
    $(temp + "App").removeClass('miniApp')
  })
}
function ToggleSearch (searchApp) {
  temp = String("#" + searchApp + "Search")
  console.log(temp)

    if (document.getElementById(searchApp + "Search").className == "search") {
      $(temp).replaceWith(`'<button id="`+ searchApp + 'Search"  type="button" class="searchOpen"><i onclick="ToggleSearch('+ '`' + searchApp+ '`' + ')" class="ri-close-circle-line"></i><input autofocus="autofocus"type="text"</button>')
    } else {
      $(temp).replaceWith(`'<button id="`+ searchApp + 'Search" onclick="ToggleSearch('+ '`' + searchApp+ '`' + ')" type="button" class="search"><i class="ri-search-line"></i>Search</button>')
    }

}

function LaunchSystem(systemApp) {
  console.log(temp)
  if (systemApp === "AppDrawer") {
    if (temp = (document.getElementById("Drawer").className) == "DrawerClosed") {
      document.getElementById("Drawer").className = "DrawerDrawerOpen";
      document.getElementById("Dock").className = "DockDrawerOpen";
      document.getElementById("Windows").className = "WindowsDrawerOpen";
      document.getElementById("AllApps").className = "AllAppsDrawerOpen";

      console.log(temp)
    } else {
      document.getElementById("Drawer").className = "DrawerClosed";
      document.getElementById("Dock").className = "";
      document.getElementById("Windows").className = "";
      document.getElementById("AllApps").className = "";
      console.log(temp)
    }

  }
}
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function DeepLaunch(mainapp, jumppage) {
  LaunchWindow(mainapp)
  sleep(500).then(() => {
    LoadPage(mainapp, jumppage)
  })
}

function CloseWindow(closingApp) {
  closingApp.String
  temp = String("#" + closingApp);
  $(temp + "App").addClass('closeApp')
  sleep(500).then(() => {
    $(temp + "App").remove();
    RunningApps.splice(RunningApps.indexOf(closingApp, 0), 1)
    document.getElementById("Display").className = "DisplayNormal";
  })

}
function LoadPage(targetapp, newpage) {
  var TargetApp = String(targetapp);
  var NewPage = String(newpage);

  $('#' + TargetApp + "ScreenContainer").empty();
  $('#' + TargetApp + "ScreenContainer").append('<embed name="' + TargetApp + 'Screen" rel="preload" style="width: 100%; height: 100%; overflow:scroll; border-radius: 0.5em; border: none;" class="Body" id="' + TargetApp + 'Screen" src="/users/' + user + '/Apps/' + TargetApp + '/Screens/' + NewPage + '.html"></embed>');

  console.log(String(TargetApp + 'Body'));
  console.log(String(TargetApp + 'ScreenContainer'));
  console.log(String(TargetApp + 'Screen'));
  console.log(String('/users/' + user + '/Apps/' + TargetApp + '/Screens/' + NewPage + '.html'));
}

function LaunchWindow(launchingApp) {
  temp = String(launchingApp)
  // $('#' + String(temp + 'AppIcon')).addClass('bounce-top');

  if (RunningApps.includes(temp, 0) == false) {
    RunningApps.push(launchingApp)
    temp = RunningApps[RunningApps.length - 1]
    $("#Windows").append('<div class="AppContainer openApp" id="' + temp + 'App"></div>');
    $('#' + String(temp + 'App')).load('/users/' + user + '/Apps/' + temp + '/App.html');
    $(temp + "App").removeClass("openApp");
  }
  else {
    temp = String("#" + launchingApp);
    $(temp + "App").addClass('unMiniApp');
    $(temp + "App").css({ "display": "grid" })

    sleep(500).then(() => {
      $(temp + "App").removeClass("unMiniApp");
      console.log(temp + " is already running");
    })
  }
  // $('#' + String(temp + 'AppIcon')).removeClass('bounce-top');

  document.getElementById("Drawer").className = "DrawerClosed";
      document.getElementById("Dock").className = "";
      document.getElementById("Windows").className = "";
      document.getElementById("AllApps").className = "";
  document.getElementById("Display").className = "DisplayNormal";
  sleep(500).then(() => {
    $(String(temp + 'App')).removeClass('openApp');
  })
}

function displayPinnedList(Applist) {
  console.log("displayAppList Triggered")
  for (let app of Applist) {
    $("#AppList").append('<div class="DockAppIcon" id="' + app + 'PinnedAppIcon"></div>');
    $('#' + String(app + 'PinnedAppIcon')).load('/users/' + user + '/Apps/' + app + '/AppIcon.html');
  }
  console.log("dock appended")
}
function displayAppList(InstalledApps) {
  console.log("displayAppList Triggered")
  for (let app of InstalledApps) {
    $("#AllApps").append('<div class="DockAppIcon" id="' + app + 'AllAppIcon"></div>');
    $('#' + String(app + 'AllAppIcon')).load('/users/' + user + '/Apps/' + app + '/AppIcon.html');
  }
}

function displaySystem(Systemlist) {
  console.log("displaySystemList Triggered")
  for (let app of Systemlist) {
    $("#System").append('<div class="DockAppIcon" id="' + app + 'PinnedAppIcon"></div>');
    $('#' + String(app + 'PinnedAppIcon')).load('/users/' + user + '/System/' + app + '/AppIcon.html');
  }
  console.log("dock appended")
}

init();
console.log("Init Trigger")