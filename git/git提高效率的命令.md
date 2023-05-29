常用命令：

- 查看本地项目地址 `git remote -v`

- eslint 不过强制 commit
  git commit --no-verify -m “merge”
  git commit --no-verify -m "feat: 续保领奖页 202"

- 批量删除分支
  git branch |grep 'xxx' |xargs git branch -D
  例如： git branch |grep 'dev' |xargs git branch -D // 删除分支名带有 dev 字段的所有分支

- 将某分支上的 commit 合并到另一个分支上
  git cherry-pick
  例如：git cherry-pick d91b138566aa3e624bbc590a2a0180dbeee0a28e 切换到目标分支使用此方法

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
