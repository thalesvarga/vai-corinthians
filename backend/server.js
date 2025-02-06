const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { Low, JSONFile } = require("lowdb");

const app = express();
const port = process.env.PORT || 5001; // Usar a porta do ambiente ou 5001 localmente

app.use(cors({
  origin: ['http://localhost:3000', 'https://vai-corinthians-rho.vercel.app', 'http://localhost:5001']
}));
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public/imagens")); // Ajuste o caminho
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Instanciando o lowdb com o JSONFile
const adapter = new JSONFile(path.join(__dirname, "db.json"));
const db = new Low(adapter);

// Inicializando os dados caso não existam
async function initDB() {
  await db.read();
  db.data ||= { masculino: [], feminino: [] };
  await db.write();
}
initDB();

app.post("/jogadores", upload.single("imagem"), async (req, res) => {
  await db.read();

  const { nome, posicaoSelecionada, genero, ano } = req.body;
  const imagem = req.file ? `/imagens/${req.file.filename}` : null;

  if (!genero || (genero !== "masculino" && genero !== "feminino")) {
    return res.status(400).json({ erro: "Gênero inválido" });
  }

  const novoJogador = { nome, posicaoSelecionada, genero, ano, imagem };
  db.data[genero].push(novoJogador);

  await db.write();

  res.json({
    mensagem: "Jogador cadastrado com sucesso",
    jogador: novoJogador,
  });
});

app.get("/jogadores", async (req, res) => {
  await db.read();
  res.json(db.data);
});

// Iniciar o servidor localmente
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
}

module.exports = app;