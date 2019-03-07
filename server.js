import express from 'express';
import bodyParser from 'body-parser';

const app = express();

var mongoose = require('mongoose');
var Produto = require('./app/models/product');
var Pessoa = require('./app/models/person');

//PERSISTENCIA 
mongoose.connect('mongodb://localhost/bdCruddd', { useNewUrlParser: true } );

//configuração do server para usar o body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo a porta via arquivo de configuração
var port = process.env.port || 3000;

//definindo rotas

var router = express.Router();//intercepta todas as rotas

//Middleware
router.use(function (req, res, next) {
    //aqui poderá ser implementadas rotinas de 
    //LOGs,VALIDAÇÕES,ERROS
    console.log('Interceptação pelo middleware');
    next();
});

router.get('/', (req, res) => res.json({'message': 'rota teste ok'}));

router.route('/produtos')
    .post(function(req, res){
        var produto = new Produto();
        produto.nome = req.body.nome;
        produto.preco = req.body.preco;
        produto.descricao = req.body.descricao;

        produto.save(function(error){
            if(error)
                res.send("Erro ao tentar salvar o produto"+ error);

                res.status(201).json({message:'Produto inserido com sucesso'});
        });
    })
//testando a inserção de mais de um documento
router.route('/pessoa')
    .post(function(req, res){
        var pessoa = new Pessoa();
        pessoa.nome = req.body.nome;
        pessoa.idade = req.body.idade;
        pessoa.peso = req.body.peso;

        pessoa.save(function(error){
            if(error)
                res.send("Erro ao tentar salvar a pessoa" +error);

                res.status(201).json({message:'Pessoa inserida com sucesso'});
        });
    })


        //rota de get 
  router.route('/produtos')
        .get(function(req,res){
            Produto.find(function(err,prods){
                if(err)
                    req.send(err);

            res.status(200).json({
                message:"Produtos retornados.",
                produtos:prods
            })  ;  
        });

  })
  
  //rota de get by id 
  router.route('/produtos/getbyid/:uid')
  
  .get(function(req,res){
    var uid = req.params.uid
        Produto.findById(uid,function(err,prods){
            if(err)
             req.send(err);
            

            res.status(200).json({
                message:"Produto:" ,
                produtos:prods
            })  ;  
        });

  })

  //rota de delete
  router.route('/produtos/delete/:deleteid')
  
  .post(function(req,res){
    var deleteid = {adress:deleteid}
        Produto.deleteOne(deleteid,function(err,prods){
            if(err)
            req.send(err);

            res.status(200).json({
                message:"Produtos Deletado.",
                //produtos:prods
            })  ;  
        });

  })

  //rota put
  router.route('/produtos/put/:id')
  
  .put(function(req,res){
        Produto.findByIdAndUpdate({ _id: req.params.id }, req.body ,function(err,prods){
            if(err)
            req.send(err);

            res.status(200).json({
                message:"Produtos Atualizado.",
                produtos:prods
            })  ;  
        });
  })
  
//vincular a aplicação (app) com o motor de rotas
app.use('/api',router);

app.listen(port, () => {
    console.log('Server up and running!!!');

});

//postman ????
//livro GANG OF FOUR PATTERN


