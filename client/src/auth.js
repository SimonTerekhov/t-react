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

export async function register(email,password,username) {
    const result = await graphQLRequest(
        `mutation register{
            register(
                email: "${email}"
                password: "${password}"
                username: "${username}"
              ) {
                jwt
                user{
                    id
                    username
                }
              }
        }`
    );
    return result.data.register;
}