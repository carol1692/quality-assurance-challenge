import { Given } from "cypress-cucumber-preprocessor/steps";

    Given ("que usuário acessou página inicial dos Correios", () =>{
        cy.visit("https://www.correios.com.br/")
    })
    When ("ele clica no botão \'Busca CEP ou Endereço\'", () =>{
        return console.log("Teste 2")
    })
    Then ("é redirecionado para página \'Busca de CEP\'", () =>{
        return console.log("Teste 3 ")
    })