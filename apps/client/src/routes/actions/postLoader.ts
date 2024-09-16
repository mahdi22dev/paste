import { defer } from "react-router-dom";

export async function getPasteAction(params: any) {
  console.log(params);
  const delay = 2000;
  console.log("hello");
  await new Promise((resolve) => setTimeout(resolve, delay));
  console.log("waited for", delay);
  const contacts = { data: "contacts" };
  return defer({ data: { contacts } });
}
