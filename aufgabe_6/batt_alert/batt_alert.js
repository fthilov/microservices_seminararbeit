const mqtt = require('mqtt');
const topic = 'battery_alert';
const client  = mqtt.connect('mqtt://localhost:1883');

client.on('connect', mqtt_connect);
client.on('reconnect', mqtt_reconnect);
client.on('error', mqtt_error);
client.on('message', mqtt_messsageReceived);
client.on('close', mqtt_close);

function mqtt_connect() {
    console.log("Connecting MQTT");
    client.subscribe(topic, mqtt_subscribe);
}

function mqtt_subscribe(err) {
    console.log("Subscribed to " + topic);
    if (err) {console.log(err);}
}

function mqtt_reconnect(err) {
    console.log("Reconnect MQTT");
    if (err) {console.log(err);}
}

function mqtt_error(err) {
    console.log("Error!");
	if (err) {console.log(err);}
}

function mqtt_messsageReceived(topic, battery_level) {
    console.log(`Topic = ${topic}`);
    console.log(`Battery level is low. Current charging level: ${battery_level}`);
}

function mqtt_close(err) {
	console.log("Close MQTT");
    if (err) {console.log(err);}
}
