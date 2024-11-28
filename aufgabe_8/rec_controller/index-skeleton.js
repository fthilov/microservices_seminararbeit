const mqtt = require('mqtt');
const { MongoClient } = require('mongodb');
const topic = 'SWS/#';
const client = mqtt.connect('mqtt://mqtt-broker:1883');

const DB_USER = process.env.MONGO_INITDB_ROOT_USERNAME || '';
const DB_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD || '';
const DB_HOSTNAME = process.env.DB_HOSTNAME || 'mongodb-service';
const DB_PORT = process.env.DB_PORT || '27017';
const DB_NAME = process.env.DB_NAME || 'rec_data';

const uri = `mongodb://${DB_USER ? `${DB_USER}:${DB_PASSWORD}@` : ''}${DB_HOSTNAME}:${DB_PORT}`;
const mongo_client = new MongoClient(uri);
const db = mongo_client.db(DB_NAME);
const diss = db.collection('distance_since_start');
const disp = db.collection('distance_since_pickup');
const batt = db.collection('battery');
const time = db.collection('time');
const delivery = db.collection('delivery');

client.on('connect', mqtt_connect);
client.on('reconnect', mqtt_reconnect);
client.on('error', mqtt_error);
client.on('message', mqtt_messsageReceived);
client.on('close', mqtt_close);

async function mqtt_connect() {
    console.log("Connecting MQTT");
    client.subscribe(topic, mqtt_subscribe);

    await mongo_client.connect();
    console.log("Connected to MongoDB");
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

async function mqtt_messsageReceived(topic, message) {
    console.log('Topic =', topic);
    console.log('Message =', JSON.parse(message));

    message = JSON.parse(message);

    switch (topic.split('/')[2]) {
        case 'DS':
            await diss.insertOne({topic: topic, message: message});
            break;
        case 'DP':
            await disp.insertOne({topic: topic, message: message});
            break;
        case 'B':
            if(message.batt < 30) {
                client.publish('battery_alert', message.batt.toString());
            };
            await batt.insertOne({topic: topic, message: message});
            break;
        case 'T':
            await time.insertOne({topic: topic, message: message});
            break;
        case 'DL':
            await delivery.insertOne({topic: topic, message: message});
            break;
        default:
            console.log('Invalid topic');
    }
}

function mqtt_close(err) {
	console.log("Close MQTT");
    if (err) {console.log(err);}
}