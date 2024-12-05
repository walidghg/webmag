function getData() {
  fetch('data.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Données récupérées du fichier JSON :', data);


      let themesContainer = document.querySelector('.themes-container');
      let recentArticleContainer = document.querySelector('.recent-article-container');
      let otherArticlesContainer = document.querySelector('.other-articles-container');
      let authorsContainer = document.querySelector('.authors-container');

      if (Array.isArray(data.journal.themes)) {
        data.journal.themes.forEach((theme) => {
          let themeElement = document.createElement('div');
          themeElement.className = 'theme-item';
          themeElement.innerHTML = `
            <h3>${theme.nom}</h3>
            <p>${theme.description}</p>
          `;
          themesContainer.appendChild(themeElement);
        });
      } else {
        console.warn('Les thèmes ne sont pas disponibles ou mal formatés.');
      }

      let mainArticle = data.journal.articlePrincipal;
      if (mainArticle) {
        recentArticleContainer.innerHTML = `
          <h2>${mainArticle.titre}</h2>
          <p><strong>${mainArticle.theme} - ${mainArticle.date}</strong></p>
          <p>${mainArticle.description}</p>
          <img src="${mainArticle.image}" alt="Image de l'article principal">
        `;
      } else {
        console.warn("L'article principal est manquant.");
      }

      if (Array.isArray(data.journal.articles)) {
        let articleElements = data.journal.articles.map((article) => {
          return `
            <div class="article-item">
              <h3>${article.titre}</h3>
              <p><strong>${article.theme} - ${article.date}</strong></p>
              <img src="${article.image}" alt="Image de l'article">
            </div>
          `;
        });
        otherArticlesContainer.innerHTML = articleElements.join('');
      } else {
        console.warn('Les articles ne sont pas disponibles ou mal formatés.');
      }

      if (Array.isArray(data.journal.auteurs)) {
        let authorElements = data.journal.auteurs.map((auteur) => {
          return `
            <div class="author-item">
              <h4>${auteur.prenom}</h4>
              <p>${auteur.typeExperience}</p>
              <p>${auteur.presentation}</p>
            </div>
          `;
        });
        authorsContainer.innerHTML = authorElements.join('');
      } else {
        console.warn('Les auteurs ne sont pas disponibles ou mal formatés.');
      }
    })
    .catch((error) => {
      console.error('Une erreur est survenue :', error);
    });
}

getData();
