import { graphQLRequest } from './utils/graphql';

export async function getLike(id, gebruiker) {
    const result = await graphQLRequest(
      `query getLike{
        likesEntries(idshirt: ${id}, authorId: ${gebruiker}){
          ... on likes_default_Entry {
            id
            title
            idshirt
          }
        }
      }
      `,
      { id },
  );
    return result.data.likesEntries[0];
}

export async function createLike(jwt, shirtId, gebruiker, authorId) {
    const variables = {
        shirtId: shirtId,
        gebruiker: gebruiker,
      };
  const { data } = await graphQLRequest(
    `mutation createLike($shirtId: String, $gebruiker: String){
        save_likes_default_Entry(idshirt: $shirtId, title: $gebruiker, authorId: ${authorId}) {
            id
            title
            idshirt
          }
    }`,
    variables,
    jwt,
  );

  return data.save_likes_default_Entry;
}




export async function removeLike(jwt, id) {
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