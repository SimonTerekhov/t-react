import { graphQLRequest } from './utils/graphql';

export async function getShirts(searchTerm) {
  const result = await graphQLRequest(
    `query getShirts($term: String) {
    shirtsEntries(search: $term) {
      ... on shirts_default_Entry {
        id
        title
        shirttext
        shirtcolor
      }
    }
  }`,
    { term: searchTerm }
  );

  return result.data.shirtsEntries;
}

export async function getAllShirts(){
  const result = await graphQLRequest(
    `query getAllShirts{
      shirtsEntries {
        ... on shirts_default_Entry {
          id
          title
          shirttext
          shirtcolor
        }
      }
    }`
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
          shirttext
          shirtcolor
          authorId
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

export async function createShirt(jwt,authorId, create) {
  const { data } = await graphQLRequest(
    `mutation createShirt($title: String, $shirttext: String, $shirtcolor: String) {
      save_shirts_default_Entry(title: $title, shirttext: $shirttext, shirtcolor: $shirtcolor, authorId: ${authorId}) {
        id
        title
        shirttext
        shirtcolor
      }
    }`,
    {
      ...create,
    },
    jwt
  );
  return data.save_shirts_default_Entry;
}

export async function editShirt(jwt, id, edits) {
  const { data } = await graphQLRequest(
    `mutation editShirt($id: ID, $title: String, $shirttext: String, $shirtcolor: String) {
      save_shirts_default_Entry(id: $id, title: $title, shirttext: $shirttext, shirtcolor: $shirtcolor) {
        id
        title
        shirttext
        shirtcolor
      }
    }`,
    {
      id,
      ...edits,
    },
    jwt
  );

  return data.save_shirts_default_Entry;
}

export async function deleteShirt(jwt, id) {
  const result = await graphQLRequest(
    `mutation deleteShirt($id: Int!) {
    deleteEntry(id: $id)
  }
`,
    { id: parseInt(id) },
    jwt
  );

  return result;
}