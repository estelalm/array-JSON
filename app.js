/************************************************************************
 * Objetivo: Criação de uma API para manipular dados de estados e cidades
 * Data: 01/11/2023
 * Autor: Estela Alves de Moraes
 * Versão: 1.0
*************************************************************************/


//Para criar uma API podemos utilizar o EXPRESS (biblioteca em node que já possui as implementações para criar a API)
/*  console


    npm install expres -- save
        É a biblioteca que vai gerenciar as requisições da API  


    npm install body-parser --save 
        É a Biblioteca que vai manipular os dados do corpo da requisição (POST, PUT)


    npm install cors --save
        É a biblioteca resonsável pelas permissões (HEADER) de acesso  da requisição


*/


//Import das bibliotecas para criar a API
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


//Criando um objeto para manipular as requisições da API  (como instância de objeto no JAVA)
const app = express()

//request - Entrada de dados na API (recebe)
//response - Saída(return) de dados na API (devolve)

//pacotes no protocolo http - cabeçalho(header) - onde ficam as referências (de onde vem, pra onde, permissões)
//                          - corpo(body)


//Dizendo com o objeto app vai ser utilizado -> configuração de permissões, como a 
//api poderá ser utilizada  --- Função para manipular as retrições da API
app.use((request, response, next) =>{
    // (relacionado ao erro do cors no front-end)
    //a requisição é feita onde o front está hospedado (o servidor)
    //Permite especificar quem poderá acessar a API (* = liberar acesso público / IP = libera acesso apenas a máquna especificada)
    response.header('Access-Control-Allow-Origin', '*')
    //Quais métodos podem ser usados 
    response.header('Acesss-Control-Allow-Methods', 'GET')

    //Ativa as configurações de permissão no cors
    app.use(cors());

    //Passa para a próxima função, continuar o processamento 
    next()
})


//Body da mensagem, conteúdo
//EndPoints  -- API escutar os métodos -- para retornar


/*especificar como o endpoint será acionado -> assinatura ('nome -> analisar o que ele devolve', restrição(cors 
    tem todas as permissões de acesso para o endPoint), função async( manipular a função e aguardar outros processamentos)*/
app.get('/estados/sigla', cors(), async function(request, response, next){

    let controleEstadosCidades = require('./module/estados.js')
    let listaEstados = controleEstadosCidades.getListaDeEstados()

    //a resposta vai ser a função feita no módulo para mostrar as siglas dos estados
    if(listaEstados){
        response.json(listaEstados)
        //status -> funcionou
        response.status(200)
    }else{
        response.status()
    }

    next()
})



//Endpoint: filtrar dados do estado pela sigla
//encaminhar dados para o endpoint
// :sigla -> variável criada na url do endpoint
app.get('/estado/sigla/:uf', cors(), async function(request, response, next){

    //recebe a variável encaminhada como parâmetro na requisição
    let siglaEstado = request.params.uf

    let controleDadosEstado = require('./module/estados.js')
    let dadosEstado = controleDadosEstado.getDadosEstado(siglaEstado)

    if(dadosEstado){
        response.json(dadosEstado)
        response.status(200)
    }
    else{
        response.json({erro: 'item não encontrado'})
        response.status(404)
    }

    next()
})


//EndPoint: filtrar capital do estado pela sigla
//requisição por query
app.get('/capital/estado', cors(), async function(request, response, next){

    //recebe a variável encaminhada como query string na requisição
    //ex.: /capital/estado?uf=sp
    let siglaEstado = request.query.uf

    let controleDadosCapital = require('./module/estados.js')
    let dadosCapital = controleDadosCapital.getCapitalEstado(siglaEstado)

    if(dadosCapital){
        response.json(dadosCapital)
        response.status(200)
    }
    else{
        response.json({erro: 'item não encontrado'})
        response.status(404)
    }

    next()
})



//Endpoint: filtrar estados de uma região
app.get('/regioes/estados', cors(), async function(request, response, next){

    let regiaoPais = request.query.regiao

    let controleRegiao = require('./module/estados.js')
    let estadosRegiao = controleRegiao.getEstadosRegiao(regiaoPais)

    if(estadosRegiao){
        response.json(estadosRegiao)
        response.status(202)
    }
    else{
        response.json({erro: 'item não encontrado'})
        response.status(404)
    }

    next()
})



//Endpoint: listar os estados que já tiveram uma capital
app.get('/pais/capital', cors(), async function(request, response, next){

    let controleCapitais = require('/modulo/estados.js')
    let capitaisPais = controleCapitais.getCapitalPais()

    if(capitaisPais){
        response.json(capitaisPais)
        response.status(202)
    }else{
        response.json({erro: 'item não encontrado'})
        response.status(404)
    }
})


app.listen('8080', function(){
    console.log('API Funcionando!!')
})
