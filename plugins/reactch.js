export default {
  name: 'reactch',
  command: ['reactch'],
  tags: 'tool',
  run: async (m, { sock, text }) => {
    if (!text) {
      return sock.sendMessage(m.from, { text: 'Masukkan link channel WhatsApp dengan format yang benar.' }, { quoted: m });
    }

    const match = text.match(/https:\/\/whatsapp\.com\/channel\/(\w+)(?:\/(\d+))?/);
    if (!match) {
      return sock.sendMessage(m.from, { text: 'URL tidak valid. Silakan periksa kembali.' }, { quoted: m });
    }

    const channelId = match[1];
    const chatId = match[2];
    if (!chatId) {
      return sock.sendMessage(m.from, { text: 'ID chat tidak ditemukan dalam link yang diberikan.' }, { quoted: m });
    }

    try {
      const data = await sock.newsletterMetadata("invite", channelId);
      if (!data) {
        return sock.sendMessage(m.from, { text: 'Newsletter tidak ditemukan atau terjadi kesalahan.' }, { quoted: m });
      }

      await sock.newsletterReactMessage(data.id, chatId, text.split(" ").slice(1).join(" ") || '❤️');
      return sock.sendMessage(m.from, { text: 'Sukses mengirim reaction ke pesan di channel.' }, { quoted: m });

    } catch (e) {
      console.error(e);
      return sock.sendMessage(m.from, { text: `Terjadi kesalahan:\n${e.message}` }, { quoted: m });
    }
  },
  location: __filename
};
