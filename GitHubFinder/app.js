//Init GitHub
const github = new GitHub;
//init UI class
const ui = new UI;

//input event listener for search input
const searchUser  = document.getElementById('searchUser');

//search input event listenedr
searchUser.addEventListener('keyup',(e)=>{
    //get input text
    const userText = e.target.value;
    if(userText !==''){
        //console.log(userText);
        //Make http call
        github.getUser(userText)
        .then(data => {
            if(data.profile.message === 'Not Found'){
                //show alert
                ui.showAlert('User Not Found!','alert alert-danger');

            }else{
                //show profile
                ui.showProfile(data.profile);
                ui.showRepos(data.repos);

            }
        }) 
    }else{
        //clear profile
        ui.clearProfile();
    }

});