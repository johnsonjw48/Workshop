##### Pour notre projet #####



Notre projet est composé de 2 parties : une partie en front-end et une partie en back-end. Pour lancer notre projet, il suffit de suivre les commandes ci-dessous, la partie back-end étant hébergé sur un logiciel tiers, il n'y a pas besoin de le lancer manuellement.
Notre back-end contient toutes les informations permettant à notre projet d'outrepasser le CORS de Google, qui nous bloquait en fonction du nombre de requêtes que l'on envoyait à leur API, d'où l'idée de créer notre propre API.


## Partie Front ##

1. Faire un clone de notre projet avec l'une de ces 2 commandes : 
- `git clone https://github.com/johnsonjw48/Workshop.git` (HTTPS)
- `git clone git@github.com:johnsonjw48/Workshop.git`     (SSH)

2. Installer toutes les dépendances de notre projet :
- `npm install`

3. Lancer le projet avec la commande suivante : 
- `npm start`

Pour que le projet soit fonctionnel, il y aura aussi besoin de créer un fichier .env à la racine du projet, afin de récupérer les données confidentielles, notamment la clé de l'API.


## Technologies utilisées ##

Pour ce qui est des technologies utilisées, nous avons opté pour l'utilisation d'une base de données en NoSQL, qui est Firebase. Nous sommes partis sur cette idée car l'intégration d'un dashboard sur une appli React nous a paru la meilleure des solutions à utiliser. De plus, Firebase étant un outil Google, la communication entre React et Firebase est simplifiée, car Firebase ne fonctionne qu'avec des projets JavaScript. Nous aurions pu utiliser d'autres langages de JavaScript comme AngularJS ou VueJS, mais au vu du temps imparti, l'idée de l'application React nous a paru la plus optimale car nous avions le plus de connaissances dans ce domaine et la documentation est très bien renseignée.
Nous avons utilisé aussi Big Query, qui est une extension de Firebase afin de faire la connexion entre cloud firestore et Data Studio, l'outil que les DMM ont utilisé pour créer leur dashboard. Etant tous 2 des outils Google, relier les 2 ne nous as pas trop posé de problèmes





#######################################
