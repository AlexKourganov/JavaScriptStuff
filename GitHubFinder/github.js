class GitHub{
    constructor(){
        this.client_id = '7f3ab1e4187788d0c0fe';
        this.client_secret = '62743ba9d1b8cfecc27ff0e929e02b0834409829';
        this.repos_count = 5;
        this.repos_sort = 'created: asc';

    }

    async getUser(user){
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
        //Get user Repos
        const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

        const profile = await profileResponse.json();
        const repos = await repoResponse.json();

        return{
            profile,
            repos
        }
    }


}