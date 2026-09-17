const button_block = document.querySelectorAll("a");

button_block.forEach(btn => {
    btn.addEventListener("click", () => {
        new Audio('./assets/sounds/mc-click.mp3').play();
    })
})

// Player count updater 

async function fetchPlayerCount() {
    try {
        const res = await fetch('https://api.mcsrvstat.us/3/RepishangSMP.mcserver.us');
        const data = await res.json();

        const statusEl = document.querySelector('.top-status');

        if (data.online) {
            statusEl.innerHTML = `<span class="status-dot"></span> ${data.players.online} PLAYERS ONLINE`;
        } else {
            statusEl.innerHTML = `<span class="status-dot status-offline"></span> SERVER OFFLINE`;
        }
    } catch (err) {
        console.error('Failed to fetch server status:', err);
    }
}

fetchPlayerCount();
setInterval(fetchPlayerCount, 60000); // refresh setiap 60 saat
