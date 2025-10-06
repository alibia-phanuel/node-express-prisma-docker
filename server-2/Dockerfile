#Use an Official Node runtime as a parent image | Utilisez une image officielle Node.js comme image parente
FROM node:22-alpine

# Set the working directory | Définir le répertoire de travail
WORKDIR /app

# Copy package.json and package-lock.json to the working directory | Copier package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Install dependencies | Installer les dépendances
RUN npm install
 
# Copy the rest of the application code to the working directory | Copier le reste du code de l'application dans le répertoire de travail
COPY . .

# Build the application | Construire l'application
RUN npm run build 

# Expose port 5000 | Exposer le port 5000
EXPOSE 5000

# Start the application | Lancer l'application
CMD ["nodemon", "./src/server.js"]