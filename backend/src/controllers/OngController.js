const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

    /**
     * Retorna uma lista de Todas as Ongs cadastradas
     * @param {*} request 
     * @param {*} response 
     */
    async index(request, response){
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },
    
    /**
     * Cadastra uma Ong e retorna o ID da Ong Cadastrada
     * @param {*} request 
     * @param {*} response 
     */
    async create(request,response){
        
        const {nome, email, whatsapp, city, uf} = request.body;
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            nome,
            email,
            whatsapp,
            city,
            uf
        });

        return response.json({ id });
    }

}