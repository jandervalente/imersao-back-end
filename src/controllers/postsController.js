import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js";
import fs from "fs";

import gerarDescricaoComGemini from "../services/geminiService.js";


export async function listarPosts(req, res) {
  // Define uma função assíncrona para listar todos os posts

  const posts = await getTodosPosts();
  // Chama a função getTodosPosts para obter todos os posts do banco de dados

  res.status(200).json(posts);
  // Envia uma resposta HTTP com status 200 (sucesso) e os posts em formato JSON
}

export async function postarNovoPost(req, res) {
  // Define uma função assíncrona para criar um novo post
  const novoPost = req.body;
  // Obtém os dados do novo post do corpo da requisição
  console.log('Dados recebidos:', novoPost);
  // Imprime os dados recebidos no console para fins de depuração
  try {
    const postCriado = await criarPost(novoPost);
    // Chama a função criarPost para inserir o novo post no banco de dados
    // Aguarda a conclusão da operação e armazena o post criado em uma variável
    res.status(200).json(postCriado);
    // Envia uma resposta HTTP com status 200 (sucesso) e o post criado em formato JSON
  } catch (erro) {
    // Captura qualquer erro que possa ocorrer durante a criação do post
    console.error(erro.message);
    // Imprime a mensagem de erro no console para fins de depuração
    res.status(500).json({"Erro":"Falha na requisição"});
    // Envia uma resposta HTTP com status 500 (erro interno do servidor) e uma mensagem de erro genérica
  }
}

// Aula 4 ----
export async function uploadImagem(req, res) {
  // Define uma função assíncrona para fazer upload de uma imagem e criar um novo post

  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: ""
  }
  // Cria um objeto para representar o novo post com as informações básicas

  console.log('Dados recebidos:', novoPost);
  // Imprime os dados recebidos no console para fins de depuração

  try {
    const postCriado = await criarPost(novoPost);
    // Chama a função criarPost para inserir o novo post no banco de dados

    // Aula 4
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    // Cria um novo nome para a imagem, utilizando o ID do post inserido

    fs.renameSync(req.file.path, imagemAtualizada);
    // Renomeia o arquivo da imagem para o novo nome e move-o para o diretório uploads

    // Aula 4
    res.status(200).json(postCriado);
    // Envia uma resposta HTTP com status 200 (sucesso) e o post criado em formato JSON
  } catch (erro) {
    // Captura qualquer erro que possa ocorrer durante o upload da imagem ou a criação do post
    console.error(erro.message);
    // Imprime a mensagem de erro no console para fins de depuração

    res.status(500).json({"Erro":"Falha na requisição"});
    // Envia uma resposta HTTP com status 500 (erro interno do servidor) e uma mensagem de erro genérica
  }
}

// aula 5 

export async function atualizarNovoPost(req, res) {
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/${id}.png`

      try {
      const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
      const descricao = await gerarDescricaoComGemini(imgBuffer);
      const post = 
      {
        imgUrl : urlImagem,
        descricao : descricao,
        //aula 6 --- uso do gemini para gerar texto a partir de imagem
        alt : req.body.alt
      }
      console.log('Dados recebidos:', post);
      const postCriado = await atualizarPost(id, post);
      res.status(200).json(postCriado);
      } catch (erro) {
          console.error(erro.message);
          res.status(500).json({"Erro":"Falha na requisição"});
     }
}
