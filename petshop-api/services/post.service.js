import PostRepository from "../repositories/post.repository.js";

async function inserirPost(post){
    return PostRepository.criarPost(post);
}

async function buscarPosts(){
    return PostRepository.buscarPosts();
}

async function inserirComentario(comentario){
    return PostRepository.criarComentario(comentario);
}

export default {
    inserirPost,
    buscarPosts,
    inserirComentario
}