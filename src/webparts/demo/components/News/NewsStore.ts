export default class NewsStore {
  constructor() {
    this.news = "News 1";
  }

  news: string;

  setNews = (msg) => {
    this.news = msg;
  };
}
