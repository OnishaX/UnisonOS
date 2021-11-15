let temp
let RunningApps = []
let History = []
let AppModel
let Usersettings = {
  Username: "template",
  Firstname: "Template",
  Lastname: "User",
  Wallpaper: "Swirl.png",
  Sounds: {
    Startup: true,
    Login: false,
    Logout: true,
    Shutdown: true,
    Alert: true,
    Error: true
  },
  PinnedApps: [
    "Scour",
    "Music",
    "Mailbox",
    "Settings",
    "Write"
  ],
  SystemApps: [
    "Clock",
    "AppDrawer"
  ],
  InstalledApps: [
    "Scour",
    "Music",
    "Error",
    "Files",
    "Mailbox",
    "Cells",
    "Write",
    "Pitch",
    "Settings"]
}

function init() {

  // import { LowSync, LocalStorage } from 'lowdb'

  // const adapter = new LocalStorage('db')
  // const db = new LowSync(adapter)

  // db.read()
  // db.data ||= { posts: [] }

  // db.data.posts.push({ title: 'lowdb' })

  // db.write()


  console.log("Init Triggered");
  console.log(RunningApps)
  temp = document.getElementById("Display");
  temp.style.backgroundImage = String("url(/users/" + Usersettings.Username + "/Backgrounds/" + Usersettings.Wallpaper);

  displayPinnedList();
  displayAppList();
  displaySystem();


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



  if (Usersettings.Sounds.Login == true) {
    var audio = new Audio('/system/sounds/Login.mp3');
    audio.play();
  }

  console.log("Init Complete");
}

function AdjustWindowTiling() {
  // if (RunningApps.length == 1) {
  //   $("#Windows").css("grid-template-columns", "100%")
  //   AppMode = "Full"
  // }
  // if (RunningApps.length == 2) {
  //   $("#Windows").css("grid-template-columns", "50%")
  //   AppMode = "Medium"
  // }
  // if (RunningApps.length == 3) {
  //   $("#Windows").css("grid-template-columns", "30%")
  //   AppMode = "Small"
  // }
}


function FillWindow() {
  if (temp = (document.getElementById("Display").className) == "DisplayNormal") {
    document.getElementById("Display").className = "DisplayFullscreen";
  } else {
    document.getElementById("Drawer").className = "DrawerClosed";
    document.getElementById("Display").className = "DisplayNormal";
  }
  AdjustWindowTiling()
}

function MinimiseWindow(minimisingApp) {
  minimisingApp.String
  temp = String("#" + minimisingApp)
  AdjustWindowTiling()
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
function ToggleSearch(searchApp) {
  temp = String("#" + searchApp + "Search")
  console.log(temp)

  if (document.getElementById(searchApp + "Search").className == "search") {
    $(temp).replaceWith(`'<button id="` + searchApp + 'Search"  type="button" class="searchOpen"><i onclick="ToggleSearch(' + '`' + searchApp + '`' + ')" class="ri-close-circle-line"></i><input autofocus="autofocus"type="text"</button>')
  } else {
    $(temp).replaceWith(`'<button id="` + searchApp + 'Search" onclick="ToggleSearch(' + '`' + searchApp + '`' + ')" type="button" class="search"><i class="ri-search-line"></i>Search</button>')
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
    $(temp + "RunningAppIcon").remove();
    RunningApps.splice(RunningApps.indexOf(closingApp, 0), 1)
    document.getElementById("Display").className = "DisplayNormal";
  })
  AdjustWindowTiling()

}
function LoadPage(targetapp, newpage) {
  var TargetApp = String(targetapp);
  var NewPage = String(newpage);

  $('#' + TargetApp + "ScreenContainer").empty();
  $('#' + TargetApp + "ScreenContainer").append('<embed name="' + TargetApp + 'Screen" rel="preload" style="width: 100%; height: 100%; overflow:scroll; border-radius: 0.5em; border: none;" class="Body" id="' + TargetApp + 'Screen" src="/users/' + Usersettings.Username + '/Apps/' + TargetApp + '/Screens/' + NewPage + '.html"></embed>');

  console.log(String(TargetApp + 'Body'));
  console.log(String(TargetApp + 'ScreenContainer'));
  console.log(String(TargetApp + 'Screen'));
  console.log(String('/users/' + Usersettings.Username + '/Apps/' + TargetApp + '/Screens/' + NewPage + '.html'));
  History.push(TargetApp(NewPage));
}

function LaunchWindow(launchingApp) {
  temp = String(launchingApp)
  // $('#' + String(temp + 'AppIcon')).addClass('bounce-top');
  // AdjustWindowTiling()

  if (Usersettings.PinnedApps.includes(temp, 0) == false) {
    $("#AppList").append('<div class="DockAppIcon" id="' + launchingApp + 'RunningAppIcon"></div>');
    $('#' + String(launchingApp + 'RunningAppIcon')).load('/users/' + Usersettings.Username + '/Apps/' + launchingApp + '/AppIcon.html');
  }

  if (RunningApps.includes(temp, 0) == false) {
    // AdjustWindowTiling()
    RunningApps.push(launchingApp)
    temp = RunningApps[RunningApps.length - 1]

    

    $("#Windows").append('<div class="AppContainer openApp" id="' + launchingApp + 'App"></div>');
    $('#' + String(temp + 'App')).load('/users/' + Usersettings.Username + '/Apps/' + temp + '/App.html');

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

function displayPinnedList() {
  console.log("displayAppList Triggered")
  $("#AppList").html('')
  for (let app of Usersettings.PinnedApps) {
    $("#AppList").append('<div class="DockAppIcon" id="' + app + 'PinnedAppIcon"></div>');
    $('#' + String(app + 'PinnedAppIcon')).load('/users/' + Usersettings.Username + '/Apps/' + app + '/AppIcon.html');
  }
  console.log("dock appended")
  for (let app of RunningApps) {
    $("#AppList").append('<div class="DockAppIcon" id="' + app + 'RunningAppIcon"></div>');
    $('#' + String(app + 'RunningAppIcon')).load('/users/' + Usersettings.Username + '/Apps/' + app + '/AppIcon.html');
  }
  console.log("runningapp appended")
}
function displayAppList() {
  console.log("displayAppList Triggered")
  for (let app of Usersettings.InstalledApps) {
    $("#AllApps").append('<div class="DockAppIcon" id="' + app + 'AllAppIcon"></div>');
    $('#' + String(app + 'AllAppIcon')).load('/users/' + Usersettings.Username + '/Apps/' + app + '/AppIcon.html');
  }
}

function displaySystem() {
  console.log("displaySystemList Triggered")
  for (let app of Usersettings.SystemApps) {
    $("#System").append('<div class="DockAppIcon" id="' + app + 'PinnedAppIcon"></div>');
    $('#' + String(app + 'PinnedAppIcon')).load('/users/' + Usersettings.Username + '/System/' + app + '/AppIcon.html');
  }
  console.log("dock appended")
}

init();
console.log("Init Trigger")