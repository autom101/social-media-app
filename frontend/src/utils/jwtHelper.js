const DEFAULT_EXPIRATION = new Date("2099-12-30T00:00:00Z").getTime() / 1000;

export const checkUserTokenExpiration = (user) => {
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

  console.log(user.issuedAt);

  return expiryTime > new Date() / 1000;
};

export const getUser = () => {
  const existingUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {};

  let validUserToken = false;
  if (existingUser) {
    validUserToken = checkUserTokenExpiration(existingUser);
  }

  return validUserToken ? existingUser : null;
};

export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUser = () => {
  localStorage.removeItem("user");
};
