const APIURL = "https://api.github.com/users/"
const main = document.getElementById("main");

async function getUser(username) {
    // 1) Make an api call and Get the details
    const resp = await fetch(APIURL + username);
    const data = await resp.json();

    console.log(APIURL + username);
    console.log(data);

    if(data.message && data.message == "Not Found"){
        alert("Invalid Username!!")
        return;
    }
    // 2) Dynamically create the card and add the details
    const card = `<div class="card">
    <div><img src=${data.avatar_url}
        class="avator" 
        alt="User-name">
    </div>
        <div class="user-info">
            <h2>${data.name}</h2>
            <p>${data.bio}</p>

            <ul class="info">
                <li>${data.followers} <strong>Followers</strong></li>
                <li>${data.following} <strong>Following</strong></li>
                <li>${data.public_repos} <strong>repos</strong></li>
            </ul>
            <div id="repos">
            </div>
        </div>
    </div>`
    // 3) append the created card in the main
    main.innerHTML = card
    getRepos(username);
}

async function getRepos(username) {
    const resp = await fetch(APIURL + username + "/repos");
    const data = await resp.json();
    const repos = document.getElementById("repos");
    data.forEach((eRepo) => {
        const elem = document.createElement("a");
        elem.classList.add("repo");
        elem.href = eRepo.html_url;
        elem.innerText = eRepo.name;
        elem.target = "_blank";

        repos.appendChild(elem);
    })
    console.log(data);
}
// getUser("kubowania");

const searchInput = document.getElementById("search-bar");
function formSubmit() {
    if(searchInput.value != ""){
        getUser(searchInput.value);
    }
    // console.log("Form is submitted");
    return false;
}