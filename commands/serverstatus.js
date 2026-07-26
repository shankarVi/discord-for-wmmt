const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { checkPort } = require('../utils/checkPort');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverstatus')
    .setDescription('Check if the WMMT 6RR+ server is online'),

  async execute(interaction) {
    await interaction.deferReply();

    const host = process.env.WMMT_SERVER_IP;
    const port = parseInt(process.env.WMMT_SERVER_PORT, 10);

    const online = await checkPort(host, port);

    const embed = new EmbedBuilder()
      .setTitle('WMMT 6RR+ Server Status')
      .setColor(online ? 0x57F287 : 0xED4245)
      .setDescription(online ? '🟢 **Online**' : '🔴 **Offline**')
      .setFooter({ text: `${host}:${port}` })
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  },
};