import {
  ApolloClient,
  InMemoryCache,
  HttpLink
} from "@apollo/client"
import fetch from 'cross-fetch';
import 'dotenv/config'
import getProject from "./queries/getProject";
import getRecordTypes from "./queries/getRecordTypes";
import createClient from "./util/createClient";
import createRecords from "./mutations/createRecords";

const { Authorization, ProjectId, Server } = process.env;


async function run(count: number) {

  if(!Authorization || !ProjectId || !Server) {
    console.error('Please add a valid .env file to the root of the project directory. This should have been provided to you by Matrak Support.');
    process.exit(1)
  }

  const client = createClient(Server, Authorization);


  const createRecordsInput = Array.from(Array(count)).map((_, index) => {
    return {
      record_type_id: parseInt(process.env.CreateRecordType!),
      record_id: `Test Material ${index} ${Date.now()}`,
      values: [
        { description_id: process.env.CreateRecordStatusDescription!, value: 'Not Started' }
      ]
    }
  })

  const { data } = await client.mutate({
    mutation: createRecords,
    variables: {
      ProjectId: parseInt(ProjectId),
      CreateRecordsInput: createRecordsInput
    }
  });


  console.log(data)
}

run(1);

