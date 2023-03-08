import { connect } from "./db.mongo.js";
import PostSchema from "../schemas/post.schema.js";

async function criarPost(post){
    try {
        const mongoose = await connect();
        const Post = mongoose.model("Post", PostSchema);
        post = new Post(post);
        await post.save();
    } catch (error) {
        throw error;
    }
}

async function buscarPosts(){
    try {
        const mongoose = await connect();
        const Post = mongoose.model("Post", PostSchema);
        const query = Post.find({});
        return await query.exec();
    } catch (error) {
        throw error;
    }
}

async function buscarPost(id){
    try {
        const mongoose = await connect();
        const Post = mongoose.model("Post", PostSchema);
        const query = Post.findOne({ _id: new mongoose.Types.ObjectId(id)});
        const result = await query.exec();
        //console.log(result);
        return result;
    } catch (error) {
        throw error;
    }
}

async function atualizarPost(post){
    try {
        const mongoose = await connect();
        const Post = mongoose.model("Post", PostSchema);
        await Post.findOneAndUpdate({_id: new mongoose.Types.ObjectId(post._id)}, post)
    } catch (error) {
        throw error;
    }
}

async function criarComentario(comentario){
    try {
        const post = await buscarPost(comentario.postId);
        post.comentarios.push({
            "nome": comentario.nome, "conteudo": comentario.conteudo
        });
        await atualizarPost(post);
    } catch (error) {
        throw error;
    }
}

export default {
    criarPost,
    buscarPosts,
    criarComentario
}