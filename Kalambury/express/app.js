import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Strona główna");
});

app.get("/about", (req, res) => {
    res.send("O aplikacji");
});

app.get("/books", (req, res) => {
    res.send("Lista książek");
});

app.listen(PORT, () => {
    console.log(`Server running at
                http://localhost:${PORT}`);
});