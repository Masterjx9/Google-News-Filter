chrome.tabs.onActivated.addListener(async () => {
    await checkAndRemoveArticles();
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        await checkAndRemoveArticles();
    }
});


async function checkAndRemoveArticles() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    if (tab.url && tab.url.includes("https://news.google.com")) {
        chrome.storage.local.get(['namesList'], function(result) {
            if (result.namesList && result.namesList.length > 0) {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    function: removeArticles,
                    args: [result.namesList]
                });
                console.log("Removing articles for authors: ", result.namesList);
            }
        });
    }
}

function removeArticles(namesList) {
    // This function will be serialized and executed in the context of the tab.
    // So, we cannot access any variables or functions defined outside of it.
    namesList.forEach(word => {
        // Call removeArticle for each word in the list
        removeArticle(word);
    });
}
