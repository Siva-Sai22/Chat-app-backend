class ConnectionManager {
    constructor() {
        this.connections = new Map();
    }
    addConnection(email, ws) {
        this.connections.set(email, ws);
    }
    removeConnection(email) {
        this.connections.delete(email);
    }
    getConnection(email) {
        return this.connections.get(email);
    }
}
export default new ConnectionManager();
//# sourceMappingURL=connections.js.map