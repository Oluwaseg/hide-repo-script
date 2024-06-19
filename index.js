const axios = require("axios");

const GITHUB_USERNAME = "Oluwaseg";
const GITHUB_TOKEN = "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";

const getReposUrl = `https://api.github.com/user/repos?per_page=100`;
const headers = {
  Authorization: `token ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github.v3+json",
};

axios
  .get(getReposUrl, { headers })
  .then((response) => {
    const repos = response.data;
    repos.forEach((repo) => {
      if (!repo.private) {
        const updateUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}`;
        axios
          .patch(updateUrl, { private: true }, { headers })
          .then(() => {
            console.log(`Successfully made ${repo.name} private.`);
          })
          .catch((error) => {
            console.error(
              `Failed to make ${repo.name} private: ${error.response.status}`
            );
          });
      }
    });
  })
  .catch((error) => {
    console.error(`Failed to retrieve repositories: ${error.response.status}`);
  });
