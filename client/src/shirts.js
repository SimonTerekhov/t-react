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

export async function getShirts(searchTerm) {
  const result = await graphQLRequest(
    `query getShirts($term: String) {
    shirtsEntries(search: $term) {
      ... on shirts_default_Entry {
        id
        title
        description
      }
    }
  }`,
    { term: searchTerm }
  );

  return result.data.shirtsEntries;
}

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

export async function createShirt(create) {
  const { data } = await graphQLRequest(
    `mutation createShirt($title: String, $description: String) {
      save_shirts_default_Entry(title: $title, description: $description, authorId: "1") {
        id
        title
        description
      }
    }`,
    {
      ...create,
    },
  );
  return data.save_shirts_default_Entry;
}

export async function editShirt(id, edits) {
  const { data } = await graphQLRequest(
    `mutation editShirt($id: ID, $title: String, $description: String) {
      save_shirts_default_Entry(id: $id, title: $title, description: $description) {
        id
        title
        description
      }
    }`,
    {
      id,
      ...edits,
    },
  );

  return data.save_shirts_default_Entry;
}

export async function deleteShirt(id) {
  const result = await graphQLRequest(
    `mutation deleteShirt($id: Int!) {
    deleteEntry(id: $id)
  }
`,
    { id: parseInt(id) },
  );

  return result;
}