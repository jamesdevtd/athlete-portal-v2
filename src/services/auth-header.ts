export default function authHeader() {
  const userStr = localStorage.getItem("user");
  let user = null;
  if (userStr)
    user = JSON.parse(userStr);

  if (user && user.authToken) {
    return { Authorization: 'Bearer ' + user.authToken }; // for Spring Boot back-end
  } else {
    return {};
  }
}