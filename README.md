## Instruções para execução
###    1. Após clone local do repositório executar:
    * npm install -y
    
###    2. Acessar diretório raiz através do terminal e utilizar comandos a seguir:

    Execução dos testes automatizados pelo terminal:
    * npx cypress run  cypress/e2e/features/busca_cep/busca_cep.feature
     ou
    * npx cypress run --spec cypress/e2e/features/**/*.feature 

    Execução dos testes automatizados pelo cypress:
    * npx cypress open
     
    Gerar relatório de teste:
    * npm run generate-report
    
### OBSERVAÇÕES 
    Para aqueles que desejam quebrar esse lindo teste 😐😱 em alguns cenários utilizei fixture como entrada de dados dos CEPS, existem 3 arquivos com tipos de CEPS especificos para cada cenário e podemos edita-los para mudar o resultado das buscas ou causar comportamentos inesperados.  
    


## Início

Bem vindo ao teste de Quality Assurance da ONErpm!

Necessitamos de uma automação (frontend e backend) do serviço de Busca CEP dos Correios. Você deverá providenciar uma pesquisa de CEP utilizando as urls abaixo:

Frontend: https://www.correios.com.br/

Backend: https://viacep.com.br/

Será necessário validar pelo menos o retorno de 3 logradouros, ou seja, utilizando 3 CEPs na pesquisa.


## Instruções

* Faça um fork deste repositório e abra um PR quando estiver finalizado.


## Diferencial

* Utilizar um framework.
* Utilizar BDD.
* Incluir um relatório.


## O que será avaliado

* Fidelidade às instruções.
* Clean Code e boas práticas de código.
* Boas práticas de versionamento.


## Perfil que buscamos

* Comunicativo
* Autodidata
* Automotivado
* Curioso
* Gostar de trabalhar em equipe
* Compromissado

créditos para https://github.com/quan-to/qa-automation-challenge
