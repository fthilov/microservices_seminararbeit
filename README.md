# README - Instruktionen zur Überprüfung der Funktionalität

## Aufgabe 5

### 1. Navigiere in den Ordner 'aufgabe_5/sim': `cd aufgabe_5/sim`
### 2. Führen Sie folgende Befehle aus: `npm i` und `docker compose up -d`
### 3. Vergewisseren Sie sich, dass der Container in Docker Desktop läuft
### 4. Gehen Sie in Docker Desktop in den Container und führe unter dem Reiter 'Terminal' folgenden Befehl aus: `mosquitto_sub -h localhost -p 1883 -t "SWS/#"`
### 5. Führen Sie nun in dem VSCode Terminal folgenden Befehl aus: `npm start 5 dhbw-1 10 gpsd 48.1 50.3`

Information zum Simulieren der Daten:
#### datatype == gpsd - Senden von GPS Daten
min = latitude  
max = longitude  
Bsp: `npm start 5 dhbw-1 10 gpsd 48.1 50.3`
#### datatype == diss - Senden von der Distanz seit Start
min = start distance  
max = _  
Bsp: `npm start 5 dhbw-1 10 diss 0 -`
#### datatype == disp - Senden von der Distanz seit Warenaufnahme
min = start distance  
max = _  
Bsp: `npm start 5 dhbw-1 10 disp 0 -`
#### datatype == time - Sendeon von der Zeitdauer seit Warenaufnahme in Minuten
min = start time  
max = _  
Bsp: `npm start 5 dhbw-1 10 time 0 -`
#### datatype == batt - Senden des Batterielevels
min = start battery level  
max = _  
Bsp: `npm start 5 dhbw-1 10 batt 69 -`
#### datatype == delivery - Senden des Status der Warenauslieferung
min = current_location  
max = target_location  
Bsp: `npm start 5 dhbw-1 10 delivery 10 10.4`  
__NOTE:__ If current_location == target_location delivery status turns to __true__

### 6. Nun sollten die Daten im dem Container Log des Brokers geloggt werden

## Aufgabe 6

### 1. Navigieren Sie in den Ordner 'aufgabe_6/sim': `cd aufgabe_6/sim`
### 2. Führen Sie folgenden Befehl aus: `npm i` und `docker compose up -d`
### 3. Navigieren Sie in den Ordner 'aufgabe_6/rec_controller': `cd ../rec_controller`
### 4. Führen Sie folgende Befehle aus: `npm i` und `docker compse up -d`
### 5. Führen Sie folgenden Befehl zusätzlich aus: `node index_skeleton.js`
### 6. Erstellen Sie ein neues Terminal: `CMD + ´`
### 7. Navigieren Sie in den Ordner 'aufgabe_6/batt_alert' `cd aufgabe_6/batt_alert` 
### 8. Führen Sie folgende Befehle aus: `npm i` und `node batt_alert.js`
### 9. Erstellen Sie ein neues Terminal: `CMD + ´`
### 10. Navigieren Sie in den Ordner 'aufgabe_6/sim': `cd aufgabe_6/sim`
### 11. Führen Sie folgenden Befehl aus: `npm start 5 dhbw-1 10 batt 31 -`
### 12. Nun sollten Meldungen in dem Terminal, wo batt_alert gestartet wurde, geloggt werden
### 13. Gehen sie in Docker Desktop in den Container der MongoDB und unter den Reiter 'Terminal'
### 14. Dort verbinden Sie sich mit der mongodb mit: `mongosh -u root -p example`
### 15. Verwenden Sie die passenden Datenbank: `use rec_data`
### 16. Lassen sie sich die gespeicherten Daten anzeigen: `db.battery.find()`
### 17. Sie können die Parameter der Datenbank beliebig in der .env Datei unter `aufgabe_6/rec_controller/.env` beliebig ändern
### ! Beachten Sie, dass der 'mongo' Ordner unter `aufgabe_6/rec_controller` immer gelöscht werden muss, falls sie etwas an der Datenbankkonfiguration ändern 

## Aufgabe 7

### 1. Stoppen und löschen Sie alle laufenden Container
### 2. Navigieren Sie in den Ordner 'aufgabe_7/batt_alert': `cd aufgabe_7/batt_alert`
### 3. Führen sie folgenden Befehl aus: `npm i`
### 4. Navigieren Sie in den Ordner 'aufgabe_7/rec_controller': `cd ../rec_controller`
### 5. Führen Sie folgenden Befehl aus: `npm i`
### 6. Navigieren Sie in den Ordner 'aufgabe_7/sim': `cd ../sim`
### 7. Führen Sie folgenden Befehl aus: `npm i`
### 8. Navigieren Sie in den Ordner 'aufgabe_7': `cd ..`
### 9. Führen Sie folgenden Befehl aus: `docker compose up -d`
### 10. Navigieren Sie in den Ordner 'aufgabe_7/sim': `cd sim`
### 11. Führen Sie folgenden Befehl aus: `npm start 5 dhbw-1 10 batt 31 -`

## Aufgabe 8

### 1. Stoppen und Löschen sie alle laufenden Container
### 2. Navigieren Sie in den Ordner 'aufgabe_8/batt_alert/manifests': `cd aufgabe_8/batt_alert/manifests`
### 3. Führen Sie folgenden Befehl aus: `kubectl apply -f .`
### 4. Navigieren Sie in den Ordner 'aufgabe_8/batt_alert': `cd ..`
### 5. Führen Sie folgenden Befehl aus: `npm i`
### 6. Navigieren Sie in den Ordner 'aufgabe_8/rec_controller/manifests': `cd ../rec_ontroller/manifests`
### 7. Führen Sie folgenden Befehl aus: `kubectl apply -f .`
### 8. Navigieren Sie in den Ordner 'aufgabe_8/rec_controller': `cd ..`
### 9. Führen Sie folgenden Befehl aus: `npm i`
### 10. Navigieren Sie in den Ordner 'aufgabe_8/sim/manifests': `cd ../sim/manifests`
### 11. Führen Sie folgenden Befehl aus: `kubectl apply -f .`
### 12. Navigieren Sie in den Ordner 'aufgabe_8/sim': `cd ..`
### 13. Führen Sie folgende Befehle aus: `npm i` und `npm start 5 dhbw-1 10 batt 31 -`
#### NOTE: Falls der rec-controller nicht wie erwartet funktioniert, kann es daran liegen, dass die Ressourcenlimits zu streng sind. Diese müssen in diesem Fall angepasst werden.
### 14. Sie können die replicas für den rec_controller nach belieben abändern
### 15. Sie können die Verbindungsparameter für die MongoDB in der Datei 'aufgabe_8/rec_controller/manifests/mongodb-secret.yaml' verändern. 
### 16. Durch die Angabe von 'restartPolicy: Always' wird der Pod bei Fehlfunktion neugestart
### 17. Durch die Angabe von 'limits' werden Ressourcen-Limits für den Pod festgelegt


