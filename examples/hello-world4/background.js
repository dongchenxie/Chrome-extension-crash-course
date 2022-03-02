// Extension event listeners are a little different from the patterns you may have seen in DOM or
// Node.js APIs. The below event listener registration can be broken in to 4 distinct parts:
//
// * chrome      - the global namespace for Chrome's extension APIs
// * runtime     – the namespace of the specific API we want to use
// * onInstalled - the event we want to subscribe to
// * addListener - what we want to do with this event
//
// See https://developer.chrome.com/docs/extensions/reference/events/ for additional details.
chrome.runtime.onInstalled.addListener(async () => {
  let tab = await chrome.tabs.create({ url:"https://visualping.io" });
  console.log(`Created tab ${tab.id}`);
  chrome.contextMenus.create({
    id: 'duckDuckGo',
    title: "DuckDuckGo Search: %s", 
    contexts:[ "selection" ]
  });
  
});

chrome.contextMenus.onClicked.addListener( ( info, tab ) => {
  if ( 'duckDuckGo' === info.menuItemId ) {
    duckDuckGo( info.selectionText );
  }
} );

const duckDuckGo = message => {
 chrome.tabs.create({ url:"https://duckduckgo.com/?q="+message });
};

//message listener from the content-script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.searchQuery) {
    chrome.tabs.create({ url:"https://duckduckgo.com/?q="+request.searchQuery });
      sendResponse(true);
  }
  sendResponse(false);
});