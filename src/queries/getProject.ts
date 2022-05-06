import {gql} from "@apollo/client";

export default gql`
    query GetProject($ProjectId: Int!) {
        Project(id: $ProjectId) {
            id,
            name
        }
    }
`
