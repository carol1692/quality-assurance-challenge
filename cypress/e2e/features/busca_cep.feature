Feature: Busca de cep
    Scenario: Usuário navega até a página de 'Busca de CEP'
       Given que usuário acessou página inicial dos Correios
       When ele clica no botão 'Busca CEP ou Endereço'
       Then é redirecionado para página 'Busca de CEP'

    Scenario: Usuário preenche formulário de busca de CEP sem preencher CAPTCHA
        Given Usuário está na página 'Busca de CEP'
        When ele preenche campo 'Digite um CEP ou um Endereço' 
        And clica no botão 'Buscar'
        Then recebe mensagem 'Preencha o campo Captcha! (texto contido na imagem)'

    Scenario: Usuário tenta submeter formulário de busca de CEP sem preencher CAPTCHA várias vezes
        Given Usuário está na página 'Busca de CEP'
        When ele preenche campo 'Digite um CEP ou um Endereço' 
        And clica no botão 'Buscar' mais de 1 vez
        Then recebe mensagem 'Preencha o campo Captcha! (texto contido na imagem)'
        And bordas de input Captcha se torna vermelho

    Scenario: Usuário abre lista de opções 'Esse CEP é de:' no formulário de busca de CEP 
        Given Usuário está na página 'Busca de CEP'
        When ele seleciona lista 'Esse CEP é de:' 
        Then lista abre e opções de categorias ficam a mostra

    Scenario: Pesquisa de CEP através de API com sucesso
        Given temos lista de números de CEPs
        When request GET é enviada utilizando CEPs
        Then API retorna json com dados do logradouro
    
    Scenario: Pesquisa de CEP através de API com falha 
        Given temos lista de números de CEPs
        When request GET é enviada utilizando CEPs com formatação incorreta
        Then API retorna json com mensagem de erro