import { defer } from "react-router-dom";
import { User } from "../../../../../node_modules/.pnpm/@prisma+client@5.19.0_prisma@5.19.0/node_modules/@prisma/client";
export async function getPasteAction(params: any): Promise<User | null> {
  try {
    console.log(params);

    const response = await fetch("api/paste/" + params.postId);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    throw error;
  }
  return null;
}
