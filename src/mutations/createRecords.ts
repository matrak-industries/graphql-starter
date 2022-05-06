import {gql} from "@apollo/client";

export default gql`
 
    mutation CreateRecords(
        $ProjectId: Int!,
        $CreateRecordsInput: [CreateRecordInput!]!,
       ) {
        createRecords(
            project_id: $ProjectId,
            createRecordsInput: $CreateRecordsInput
        ) {
            record_id
        }
    }
`
