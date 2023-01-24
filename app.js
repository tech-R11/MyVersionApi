// const path = require('path');
// var pth = path.parse(__filename);
//console.log(pth);

// const os = require('os');
// var totalMemory = os.totalmem();
// var freeMemory = os.freemem();
// console.log(totalMemory);
// console.log(freeMemory);

// const fs = require('fs');

// ALL ABOUT EMITTER..
//----------------------------------------------------
//  const EventEmitter = require("events");
//  const emitter  = new EventEmitter();
//Register a listener
//emitter.on()//same as addListener
// emitter.on('messageLogged',function(arg){
//     console.log("badhai ho..",arg.id);
// })

//emit:- make a noise ,produce
//emitter.emit('messageLogged',{id:1,url:`dot.com`});
//event arguments
//---------------------------------------------------

const NewMember  = require('./emiterClass');
const newMember = new NewMember();
newMember.addListener('messageLogged',(args)=>{
    console.log(`Welcome ${args.name}`);
});
newMember.logger();

