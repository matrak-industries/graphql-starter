import {gql} from "@apollo/client";

export default gql`
    query GetRecordTypes($ProjectId: Int!) {
        allRecordTypes(filter:{project_id: $ProjectId }) {
            id
            name
            category
        }
    }
`
