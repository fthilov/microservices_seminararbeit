# Verwende das Node.js-Image
FROM node:18-alpine

# Arbeitsverzeichnis im Container festlegen
WORKDIR /

# Package-Informationen kopieren
COPY package*.json ./

# Abhängigkeiten installieren
RUN npm install

# Anwendungscode kopieren
COPY . .

# Start der Anwendung
CMD ["node", "batt_alert.js"]