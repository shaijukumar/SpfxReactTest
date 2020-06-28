export default class WelcomeStore {
  constructor() {
    this.message = "News 1";
  }

  message: string;

  setMessage = (msg) => {
    this.message = msg;
  };
}
