export default {
  name: ['reactch'],
  command: ['reactch'],
  tags: 'tool',
  owner: false,
  run: async (m, { sock, text }) => {
    try {
      if (!text) {
        return sock.reply(m.from, 'Masukkan link channel WhatsApp dengan format yang benar.', m);
      }

      const match = text.match(/https:\/\/whatsapp\.com\/channel\/(\w+)(?:\/(\d+))?/);
      if (!match) {
        return sock.reply(m.from, 'URL tidak valid. Silakan periksa kembali.', m);
      }

      const channelId = match[1];
      const messageId = match[2];
      const reaction = text.split(" ").slice(1).join(" ") || '❤️';

      if (!messageId) {
        return sock.reply(m.from, 'ID chat tidak ditemukan dalam link yang diberikan.', m);
      }

      const data = await sock.newsletterMetadata("invite", channelId);
      if (!data) {
        return sock.reply(m.from, 'Newsletter tidak ditemukan atau terjadi kesalahan.', m);
      }

      await sock.newsletterReactMessage(data.id, messageId, reaction);
      sock.reply(m.from, 'Sukses mengirim reaction ke pesan di channel.', m);

    } catch (e) {
      console.error(e);
      sock.reply(m.from, `Terjadi kesalahan:\n${e.message}`, m);
    }
  }
};
