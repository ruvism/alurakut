import { SiteClient } from 'datocms-client';

export default async function getRequests(request, response){

    if (request.method === 'POST'){
        const TOKEN = 'd26aa0c7ebab2e5bd91b72bc48afaa';
        const client = new SiteClient(TOKEN);

        const registroCriado = await client.items.create({
            itemType: "1015059", // ID do model de "communities" criado pelo dato
            ...request.body,
            // title: "teste",
            // imageUrl: "https://placekitten.com/200/300",
            // externalLink: "https://placekitten.com/200/300",
            // creatorSlug: "ruvism"
        })

        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        })

        return;

    }
    response.status(404).json({
        message: "Não temos dados abertos disponíveis"
    })
    
}