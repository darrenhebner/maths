import {
  useParams,
  ActionFunction,
  redirect,
  json,
  LoaderFunction,
  MetaFunction,
  Link,
} from "remix";

import { getNewProblem, operators } from "~/utilities";

function handleResult(proposed: number, answer: number) {
  if (proposed === answer) {
    return redirect(getNewProblem());
  } else {
    return json({
      error: `The answer isn't ${proposed}.`,
    });
  }
}

export const loader: LoaderFunction = async ({ params }) => {
  if (params.operator == null || !operators.has(params.operator)) {
    throw new Error("Invalid operator");
  }

  return null;
};

export const meta: MetaFunction = ({ params }) => {
  return {
    title: `${params.left} ${operators.get(params.operator!)} ${params.right}`,
  };
};

export const action: ActionFunction = async ({ params, request }) => {
  const body = await request.formData();
  const proposed = Number(body.get("proposed"));

  const left = Number(params.left);
  const right = Number(params.right);

  switch (params.operator) {
    case "multiply": {
      return handleResult(proposed, left * right);
    }
    case "divide": {
      return handleResult(proposed, left / right);
    }
    case "add": {
      return handleResult(proposed, left + right);
    }
    case "subtract": {
      return handleResult(proposed, left - right);
    }
    default: {
      return redirect(getNewProblem());
    }
  }
};

export default function Maths() {
  const { left, operator, right } = useParams();

  if (!left || !operator || !right) {
    throw new Error("Invalid URL Params");
  }

  return (
    <>
      <div className="question">
        <span className="left">{left}</span>
        <span className="operator">{operators.get(operator)}</span>
        <span className="right">{right}</span>

        <form method="post">
          <input type="number" name="proposed" step="0.01" />
        </form>
      </div>

      <Link to="/">Skip</Link>
    </>
  );
}
