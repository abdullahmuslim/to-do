const staticCache = "static-cache-v1.0.2";
const assets = [
  "/",
  "index.html",
  "index.js",
  "config.js",
  "state.js",
  "components/AddTask.js",
  "components/DatePicker.js",
  "components/DateTimePicker.js",
  "components/DeleteModal.js",
  "components/Filters.js",
  "components/Menu.js",
  "components/TaskInfo.js",
  "components/Tasks.js",
  "components/TimePicker.js",
  "errorHandlers/errorPage.html",
  "icons/appIcons/task-list-128.png",
  "icons/appIcons/task-list-512.png",
  "icons/appIcons/task-list-72.webp",
  "icons/appIcons/task-list-96.webp",
  "icons/flaticon.svg",
  "icons/icons8-task-completed-16.png",
  "icons/icons8-task-completed-32.png",
  "icons/icons8-task-completed-70.png",
  "icons/icons8-task-completed-72.png",
  "icons/icons8-task-completed-96.png",
  "icons/icons8.svg",
  "icons/to-do.png",
  "modules/babel-helpers/asyncToGenerator.js",
  "modules/babel-helpers/classCallCheck.js",
  "modules/babel-helpers/createClass.js",
  "modules/babel-helpers/defineProperty.js",
  "modules/babel-helpers/extends.js",
  "modules/babel-helpers/inherits.js",
  "modules/babel-helpers/possibleConstructorReturn.js",
  "modules/babel-helpers/slicedToArray.js",
  "modules/babel-helpers/toArray.js",
  "modules/babel-helpers/toConsumableArray.js",
  "modules/plugin-babel.js",
  "modules/possibleConstructorReturn.js",
  "modules/react-dom.development.js",
  "modules/react-redux.min.js",
  "modules/react-router-dom.development.js",
  "modules/react-router.development.js",
  "modules/react.development.js",
  "modules/redux.js",
  "modules/regenerator-runtime.js",
  "modules/system.js",
  "modules/systemjs-babel-browser.js",
  "styles/desktop.css",
  "styles/mobile.css",
  "styles/style.css",
  "styles/tablet.css"
];

//cache files on install event
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(staticCache)
    .then(cache => {
      cache.addAll(assets);
    })
  );
})

//listen for activate event
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== staticCache).map(aCache => {
          caches.delete(aCache);
        })
      )
    })
  );
});

//listen for fetch event
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cacheRes => {
      return cacheRes || fetch(event.request)
    })
    .catch(() => {
      if (event.request.url.indexOf(".html") != -1){
        return caches.match('/errorHandlers/errorPage.html');
      }
    })
  )
})