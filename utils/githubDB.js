// utils/githubDB.js
const GITHUB_TOKEN = 'your_github_token';
const REPO = 'username/kartu-pelajar-smpn1';
const BRANCH = 'main';

class GitHubDB {
    async getData() {
        const url = `https://api.github.com/repos/${REPO}/contents/data/siswa.json`;
        const response = await fetch(url, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        const data = await response.json();
        const content = JSON.parse(atob(data.content));
        return content;
    }
    
    async saveData(newData) {
        const url = `https://api.github.com/repos/${REPO}/contents/data/siswa.json`;
        
        // Dapatkan file saat ini
        const current = await this.getData();
        const sha = current.sha; // SHA dari file
        
        // Update data
        const updatedContent = {
            ...current,
            siswa: [...current.siswa, newData]
        };
        
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({
                message: 'Update data siswa',
                content: btoa(JSON.stringify(updatedContent, null, 2)),
                sha: sha,
                branch: BRANCH
            })
        });
        
        return response.json();
    }
}
