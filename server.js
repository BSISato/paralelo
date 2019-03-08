import express from 'express';
import bodyParser from 'body-parser';

const app = express();

var mongoose = require('mongoose');
var Produto = require('./app/models/product');
var Aluno = require('./app/models/person');
var Curso = require('./app/models/curso');

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
//testando testando testando testando testando
router.route('/aluno')
    .post(function(req, res){
        var aluno = new Aluno();
        aluno._id = req.body._id;
        aluno.ra = req.body.ra;
        aluno.nome = req.body.nome;
        aluno.idade = req.body.idade;
        aluno.curso_id = req.body.curso_id;

        aluno.save(function(error){
            if(error)
                res.send("Erro ao tentar salvar o aluno" +error);

                res.status(201).json({message:'Aluno inserido com sucesso'});
        });
    })
    //testando testando testando testando testando
    router.route('/curso')
    .post(function(req, res){
        var curso = new Curso();
        curso._id = req.body._id;
        curso.nome = req.body.nome;
        curso.duracao = req.body.duracao;
        curso.coordenador = req.body.coordenador;
        

        curso.save(function(error){
            if(error)
                res.send("Erro ao tentar salvar o curso" +error);

                res.status(201).json({message:'Curso inserido com sucesso'});
        });
    })
//testando get
    router.route('/aluno/:id')
        .get(function(req,res){
            var id = req.params.id
                Aluno.findById(id,function(err,lunos){
                    if(err)
                    req.send(err);
                
                    res.status(200).json({
                        message:"Aluno:" ,
                        alunos:lunos
                })  ;  
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


