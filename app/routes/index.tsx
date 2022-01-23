import { LoaderFunction, redirect } from "remix";
import { getNewProblem } from "~/utilities";

export const loader: LoaderFunction = () => {
  return redirect(getNewProblem());
};
