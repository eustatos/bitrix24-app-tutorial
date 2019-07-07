import { BX24 } from "bx24";
import axios from "axios";

function getCurrentUser() {
  const bx24 = new BX24();
  const urlParams = new URLSearchParams(window.location.search);
  const baseUrl = `
    ${urlParams.get("PROTOCOL") === 0 ? "https" : "http"}://${urlParams.get("DOMAIN")}
`;


  const currentUserPromise = new Promise((resolve, reject) => {
    bx24.getAuth().then(auth => {
      axios({
        method: "get",
        url: baseUrl + "/rest/user.current?auth=" + auth.ACCESS_TOKEN
      }).then(response => {
        resolve(response.data.result);
      });
    });
  });
  return currentUserPromise;
}

export default getCurrentUser;
