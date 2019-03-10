import express from 'express';
import bodyParser from 'body-parser';
import { emitKeypressEvents } from 'readline';

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
        curso.coordenador_adjunto = req.body.coordenador_adjunto;
        

        curso.save(function(error){
            if(error)
                res.send("Erro ao tentar salvar o curso" +error);

                res.status(201).json({message:'Curso inserido com sucesso'});
        });
    })
//testando get em documentos relacionados
    router.route('/aluno/:ra')
        .get(function(req,res){
            var ra = {ra: req.params.ra}
            //traz o aluno do RA digitado
            Aluno.find(ra,function(err,aluno){
                if(err)
                    req.send(err);
                else{
                    //traz o id do curso do aluno do RA digitado
                    var idCurso = aluno.map(function(a){
                        return a.curso_id;
                    })
                    //traz o curso baseado no id do curso do documento do aluno do RA
                    Curso.find({_id:{$in:idCurso}},function(err,cursoAluno){
                        if(err)
                            req.send(err);
                            res.status(200).json({
                                message:"Aluno e Curso" ,                       
                                alunos:aluno,
                                curso:cursoAluno                                
                        });  
                    });
                }
            })         
        })
        //rota de get 
        //lista todos alunos
  router.route('/alunos')
        .get(function(req,res){
            Aluno.find(function(err,als){
                if(err)
                    req.send(err);

            res.status(200).json({
                message:"Alunos retornados.",
                alunos:als
            })  ;  
        });
  })
  router.route('/cursos')
        .get(function(req,res){
            Curso.find(function(err,crs){
                if(err)
                    req.send(err);

                res.status(200).json({
                    message:"Cursos retornados: ",
                    cursos:crs
                })
            })
        })
  
  //rota de get by id 
  router.route('/aluno/ById/:id')
  
  .get(function(req,res){
    var id = req.params.id
        Aluno.findById(id,function(err,als){
            if(err)
             req.send(err);
            

            res.status(200).json({
                message:"Aluno:" ,
                produtos:als
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

//livro GANG OF FOUR PATTERN


