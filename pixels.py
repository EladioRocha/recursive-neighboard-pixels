import numpy as np

WIDTH = 20
BOARD_SIZE = 100000
SQUARES = []
BOMB_AMOUNT = 95000

PIXELS = []
bombsChecked = {}

PIXELS = np.random.randint(2, size = BOARD_SIZE)

def iterateBoard():
    for i in range(BOARD_SIZE):
        print(PIXELS[i])

iterateBoard()