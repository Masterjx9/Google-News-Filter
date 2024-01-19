function removeArticle(author, title = null) {
    // Select all the articles
    let articles = document.querySelectorAll("article");
  
    // Loop through all the articles
    for (let i = 0; i < articles.length; i++) {
      let article = articles[i];
      // Get all span elements in the article
      let spans = article.getElementsByTagName("span");
  
      // Loop through each span
      for (let j = 0; j < spans.length; j++) {
        // If the span's text is "Joseph Bustos", remove the entire article
        if (spans[j].textContent === author) {
          article.parentNode.removeChild(article);
          break; // Exit the loop as we've found and removed the target
        }
      }
    }
  }