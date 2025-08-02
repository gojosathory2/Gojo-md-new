const { cmd } = require('../lib/command');

const emojiList = [
  "🔥", "💥", "❤️", "🖤", "🤍", "💙", "💚", "💛", "💜", "🧡",
  "😎", "🤖", "👻", "👽", "👾", "🎃", "😈", "😇", "🥶", "🥵",
  "😜", "😡", "😂", "😭", "😱", "🤯", "😴", "🤢", "🤡", "🤑",
  "👍", "👎", "👌", "🤞", "🙏", "💪", "👏", "🙌", "🫶", "🤙",
  "🎉", "🎊", "🎯", "🚀", "🛸", "🏆", "🥇", "🥈", "🥉", "🧨",
  "💣", "🪄", "🧬", "🌀", "🛡️", "🔮", "📢", "📣", "🗯️", "🔔",
  "⏰", "🧭", "📱", "💻", "🖥️", "🎮", "🎧", "📷", "📸", "📹",
  "💌", "✉️", "📦", "📬", "📝", "✏️", "📍", "📎", "📌", "🔗",
  "💯", "♻️", "✅", "❌", "⚠️", "🚫", "🔞", "💤", "📛", "🚨",
  "🧡", "💓", "💗", "💖", "💘", "💝", "🫀", "🫁", "💟", "👁️‍🗨️"
];

cmd({
  pattern: "reactburst",
  desc: "React to one message with 100 different emojis",
  category: "fun",
  use: ".reactburst (reply to a message)",
  filename: __filename
}, async (conn, m, { quoted }) => {
  if (!quoted) return m.reply("❗Reply to a message to burst react!");

  m.reply("💣 Sending 100 different emoji reacts...");

  for (let i = 0; i < emojiList.length; i++) {
    try {
      await conn.sendMessage(m.chat, {
        react: {
          text: emojiList[i],
          key: quoted.key,
        },
      });
    } catch (e) {
      console.log(`React failed at ${i}:`, e);
    }
    await new Promise(r => setTimeout(r, 300)); // Delay to avoid rate-limit
  }

  m.reply("✅ Done! 100 emojis sent.");
});
