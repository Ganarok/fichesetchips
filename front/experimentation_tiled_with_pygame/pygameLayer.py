import pygame
import pygame.locals
import numpy as np
import json
import sys

class Tileset:
    def __init__(self, file, size=(32, 32), margin=1, spacing=1):
        self.file = file
        self.size = size
        self.margin = margin
        self.spacing = spacing
        self.image = pygame.image.load(file)
        self.rect = self.image.get_rect()
        self.tiles = []
        self.load()


    def load(self):

        self.tiles = []
        x0 = y0 = self.margin
        w, h = self.rect.size
        dx = self.size[0] + self.spacing
        dy = self.size[1] + self.spacing
        for x in range(x0, w, dx):
            for y in range(y0, h, dy):
                tile = pygame.Surface(self.size)
                tile.blit(self.image, (0, 0), (x, y, *self.size))
                self.tiles.append(tile)

    def __str__(self):
        return f'{self.__class__.__name__} file:{self.file} tile:{self.size}'

class Tilemap:
    def __init__(self, path, size=(10, 20), rect=None):
        self.size = size
        self.tilesets = {}
        self.map = np.zeros(size, dtype=int)
        self.tilesetMap = ["" for x in range(size[0] * size[1])]
        f = open(path)
        self.j = json.load(f)
        self.init_tileset()
        self.level = -1
        h, w = self.size
        self.image = pygame.Surface((32*w, 32*h))
        if rect:
            self.rect = pygame.Rect(rect)
        else:
            self.rect = self.image.get_rect()

    def init_tileset(self):
        tilesets = self.j["tilesets"]
        for t in tilesets:
            if not t["name"] in tilesets:
                tileset = Tileset(t["image"])
                self.tilesets[t["name"]] = tileset

    def render(self):
        m, n = self.map.shape
        for i in range(m):
            for j in range(n):
                tileset = self.tilesets[self.tilesetMap[i * n + j]]
                tile = tileset.tiles[self.map[i, j]]
                self.image.blit(tile, (j*32, i*32))

    def display(self):
        fmap = np.zeros(self.size, dtype=int)
        for l in range(len(self.j["layers"])):
            if self.j["layers"][l]["visible"] == True:
                layer = self.j["layers"][l]
                for i in range(len(layer["data"])):
                    if layer["data"][i] != "":
                        fmap[layer["y"] + int(i / layer["width"]), layer["x"] + i % layer["width"]] = layer["data"][i]
                        self.tilesetMap[i] = self.j["tilesets"][l]["name"]
        self.map = np.array(fmap)
        self.render()

    def activate(self, goal: str):
        d = None
        for i in range(len(self.j["layers"])):
            if self.j["layers"][i]["name"] == goal:
                if d is None:
                    d = not self.j["layers"][i]["visible"]
                self.j["layers"][i]["visible"] = d

    def next(self):
        layers = self.j["layers"]
        for l in range(len(layers)):
            if layers[l]["name"] == "way":
                if layers[l]["visible"] == False:
                    self.j["layers"][l]["visible"] = True
                    return

    def __str__(self):
        return f'{self.__class__.__name__} {self.size}'

class Game:
    def __init__(self, path):
        pygame.init()
        self.tilemap = Tilemap(path)
        self.screen = pygame.display.set_mode((640, 240))
        pygame.display.set_caption("Pygame Tiled Demo")
        self.running = True

    def run(self):
        self.tilemap.display()
        self.load_tilemap()
        while self.running:
            for event in pygame.event.get():
                if event.type == pygame.locals.QUIT:
                    self.running = False
                elif event.type == pygame.locals.KEYDOWN:
                    if event.key == pygame.locals.K_p:
                        self.tilemap.next()
                        self.tilemap.level += 1
                        self.tilemap.display()
                        self.load_tilemap()
                    elif event.key == pygame.locals.K_c:
                        self.tilemap.activate("cactus")
                        self.tilemap.display()
                        self.load_tilemap()
                    elif event.key == pygame.locals.K_d:
                        self.tilemap.activate("way")
                        self.tilemap.display()
                        self.load_tilemap()
        pygame.quit()

    def load_tilemap(self):
        self.rect = self.tilemap.image.get_rect()
        self.screen = pygame.display.set_mode(self.rect.size)
        pygame.display.set_caption(f'size:{self.rect.size}')
        self.screen.blit(self.tilemap.image, self.rect)
        pygame.display.update()

def helper():
    print()
    print("USAGE: python3 pygameLayer.py [map.json]")
    print("Une fois la fenetre python lancée, plusieurs touches possible")
    print("\tc: affiche / desaffiche le cactus")
    print("\td: affiche / desaffiche le chemin")
    print("\tp: affiche le chemin petit a petit si lancé avec map_layer.json, affiche le chemin intégralement si lancé avec map_layer_2.json")

if __name__ == "__main__":
    if ("-h" in sys.argv or "--help" in sys.argv):
        helper()
        sys.exit(0)
    if (len(sys.argv) != 2):
        helper()
        sys.exit(1)
    game = Game(sys.argv[1])
    game.run()