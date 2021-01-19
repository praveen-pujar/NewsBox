const newsapp = "dev-news-app-v1"
const assets = [
    "/",
    "/index.php",
    "/home.html",
    "/src/index.js",
    "/src/styles.css",
    "/composer.json",
    "/src/img.jpg",
    "/src/news.jpg",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
      caches.open(newsapp).then(cache => {
        cache.addAll(assets)
      })
    )
  })


self.addEventListener("fetch", fetchEvent => {
  fetch.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})