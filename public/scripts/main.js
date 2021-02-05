(() => {
    console.log('fired');

    const socket = io();

    function setUserID({sID, message}) {
        debugger;

        vm.socketID = sID
    }

    const vm = new Vue({
        data: {
            messages: [],
            nickname: "",
            username: "",
            socketID: ""
        },
        
        methods: {

        }
    }).$mount("#app");

    socket.addEventListener("connected", setUserID)
});
