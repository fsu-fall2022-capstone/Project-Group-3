import { create_user, get_users } from "./FetchFunction";

export async function updateUsers(user) {
  let users = [];
  let res = await get_users();
  users = res.data;
  let obj = users.find((o) => o.Username === user.email);
  if (!obj) {
    let res = await create_user(user);
    return true;
  }
}
