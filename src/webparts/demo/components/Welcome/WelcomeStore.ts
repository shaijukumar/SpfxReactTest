export default class WelcomeStore {
  //   rootStore: RootStore;
  constructor() {
    this.message = "www";
  }

  message: string;

  setMessage = (msg) => {
    this.message = msg;
  };
}
