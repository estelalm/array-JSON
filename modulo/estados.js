/************************************************************
 * Objetivo: Criar um Back-End para no futuro integrar em uma API que terá como
objetivo trazer informações sobre os estados do Brasil.
 * Data: 18/10/2023
 * Autor: Estela Alve de Moraes
 * Versão: 1.0
 ***********************************************************/


var estados_cidades = require('./estados_cidades.js')
const estadosCidadesJSON = estados_cidades.estadosCidades

//Criar uma função (getListaDeEstados) que retorna a lista de todos os estados do Brasil (ok)
const getListaDeEstados = function (){
    let estados_cidades = estadosCidadesJSON
    let estados = estados_cidades.estados

    let estadosJSON = {}

    let listaEstados = []
    estados.forEach(function(estado){

        let sigla = estado.sigla
        listaEstados.push(sigla)
    })

    estadosJSON.uf = listaEstados
    estadosJSON.quantidade = listaEstados.length

    return estadosJSON
}

console.log()
console.log(getListaDeEstados())


//Criar uma função (getDadosEstado) que retorna as informações referente a um estado do Brasil, onde a sigla do estado será o critério de filtro. (ok)
const getDadosEstado = function(siglaRecebida){

    let siglaEstado = siglaRecebida

    let estados_cidades = estadosCidadesJSON
    let estados = estados_cidades.estados
    let estadoJSON = {}

    estados.forEach(function(estado){

        let sigla = estado.sigla
        let nome = estado.nome

        if(siglaEstado.toUpperCase().match(sigla.toUpperCase())){

            let capital = estado.capital
            let regiao = estado.regiao

            estadoJSON.uf = sigla
            estadoJSON.descricao = nome
            estadoJSON.capital = capital
            estadoJSON.regiao = regiao
        }

    })

    return estadoJSON

}

console.log()
console.log(getDadosEstado('sp'))

//Criar uma função (getCapitalEstado) que retorna as informações referente a capital de um estado do Brasil, onde a sigla do estado será o critério de filtro. (ok)
const getCapitalEstado = function(siglaRecebida){

    let siglaEstado = siglaRecebida

    let estados_cidades = estadosCidadesJSON
    let estados = estados_cidades.estados
    let estadoJSON = {}

    estados.forEach(function(estado){

        let sigla = estado.sigla
        let nome = estado.nome

        if(siglaEstado.toUpperCase().match(sigla.toUpperCase())){

            let capital = estado.capital

            estadoJSON.uf = sigla
            estadoJSON.descricao = nome
            estadoJSON.capital = capital
        }

    })

    return estadoJSON

}

console.log()
console.log(getCapitalEstado('Ac'))

//Criar uma função (getEstadosRegiao) que retorna as informações referente aos estados do Brasil conforme a sua região, onde a região será o critério de filtro. (ok)
const getEstadosRegiao = function(regiaoRecebida){

    let regiaoEstados = regiaoRecebida

    let estados_cidades = estadosCidadesJSON
    let estados = estados_cidades.estados
    let regiaoJSON = {}
    regiaoJSON.regiao = regiaoEstados

    let arrayEstados = []

    estados.forEach(function(estado){

        let regiao = estado.regiao
        
        if(regiao.toLowerCase().match(regiaoEstados.toLowerCase())){

            let estadoJSON ={}

            let sigla = estado.sigla
            let nome = estado.nome

            estadoJSON.uf = sigla
            estadoJSON.descricao = nome

            arrayEstados.push(estadoJSON)
        }

    })

    regiaoJSON.estados = arrayEstados
    return regiaoJSON

}

console.log()
console.log(getEstadosRegiao('sul'))

//Criar uma função (getCapitalPais) que retorna as informações referente aos estados que formam a capital do Brasil. (ok)
const getCapitalPais = function(){

    let estados_cidades = estadosCidadesJSON
    let estados = estados_cidades.estados
    let paisJSON = {}
    let arrayCapitais = []

    estados.forEach(function(estado){

        let eCapital =  estado.capital_pais
        
        if(eCapital){

            let capital_atual = estado.capital
            let uf = estado.sigla
            let descricao = estado.nome
            let capital = estado.capital
            let regiao = estado.regiao
            let inicio = estado.capital_pais.ano_inicio
            let final = estado.capital_pais.ano_fim

            let estadoJSON = {
                capital_atual: capital_atual,
                uf: uf,
                descricao: descricao,
                capital: capital,
                regiao: regiao,
                capital_pais_ano_inicio: inicio,
                capital_pais_ano_fim: final
            }

            arrayCapitais.push(estadoJSON)
        }

    })

    paisJSON.capitais = arrayCapitais

    return paisJSON
}

console.log()
console.log(getCapitalPais())

//Criar uma função (getCidades) que retorna uma lista de cidades, filtrado pela sigla do estado.
const getCidades = function (siglaRecebida){

    let siglaEstado = siglaRecebida

    let estados_cidades = estadosCidadesJSON
    let estados = estados_cidades.estados
    let estadoJSON = {}
    let cidadesArray = []

    estados.forEach(function(estado){

        let sigla = estado.sigla

        if(siglaEstado.toUpperCase().match(sigla.toUpperCase())){

            estadoJSON.uf = sigla
            estadoJSON.descricao = estado.nome

            let cidadesEstado = estado.cidades

            cidadesEstado.forEach(function(cidade){
                let nome = cidade.nome
                cidadesArray.push(nome)
            })

            estadoJSON.quantidade_cidades = cidadesArray.length
        }
    })
    estadoJSON.cidades = cidadesArray

    return estadoJSON

}

console.log()
console.log(getCidades('ac'))

module.exports = {
    getListaDeEstados,
    getCapitalEstado,
    getCapitalPais,
    getDadosEstado,
    getEstadosRegiao,
    getCidades
}
