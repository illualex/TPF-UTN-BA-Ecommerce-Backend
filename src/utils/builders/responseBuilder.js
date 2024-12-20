class ResponseBuilder {
  static CODE = {
    SUCCESS: "SUCCESS",
    BAD_REQUEST: "BAD_REQUEST",
    NOT_FOUND: "NOT_FOUND",
    SERVER_ERROR: "SERVER_ERROR",
    USER_NOT_FOUND: "USER_NOT_FOUND",
    INVALID_PASSWORD: "INVALID_PASSWORD",
  };

  constructor() {
    this.response = {
      ok: false,
      status: 500,
      message: "",
      payload: {},
      code: "",
    };
  }

  setCode(code) {
    this.response.code = code;
    return this;
  }

  setOk(ok) {
    this.response.ok = ok;
    return this;
  }

  setStatus(status) {
    this.response.status = status;
    return this;
  }

  setMessage(message) {
    this.response.message = message;
    return this;
  }

  setPayload(payload) {
    this.response.payload = payload;
    return this;
  }

  build() {
    return this.response;
  }
}

export default ResponseBuilder;

export const responseBuilder = (ok, status, message, payload, code = "") => {
  return new ResponseBuilder()
    .setOk(ok)
    .setStatus(status)
    .setMessage(message)
    .setPayload(payload)
    .setCode(code)
    .build();
};
