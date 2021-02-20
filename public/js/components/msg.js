export default {
    props: ["msg", "socketid"],

    template:
    `
    <section class="baseMessage" :class="{ 'myMessage animate__animated animate__backInRight' : matchedID, 'newMessage  animate__animated animate__backInLeft' : !matchedID }">
        <h3>{{msg.message.name}}:</h3>
        <p>{{msg.message.content}}</p>
    </section>
    `,

    data() {
        return {
            matchedID: this.socketid == this.msg.id
        }
    }

}