if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/trackwellv2/sw.js', { scope: '/trackwellv2/' })})}