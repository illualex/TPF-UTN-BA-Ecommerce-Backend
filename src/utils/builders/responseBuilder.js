class ResponseBuilder {
    // Códigos de respuesta que se pueden utilizar en diferentes casos
    static CODE = {
      SUCCESS: "SUCCESS",
      BAD_REQUEST: "BAD_REQUEST",
      NOT_FOUND: "NOT_FOUND",
      SERVER_ERROR: "SERVER_ERROR",
      USER_NOT_FOUND: "USER_NOT_FOUND",
      INVALID_PASSWORD: "INVALID_PASSWORD",
    };
  
    constructor() {
      // Respuesta base que se va a construir
      this.response = {
        ok: false,
        status: 500,
        message: "",
        payload: {},
        code: "", // Código para clasificar el tipo de respuesta
      };
    }
  
    // Establece el código de la respuesta
    setCode(code) {
      this.response.code = code;
      return this;
    }
  
    // Establece el estado de la respuesta (ok: true/false)
    setOk(ok) {
      this.response.ok = ok;
      return this;
    }
  
    // Establece el código de estado HTTP
    setStatus(status) {
      this.response.status = status;
      return this;
    }
  
    // Establece el mensaje de la respuesta
    setMessage(message) {
      this.response.message = message;
      return this;
    }
  
    // Establece los datos (payload) de la respuesta
    setPayload(payload) {
      this.response.payload = payload;
      return this;
    }
  
    // Construye y retorna la respuesta final
    build() {
      return this.response;
    }
  }
  
  export default ResponseBuilder;
  
  // Función para construir una respuesta rápida sin necesidad de crear una instancia del builder
  export const responseBuilder = (ok, status, message, payload, code = "") => {
    return new ResponseBuilder()
      .setOk(ok)
      .setStatus(status)
      .setMessage(message)
      .setPayload(payload)
      .setCode(code)
      .build();
  };
  