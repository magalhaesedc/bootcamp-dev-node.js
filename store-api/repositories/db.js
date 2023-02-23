import pg from "pg";

async function connect() {
    if(global.connection) {
        return global.connection.connect();
    }
    const pool = new pg.Pool({
        connectionString: "postgresql://postgres:postgres@localhost:5432/store"
    });
    global.connection = pool;

    return pool.connect();
}

export {
    connect
}