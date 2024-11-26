
import express from "express"
import multer from "multer"
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../src/controllers/postsController.js";
import cors from  "cors";

const corsOptions = {
  origin: "https://localhost:8000",
  optionsSuccessStatus : 200
}


// Configura o armazenamento do Multer para uploads de imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Especifica o diretório para armazenar as imagens enviadas
      cb(null, 'uploads/'); // Substitua por seu caminho de upload desejado
    },
    filename: function (req, file, cb) {
      // Mantém o nome original do arquivo por simplicidade
      cb(null, file.originalname); // Considere usar uma estratégia de geração de nomes únicos para produção
    }
  });

// Cria uma instância do middleware Multer
const upload = multer({ storage: storage });

//linux e mac
//const upload = multer({dest:"./uploads"})

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions));

    app.get("/posts", listarPosts);
    app.post("/posts",  postarNovoPost);
    app.post("/upload", upload.single("imagem"), uploadImagem);
   //aula 5
    app.put("/upload/:id", atualizarNovoPost);

};

export default routes;