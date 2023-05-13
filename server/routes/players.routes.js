const playerControl = require("../controllers/players.controller");

module.exports = (app) => {
    app.post("/players", playerControl.createNewPlayer);
    app.get("/players", playerControl.getAllPlayers);
    app.get("/players/:id", playerControl.getOnePlayer);
    app.delete("/players/:id", playerControl.deletePlayer);
    app.patch("/players/:id", playerControl.updatePlayer);
};