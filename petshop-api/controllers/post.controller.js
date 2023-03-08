import PostService from "../services/post.service.js";

async function inserirPost(req, res, next){
    try {
        let post = req.body;
        if(!post.titulo || !post.conteudo){
            throw new Error("Título e Conteúdo são obrigatórios.");
        }
        post = await PostService.inserirPost(post);
        res.send(post);
        logger.info(`POST /post - ${JSON.stringify(post)}`);
    } catch (err) {
        next(err);
    }
}

async function buscarPosts(req, res, next){
    try {
        res.send(await PostService.buscarPosts());
        logger.info("GET /post");
    } catch (err) {
        next(err);
    }
}

async function inserirComentario(req, res, next){
    try {
        let comentario = req.body;
        if(!comentario.nome || !comentario.conteudo || !comentario.postId){
            throw new Error("Post ID, Nome e Conteúdo são obrigatórios.");
        }
        comentario = await PostService.inserirComentario(comentario);
        res.send(comentario);
        logger.info(`POST /post/comentario - ${JSON.stringify(comentario)}`);
    } catch (err) {
        next(err);
    }
}

export default {
    inserirPost,
    buscarPosts,
    inserirComentario
}