// 1. RENDER UI UTAMA OLEH JS
const root = document.getElementById('app-root');
root.innerHTML = `
    <div class="card">
        <h1 class="title">DOWNLOAD VIDEO <span class="pink">NO WM</span></h1>
        <span class="brand">ENGINE BY BINTANG</span>
        
        <div class="input-group">
            <input type="text" id="urlInput" placeholder="TEMPEL LINK TIKTOK...">
        </div>
        
        <button id="execBtn" class="btn-main">EKSEKUSI SEKARANG!</button>
        <div id="loader">BINTANG SEDANG MEMPROSES...</div>
        <div id="displayArea"></div>
    </div>
`;

// 2. RENDER SUPPORT UI
const support = document.getElementById('support-root');
support.innerHTML = `
    <div class="support-container">
        <span class="sup-tag">Support Bintang:</span>
        <a href="https://whatsapp.com/channel/0029VbBoeHKGZNCj6vM2vV0H" target="_blank" class="icon wa">
            <i class="fab fa-whatsapp"></i>
        </a>
        <a href="https://tiktok.com/@BintongKrakatau" target="_blank" class="icon tt">
            <i class="fab fa-tiktok"></i>
        </a>
    </div>
`;

// 3. LOGIC & API HANDLING
let videoData = { play: '', music: '' };

const btn = document.getElementById('execBtn');
const input = document.getElementById('urlInput');
const loader = document.getElementById('loader');
const display = document.getElementById('displayArea');

btn.addEventListener('click', async () => {
    const url = input.value;
    if (!url) return alert("Linknya mana Jancok!");

    // UI Loading
    loader.style.display = 'block';
    display.innerHTML = '';

    try {
        const response = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
        const json = await response.json();

        if (json.code === 0) {
            const data = json.data;
            videoData.play = data.play;
            videoData.music = data.music;

            // RENDER HASIL KE UI SECARA DINAMIS
            display.innerHTML = `
                <div class="result-area">
                    <p style="font-size:10px; font-weight:900; color:#ff0055; margin-bottom:10px; text-align:left;">PREVIEW:</p>
                    <video src="${data.play}" controls poster="${data.cover}"></video>
                    <button class="dl-btn v-hd" onclick="forceDownload('video')">
                        <i class="fas fa-download"></i> DOWNLOAD VIDEO HD
                    </button>
                    <button class="dl-btn a-mp3" onclick="forceDownload('audio')">
                        <i class="fas fa-music"></i> DOWNLOAD MP3 (AUDIO)
                    </button>
                </div>
            `;
        } else {
            alert("Link Gak Valid atau Server Sibuk!");
        }
    } catch (err) {
        alert("Gagal koneksi ke API Bintang!");
    } finally {
        loader.style.display = 'none';
    }
});

// 4. DIRECT DOWNLOAD FUNCTION (BLOB)
window.forceDownload = async (type) => {
    const fileUrl = type === 'video' ? videoData.play : videoData.music;
    const ext = type === 'video' ? 'mp4' : 'mp3';
    
    try {
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const bUrl = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = bUrl;
        a.download = `BINTANG_DL_${Date.now()}.${ext}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(bUrl);
    } catch (e) {
        window.open(fileUrl, '_blank');
    }
};


