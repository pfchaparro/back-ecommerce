# BACK-END

_Backend hecho en Node JS_

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

Mira **Deployment** para conocer como desplegar el proyecto.


### Pre-requisitos 📋

_Que cosas necesitas para instalar el software y como instalarlas_

```
Da un ejemplo
```
## Construido con 🛠️

* [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript) - El lenguaje de programación.
* [NodeJs](https://nodejs.org/) - El framework usado.
* [Express](https://expressjs.com/) - El framework para desarrollo de api.
* [Npm](https://maven.apache.org/) - Manejador de dependencias.
* [MongoDB](https://www.mongodb.com/es) - Motor de BD NoSQL.

## Servicios utilizados en la nube. ⚙️
* [Heroku](https://www.heroku.com) - Plataforma como servicio de computación en la nube.
* [Mlab](https://mlab.com/) - Servicio de base de datos en la nube totalmente administrado que aloja bases de datos MongoDB.

### Instalación 🔧

Como tener el entorno de desarrollo en el local (Recomendable pero no obligatorio utilizar S.O Linux - Debian):

* Instalar motor de BD MongoDB Community Server:

Acceder al siguiente enlace para descargar el instalador: 'https://www.mongodb.com/download-center/community'

```
Actualizar paquetes: sudo apt update
Intalar Mongo: sudo apt install mongodb-org
Vericar: mongod --version

```
* Administrar servicios de MongoDB:

```
sudo systemctl enable mongod
Levantar servicio: sudo systemctl start mongod ó sudo mongod

sudo systemctl stop mongod
sudo systemctl restart mongod 

```
Más documentación en el siguiente enlace: 'https://tecadmin.net/install-mongodb-on-ubuntu/'.

* Instalación de Robo3T para la gestión de la base de datos

install robo3t
https://benjagarrido.com/instalando-robomongo-ubuntu-16-04/

Abrir robo3t
cd /usr/local/bin/robomongo/robo3t-1.3.1-linux-x86_64-7419c406/bin/

./robo3t

* Instalación de Node JS

* Instalación de NPM


* Correr el proyecto en local:
    'node/server/server.js'


## Documentación API 📖

la documentación de la api se encuentra en 'documentation/api_documentation/api.apib

Debe instalar 'aglio' se instala con el siguiente comando 'npm install -g aglio'

Y lo debe ejecutar con el siguiente comando 'aglio -i api_documentation.apib -o index.html' para mirar la documentación de la API a detalle.

## Ejecutando las pruebas ⚙️

_Explica como ejecutar las pruebas automatizadas para este sistema_

### Analice las pruebas end-to-end 🔩

_Explica que verifican estas pruebas y por qué_

```
Da un ejemplo
```

### Y las pruebas de estilo de codificación ⌨️

_Explica que verifican estas pruebas y por qué_

```
Da un ejemplo
```

## Despliegue 📦

_Agrega notas adicionales sobre como hacer deploy_

## Contribuyendo 🖇️

Por favor lee el [CONTRIBUTING.md](https://gist.github.com/villanuevand/xxxxxx) para detalles de nuestro código de conducta, y el proceso para enviarnos pull requests.

## Wiki 📖

Puedes encontrar mucho más de cómo utilizar este proyecto en nuestra [Wiki](https://github.com/tu/proyecto/wiki)

## Versionado 📌

Usamos [SemVer](http://semver.org/) para el versionado. Para todas las versiones disponibles, mira los [tags en este repositorio](https://github.com/tu/proyecto/tags).

## Autores ✒️

_Menciona a todos aquellos que ayudaron a levantar el proyecto desde sus inicios_

**Pablo Felipe Chaparro Hurtado** - *Trabajo Inicial* - *Documentación* - [pfchaparro](https://github.com/pfchaparro)

También puedes mirar la lista de todos los [contribuyentes](https://github.com/your/project/contributors) quíenes han participado en este proyecto. 

## Licencia 📄

Este proyecto está bajo la Licencia (Tu Licencia) - mira el archivo [LICENSE.md](LICENSE.md) para detalles

## Expresiones de Gratitud 🎁

* Comenta a otros sobre este proyecto 📢
* Invita una cerveza 🍺 o un café ☕ a alguien del equipo. 
* Da las gracias públicamente 🤓.
* etc.



---
⌨️ con ❤️ por [pfchaparro](https://github.com/pfchaparro) 😊


* Crear variables de entorno en heroku
heroku config
heroku config:set SEED="este-es-el-seed-produccion"

* heroku configuraciones
heroku login


* mongo url para utilizar con mongo compas

mongodb+srv://root-db:<password>@cluster0-yhfy8.mongodb.net/test

mongodb+srv://root-db:<AkRj4JhDxYJccuiN>@cluster0-yhfy8.mongodb.net/test


* actualizar paquetes de node

npm update