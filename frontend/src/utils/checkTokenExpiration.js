export const checkUserTokenExpiration = (user) => {
  let expiryTime;
  try {
    const parsedUser = JSON.parse(user);
    if (parsedUser && parsedUser.issuedAt) {
      expiryTime =
        new Date(parsedUser.issuedAt).getTime() + 24 * 60 * 60 * 1000;
    } else {
      expiryTime = new Date("2099-12-30T00:00:00Z").getTime();
    }
  } catch (error) {
    expiryTime = new Date("2099-12-30T00:00:00Z").getTime();
  }

  return expiryTime;
};
