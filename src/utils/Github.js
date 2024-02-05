function getRepoNameFromUrl(url) {
    // Match the repository part of the URL using a regular expression
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  
    // Check if there is a match and return the repository name
    if (match && match.length === 3) {
      const username = match[1];
      const repoName = match[2];
      return { username, repoName };
    } else {
      return null; // Invalid GitHub repository URL
    }
}

export default getRepoNameFromUrl