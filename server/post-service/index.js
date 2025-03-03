const amqp = require("amqplib");

async function consumeQueue() {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();
        const queue = "postQueue";

        await channel.assertQueue(queue, { durable: false });

        console.log("Waiting for messages...");
        channel.consume(queue, (msg) => {
            if (msg !== null) {
                const content = msg.content.toString();
                console.log("Received:", content);
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error("Error consuming messages:", error);
    }
}

consumeQueue();
