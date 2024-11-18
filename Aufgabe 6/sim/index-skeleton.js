// Skeleton eines simulationsprogramm um Testdaten zu erzeugen
//   das simulationsprogramm soll erweitert werden, um alle Daten die in der Aufgabenstellung
//   beschrieben sind zu erzeugen und zu senden
// change history

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

// required to handle the request body
app.use(express.json());

// add mqtt support
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://broker.hivemq.com');

const axios = require('axios');

// parameter für die Übermittlung der Testdaten
var timeinterval = 5;
var locid = 'dhbw1';
var simanzahl = 5;
var sensortype = 'G';
var min = 48.6;
var max = 8.6;
var value = min;

const args = process.argv.slice(2);

if (args[0] == '?') {
  console.log('arg0 = timeinterval in dem die Daten gesendet werden in sec');
  console.log('arg1 = unique id of drone - 6 stellig');
  console.log('arg2 = Anzahl der Daten in Zyklen - 2stellig');
  console.log('arg3 = identifier type of messaurement - gpsd= gps data, diss=Distanz seit Start, disp=Distanz seit Warenaufnahme, battl=Ladezustand Batterie, ...');
  console.log('arg4 = start value');
  console.log('arg5 = end value');
  console.log('bsp =npm start 10 dhbw-1 5 gpsd 48.6 8.6');
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
    console.log("Wrong no of arguemts ");
    console.log('arg0 = timeinterval in dem die Daten gesendet werden in sec');
    console.log('arg1 = unique id of drone - 6 stellig');
    console.log('arg2 = Anzahl der Daten in Zyklen - 2stellig');
    console.log('arg3 = identifier type of messaurement - gpsd= gps data, diss=Distanz seit Start, disp=Distanz seit Warenaufnahme, battl=Ladezustand Batterie, ...');
    console.log('arg4 = start value');
    console.log('arg5 = end value');
    console.log('bsp =npm start 10 dhbw-1 5 gpsd 48.6 8.6');
    console.log('bsp will send every 10 sec a gps value of 48.6 and 8.6 incremented by 0.1 on each message');
   
    process.exit();    
}

var mqttmsg = {};
var i=0;
var myinterval;
console.log('min', min);

async function intervalFunc() {
  
  if (i == simanzahl-1) {
    clearInterval(this);
  }

  console.log("-------------------");

  // Send data
  mqttmsg['timestamp'] = new Date().toISOString();
  mqttmsg['locid'] = locid;
  console.log('datatype =', datatype);

  // Handle GPS data
  if (datatype == 'gpsd') {
    // Set initial values in first iteration
    if (i == 0) { 
      console.log('i =', i);
      gpslatitude = parseFloat(args[4]);
      gpslongitude = parseFloat(args[5]);
      value = 0;
    } 

    // Sending GPS data
    console.log('value_before =', value.toFixed(1));
    mqttmsg['gpslatitude'] = (gpslatitude + value).toFixed(1);
    mqttmsg['gpslongitude'] = (gpslongitude + value).toFixed(1);
    mqttopic= 'SWS/'+locid+'/G';
    value = value + 0.1;
    console.log('value_after =', value.toFixed(1));
  }

  // Handle distance since start
  if (datatype == 'diss') {
    // Set initial values in first iteration
    if (i == 0) {
      console.log('i =', i);
      distance = parseFloat(args[4]);
      value = 0;
    }
    
    // Sending distance since start
    console.log('value_before =', value.toFixed(2));
    mqttmsg['diss'] = (distance + value).toFixed(2);
    mqttopic = 'SWS/'+locid+'/G';
    value = value + 0.01;
    console.log('value_after =', value.toFixed(2));
  }

  // Handle distance since receiving goods
  if (datatype == 'disp') {
    // Set initial values in first iteration
    if (i == 0) {
      console.log('i =', i);
      distance = parseFloat(args[4]);
      value = 0;
    }

    // Sending distance since receiving goods
    console.log('value_before =', value.toFixed(2));
    mqttmsg['disp'] = (distance + value).toFixed(2);
    mqttopic = 'SWS/'+locid+'/G';
    value = value + 0.01;
    console.log('value_after =', value.toFixed(2));
  }

  // Handle time since receiving goods
  if (datatype == 'time') {
    // Set initial values in first iteration
    if (i == 0) {
      console.log('i =', i);
      time = parseFloat(args[4]);
      value = 0;
    }

    // Sending time since receiving goods
    console.log('value_before =', value.toFixed(2));
    mqttmsg['time'] = (time + value).toFixed(2);
    mqttopic = 'SWS/'+locid+'/G';
    value = value + timeinterval / 60;
    console.log('value_after =', value.toFixed(2));
  }

  // Handle battery level
  if (datatype == 'batt') {
    // Set initial values in first iteration
    if (i == 0) { 
      console.log('i =', i);
      time = parseInt(args[4]);
      value = 0;
    } 
    
    // Sending battery level
    console.log('value_before =', value);
    mqttmsg['batt'] = time + value;
    mqttopic = 'SWS/'+locid+'/G';
    value = value - 1;
    console.log('value_after =', value);  
  }

  // Handle delivery status
  if (datatype == 'delivery') {
    // Set initial values in first iteration
    if (i == 0) {
      console.log('i =', i);
      goodDelivered = false
      value = 0;
    }

    start = (parseFloat(args[4]) + value).toFixed(2);
    end = parseFloat(args[5]).toFixed(2);

    // Sending delivery status
    console.log('value_before =', value.toFixed(2));
    if (start == end) {
      goodDelivered = true;
    }
    mqttmsg['delivery'] = goodDelivered;
    mqttopic = 'SWS/'+locid+'/G';
    value = value + 0.01;
    console.log('value_after =', value.toFixed(2));
  }
    
  console.log('mqttopic =', mqttopic); 
  console.log('mqtt msg =', JSON.stringify(mqttmsg, null, 2));
  
  client.publish(mqttopic, JSON.stringify(mqttmsg), (err) => {
    if (err) {
      console.log('Error publishing message', err);
    } else {
      console.log('Message sent');
    }
  });
  i++;
}
app.listen(4000, () =>{
  myinterval = setInterval(intervalFunc, 10000);
  console.log('Listening on port 4000')
})
;