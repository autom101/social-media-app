import loginService from "../services/login";
const DEFAULT_EXPIRATION = new Date("2099-12-30T00:00:00Z").getTime() / 1000;

const getNewToken = async () => {
  try {
    const data = await loginService.refreshToken();

    return data;
  } catch (err) {
    return null;
  }
};

const isExpired = (user) => {
  // Logic: if the user does not exist or the user is null, then we can treat the token as being expired
  if (!user) {
    return true;
  }

  let expiryTime;
  try {
    if (user.issuedAt) {
      // 15 minute expiry
      expiryTime = user.issuedAt + 15 * 60;
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

const getUser = async () => {
  let user = getUserFromLocalStorage();

  const expiredToken = isExpired(user);

  if (expiredToken) {
    user = await getNewToken();
  }

  return user;
};

const saveUser = (user) => {
  if (!user) return;
  localStorage.setItem("user", JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem("user");
};

export default {
  isExpired,
  getUser,
  getUserFromLocalStorage,
  removeUser,
  saveUser,
};
