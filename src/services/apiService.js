import axios from "axios";

const MAILS_URI = "mails";

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
    return this.instance.get(MAILS_URI, { params: { offset: offset || '', limit: limit || '' }}).then(response => response.data);
  }

  /**
   * DELETE mail
   */
  deleteMails(mailIds) {
    return this.instance.delete(MAILS_URI, { data: { mailIds }}).then(response => response.data);
  }

  /**
   * Update mails status
   */
  updateMailsStatus(mailIds, status) {
    return this.instance.put(MAILS_URI, { mailIds, status }).then(response => response.data);
  }
}
