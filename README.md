------ Descripción ------
Proyecto: Backend del E-Commerce de mi Frontend ya creado de la primera entrega.

Para el armado se tomo en cuenta lo que vimos en clases, foros y leyendo en documentación.
Se utilizo un ENV para datos sensibles, mongoDB para base de datos, controladores, middlewares de verificación y token, tres modelos para mi ecommerce, repositorio, rutas personalizadas y utilidades para enviar correo.
Los testeos se hicieron en Postman para comprobar el funcionamiento de las URL antes de hacer la conexión con el Frontend, también se probo MongoDB de forma local antes de subirlo a Atlas.

Se utilizo estas dependencias en el armado:
- bcrypt
- cors
- dotenv
- jsonwebtoken
- mongoose
- nodemailer
- nodemon

Dificultades Y Aprendizajes:
- Al principio del armado tuve dificultades para prenderlo, por lo que me llevo un poco de mas tiempo entender el armado del backend y separar funciones de SQL visto en clase para solo utilizar MongoDB.
- Tuve complicaciones para entender como funcionaba MongoDB ya que era la primera vez que lo usaba, ya sabia usar SQL, pero quería probar una nueva forma de datos para este Trabajo final y aprender de como funciona para un futuro.
- Dificultades en el armado del correo y que funcione el envió.
- Tuve complicaciones en entender que el orden de las routes, influye en el comportamiento de las rutas protegidas y no protegidas. Ejemplo, utilizar /status/ping o obtener productos sin necesidad de token de verificación.
- Se dificulto bastante en el despliegue en Vercel.
