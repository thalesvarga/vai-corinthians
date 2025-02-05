const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { Low, JSONFile } = require("lowdb");

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../front-end/public/imagens"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Instanciando o lowdb com o JSONFile
const adapter = new JSONFile('./db.json');
const db = new Low(adapter);

// Inicializando os dados caso não existam
async function initDB() {
  await db.read();
  db.data ||= { masculino: [], feminino: [] };
  await db.write();
}
initDB();

app.post("/jogadores", upload.single("imagem"), async (req, res) => {
  await db.read(); // Garantindo que os dados estão carregados antes de modificar

  const { nome, posicaoSelecionada, genero, ano } = req.body;
  const imagem = req.file ? `/imagens/${req.file.filename}` : null;

  if (!genero || (genero !== "masculino" && genero !== "feminino")) {
    return res.status(400).json({ erro: "Gênero inválido" });
  }

  const novoJogador = { nome, posicaoSelecionada, genero, ano, imagem };
  db.data[genero].push(novoJogador);

  await db.write(); // Salvando as alterações no arquivo

  res.json({
    mensagem: "Jogador cadastrado com sucesso",
    jogador: novoJogador,
  });
});

app.get("/jogadores", async (req, res) => {
  await db.read(); // Garantindo que os dados estão carregados antes de retornar
  res.json(db.data);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
