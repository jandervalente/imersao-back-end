import express from "express";
import routes from "./routes/postsRoutes.js";


//console.log(process.env.STRING_CONEXAO);

const app = express();
//aula 5 - servir arquivos estáticos
app.use(express.static("uploads"));

routes(app);


app.listen(3000, () => {
    console.log("servidor escutando ...");
});


/*  dados armazenados em memória --- AULA  2 ---
*
const posts = [
    { id: 1, descricao: "Uma foto teste", imagem: "https://placecats.com/millie/300/150" },
    { id: 2, descricao: "Gato fazendo yoga", imagem: "https://placecats.com/millie/300/150" },
    { id: 3, descricao: "Cachorro sorrindo", imagem: "https://placecats.com/millie/300/150" },
    { id: 4, descricao: "Paisagem montanhosa", imagem: "https://placecats.com/millie/300/150" },
    { id: 5, descricao: "Comida deliciosa", imagem: "https://placecats.com/millie/300/150" },
    { id: 6, descricao: "Citação inspiradora", imagem: "https://placecats.com/millie/300/150" }
  ];

app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});

function buscarPostPorID(id) {
    const index = posts.findIndex((post) => post.id === Number(id));
    if (index === -1) {
      return null; // Retorna null se o post não for encontrado
    }
    return index;
  }

app.get("/posts/:id", (req, res) => {
    const index = buscarPostPorID(req.params.id);
    if (index === null) {
      return res.status(404).json({ message: "Post não encontrado" }); // Retorna erro 404
    }
    res.status(200).json(posts[index]);
  });

*/
