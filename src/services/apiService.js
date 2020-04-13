import axios from "axios";

export default class Api {
  constructor() {
    this.instance = axios.create({
      timeout: 30000,
      baseURL: `${process.env.REACT_APP_SERVER_URL}/`,
    });
  }

  /**
   * GET mails
   */
  getMails(offset, limit) {
    return this.instance.get('mails', { params: { offset: offset || '', limit: limit || '' }}).then(response => response.data);
  }

  /**
   * DELETE mail
   */
  deleteMail(mailId) {
    return this.instance.delete('mails', { params: { mailId }}).then(response => response.data);
  }
}
