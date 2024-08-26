import loginService from "../services/login";
const DEFAULT_EXPIRATION = new Date("2099-12-30T00:00:00Z").getTime() / 1000;

const getNewToken = async () => {
  try {
    const data = await loginService.refreshToken();

    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const isExpired = (user) => {
  // Logic: if the user does not exist or the user is null, then we can treat the token as being expired
  if (!user) {
    return true;
  }

  let expiryTime;
  try {
    if (user.issuedAt) {
      // 15 minute expiry
      expiryTime = user.issuedAt + 1 * 60;
    } else {
      expiryTime = DEFAULT_EXPIRATION;
    }
  } catch (error) {
    expiryTime = DEFAULT_EXPIRATION;
  }

  const tokenIsExpired = expiryTime < new Date() / 1000;

  return tokenIsExpired;
};

const getUserFromLocalStorage = () => {
  const userInLocalStorage = localStorage.getItem("user");
  const user = userInLocalStorage ? JSON.parse(userInLocalStorage) : {};

  return user;
};

export const getUser = () => {
  let user = getUserFromLocalStorage();

  const validToken = isExpired(user);

  if (!validToken) {
    removeUser();
    user = getNewToken();
    saveUser(user);
  }

  return validToken && user ? user : null;
};

export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUser = () => {
  localStorage.removeItem("user");
};
