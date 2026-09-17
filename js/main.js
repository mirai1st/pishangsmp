const button_block = document.querySelectorAll("a");

button_block.forEach(btn => {
    btn.addEventListener("click", () => {
        new Audio('assets/sounds/mc-click.mp3').play();
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



// Loader

// Loader percentage
const loaderPercentEl = document.getElementById("loader-percent");
const loaderContainer = document.querySelector(".loader-container");

let progress = 0;

const progressInterval = setInterval(() => {
    // naik random sikit-sikit supaya nampak natural, tapi jangan lebih 90% sebelum betul-betul loaded
    progress += Math.random() * 10;
    if (progress > 90) progress = 90;

    loaderPercentEl.textContent = `${Math.floor(progress)}%`;
}, 200);

window.addEventListener('load', (event) => {
    clearInterval(progressInterval);
    loaderPercentEl.textContent = "100%";

    setTimeout(() => {
        // fade out loader
        loaderContainer.style.opacity = "0";
        loaderContainer.style.pointerEvents = "none";
        AOS.init();
        AOS.refreshHard();
        window.dispatchEvent(new Event("scroll"));
        requestAnimationFrame(() => {
            document.querySelectorAll("[data-aos]").forEach((element) => {
                element.classList.add("aos-animate");
            });
        });

        fetchPlayerCount();
        setInterval(fetchPlayerCount, 60000);

    }, 300);
});