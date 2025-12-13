import { UserType } from "../HW8";

type ActionType =
  | { type: "sort"; payload: "up" | "down" }
  | { type: "check"; payload: number };

export const homeWorkReducer = (
  state: UserType[],
  action: ActionType
): UserType[] => {
  switch (action.type) {
    case "sort": {
      // by name
      const sorted = [...state].sort((a, b) => a.name.localeCompare(b.name));
      return action.payload === "up" ? sorted : sorted.reverse();
    }
    case "check": {
      return state.filter((user) => user.age >= action.payload);
    }
    default:
      return state;
  }
};
