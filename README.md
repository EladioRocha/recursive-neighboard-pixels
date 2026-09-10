# recursive-neighboard-pixels

Experimento de procesamiento de píxeles con una interfaz web y un script Python. Incluye `index.js` para el navegador y `pixels.py` para trabajo con NumPy.

## Estructura

- [index.html](index.html)
- [index.js](index.js)
- [pixels.py](pixels.py)

## Preparación y uso

Sirve la raíz con un servidor estático; por ejemplo, si tienes Python 3:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Abre `http://127.0.0.1:8000/` y navega al ejemplo:

- [index.html](index.html)

Los recursos cargados desde servicios externos requieren conexión. La comprobación local debe incluir la consola del navegador y la carga de imágenes, scripts y estilos.

## Validación y estado

Esta guía se contrastó con el árbol de archivos y los manifiestos del repositorio. No se ha validado una ejecución completa contra servicios externos, bases de datos o hardware. Las versiones y los scripts mostrados describen el código actual; no implican que sus dependencias antiguas sigan siendo compatibles.
