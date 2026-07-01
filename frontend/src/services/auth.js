import API from "./api";

export const saveUser = (user) => {
  localStorage.setItem(
    "user",
    JSON.stringify(user)
  );
};

export const getUser = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const isLoggedIn = () => {
  return !!getUser();
};

export const becomeWriter = async () => {
  const user = getUser();

  if (!user || !user.token) {
    throw new Error("Please login first");
  }

  const res = await API.put(
    "/auth/become-writer",
    {},
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );

  saveUser(res.data);

  return res.data;
};