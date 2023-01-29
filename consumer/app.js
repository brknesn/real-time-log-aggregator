const Kafka = require("node-rdkafka");

const consumer = new Kafka.KafkaConsumer({
  "group.id": "log-aggregator-group",
  "metadata.broker.list": process.env.KAFKA_BROKER,
  "auto.offset.reset": "earliest",
});

consumer.connect();

consumer.on("ready", () => {
  consumer.subscribe(["logs"]);
  consumer.consume();
});

consumer.on("data", (data) => {
  console.log(data.value.toString());
});

consumer.on("disconnected", () => {
  process.exit();
});
