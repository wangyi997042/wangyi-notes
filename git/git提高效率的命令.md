常用命令：

- 查看本地项目地址 `git remote -v`

- 查看/修改本地用户名和邮箱地址
  git config user.name
  git config user.email
  git config --global user.name "Your Name"
  git config --global user.email "your-email@example.com"

- eslint 不过强制 commit
  git commit --no-verify -m “merge”
  git commit --no-verify -m "feat: 续保领奖页 202"

- 批量删除分支
  git branch |grep 'xxx' |xargs git branch -D
  例如： git branch |grep 'dev' |xargs git branch -D // 删除分支名带有 dev 字段的所有分支

- 将某分支上的 commit 合并到另一个分支上
  git cherry-pick
  例如：git cherry-pick d91b138566aa3e624bbc590a2a0180dbeee0a28e 切换到目标分支使用此方法

- 网络不好提交失败时，设置代理
  git config --global http.proxy 127.0.0.1:7891  
  git config --global https.proxy 127.0.0.1:7891  

# 配置 ssh

### mac 配置

- 生成 SSH 密钥对：在终端中输入以下命令：
  `ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`
  这会生成一个 SSH 密钥对。您需要将其保存在默认的路径中（按 Enter 键），并设置一个密码以保护您的私钥。

- 将公钥添加到您的 GitHub 帐户：在终端中输入以下命令：
  `cat ~/.ssh/id_rsa.pub`
  这会将您的公钥输出到终端。将其复制并粘贴到您的 GitHub 帐户的 SSH 密钥设置中。

- 配置 Git 使用 SSH：在终端中输入以下命令：
  `git config --global core.sshCommand "ssh -i ~/.ssh/id_rsa"`
  这会告诉 Git 使用您的 SSH 私钥进行身份验证。

- 现在您已经成功地配置了 Git SSH。之后，您可以使用 SSH URL 克隆您的 GitHub 存储库，例如：
  `git clone git@github.com:your-username/your-repository.git`
  这将使用 SSH 克隆您的存储库。

### windows 配置

在 Windows 上配置 Git SSH，您可以按照以下步骤进行操作：

- 下载和安装 Git for Windows：您可以从 下载 Git for Windows 安装程序，并按照提示进行安装。

- 打开 Git Bash 终端：在 Windows 上，您可以通过单击“开始”按钮并键入“Git Bash”来打开 Git Bash 终端。

- 生成 SSH 密钥对：在 Git Bash 终端中输入以下命令：
  `ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`
  这会生成一个 SSH 密钥对。您需要将其保存在默认的路径中（按 Enter 键），并设置一个密码以保护您的私钥。

- 将公钥添加到您的 GitHub 帐户：在 Git Bash 终端中输入以下命令：
  `cat ~/.ssh/id_rsa.pub`
  这会将您的公钥输出到终端。将其复制并粘贴到您的 GitHub 帐户的 SSH 密钥设置中。

- 配置 Git 使用 SSH：在 Git Bash 终端中输入以下命令：
  `git config --global core.sshCommand "ssh -i ~/.ssh/id_rsa"`
  这会告诉 Git 使用您的 SSH 私钥进行身份验证。

- 现在您已经成功地配置了 Git SSH。之后，您可以使用 SSH URL 克隆您的 GitHub 存储库，例如：
  `git clone git@github.com:your-username/your-repository.git`
  这将使用 SSH 克隆您的存储库。

# 1、 stash

- 保存当前未 commit 的代码
  git stash

- 保存当前未 commit 的代码并添加备注
  git stash save "备注的内容"

- 列出 stash 的所有记录
  git stash list

- 删除 stash 的所有记录
  git stash clear

- 应用最近一次的 stash
  git stash apply

- 应用最近一次的 stash，随后删除该记录
  git stash pop

- 删除最近的一次 stash
  git stash drop

- 选择应用其中一条 stash 用 git stash list 查看所有记录（pop, drop 同理）
  git stash apply stash@{1}

# 2、reset —soft

- 恢复最近一次 commit
  git reset --soft HEAD^
- 指定恢复到某一次提交 并将中间提交过的代码放到暂缓区
  git reset --soft 1a900ac29eba73ce817bf959f82ffcb0bfa38f75

# 3、push

- 强制更新 git reset —hard 之后的线上的代码

- git push origin 分支名 --force #强制提交

# 4、rebase

- 合并最近的四次提交记录
  git rebase -I HEAd~4

git rebase -i [startpoint] [endpoint]

- startpoint 和 endpoint 指定了一个编辑区间 commitId

#如果异常退出了 vi 窗口
git rebase —edit-todo

# 命令介绍

- pick：保留该 commit（缩写:p）
- reword：保留该 commit，但我需要修改该 commit 的注释（缩写:r）
- edit：保留该 commit, 但我要停下来修改该提交(不仅仅修改注释)（缩写:e）
- squash：将该 commit 和前一个 commit 合并（缩写:s）
- fixup：将该 commit 和前一个 commit 合并，但我不要保留该提交的注释信息（缩写:f）
- exec：执行 shell 命令（缩写:x）
- drop：我要丢弃该 commit（缩写:d）

# 常用命令

git rebase -—continue
git rebase —-abort
