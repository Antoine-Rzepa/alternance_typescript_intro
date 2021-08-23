## Introduction au langage Typescript

_En préambule, pensez à créer un fork de ce projet dans votre espace personnel sur Github. Clonez ensuite ce fork dans votre espace de travail local._
_Assurez-vous également que Node.js et NPM sont installés et à jour sur votre poste de travail._

### Création de la structure du projet

#### 1. Initialisation de l'environnement Node.js
Node.js utilise npm pour gérer les dépendances du projet, qui sont listées dans le fichier package.json. Pour initialiser ce fichier, utilisez la commande :

`npm init -y`

Prenez le temps de voir le contenu du package.json, et de vous rappeler la signification des différentes sections.


#### 2. Initialisation de l'environnement Typescript

Utilisez ensuite NPM pour installer Typescript :

`npm install typescript --save-dev`

Que signifie l'option `--save-dev` ?

--save-dev adds the third-party package to the package's development dependencies. It won't be installed when someone runs npm install directly to install your package. It's typically only installed if someone clones your source repository first and then runs npm install in it.

Initialisez ensuite le fichier de configuration `tsconfig.json` :

`npx tsc --init --rootDir src --outDir build --esModuleInterop --lib es6 --module commonjs --allowJs true --noImplicitAny true`

Prenez le temps de comprendre les paramètres utilisés dans ce fichier, reportez-vous à la documentation ci-nécessaire. Les lignes commentées du fichier peuvent ensuite être supprimées.   


#### 3. Arborescence du projet

Créez les répertoires src et build qui accueilleront les codes source et compilé du projet.
Créez un fichier `index.ts` dans le répertoire `src`, insérez-y un code JS de test (avec `console.log` par exemple) pour vérifier le bon fonctionnement du projet.

Effectuez une première compilation de votre code via :

`npx tsc`
 
Que signifie cette commande ?
Ouvrez le fichier `build/index.js` généré, assurez-vous qu'il est bien conforme à votre code initial.


#### 4. Outils de développement

Pour faciliter les étapes de développement, nous allons mettre en place l'outil `nodemon` qui permet de recharger automatiquement l'application après chaque modification de code.
Nous utiliserons également `ts-node` qui permet à Node.js d'exécuter du code Typescript sans passer par l'étape de compilation :

`npm install --save-dev ts-node nodemon`

Créez ensuite un fichier de configuration `nodemon.json` avec le contenu suivant :
```json
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "ts-node ./src/index.ts"
}
```
 
N'hésitez pas à consulter la documentation de l'outil pour en savoir plus sur sa configuration.

Le rechargement automatique est ensuite lancé via la commande `nodemon -I`. Créez une tâche dans le fichier `package.json` afin de lancer cette commande depuis NPM. 


#### 5. Donjons & Dragons : le retour de la vengeance

Vous allez utiliser le langage Typescript pour développer une version très simplifiée du jeu "Donjons & Dragons", en utilisant des interactions via ligne de commande uniquement.

Tout d'abord, installez la librairie [prompts](https://github.com/terkelg/prompts) qui permet de mettre en place simplement des interactions en ligne de commande.  
Installez également les types Typescript pour prompts `@types/prompts` en tant que librairie de développement.

Modifiez ensuite votre fichier `index.ts` afin d'utiliser `prompts`. Dans un premier temps, proposez au joueur de saisir le nom de son personnage puis affichez-le dans la console.

Vérifiez que cette première version fonctionne.

**Rappel : pensez à commit & push régulièrement votre code**

Vous allez ensuite développer le jeu par étapes successives, avec les règles suivantes :

  - Le jeu fonctionne au tour par tour, en commençant par le personnage joueur
  - Les messages destinés au joueur seront affichés via la fonction `console.log` 
  - Le personnage joueur et les ennemis commencent le jeu avec un nombre donné de points de vie
  - Lors d'une attaque, les dégâts infligés seront un nombre aléatoire entre 0 et 100
  - Le personnage ou l'ennemi meurent si leurs points de vie sont inférieurs ou égaux à 0
  
#### 6. Le Héros / L'Héroïne

Commencez par créer une classe `Character`, ayant les attributs suivants :

  - nom (string)
  - sexe (string)
  - points de vie (number)
  
Pour préserver la lisibilité du code, on créera un fichier .ts par classe / interface.

Modifiez ensuite votre fichier `index.ts` pour permettre au joueur de choisir le sexe du personnage joueur, juste après le choix du nom.
Une fois ces informations récupérées, utilisez-les pour créer une instance de `Character`. Grâce à une méthode `summary` sur la classe `Character`, affichez dans la console le résumé des informations du héros / de l'héroïne.    

Ajoutez ensuite une ligne de code indiquant le début des combats au joueur, par exemple :

`console.log('Ennemi en approche !');`

#### 7. Au combat !

Lors de chaque combat, le personnage joueur va avoir le choix entre :

  - combattre
  - battre en retraite (fin de la partie)
  
Modifiez votre fichier `index.ts` pour intégrer un nouveau choix entre ces 2 options pour le joueur.

Créez ensuite une classe `Enemy` qui représentera les ennemis que le personnage joueur pourra combattre. Faites en sorte que chaque ennemi dispose d'un nombre de points de vie initial > 0.

Ajoutez une méthode `attack(enemy: Enemy)` à votre classe `Character` afin de représenter son attaque. Implémentez-la de la manière suivante :

  - les dégâts de l'attaque sont un nombre aléatoire entre 0 et 100
  - un message s'affiche dans la console pour indiquer le nombre de dégâts au joueur
  - les points de vie de l'ennemi se voient imputés du nombre de dégâts
  
Intégrez cette première phase d'attaque à votre fichier `index.ts`, dans le cas où le joueur choisir de combattre.


#### 8. Riposte

Après la première attaque du joueur, l'ennemi va riposter s'il est toujours en vie.

Modifiez votre fichier `index.ts` pour gérer les 2 cas de figures :

  - Afficher un message de victoire si l'ennemi n'a plus de points de vie
  - Afficher le message de rispote sinon (par ex: `console.log("L'ennemi riposte !");`)

Pour gérer la riposte de l'ennemi, ajoutez une méthode `attack(charac: Character)` à la classe Enemy. Comme précédemment, cette méthode évaluera les dégâts via un nombre aléatoire entre 0 et 100.
Les dégâts des ennemis se voient appliquer un facteur 0.5 avant d'être subis par le personnage joueur.

A l'issue de la riposte, deux situations possibles pour le personnage joueur : 

  - Soit il dispose d'un nombre de points de vie > 0, et il peut donc revenir au choix combattre / battre en retraite
  - Soit il n'a plus de points de vie, et la partie est terminée
  
Modifiez votre fichier `index.ts` pour intégrer cette nouvelle étape.


#### 9. Refactoring

Maintenant que la mécanique principale du jeu est en place, vous allez procéder à une phase d'amélioration du code : les classes `Character` et `Enemy` ayant toutes les deux une méthode `attack`, créez une interface `Fighter` qui va contenir la méthode `attack` extraite des 2 classes. Faire en sorte que les 2 classes implémentent l'interface `Fighter`.

Cette interface commune va vous aider à intégrer une autre caractéristique des combats : dans D&D, les dégâts subis par un personnage ou ennemi dépendent à la fois des caractéristiques de l'attaque et de celles de la défense.

Ajoutez une méthode `takeDamage(damage: number)` à l'interface `Fighter`, qui servira à calculer les dégâts effectivements subis par un personnage ou un ennemi. Implémentez cette méthode dans les classes `Character` et `Enemy`, en intégrant le fait que les héros / héroïnes bénéficient d'un bonus de 50% de réduction des dégâts.       


#### 10. Classes de personnages

Afin d'enrichir l'expérience de jeu, introduisez plusieurs classes de personnage avec des caractéristiques différentes. Par exemple :

  - Guerrier / Guerrière : + de points de vie
  - Magicien / Magicienne : dégâts supplémentaires 
  - etc...

Utilisez les fonctions d'héritages offertes par Typescript pour implémenter ces classes. N'hésitez pas à mettre en place des classes abstraites si cela vous semble pertinent.
 
    
#### 11. Ajout des armes

Créez une classe `Weapon` ayant pour attributs :

  - nom (string)
  - damage (number)

Générez une liste d'armes de votre choix, et offrez la possibilité au joueur de choisir l'une d'entre elles lors de la création de son personnage.

Modifiez la méthode `attack` afin de prendre en paramètre supplémentaire optionnel une arme. Modifier l'implémentation de la méthode afin d'intégrer les dégâts de l'arme lorsqu'elle est utilisée. 
 

#### 12. Bonus

Lorsqu'un joueur bat en retraite, faites en sorte que l'ennemi lance une provocation afin de tenter de le faire revenir au combat. Pour la réplique, vous pourrez utiliser celles du Maître d'Armes de Kaamelott, accessibles à l'adresse :

[Répliques](https://kaamelott.hotentic.com/api/random/personnage/Le%20Ma%C3%AEtre%20d'Armes) 
