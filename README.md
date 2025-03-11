# Configuration et exécution des tests Cypress

## Initialisation du projet

Pour commencer, initialisez votre projet Node.js en exécutant la commande suivante :

npm init

Suivez les instructions pour créer votre fichier `package.json`.

## Installation de Cypress

Installez Cypress et ses dépendances en utilisant npm :

npm install cypress --save-dev


Cette commande ajoutera Cypress comme dépendance de développement dans votre `package.json`.

## Ouverture de Cypress

Pour ouvrir l'interface de Cypress et exécuter vos tests, utilisez la commande suivante :

npx cypress open

Cette commande lancera l'application Cypress, vous permettant de sélectionner et d'exécuter vos tests.

## Génération de rapports

Pour générer des rapports de test, vous pouvez utiliser des plugins Cypress tels que "cypress-mochawesome-reporter". Voici comment procéder :

### Étapes pour installer et configurer le plugin

1. **Installation du plugin** :

npm install --save-dev cypress-mochawesome-reporter

2. **Configuration de Cypress** :
Ajoutez ces lignes dans votre fichier `cypress.config.js` pour utiliser le plugin :

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
    e2e: {
      setupNodeEvents(on, config) {
    require('cypress-mochawesome-reporter/plugin')(on);
},
},
});

text

3. **Exécution des tests** :
Exécutez vos tests avec la commande suivante pour générer les rapports :

npx cypress run

Les rapports seront générés dans le dossier `cypress/reports`.