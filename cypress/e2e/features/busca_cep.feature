Feature: Busca de cep
    Scenario: Usuário preenche formulário de busca de CEP sem preencher CAPTCHA
        Given Usuário está na página 'Busca de CEP'
        When usuário preenche campo 'Digite um CEP ou um Endereço' 
        And clica no botão 'Buscar'
        Then recebe mensagem de aviso 'Preencha o campo Captcha! (texto contido na imagem)'

    Scenario: Usuário tenta submeter formulário de busca de CEP sem preencher CAPTCHA várias vezes
        Given Usuário está na página 'Busca de CEP'
        When usuário preenche campo 'Digite um CEP ou um Endereço' 
        And clica no botão 'Buscar' por 5 vezes
        Then recebe mensagem 'Preencha o campo Captcha! (texto contido na imagem)'
        And bordas de input Captcha se torna vermelho

    Scenario: Lista de opções 'Esse CEP é de:' deve conter no mínimo opção 'Todos'
        Given Usuário está na página 'Busca de CEP'
        When ele seleciona campo de formulário 'Esse CEP é de:' 
        Then lista deve conter 1 ou mais categorias de buscas
        And categoria selecionada por default deve ser 'Todos'

    Scenario: Pesquisa de CEP através de API com sucesso (utilizando fixture)
        Given temos lista de CEPs válidos e bem formatados em um arquivo 'ceps'
        When request GET é enviada utilizando CEPs
        Then API retorna json com dados do logradouro
    
    Scenario: Pesquisa de CEP através de API com falha por má formatação de dados (utilizando fixture)
        Given temos lista de CEPs mal formatados em um arquivo 'invalid_ceps'
        When request GET é enviada utilizando CEPs com formatação incorreta
        Then API retorna página com "bad request"

    Scenario: Pesquisa de CEP através de API com falha por dado não encontrado(utilizando fixture)
        Given temos lista de CEPs inválidos em um arquivo 'notFound_ceps'
        When request GET é enviada utilizando CEPs não existentes
        Then API retorna json com mensagem de erro

    Scenario: Pesquisa de CEP através de API com sucesso 
        Given temos lista de CEPs válidos e bem formatados: 76900-540,79601-200,13349-203
        When request GET é enviada utilizando CEPs em lista
        Then API retorna json com dados do logradouro

    Scenario: Pesquisa de CEP através de API com falha por má formatação de dados
        Given temos lista de CEPs mal formatados: 76900--540,796010-200,1A3349-203
        When request GET é enviada utilizando CEPs com formatação incorreta
        Then API retorna página com "bad request"

    Scenario: Pesquisa de CEP através de API com falha por dado não encontrado
        Given temos lista de CEPs inválidos: 78962-000,13171-779,13171-778
        When request GET é enviada utilizando CEPs não existentes
        Then API retorna json com mensagem de erro