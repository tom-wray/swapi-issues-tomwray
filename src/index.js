import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';
const resolver = new Resolver();

resolver.define("createJiraTicket", async (req) => {
  const projectKey = req.context.extension.project.key;

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
