const mongoose = require("mongoose");

const PlayerSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "player name is required"],
            minlength: [2, "Player Name must be at least 2 characters"],
        },
        preferredPosition: {
            type: String,
            enum: ["Forward", "Midfielder", "Goalkeeper"]
        },
        gameOneStatus: {
            type: String,
            enum: ["Playing", "Not Playing", "Undecided"],
            default: "Undecided",
        },
        gameTwoStatus: {
            type: String,
            enum: ["Playing", "Not Playing", "Undecided"],
            default: "Undecided",
        },
        gameThreeStatus: {
            type: String,
            enum: ["Playing", "Not Playing", "Undecided"],
            default: "Undecided",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Player", PlayerSchema);