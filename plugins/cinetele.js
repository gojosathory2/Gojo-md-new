const { cmd, commands } = require('../lib/command');
const { fetchJson } = require('../lib/functions');
const path = require('path');

cmd({
  pattern: "tele",
  alias: ["downurl"],
  use: '.download <link>',
  react: "🔰",
  desc: "Download and send document from URL.",
  category: "search",
  filename: __filename
}, async (conn, mek, m, {
  from, q, reply
}) => {
  try {
    if (!q) return reply("❗ කරුණාකර download link එකක් ලබා දෙන්න."); // Please provide a link

    const link = q.trim();
    const urlPattern = /^(https?:\/\/[^\s]+)/;

    if (!urlPattern.test(link)) {
      return reply("❗ දීලා තියෙන URL එක වැරදි. කරුණාකර link එක හොඳින් බලන්න."); // Invalid URL
    }

    // Extract original file name from URL
    let fileName = "Gojo-md ✻.mp4";
    try {
      const parsedUrl = new URL(link);
      const rawName = path.basename(parsedUrl.pathname);
      if (rawName && rawName.includes(".")) {
        fileName = decodeURIComponent(rawName);
      }
    } catch (err) {
      console.log("Filename parse error:", err);
    }

    // Caption
    const info = `*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱayura mihiranga  · · ·*`;

    await conn.sendMessage(from, {
      document: { url: link },
      mimetype: "video/mp4",
      fileName: fileName,
      caption: info
    }, { quoted: mek });

  } catch (e) {
    console.log("Download command error:", e);
    reply("🚫 Error: " + e.message);
  }
});
