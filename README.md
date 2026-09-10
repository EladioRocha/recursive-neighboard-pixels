# Pixel Neighborhood Explorer

A **vanilla JavaScript visualization of pixel-neighbor traversal**, exploring eight-way connectivity in a randomly generated binary grid. A separate Python file demonstrates creating and iterating over a NumPy array.

This is an experimental algorithm sketch, not a finished image-processing library. The browser code attempts to discover connected groups of `1` cells, but its traversal and object counts have not been validated for correctness.

## Run the browser example

Clone the repository, then serve it with Python 3:

```sh
git clone https://github.com/EladioRocha/recursive-neighboard-pixels.git
cd recursive-neighboard-pixels
python -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000`. No npm installation or build step is needed. The page generates a grid and starts traversal automatically; the browser console displays debugging output.

## What to explore

- `1` cells are candidate foreground pixels and `0` cells are background.
- The traversal checks horizontal, vertical, and diagonal neighbors.
- Highlighting shows cells visited by the running algorithm.
- Press `1`, `2`, `3`, or `4` to choose a painting color, then click a cell. Painting updates a separate pixel-art array; it does not replace the traversal's input data.
- Reload the page to generate another board.

## Configuration

The constants at the top of [index.js](index.js) control the browser experiment:

| Constant | Current value | Meaning |
| --- | --- | --- |
| `WIDTH` | `10` | Logical columns used for neighbor indexing. |
| `BOARD_SIZE` | `10000` | Number of rendered cells. |
| `BOMB_AMOUNT` | `6000` | Initial number of foreground entries before forced sample values. |

The CSS uses a 400 px container with 40 px cells, also producing ten columns. Keep that layout consistent with the logical width when experimenting. Neighbor checks contain hard-coded offsets, so changing `WIDTH` alone is not sufficient to generalize the algorithm.

The 10,000-cell page is large and the traversal uses timed callbacks. A full run can take a long time. The `reshape()` call only creates a small debugging view of a copied array; it does not resize the rendered board.

## Python example

Install NumPy in a Python environment, then run:

```sh
python -m pip install numpy
python pixels.py
```

[pixels.py](pixels.py) generates 100,000 random binary values and prints them. It does not implement the browser's neighbor traversal and does not load an image file.

## Files and checks

| File | Purpose |
| --- | --- |
| [index.html](index.html) | Browser entry point. |
| [index.js](index.js) | Grid generation, traversal, and painting controls. |
| [style.css](style.css) | Grid dimensions and highlights. |
| [pixels.py](pixels.py) | Independent NumPy experiment. |

There is no automated test suite. `node --check index.js` provides a syntax check. Useful future work includes deterministic sample grids, boundary tests, and a traversal queue with explicit visited-state handling.
