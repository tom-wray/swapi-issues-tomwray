import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';
const resolver = new Resolver();

// Create a Jira ticket with the selected character details as the summary
resolver.define("createJiraTicket", async (req) => {
  // Get the project key from the extension context
  const projectKey = req.context.extension.project.key;

  // Call the jira API to create a new issue
  const res = await api.asUser().requestJira(route`/rest/api/3/issue`, {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          fields: {
              project: {
                  key: projectKey,
              },
              summary: `${req.payload.characterSummary}`,
              issuetype: {
                  name: "Task",
              },
          },
      }),
  });

  if (!res.ok) {
      const errorDetails = await res.json();
      console.error(errorDetails);
      throw new Error(`HTTP error! status: ${res.status}`);
  }

  return res.json();
});

export const handler = resolver.getDefinitions();
