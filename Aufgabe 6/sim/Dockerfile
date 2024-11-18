# Basis-Image mit Node.js und npm
FROM node:16

# Erstelle das Arbeitsverzeichnis im Container
WORKDIR /app

# Kopiere die package.json und package-lock.json, um die Abhängigkeiten zu installieren
COPY package*.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den Rest der Anwendung
COPY . .

# Exponiere den Port, auf dem die App läuft (z. B. 3000)
EXPOSE 3000

# Startbefehl für die Anwendung
# CMD ["npm", "start"]

# Starte die Anwendung
CMD ["npm", "start", "10", "dhbw-1", "5", "gpsd", "48.6", "8.6"] # GPS

# Beispiel für die Verwendung der Anwendung
# CMD ["npm", "start", "10", "dhbw-2", "5", "diss", "0", "-"] # Distanz seit Start (in km)
# CMD ["npm", "start", "10", "dhbw-3", "5", "disp", "0", "-"] # Distanz seit Warenaufnahme (in km)
# CMD ["npm", "start", "10", "dhbw-4", "5", "time", "0", "-"] # Zeitdauer seit Warenaufnahme (in Minuten)
# CMD ["npm", "start", "10", "dhbw-5", "5", "batt", "80", "-"] # Ladezustand der Batterie (in %)
# CMD ["npm", "start", "10", "dhbw-6", "5", "delivery", "0", "0.03"] # Ware ausgeliefert (true / false)