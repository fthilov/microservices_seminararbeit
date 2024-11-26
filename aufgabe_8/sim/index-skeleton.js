const express = require('express');
const cors = require('cors'); 
const mqtt = require('mqtt');

const app = express();
app.use(cors());
app.use(express.json());
const client = mqtt.connect('mqtt://localhost:1883');
const args = process.argv.slice(2);

if (args[0] == '?') {
  console.log('arg0 = timeinterval in dem die Daten gesendet werden in sec');
  console.log('arg1 = unique id of drone - 6 stellig');
  console.log('arg2 = Anzahl der Daten in Zyklen - 2stellig');
  console.log('arg3 = identifier type of messaurement - gpsd = gps data, diss = Distanz seit Start, disp = Distanz seit Warenaufnahme, time = Zeit seit Warenaufnahme in Minuten, batt = Ladezustand Batterie, delivery = Status der Warenauslieferung');
  console.log('arg4 = start value');
  console.log('arg5 = end value');
  console.log('bsp = npm start 10 dhbw-1 5 gpsd 48.6 8.6');
  console.log('bsp will send every 10 sec a gps value of 48.6 and 8.6 incremented by 0.1 on each message');
  process.exit();
}

if ((args.length) == 6) {
  timeinterval = args[0];
  locid = args[1];
  simanzahl = args[2];
  datatype = args[3];
  min = parseFloat(args[4]);
  max = parseFloat(args[5]);
} else {
    console.log("Wrong number of arguemts ");
    console.log('arg0 = timeinterval in dem die Daten gesendet werden in sec');
    console.log('arg1 = unique id of drone - 6 stellig');
    console.log('arg2 = Anzahl der Daten in Zyklen - 2stellig');
    console.log('arg3 = identifier type of messaurement - gpsd = gps data, diss = Distanz seit Start, disp = Distanz seit Warenaufnahme, time = Zeit seit Warenaufnahme in Minuten, batt = Ladezustand Batterie, delivery = Status der Warenauslieferung');
    console.log('arg4 = start value');
    console.log('arg5 = end value');
    console.log('bsp = npm start 10 dhbw-1 5 gpsd 48.6 8.6');
    console.log('bsp will send every 10 sec a gps value of 48.6 and 8.6 incremented by 0.1 on each message');
   
    process.exit();    
}

var mqttmsg = {};
var i = 0;

function intervalFunc() {
  
  if (i == simanzahl-1) {
    clearInterval(this);
  }

  mqttmsg['timestamp'] = new Date().toISOString();
  mqttmsg['locid'] = locid;
  console.log('datatype =', datatype);
  
  if (datatype == 'gpsd') {
    if (i == 0) { 
      gpslatitude = parseFloat(args[4]);
      gpslongitude = parseFloat(args[5]);
      value = 0;
    } 

    mqttmsg['gpslatitude'] = (gpslatitude + value).toFixed(1);
    mqttmsg['gpslongitude'] = (gpslongitude + value).toFixed(1);
    mqttopic = 'SWS/' + locid + '/G';
    value = value + 0.1;
  }

  if (datatype == 'diss') {
    if (i == 0) { 
      diss = args[4]; // args[4] = start value
    } 

    mqttmsg['diss'] = diss;
    mqttopic = 'SWS/' + locid + '/DS';
    diss = (parseFloat(diss) + 0.1).toFixed(1);
  }

  if (datatype == 'disp') {
    if (i == 0) { 
      diss = args[4];
    } 

    mqttmsg['diss'] = diss;
    mqttopic = 'SWS/' + locid + '/DP';
    diss = (parseFloat(diss) + 0.1).toFixed(1);
  }

  if (datatype == 'time') {
    if (i == 0) { 
      time = args[4]; // args[4] = start value
    } 

    if (time < 0) {
      console.log("Time cannot be negative. Please check validity of the data");
    } else {
      mqttmsg['time'] = parseFloat(time).toFixed(2);
      mqttopic = 'SWS/' + locid + '/T';
      time = parseFloat(time) + timeinterval / 60;
    }
  }

  if (datatype == 'batt') {
    if (i == 0) {
      batt = args[4]; // args[4] = start value
    } 

    mqttmsg['batt'] = batt;
    mqttopic = 'SWS/' + locid + '/B';
    batt <= 0 ? console.log('Battery is empty') : batt = (parseFloat(batt) - 1).toString();
  }

  if (datatype == 'delivery') {
    if (i == 0) { 
      current_loc = args[4]; // args[4] = current_location of drone
      target_loc = args[5];  // args[5] = target location of drone
    } 

    if (current_loc == target_loc) {
      goodDelivered = true;
    } else {
      goodDelivered = false;
      current_loc = (parseFloat(current_loc) + 0.1).toFixed(1)
    }
    mqttmsg['delivery'] = goodDelivered;
    mqttopic = 'SWS/' + locid + '/DL';
  }
    
  console.log('mqttopic =', mqttopic); 
  console.log('mqtt msg =', JSON.stringify(mqttmsg));
  client.publish(mqttopic, JSON.stringify(mqttmsg));
  i++;
}

app.listen(4000, () => {
  setInterval(intervalFunc, timeinterval * 1000);
  console.log('Listening on port 4000')
});
