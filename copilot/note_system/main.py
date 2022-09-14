from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
import json
import os

app = FastAPI()

MAX_LINES_NOTES = 50

class Item(BaseModel):
    name: str
    use: str

class Position(BaseModel):
    x: int
    y: int
        

def playerPos(data: dict, player_name: str):
    return ({player_name: {"x": data[player_name]["position"]["x"], "y": data[player_name]["position"]["y"]}})

def playerInv(data: dict, player_name: str):
    return ({player_name: {"inventory" : data[player_name]["inventory"]}})

def clean_registry():
    f = open("registry.txt", "r")
    content = f.readlines()
    f.close()
    if (len(content) < MAX_LINES_NOTES):
        return
    os.remove("./registry.txt")
    f = open("./registry.txt", "w")
    for i in range(0, MAX_LINES_NOTES, 1):
        f.write(content[i + len(content) - MAX_LINES_NOTES])
    f.close()

def note(player_one: str, message: str, player_two : Union[str, None] = None):
    with open("registry.txt", "a+") as f:
        f.write(f"{player_one} {message}")
        if player_two:
            f.write(f" to {player_two}\n")
            return (f"{player_one} {message} to {player_two}")
        f.write("\n")
    clean_registry()
    return (f"{player_one} {message}")

@app.get("/")
async def index():
    return("Hello World!")

@app.get("/player/position")
async def getPosition(player_name: str):
    with open('data.json', 'r+') as f:
        data = json.load(f)
        if not player_name in data:
            return (f"Player {player_name} does not exist")
        return (playerPos(data, player_name))

@app.get("/player/inventory")
async def getInventory(player_name: str):
    with open('data.json', 'r+') as f:
        data = json.load(f)
        if not player_name in data:
            return (f"Player {player_name} does not exist")
        return (playerInv(data, player_name))

@app.post("/player")
async def createPlayer(player_name: str):
    with open('data.json', 'r+') as f:
        data = json.load(f)
        if player_name in data:
            return ("Player already exists")
        data[player_name] = {"name": player_name, "position" : {"x" : 0, "y": 0}, "inventory": {}}
        f.seek(0)
        json.dump(data, f, indent=4)
        f.truncate()
        return (f"Player {player_name} created")

@app.get("/player")
async def getPlayer(player_name: str):
    with open('data.json', 'r+') as f:
        data = json.load(f)
        if not player_name in data:
            return (f"Player {player_name} does not exist")
        return ({player_name : data[player_name]})

@app.get("/players")
async def getPlayers():
    with open('data.json', 'r+') as f:
        data = json.load(f)
        return (data)

@app.put("/player/pos")
async def updatePlayerPos(player_name: str, position: Position):
    with open('data.json', 'r+') as f:
        data = json.load(f)
        if not player_name in data:
            return (f"Player {player_name} does not exist")
        previous_pos = {"x": data[player_name]["position"]["x"], "y" : data[player_name]["position"]["y"]}
        data[player_name]["position"]["x"] = position.x
        data[player_name]["position"]["y"] = position.y
        f.seek(0)
        json.dump(data, f, indent=4)
        f.truncate()
        note(player_one=player_name, message=f"moves from {previous_pos['x']}:{previous_pos['y']} to {position.x}:{position.y}")
        return (playerPos(data, player_name))

@app.put("/player/inventory/")
async def updatePlayerInventory(player_name: str, item: Item):
    with open('data.json', 'r+') as f:
        data = json.load(f)
        if not player_name in data:
            return (f"Player {player_name} does not exist")
        data[player_name]["inventory"][item.name] = item.use
        f.seek(0)
        json.dump(data, f, indent=4)
        f.truncate()
        note(player_one=player_name, message=f"put {item.name} in his inventory")
        return (playerInv(data, player_name))

@app.delete("/player/inventory")
async def removePlayerItem(player_name: str, item_name: str):
    with open('data.json', 'r+') as f:
        data = json.load(f)
        if not player_name in data:
            return (f"Player {player_name} does not exist")
        if not item_name in data[player_name]["inventory"]:
            return (f"Player {player_name} does not have {item_name} in its inventory")
        del data[player_name]["inventory"][item_name]
        f.seek(0)
        json.dump(data, f, indent=4)
        f.truncate()
        note(player_one=player_name, message=f"remove {item_name} from his inventory")
        return (playerInv(data, player_name))

@app.post("/note")
async def registerNotes(player_one: str, message: str, player_two: Union[str, None] = None):
    return(note(player_one, message, player_two))

@app.get("/note")
async def getNotes():
    f = open("registry.txt", "r")
    content = f.readlines()
    f.close()
    return ({f"registry" : content})