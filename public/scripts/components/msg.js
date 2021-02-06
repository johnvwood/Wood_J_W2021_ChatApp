export default {
    props: ["msg", "socketid"],

    template:
    `
    <section class="newMessage" :class="{ 'myMessage' : matchedID }">
        <h3>{{msg.message.name}}:</h3>
        <p>{{msg.message.content}}</p>
    </section>
    `,

    data: function () {
        return {
            matchedID: this.socketid == this.msg.id
        }
    }
}