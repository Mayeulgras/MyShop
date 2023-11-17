# README MyShop

## Installation de docker

Tout d’abord, avant de commencer le projet, veuillez installer docker desktop sur votre ordinateur suivant la bonne version.

## Rendre le docker prêt à l'utilisation

- Ouvrez le terminal à partir de votre dossier docker et entrez la commande ( docker-compose up -d –build )

- Ensuite allez sur docker desktop et cliquez sur le phpmyadmin et dans la console entrez la commande ( bin/console doctrine :database :create ) 

- Ensuite entrez dans la console la commande suivante ( bin/console doctrine :migrations :migrate )

- Ensuite entrez dans la console la commande suivante ( bin/console lexik :jwt :generate-keypair )

- Ensuite entrez dans la console la commande suivante ( bin/console app :add-user )
Votre docker est prêt à être utilisé !

## Pour lancer et arrêter le docker 

Pour lancer et arrêter votre docker vous pouvez entrer ces deux commandes dans la console du fichier docker ( docker-compose up -d et docker-compose down )

## Pour voir les routes de l'api

Pour voir toutes les routes de votre api vous pouvez cliquer sur ce lien ( http://localhost/api/docs )

## Installation des dépendances

Maintenant vous aurez besoins d’installer toutes les dépendances nécessaires à la réalisation de votre projet. Pour ça allez dans votre dossier MyShop, entrez dans le terminal et entrez la commande ( npm install ). Cela va installer « axios » , « pinia », « vue » et « vue-router ».
