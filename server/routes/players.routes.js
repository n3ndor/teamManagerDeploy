const playerControl = require("../controllers/players.controller");

module.exports = (app) => {

    app.post("/api/players", playerControl.createNewPlayer);
    app.get("/api/players", playerControl.getAllPlayers);
    app.get("/api/players/:id", playerControl.getOnePlayer);
    app.delete("/api/players/:id", playerControl.deletePlayer);
    app.patch("/api/players/:id", playerControl.updatePlayer);

};