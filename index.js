const socket = require('socket.io');
const port = process.env.PORT || 4200;
const client = require('socket.io').listen(port).sockets;

let messages = [{
    name: "mob",
    message: "Bob0 is awesomey"
}, {
    name: "Moe",
    message: "Mary is my friend"
}]

client.on('connection', function(socket) {
  console.log('connected');

    socket.on('first-contact', function(data) {
      console.log('im here');
        //Call the Laravel server, it looks for a cookie in the header,
        //If it is there it gets the name associated with the cookie
        //if its not there it creates a cookie and unique name
        //then it gets the messages from the db, it then sends the messages back here then I send them to the client
        //If there is a cookie to give to a new user I would send that along with the messages (and the name too)
        let obj = {
            messageRay: messages,
            name: "MJB",//The name comes from Laravel Server
            isCookie : true //This is because there is gonna be a cookie set right here, I just dont know how to do that
        };
        socket.emit('message-list-and-name', obj)
    });


    socket.on('send-message', function(data) {
        //The trick here is that the data.url is the name of the event
        //This makes it so tht only the people at that website recieve it
        messages.push(data);
        client.emit('www.google.com', data);
        broadcast.shout('newMessage', data);
    });

    socket.on('new-message', function(data) {
        //I could send this to the DB directly from here, but I think the Laravel back end wants to do it.

        //maybe one of the key value pairs in the object is the website, this way the clients could all decide for them selves if they want to display it

        //Or I coud make a string out of the data.url - Duh, thats the best
        socket.emit(data.url, data);
    });

    socket.on('disconnect', function() {
        console.log(socket.id);
    });

});
