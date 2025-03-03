const express = require("express");
const amqp = require("amqplib");

const app = express();
app.use(express.json());

async function sendToQueue(message) {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();
        const queue = "postQueue";

        await channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

        console.log("Sent:", message);
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error("Error sending message:", error);
    }
}

app.post("/publish", async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    await sendToQueue({ message });
    res.json({ success: true, message: "Message sent to queue" });
});

app.listen(3000, () => console.log("API Gateway running on port 3000"));
