const BASE_URL = import.meta.env.VITE_API_ENDPOINT || "";

export const graphQLRequest = async (query, variables = {}) => {
  const result = await fetch(`${BASE_URL}/api`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  }).then((res) => res.json());
  if (!result.data) {
    console.log(result);
    throw new Error(result.errors[0].message);
  }
  return result;
};

export async function getShirt(id) {
  const result = await graphQLRequest(
    `query getShirt($id: [QueryArgument]) {
      shirtsEntries(id: $id) {
        ... on shirts_default_Entry {
          id
          title
          description
        }
      }
    }
    `,
    { id }
);

  if (result.errors) {
    throw new Error(result.errors[0].debugMessage);
    return null;
  } else {
    return result.data.shirtsEntries[0];
  }
}