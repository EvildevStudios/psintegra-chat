# Psintegra API Documentation

Psintegra API is a Node.js and Express-based API that provides two endpoints for working with OpenAI's GPT-3 language model. These endpoints are `/api/openai/engines` for retrieving available engines, and `/api/openai/chat` for interacting with the ChatGPT model.

# API Endpoints
## GET `/api/openai/engines`
Retrieves a list of available engines from OpenAI's API.

Response
200 OK: Returns an array of objects representing available engines.
Example response:

```json
Copy code
[
  {
    "id": "davinci",
    "name": "Davinci"
  },
  {
    "id": "curie",
    "name": "Curie"
  },
  {
    "id": "babbage",
    "name": "Babbage"
  }
]
```
## POST `/api/openai/chat`
Interacts with OpenAI's ChatGPT model to generate a response to a user's message.

Request
The request body should be a JSON object with the following properties:

engine (string, required): The ID of the engine to use.
prompt (string, required): The message from the user.
maxTokens (number, optional): The maximum number of tokens to generate in the response. Defaults to 64.
temperature (number, optional): The sampling temperature to use during generation. Must be between 0 and 1. Defaults to 0.5.
Example request:

```json
Copy code
{
  "messages":[
    {
      "role": "user",
      "content": "¿Como puedo mejorar mi relacion con mi familia?"
    }
  ]
}
```
Response
200 OK: Returns an object representing the generated response.
Example response:

```json
Copy code
{
    "chatResponse": {
        "role": "assistant",
        "content": "Como modelo de lenguaje natural, no tengo experiencias ni emociones, pero puedo brindar algunos consejos generales que podrían ayudar a mejorar la relación con tu familia:\n\n1. Comunica tus sentimientos: Si hay algo que te está molestando o te sientes triste o frustrado, habla con tu familia al respecto. La comunicación abierta puede ayudar a resolver conflictos y mejorar las relaciones.\n\n2. Pasa tiempo juntos: Dedica tiempo a actividades en familia como ir al cine, hacer una caminata juntos, cocinar o cualquier otra actividad que puedan disfrutar juntos.\n\n3. Practica la empatía: Trata de comprender los sentimientos y perspectivas de los demás miembros de tu familia. Ponerte en su lugar y entender su punto de vista puede ayudarte a comprender mejor sus acciones y a mejorar las relaciones.\n\n4. Escucha activamente: Presta atención y haz preguntas para asegurarte de entender lo que los demás quieren decir. Escuchar activamente puede ayudar a evitar malentendidos y mejorar la comunicación.\n\n5. Admite tus errores: Si cometiste un error o hiciste algo que lastimó a alguien, pide disculpas y trata de hacer las paces. Mostrar humildad y admitir tus errores puede ayudar a fortalecer las relaciones en tu familia.\n\nEspero que estos consejos te puedan ser útiles para mejorar la relación con tu familia."
    }
}
```

# License
Psintegra API is licensed under the MIT License. See the LICENSE file for more information.