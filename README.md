# Mini proyecto - Tests de reacción, memoria númerica y visual
Proyecto para la asignatura Diseño de Software Sección 2
- Manuel Vergara
- Jorge Romero

Nos inspiramos en la página Humanbenchmark para hacer nuestra propia página web con diferentes tipos de tests.
Hicimos 3 tipos de tests diferentes, uno para medir el tiempo de reacción, otro la memoria numérica y otro la memoria de secuencias visual. 
* Reacción: El usuario debe hacer clic en la pantalla cuando un cuadro se vuelve verde, midiendo el tiempo de reacción. Esto incluye un temporizador aleatorio y un registro de los tiempos de reacción. Cada 5 rondas calcula el promedio de los tiempos de reacción del usuario y lo muestra en pantalla.
* Numérica:  El usuario debe recordar un número que se muestra brevemente en pantalla. Después de un tiempo, se le pide que ingrese el número recordado. Por cada ronda el número va aumentando 1 dígito. Se genera un número aleatorio y valida la respuesta ingresada por el usuario.
* Secuencia: El usuario debe repetir una secuencia de cuadros que se iluminan en un orden específico. Se genera una secuencia aleatoria que el usuario debe memorizar. Se registra la ronda actual y se almacena la mejor puntuación, es decir la ronda máxima alcanzada por el usuario. 

Para ver la página web, primero debes clonar el repositorio. Y usar el comando npm install, que instalará las dependencias necesarias (.next y node_modules, las cuales son ignoradas por el .gitignore). Después hay que utilizar npm run dev en la consola para visualizar la página web en un entorno local.
