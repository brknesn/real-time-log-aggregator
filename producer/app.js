const Kafka = require("node-rdkafka");
const fastify = require("fastify")({ logger: true });

fastify.post("/logs", (req, res) => {
  const producer = new Kafka.Producer({
    "metadata.broker.list": process.env.KAFKA_BROKER,
  });

  producer.connect();

  producer.on("ready", () => {
    producer.produce(
      "logs",
      null,
      Buffer.from(JSON.stringify(req.body)),
      null,
      Date.now()
    );
    producer.disconnect();
    res.send({ message: "Log added successfully" });
  });
});

fastify.listen(3000, "0.0.0.0", (err, address) => {
  if (err) throw err;
  fastify.log.info(`server listening on ${address}`);
});
