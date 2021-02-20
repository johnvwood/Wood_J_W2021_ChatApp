import chatMessage from "./components/msg.js"

console.log('main.js loaded');

//SOCKET
var socket = io();

function appendMessage(message) {
    vm.messages.push(message);
}

function setUserID({sID, message}) {
    vm.socketID = sID;
}

socket.addEventListener("connected", setUserID);
socket.addEventListener("message", appendMessage);

// VUE
var vm = new Vue({
    // Libraries
    data: {
        socketid: "",
        username: "",
        message: "",
        messages: []
    },
    
    methods: {
        dispatchMessage() {
            socket.emit("chatMessage", {content: this.message, name: this.username || "Anonymous"});
            //Resets message text to nothing when chat is sent
            this.message = "";
            this.message.focus();
        },

        setUsername() {
            socket.emit("joinUser", this.username);
        }
    },

    components: {
        //first var is html tag
        newmessage: chatMessage
    },

    // Lifecycle functions
    // created: function() {
    //     console.log("Vue created");
    // }

}).$mount("#app");


