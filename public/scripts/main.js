import chatMessage from "./components/msg.js"

console.log('main.js loaded');

const socket = io();

function setUserID({sID, message}) {
    vm.socketID = sID;
}

function appendMessage(message) {
    vm.messages.push(message);
}

const vm = new Vue({
    // Libraries
    data: {
        messages: [],
        nickname: "",
        username: "",
        socketid: "",
        message: ""
    },
    
    methods: {
        dispatchMessage() {
            socket.emit("chatMessage", {content: this.message, name: this.nickname || "Anonymous"});
            //Resets message text to nothing when chat is send
            this.message = "";
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

socket.addEventListener("connected", setUserID);
socket.addEventListener("message", appendMessage);
