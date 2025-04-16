以下是整理和排列后的内容，保持原始内容完整，并补充了一些常用的 Git 命令和说明，使文档更加全面和清晰：

---

# **Git 提高效率的命令**

---

## **1. 常用命令**

### **1.1 查看本地项目地址**
```bash
git remote -v
```
**作用**: 查看当前项目的远程仓库地址。

---

### **1.2 查看/修改本地用户名和邮箱地址**
```bash
git config user.name
git config user.email
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```
**作用**: 查看或修改 Git 的用户名和邮箱地址。

---

### **1.3 eslint 不过强制 commit**
```bash
git commit --no-verify -m "merge"
git commit --no-verify -m "feat: 续保领奖页 202"
```
**作用**: 跳过 eslint 检查，强制提交代码。

---

### **1.4 批量删除分支**
```bash
git branch | grep 'xxx' | xargs git branch -D
```
**示例**:
```bash
git branch | grep 'dev' | xargs git branch -D
```
**作用**: 删除分支名中包含 `xxx` 的所有分支。

---

### **1.5 将某分支上的 commit 合并到另一个分支上**
```bash
git cherry-pick <commit-hash>
```
**示例**:
```bash
git cherry-pick d91b138566aa3e624bbc590a2a0180dbeee0a28e
```
**作用**: 将指定的 commit 合并到当前分支。

---

### **1.6 网络不好提交失败时，设置代理**
```bash
git config --global http.proxy 127.0.0.1:7891
git config --global https.proxy 127.0.0.1:7891
```
**作用**: 设置 HTTP 和 HTTPS 代理，解决网络问题。

---

## **2. 配置 SSH**

### **2.1 macOS 配置**
1. **生成 SSH 密钥对**:
   ```bash
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
   ```
   **作用**: 生成一个 SSH 密钥对，保存到默认路径，并设置密码保护私钥。

2. **将公钥添加到 GitHub**:
   ```bash
   cat ~/.ssh/id_rsa.pub
   ```
   **作用**: 输出公钥内容，将其复制到 GitHub 的 SSH 密钥设置中。

3. **配置 Git 使用 SSH**:
   ```bash
   git config --global core.sshCommand "ssh -i ~/.ssh/id_rsa"
   ```
   **作用**: 告诉 Git 使用指定的 SSH 私钥进行身份验证。

4. **克隆仓库**:
   ```bash
   git clone git@github.com:your-username/your-repository.git
   ```
   **作用**: 使用 SSH URL 克隆 GitHub 仓库。

---

### **2.2 Windows 配置**
1. **安装 Git for Windows**:
   - 下载并安装 [Git for Windows](https://git-scm.com/)，按照提示完成安装。

2. **打开 Git Bash**:
   - 在 Windows 上通过“开始”菜单搜索并打开 Git Bash。

3. **生成 SSH 密钥对**:
   ```bash
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
   ```
   **作用**: 生成一个 SSH 密钥对。

4. **将公钥添加到 GitHub**:
   ```bash
   cat ~/.ssh/id_rsa.pub
   ```
   **作用**: 输出公钥内容，将其复制到 GitHub 的 SSH 密钥设置中。

5. **配置 Git 使用 SSH**:
   ```bash
   git config --global core.sshCommand "ssh -i ~/.ssh/id_rsa"
   ```

6. **克隆仓库**:
   ```bash
   git clone git@github.com:your-username/your-repository.git
   ```

---

## **3. stash**

### **3.1 常用命令**
- 保存当前未提交的代码:
  ```bash
  git stash
  ```
- 保存当前未提交的代码并添加备注:
  ```bash
  git stash save "备注的内容"
  ```
- 列出 stash 的所有记录:
  ```bash
  git stash list
  ```
- 删除 stash 的所有记录:
  ```bash
  git stash clear
  ```
- 应用最近一次的 stash:
  ```bash
  git stash apply
  ```
- 应用最近一次的 stash 并删除该记录:
  ```bash
  git stash pop
  ```
- 删除最近的一次 stash:
  ```bash
  git stash drop
  ```
- 应用指定的 stash:
  ```bash
  git stash apply stash@{1}
  ```

---

## **4. reset**

### **4.1 reset --soft**
- 恢复最近一次 commit:
  ```bash
  git reset --soft HEAD^
  ```
- 指定恢复到某一次提交，并将中间提交过的代码放到暂缓区:
  ```bash
  git reset --soft <commit-hash>
  ```

---

## **5. push**

### **5.1 强制更新**
- 强制提交代码:
  ```bash
  git push origin <branch-name> --force
  ```

---

## **6. rebase**

### **6.1 合并提交记录**
- 合并最近的四次提交记录:
  ```bash
  git rebase -i HEAD~4
  ```
- 指定编辑区间:
  ```bash
  git rebase -i [startpoint] [endpoint]
  ```

### **6.2 如果异常退出 vi 窗口**
- 继续 rebase:
  ```bash
  git rebase --continue
  ```
- 终止 rebase:
  ```bash
  git rebase --abort
  ```

### **6.3 rebase 命令介绍**
- **pick**: 保留该 commit（缩写: `p`）。
- **reword**: 保留该 commit，但修改注释（缩写: `r`）。
- **edit**: 保留该 commit，但修改提交内容（缩写: `e`）。
- **squash**: 将该 commit 和前一个 commit 合并（缩写: `s`）。
- **fixup**: 将该 commit 和前一个 commit 合并，但不保留注释（缩写: `f`）。
- **exec**: 执行 shell 命令（缩写: `x`）。
- **drop**: 丢弃该 commit（缩写: `d`）。

---

## **7. 补充命令**

### **7.1 查看分支**
- 查看所有本地分支:
  ```bash
  git branch
  ```
- 查看所有远程分支:
  ```bash
  git branch -r
  ```
- 查看所有分支（本地 + 远程）:
  ```bash
  git branch -a
  ```

### **7.2 删除远程分支**
```bash
git push origin --delete <branch-name>
```

### **7.3 查看提交历史**
```bash
git log --oneline
```
