function search(){
  chrome.runtime.sendMessage({searchQuery:document.getElementById("search-input").value}, function (response){
    console.log(response);
  })
}
document.addEventListener("DOMContentLoaded", function(event) { 
    document.getElementById("search-btn").addEventListener("click",search)
});
