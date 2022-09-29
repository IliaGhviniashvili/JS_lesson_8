

let postwrapper = document.getElementById("posts");
let overlay = document.getElementById("overlay");
let postcontent = document.getElementById("postcontent");
let overlayclose = document.getElementById("close");

let addpost = document.getElementById("add-btn");
let overlay_after_add = document.getElementById("overlay-after-add");
let form = document.getElementById("overlay-form");
let input = document.getElementById("formtitle");

function ajax(url, callBack){
    let requistAjax = new XMLHttpRequest();
    requistAjax.open("GET", url);
    requistAjax.addEventListener("load", function(){
        let info = JSON.parse(requistAjax.responseText);
        callBack(info);
    });
    requistAjax.send();
}


ajax("https://jsonplaceholder.typicode.com/posts", function(info){
    info.forEach((item) => {
        createPost(item);
    });
});

function createPost(item){
    let divtag = document.createElement("div");
    divtag.classList.add("post");
    divtag.setAttribute("data-id", item.id);

    let postid = document.createElement("h2");
    postid.innerText = item.id;

    let posttitle = document.createElement("h3");
    posttitle.innerText = item.title;

    // let deleteButton = document.createElement("i");
    // deleteButton.classList.add("fa-solid fa-door-open");
    // deleteButton.setAttribute("data-id", item.id);
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete Post";
    deleteButton.setAttribute("data-id", item.id);
    deleteButton.classList.add("deletebtn");

    divtag.appendChild(postid);
    divtag.appendChild(posttitle);
    divtag.appendChild(deleteButton);

    //////////////

    divtag.addEventListener("click", function(event){
        let id = event.target.getAttribute("data-id");
        overlay.classList.add("active");
        let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
        ajax(url, function(info){
            overlayFunction(info);
        });
    });

    deleteButton.addEventListener("click", function(event){
        event.stopPropagation();
        let id = event.target.getAttribute("data-id");
        let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
        fetch(url, {
            method: "DELETE",
        })
        .then(() => divtag.remove());
    });

    postwrapper.appendChild(divtag);
    console.log(divtag);

}

function overlayFunction(item){
    let postbody = document.createElement("p");
    postbody.innerText = item.body;
    postbody.classList.add("postbodyclass");
    postcontent.appendChild(postbody);
}


overlayclose.addEventListener("click", function () {
    overlay.classList.remove("active");
    postcontent.innerHTML = " ";
  });
  

//add post
addpost.addEventListener("click", function(){
    overlay_after_add.classList.add("addactive");
    input.value = "";
});
  
form.addEventListener("submit", function(event){
    event.preventDefault();
    let formdata ={
        title: event.target[0].value,
    };
    fetch("https://jsonplaceholder.typicode.com/posts",{
        method: "POST",
        body: JSON.stringify(formdata),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
    })
    .then((response) => response.json())
    .then((post) => {
        overlay_after_add.classList.remove("addactive");
        createPost(post);
    });
});





























