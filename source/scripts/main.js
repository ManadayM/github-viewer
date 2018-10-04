(function (window, axios) {
  // Generate and set html table on Details section
  function setTable(repoList) {

    var tableTemplate =
      '<table>' +
      '<thead>' +
      '<th scope="col">Repository</th>' +
      '<th scope="col">Stars</th>' +
      '<th scope="col">Language</th>' +
      '</thead>' +
      '<tbody class="repos">' +
      repoList.map(function (repo) {
        return '<tr class="record">' +
          '<th class="repo_url" scope="row"><a href="' + repo.html_url + '">' + repo.name + '</a></th>' +
          '<td class="repo_stars">' + repo.stargazers_count + '</td>' +
          '<td class="repo_language">' + repo.language + '</td>' +
          '</tr>';
      }).join("") +
      '</tbody>' +
      '</table>';

    document.querySelector('.details').innerHTML = tableTemplate.trim();
  }

  // Search list of repository for the supplied username
  function searchRepos() {
    var userName = document.searchForm.user_name.value;
    if (userName) {
      var reqURL = 'https://api.github.com/users/' + userName + '/repos';
      var reqConfig = { timeout: 3000 };

      // Make http GET request to Github
      axios.get(reqURL, reqConfig)
        .then(function (response) {
          if (response.status === 200) {
            // set the html table on view
            setTable(response.data);
          }
          else {
            alert('Invalid response received');
          }
        })
        .catch(function (error) {
          alert('Error received: ' + error.message);
        });
    }
    else {
      alert('Invalid or no user name supplied!');
    }
  };

  // Clear search box and tabluar data on Clear button click
  function resetSearch() {
    document.searchForm.user_name.value = "";
    document.querySelector('.details').innerHTML = "";
  }

  // Check if user has cleared the search box
  // if so, flush out the tabular data for last query
  function onSearchChange(eventSource) {
    if (!eventSource.value) {
      document.querySelector('.details').innerHTML = "";
    }
  }
  
  // exports
  window.searchRepos = searchRepos;
  window.resetSearch = resetSearch;
  window.onSearchChange = onSearchChange;

})(window, axios);
