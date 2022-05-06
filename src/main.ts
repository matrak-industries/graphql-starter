import {
  ApolloClient,
  InMemoryCache,
  HttpLink
} from "@apollo/client"
import fetch from 'cross-fetch';
import 'dotenv/config'
import getProject from "./queries/getProject";
import getRecordTypes from "./queries/getRecordTypes";

const { Authorization, ProjectId, Server } = process.env;


async function run() {

  if(!Authorization || !ProjectId || !Server) {
    console.error('Please add a valid .env file to the root of the project directory. This should have been provided to you by Matrak Support.');
    process.exit(1)
  }

  const client = new ApolloClient({
    link: new HttpLink({
      uri: Server,
      headers: {
        Authorization,
      },
      fetch }),
    cache: new InMemoryCache()
  });

  const { data: { Project } } = await client.query({
    query: getProject,
    variables: { ProjectId: parseInt(ProjectId) }
  });

  const { data: { allRecordTypes } } = await client.query({
    query: getRecordTypes,
    variables: { ProjectId: parseInt(ProjectId) }
  });

  console.log(`
Connected successfully to ${Project.name}. Record types available: ${allRecordTypes.map(({name}: {name: string}) => name).join(', ')}
  `)
}

run();

