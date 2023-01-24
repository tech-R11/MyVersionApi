const EventEmitter = require('events');
class NewMember extends EventEmitter{
    logger(){
        console.log(`new member arrived`);
        this.emit('messageLogged',{id:1,name:`Rishabh Verma`});
    }

}

module.exports = NewMember;



