<p align="center">
  <a href="https://github.com/Ganarok/fichesetchips/wiki" target="blank"><img src="./doc/design/logo/Fichier 4@4x.png" width="320" alt="F&C Logo" /></a> <br>
</p>

Table des matières
===
1. [Contexte](#contexte)
2. [L'équipe](#léquipe)
3. [Documentation](https://github.com/Ganarok/fichesetchips/wiki)
    + [Organisation](https://github.com/Ganarok/fichesetchips/wiki/Gitflow-&-Environnements)
    + [Front-End](https://github.com/Ganarok/fichesetchips/wiki/Documentation-Front-End)
    + [Back-End](https://github.com/Ganarok/fichesetchips/wiki/Documentation-Back-End)
4. Technique
    + [Front-End](./front)
    + [Back-End](./backnest)

Contexte
===
Fiches&Chips est une plateforme de jeu de rôle en ligne permettant de créer/générer des scénarios de jeu de rôle via un moteur de création. Des rooms peuvent ensuite être créées pour y tenir une partie à plusieurs, sous la gouverne d'un MJ diabolique qui peut être aidé d'une AI MJ copilot.

L'équipe
===
[Organigramme](https://github.com/Ganarok/fichesetchips/wiki/Organigramme)

Démarrer le projet
===

Un Docker-compose est disponible pour lancer le projet en local. Il suffit de lancer la commande suivante à la racine du projet :

```bash
docker-compose up --build
```

Vous pouvez installer Docker [ici](https://docs.docker.com/engine/install/). Le docker-compose va lancer 3 containers : `front`, `back` et `db` (Postgres). Le front est accessible sur le port 8080 à l'adresse http://localhost:8080.

Lors du lancement du Docker-compose, la base de données est initialisée avec des données de test. Vous pouvez vous connecter avec les identifiants suivants :

```bash
# Utilisateur admin, mot de passe admin.
# LogIn accessible à l'adresse http://localhost:8080/login
test
password
```

![MapMaker](https://cdn.discordapp.com/attachments/559487643327528985/1103399468709183488/Capture_decran_2023-05-03_a_21.15.29.png)

![Game](https://cdn.discordapp.com/attachments/559487643327528985/1103398906869583872/Capture_decran_2023-05-03_a_21.13.13.png)
