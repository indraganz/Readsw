export default {
  name: ['readviewonce', 'read', 'liat', 'readvo', 'rvo'],
  command: ['readviewonce', 'read', 'liat', 'readvo', 'rvo'],
  tags: 'info',
  run: async (m, { sock }) => {
    try {
      if (!m.quoted || (!/imageMessage|videoMessage/.test(m.quoted.mtype))) {
        return sock.sendMessage(m.from, { text: '🚩 Reply view once media untuk menggunakan perintah ini.' }, { quoted: m });
      }

      const media = await m.quoted.download();
      const type = m.quoted.mtype.includes('video') ? 'video' : 'image';

      await sock.sendMessage(m.from, {
        [type]: media,
        caption: m.quoted.caption || ''
      }, { quoted: m });

    } catch (e) {
      console.error(e);
      return sock.sendMessage(m.from, { text: `Terjadi kesalahan:\n${e.message}` }, { quoted: m });
    }
  },
  location: __filename
};
