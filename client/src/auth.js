import { graphQLRequest } from "./utils/graphql";

export async function authenticate(email, password){
    const result = await graphQLRequest(
        `mutation Authenticate {
            authenticate(email: "${email}", password: "${password}") {
                jwt
                user{
                    id
                    email
                    username
                }
            }
        }`
    );
    return result.data.authenticate;
}