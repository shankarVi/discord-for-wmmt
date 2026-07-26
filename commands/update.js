const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("update")
        .setDescription("Post a WMMT server update")
        .addStringOption(option =>
            option
                .setName("version")
                .setDescription("Server version")
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName("title")
                .setDescription("Update title")
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName("changes")
                .setDescription("Update changes")
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {

        const version = interaction.options.getString("version");
        const title = interaction.options.getString("title");
        const changes = interaction.options.getString("changes");

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("🚗 WMMT Server Update")
            .addFields(
                { name: "📦 Version", value: version },
                { name: "📰 Title", value: title },
                { name: "🛠️ Changes", value: changes }
            )
            .setFooter({
                text: "WMMT Update Bot"
            })
            .setTimestamp();

        await interaction.reply({
            embeds: [embed]
        });

    }
};