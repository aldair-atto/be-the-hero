const connection = require('../database/connection');

module.exports = {
    /**
     * Retorna uma lista de Incidents
     * @param {*} request 
     * @param {*} response 
     */
    async index(request, response){
        const { page = 1 } = request.body;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs','ongs.id','incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*',
                     'ongs.name',
                     'ongs.email',
                     'ongs.whatsapp',
                     'ongs.city',
                     'ongs.uf'
            ]);
        
        response.header('X-Total-Count', count['count(*)']);
        return response.json(incidents);
    },

    /**
     * Cadastra um novo Incident
     * @param {*} request 
     * @param {*} response 
     */
    async create(request, response){
        const {title, description, values} = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            values,
            ong_id
        });

        return response.json({ id });

    },

    /**
     * Delete um Incident
     * @param {*} request 
     * @param {*} response 
     */
    async delete(request,response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        /**
         * Seleciona o incident pelo id e retorna ong_id
         */
        const incident = await connection('incidents').where('id', id).select('ong_id').first();

        /**
         * Verifica se a ong que cadastrou o incident é a mesma ong que está cadastrada
         */
        if(incident.ong_id != ong_id){
            return response.status(401).json({ error:'Operation not permitted.'+incident });
        }

        await connection('incidents').where('id',id).delete();
        
        return response.status(204).send();
        
    }
}