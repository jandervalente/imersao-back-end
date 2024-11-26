import 'dotenv.config';
//aula 5 google
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js";


const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getTodosPosts() {
    const db = conexao.db("imersao-back-end");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}

/*
export async function criarPost(novoPost)
{
    const db = conexao.db("imersao-back-end");
    const colecao = db.collection("posts");
    console.log(novoPost);
    return colecao.insertOne(novoPost)
   
}
*/

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-back-end");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost)
}

export async function atualizarPost(id, novoPost) 
{
    const db = conexao.db("imersao-back-end");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    //pega o id e poe no formato que o mongo entenda
    return colecao.updateOne({_id:new ObjectId(objID)}, {$set:novoPost})
}



