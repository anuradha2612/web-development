var express=require('express');
var bodyParser = require('body-parser');
const mongoose=require('mongoose');
var todomodel=require('./models/todomodel');
var app=express();

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/contactlist');
/*var db = mongoose.connection;*/
mongoose.connection.once('open',function()
                        {
                           console.log('connection has been made,now make fireworks...');
                        }).on('error',function(error)
                             {
                               console.log('connection error',error);
                              });
                                   
app.get('/contactlist',function(req,res)
       {
        console.log("i received a get request");
        /*var contactlist=[{name:"anuradha",
                          email:"anuradha@gmail.com",
                          number:"9988998899"
                         }];*/
       todomodel.find(function(err,docs)
                                 {console.log(docs);              
           res.json(docs);
       });
    
   /* res.json(contactlist);*/
});
app.post('/contactlist',function(req,res)
         {
             console.log(req.body);
          var newcontact= new todomodel();
              newcontact.name=req.body.name;
               newcontact.email=req.body.email;
                newcontact.number=req.body.number;
             newcontact.save(req.body,function(err,docs)
                             {
                               res.json(docs);
                              });
          });
app.delete('/contactlist/:id',function(req,res)
{
    console.log(req.params.id);
    todomodel.findByIdAndRemove(req.params.id,function(err,docs)
                               {
                                  res.json(docs);
                               });
});
app.get('/contactlist/:id',function(req,res)
{    console.log(req.params.id);
     todomodel.findById(req.params.id,function(err,docs)
                               {
                                  res.json(docs);
                               });
});
app.put('/contactlist/:id',function(req,res)
{
    console.log(req.params.id);
    todomodel.findByIdAndUpdate(req.params.id,{$set:{name:req.body.name,email:req.body.email,number:req.body.number}},{new:true},function(err,docs)
                           {
                               res.json(docs);
    });
});
app.listen(8888);