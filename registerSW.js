if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/moe-tools/sw.js', { scope: '/moe-tools/' })})}