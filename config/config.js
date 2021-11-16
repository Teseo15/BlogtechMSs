//? Este config se encagargara de exportar mis variables
export const base_url = "/api/v1";

export const DOMAIN = process.env.DOMAIN || "http://localhost";

export const port = process.env.PORT ||6000;

export const AUTH_PORT = process.env.AUTH_PORT || 5000;

export const secret = process.env.SECRET || "secret";

const mongo_local = "mongodb+srv://teseo55:admin123@mini-merm.1oegf.mongodb.net/blogtech";
// const mongo_remote =
// "mongodb+srv://root:6ixiU2NTTdQUOoY4@cluster0.wns0c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

export const db_url = process.env.DB_URL || mongo_local;
