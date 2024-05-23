function removeArticle(word, title = null) {
    // Select all the articles
    let articles = document.querySelectorAll("article");
  
    // Loop through all the articles
    for (let i = 0; i < articles.length; i++) {
      let article = articles[i];
      // Get all span elements in the article
      let spans = article.getElementsByTagName("span");
      let buttons = article.getElementsByTagName("button");
      let imgs = article.getElementsByTagName("img");
      
  
      // Loop through each span
      for (let j = 0; j < spans.length; j++) {
        // If the span's text is "Joseph Bustos", remove the entire article
        if (spans[j].textContent.toLowerCase().includes(word.toLowerCase())) {
          article.parentNode.removeChild(article);
          break; // Exit the loop as we've found and removed the target
        }
      }

      for (let k = 0; k < buttons.length; k++) {
        if (buttons[k].getAttribute("aria-label").toLowerCase().includes(word.toLowerCase()) ) {
          console.log("Removing article with title: ", word);
          article.parentNode.removeChild(article);
          break;
        }
      }

      for (let l = 0; l < imgs.length; l++) {
        if (imgs[l].getAttribute("srcset") && imgs[l].getAttribute("srcset").toLowerCase().includes(word.toLowerCase())){
            console.log(imgs[l].getAttribute("srcset"))
            article.parentNode.removeChild(article);
        }
    }

    }
  }