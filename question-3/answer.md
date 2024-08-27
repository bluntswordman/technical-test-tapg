# Answer 3

![Git Flow](https://lh3.googleusercontent.com/d/1KTJ2Vw46AoJCX_FQ7wkgSa3a_TmEGs5h=w1000)

Untuk menangani kondisi tersebut, ada beberapa tahapan yang perlu dilakukan yaitu:
1. Buka branch production `git checkout <production-branch>`
2. Buat branch dengan format nama berikut ***hotfix/<name-issue>*** `git checkout -b hotfix/<issue-name>`
3. Solve bug pada branch tersebut
4. Lakukan ***merge request / pull request*** dengan target branch ***production***
5. Rebase pada branch yang sedang existing seperti branch ***QA/<release-versioning>*** maupun ***feature/<ticket-name>*** `git checkout production && git pull && git checkout <spesific-branch> && git rebase production`
6. Jika terjadi konflik, solve konflik dan jalankan command `git rebase --continue`. Apabila telah terjadi _passed head_, gunakan command `git push --force-with-lease`