/// <reference types="cypress" />

const id = require("faker/lib/locales/id_ID");

describe('Teste de Funcionalidade Produtos', () => {
    let token
    before(() =>{
        cy.token('fulano@qa.com', 'teste').then (tkn => { token = tkn})

    });
    
    it('Listar produtos', () => {
        cy.request ({
            method: 'GET',
            url: 'produtos'
            
        }).then((response) =>{
            expect(response.body.produtos[0].nome).to.equal('Logitech MX Vertical')
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('produtos')
            expect (response.duration).to.be.lessThan(15)

        })
        
    });

    it('Cadastrar Produtos', () => {
        let produto = `Produto Pato  ${Math.floor(Math.random() * 10000000 ) }`
        cy.request({
            method:'POST',
            url: 'produtos',
            body:{
            "nome": produto,
            "preco": 80,
            "descricao": "binquedo",
            "quantidade": 50,
            },
            headers: {authorization: token}


        }).then ((response) =>{
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')


        })

    })
    it('Deve validar mensagem de erro ao cadastrar produto repetido', () => {
      cy.cadastrarProduto(token,'pato amarelo',  10 ,'descricao do produto', 180)
      
      
        .then ((response) =>{
            expect(response.status).to.equal(400)
            expect(response.body.message).to.equal('Já existe produto com esse nome')


        })

    });

    it('Deve editar um produto ja cadastrado', () => {
        cy.request('produtos').then(response => {
            let id = response.body.produtos[0]._id
            cy.request({
                method: 'PUT',
                url: `produto/${id}`,
                headers: {authorization: token},
                body:
                {
                    "nome": "Pato de Borracha verde",
                    "preco": 80,
                    "descricao": "produto editado",
                    "quantidade": 55
                }
            }) 



            })   
            it.only('Deve editar um produto cadastrado previamente', () => {
                let produto = `Produto Pato 22 ${Math.floor(Math.random() * 10000000 )}`
                cy.cadastrarProduto(token, produto ,  100 ,'descricao do produto novo', 180)
                    
                 
                                      
            });


        })
    });

    
