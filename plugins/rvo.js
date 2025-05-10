export default {
  name: ['rvo'],
  command: ['rvo', 'readviewonce', 'read', 'liat'],
  tags: 'main',
  owner: false,
  run: async (m, { sock, q }) => {
    try {
      if (!q || !q.msg || !q.msg.viewOnce) {
        return sock.reply(m.from, '🚩 Reply view once media to use this command.', m);
      }

      // Buka viewOnce dan forward media
      q.msg.viewOnce = false;
      await sock.relayMessage(m.from, q, { messageId: m.id, force: true });

    } catch (e) {
      console.error(e);
      sock.reply(m.from, 'Terjadi kesalahan:\n' + e.message, m);
    }
  }
};
