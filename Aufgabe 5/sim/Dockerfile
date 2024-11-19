# Basis-Image mit Node.js und npm
FROM node:latest

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
CMD ["npm", "start"]
