import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

let listCeps = [];
let apiResponses = [];

//1. Scenario: Usuário preenche formulário de busca de CEP sem preencher CAPTCHA
Given ("Usuário está na página \'Busca de CEP\'", () =>{
    cy.visit("https://buscacepinter.correios.com.br/app/endereco/index.php?")
})
When ("usuário preenche campo \'Digite um CEP ou um Endereço\'" , () =>{
    cy.get("#endereco").clear().type(13400830)
})
When ("clica no botão \'Buscar\'", () =>{
    cy.get("#btn_pesquisar").click()
})
Then("recebe mensagem de aviso {string}", (infoMessage) => {
  cy.get("#alerta.aberto").find("div.msg").should("contain.text", infoMessage);
});


//2. Scenario: Usuário tenta submeter várias vezes formulário de busca de CEP sem preencher CAPTCHA
Given ("Usuário está na página \'Busca de CEP\'", () =>{
    cy.visit("https://buscacepinter.correios.com.br/app/endereco/index.php?")
})
When ("usuário preenche campo \'Digite um CEP ou um Endereço\' ", () =>{
    cy.get("#endereco").clear().type(13400830)
})
When ("clica no botão \'Buscar\' por {int} vezes", (cliques) =>{
    const getButton = cy.get("#btn_pesquisar")
    for(let i= 1; i<=cliques; i++ ){
      getButton.click()
    }
})
Then ("recebe mensagem {string}", (infoMessage) =>{
    cy.get("#alerta.aberto").find("div.msg").should("contain.text", infoMessage);
})
Then ("bordas de input Captcha se torna vermelho", () =>{
    cy.get("#captcha").should("contain.class", "controle invalid");
})

//3. Scenario: Lista de opções 'Esse CEP é de:' deve conter no mínimo opção 'Todos' 
Given ("Usuário está na página \'Busca de CEP\'", () => {
    cy.visit("https://buscacepinter.correios.com.br/app/endereco/index.php?")
})
When ("usuário seleciona campo de formulário \'Esse CEP é de:\'", () => {
    cy.get("select#tipoCEP")
})
Then("lista deve conter 1 ou mais categorias de buscas", () => {
    cy.get("select#tipoCEP option").should("have.length.greaterThan", 1)
    cy.get("select#tipoCEP option:selected").should("have.text", "Todos")
})

Then("categoria selecionada por default deve ser {string}", (categoria) => {
    cy.get("select#tipoCEP option:selected").should("have.text", categoria)
})


//4. Scenario: Pesquisa de CEP através de API com sucesso (utilizando fixture)
Given("temos lista de CEPs válidos e bem formatados em um arquivo {string}", (cepsFile) => {
  cy.fixture(cepsFile).then((data) => {
    listCeps = data;
  });
});

When("request GET é enviada utilizando CEPs", () => {
  apiResponses = [];
 
	cy.wrap(listCeps).each((cep) => {
		cy.request(
      		`https://viacep.com.br/ws/${cep}/json/`
		).then((response) => {
			expect(response.status).to.eq(200);
			apiResponses.push(response.body); 
		});
  });
});

Then("API retorna json com dados do logradouro", () => {
	apiResponses.forEach((response) => {
		expect(response).to.have.property("logradouro");
		expect(response.logradouro).to.be.a("string").and.not.be.empty;
	});
});

//5. Scenario: Pesquisa de CEP através de API com falha por má formatação de dados (utilizando fixture)
Given ("temos lista de CEPs mal formatados em um arquivo {string}", (badCepsFile) => {
    cy.fixture(badCepsFile).then((data) => {
    	listCeps = data;
  	});
})

When ("request GET é enviada utilizando CEPs com formatação incorreta", () => {
    apiResponses = [];
 
    cy.wrap(listCeps).each((cep) => {
        cy.request({
            url:`https://viacep.com.br/ws/${cep}/json/`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            apiResponses.push(response.body); 
        });
  	});
})

Then ("API retorna página com {string}", (msgRequest) => {
    apiResponses.forEach((response) => {
		expect(response).to.be.a("string").and.not.be.empty;
		expect(response.toLowerCase()).contains(msgRequest)
  	});
})

//6. Scenario: Pesquisa de CEP através de API com falha por dado não encontrado (utilizando fixture)
Given ("temos lista de CEPs inválidos em um arquivo {string}", (notFoundCeps) =>{
    cy.fixture(notFoundCeps).then((data) => {
    listCeps = data;
  });
})

When ("request GET é enviada utilizando CEPs não existentes", () =>{
    apiResponses = [];
 
    cy.wrap(listCeps).each((cep) => {
        cy.request(
        	`https://viacep.com.br/ws/${cep}/json/`
        ).then((response) => {
            expect(response.status).to.eq(200);
            apiResponses.push(response.body); 
        });
  	});
})

Then ("API retorna json com mensagem de erro", () =>{
    apiResponses.forEach((response) => {
		expect(response).to.have.property("erro", "true");
		expect(response).to.be.an("object").and.not.be.empty;
  	});
    
})

//7. Scenario: Pesquisa de CEP através de API com sucesso
Given(/^temos lista de CEPs válidos e bem formatados: (.*)$/, (inputCeps) => {
    listCeps = inputCeps.split(",")
});

When("request GET é enviada utilizando CEPs em lista", () => {
	apiResponses = [];
	
	cy.wrap(listCeps).each((cep) => {
		cy.request(
			`https://viacep.com.br/ws/${cep}/json/`
		).then((response) => {
			expect(response.status).to.eq(200);
			apiResponses.push(response.body); 
		});
	});
});

Then("API retorna json com dados do logradouro", () => {
	apiResponses.forEach((response) => {
		expect(response).to.have.property("logradouro");
		expect(response.logradouro).to.be.a("string").and.not.be.empty;
	});
});

//8. Scenario: Pesquisa de CEP através de API com falha por má formatação de dados
Given(/^temos lista de CEPs mal formatados: (.*)$/, (inputCeps) => {
    listCeps = inputCeps.split(',')
});

When("request GET é enviada utilizando CEPs em lista", () => {
  apiResponses = [];
 
	cy.wrap(listCeps).each((cep) => {
		cy.request({
				url:`https://viacep.com.br/ws/${cep}/json/`,
				failOnStatusCode: false
			}).then((response) => {
				expect(response.status).to.eq(400);
				apiResponses.push(response.body); 
		});
	});
});

Then("API retorna json com dados do logradouro", () => {
	apiResponses.forEach((response) => {
		expect(response).to.have.property("erro", "true");
		expect(response).to.be.an("object").and.not.be.empty;
	});
});

//9. Scenario: Pesquisa de CEP através de API com falha por dado não encontrado
Given(/^temos lista de CEPs inválidos: (.*)$/, (inputCeps) => {
    listCeps = inputCeps.split(',')
   
});

When("request GET é enviada utilizando CEPs em lista", () => {
	apiResponses = [];
	
	cy.wrap(listCeps).each((cep) => {
		cy.request(
			`https://viacep.com.br/ws/${cep}/json/`
		).then((response) => {
			expect(response.status).to.eq(400);
			apiResponses.push(response.body); 
		});
	});
});

Then("API retorna json com dados do logradouro", () => {
	apiResponses.forEach((response) => {
		expect(response).to.have.property("erro", "true");
		expect(response).to.be.an("object").and.not.be.empty;
	});
});