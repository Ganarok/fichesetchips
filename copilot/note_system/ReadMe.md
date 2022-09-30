# Copilote : système de notes automatique

L'objectif de ce système automatique de notes est de garder enregistré toutes les actions qui ont été effectuées au cours d'une partie.<br>

## Dates et updates principaales
|    Date    |                                      Fonctionnalitées                                        |
|------------|----------------------------------------------------------------------------------------------|
| 16/09/2022 | Débuts du projet                                                                             |
|            | API disponible sous fastAPI                                                                  |
|            | Dockerisation                                                                                |
|            | Pas de db, save en filesystem                                                                |
|            | Possibilité de changer le nombre de lignes du registry en 1 variable                         |
|            | Route pour écrire des notes (user1, action, user2)                                           |
|            | Update automatique des notes pour les actions prévues (déplacement, update de l'inventaire)  |

La documentation API swagger complète est disponible à l'adresse [http://54.38.185.154:9990/docs](http://54.38.185.154:9990/docs)

## Routes API
___
### - ```/players```
**Methods**: GET<br>
**Utility**: Renvoie les infos de chacun des joueurs.<br>
**Query** : None<br>
**Body** : None<br>
**Retour** : 
```json
{
  "PLAYER1": {
    "name": "NAME1",
    "position": {"x": POSX1,"y": POSY1},
    "inventory": {...}
  },
  "PLAYER2": {
    "name": "NAME2",
    "position": {"x": POSX2,"y": POSY2},
    "inventory": {...}
  },...
}
```
___
### - ```/player```
**Methods**: GET<br>
**Utility**: Renvoie les infos d'un' joueur.<br>
**Query** : player_name=NOM_DU_JOUEUR<br>
**Body** : None<br>
**Retour** : 
```json
{
  "PLAYER": {
    "name": "NAME",
    "position": {"x": POSX,"y": POSY},
    "inventory": {...}
  }
}
```
<br>
<br>
<br>

**Methods**: POST<br>
**Utility**: Créer un joueur à la position 0:0, avec un inventaire vide.<br>
**Query** : player_name=NOM_DU_JOUEUR<br>
**Body** : None<br>
**Retour** : 
```txt
"Player NOM_DU_JOUEUR created"
```
___

### - ```/player/position```
**Methods**: GET<br>
**Utility**: Renvoie la position du personnage.<br>
**Query** : player_name=NOM_DU_JOUEUR<br>
**Body** : None<br>
**Retour** : 
```json
{
  "NOM_DU_JOUEUR": {
    "x": POSITION_X,
    "y": POSITION_Y
  }
}
```
<br>
<br>
<br>

**Methods**: Put<br>
**Utility**: update la position du personnage.<br>
**Query** : player_name=NOM_DU_JOUEUR<br>
**Body** :
```json
{
  "x": NOUVELLE_POSITION_X,
  "y": NOUVELLE_POSITION_Y
}
```
**Retour** : 
```json
{
  "NOM_DU_JOUEUR": {
    "x": NOUVELLE_POSITION_X,
    "y": NOUVELLE_POSITION_Y
  }
}
```
___

### - ```/player/inventory```
**Methods**: GET<br>
**Utility**: Renvoie l'inventaire d'un personnage.<br>
**Query** : player_name=NOM_DU_JOUEUR<br>
**Body** : None<br>
**Retour** : 
```json
{
  "NOM_DU_JOUEUR": {
    "inventory": {
      "ITEM1": "UTILITY",
      "ITEM2": "UTILITY",...
    }
  }
}
```
<br>
<br>
<br>

**Methods**: PUT<br>
**Utility**: update ou ajoute un item dans l'inventaire du personnage.<br>
**Query** : player_name=NOM_DU_JOUEUR<br>
**Body** :
```json
{
  "name": "NOM_DE_L'ITEM",
  "use": "UTILITÉ_DE_L'ITEM"
}
```
**Retour** : 
```json
{
  "NOM_DU_JOUEUR": {
    "inventory": {
      "ITEM1": "UTILITY",
      "ITEM2": "UTILITY",...
    }
  }
}
```
<br>
<br>
<br>

**Methods**: DELETE<br>
**Utility**: Supprime un item de l'inventaire du personnage.<br>
**Query** :
- player_name=NOM_DU_JOUEUR
- item_name=NOM_DE_L'ITEM

**Body** : None<br>
**Retour** : 
```json
{
  "NOM_DU_JOUEUR": {
    "inventory": {
      "ITEM1": "UTILITY",
      "ITEM2": "UTILITY",...
    }
  }
}
```
### - ```/note```
**Methods**: GET<br>
**Utility**: Renvoie toutes les notes.<br>
**Query** : None<br>
**Body** : None<br>
**Retour** : 
```json
Note1
Note2
Note3
Note4
...
```
<br>
<br>
<br>

**Methods**: POST<br>
**Utility**: Créer une note personnelle.<br>
**Query** :
- player_one=NOM_DU_JOUEUR_EFFECTUANT_L'ACTION
- message=ACTION%20EFFECTUÉE
- player_two=NOM_DU_PERSONNAGE_SUBISSANT_L'ACTION (optionnel)

**Body** : None<br>
**Retour** : 
```txt
"{NOM_DU_JOUEUR_ACTIF} {ACTION EFFECTUÉE} {NOM_DU JOUEUR_PASSIF (optionnel)}"
```
