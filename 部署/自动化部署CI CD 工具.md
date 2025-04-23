以下是 **CI/CD 工具自动化部署** 的详细介绍，涵盖每个步骤的具体操作，帮助您从零搭建自动化部署流程。

---

# CI/CD 工具自动化部署详细教程

## 1. **什么是 CI/CD？**
- **CI（持续集成，Continuous Integration）**：
  - 自动化构建和测试代码，确保代码在合并到主分支时不会引入错误。
- **CD（持续部署，Continuous Deployment）**：
  - 自动化将构建后的代码部署到服务器或生产环境。

**核心目标**：通过自动化工具减少人工干预，提升开发效率和部署可靠性。

---

## 2. **工具选择**
常见的 CI/CD 工具：
- **GitHub Actions**（推荐，适合 GitHub 仓库）。
- **GitLab CI/CD**（适合 GitLab 仓库）。
- **Jenkins**（开源，功能强大，适合复杂场景）。
- **CircleCI**、**Travis CI**（第三方服务）。

以下以 **GitHub Actions** 为例，详细介绍自动化部署流程。

---

## 3. **GitHub Actions 自动化部署详细步骤**

### 3.1 准备工作
1. **确保代码托管在 GitHub 仓库**：
   - 如果代码在本地，先推送到 GitHub：
     ```bash
     git init
     git remote add origin https://github.com/your-username/your-repo.git
     git add .
     git commit -m "Initial commit"
     git push -u origin main
     ```

2. **服务器准备**：
   - 确保目标服务器已安装：
     - Node.js（用于运行前端项目）。
     - Nginx（用于托管静态文件）。
   - 配置 SSH 登录，生成 SSH 密钥：
     ```bash
     ssh-keygen -t rsa -b 4096 -C "your-email@example.com"
     ```
     将生成的公钥（`~/.ssh/id_rsa.pub`）添加到服务器的 `~/.ssh/authorized_keys` 文件中。

3. **GitHub Secrets 配置**：
   - 在 GitHub 仓库中，进入 **Settings > Secrets and variables > Actions > New repository secret**。
   - 添加以下 Secrets：
     - `SSH_KEY`：本地生成的私钥内容（`~/.ssh/id_rsa`）。
     - `REMOTE_HOST`：服务器 IP 地址。
     - `REMOTE_USER`：服务器用户名（如 `root`）。
     - `TARGET_PATH`：部署路径（如 `/var/www/html`）。

---

### 3.2 配置 GitHub Actions
1. **创建工作流文件**：
   - 在项目根目录下创建 `.github/workflows/deploy.yml` 文件。

2. **编写工作流配置**：
   ```yaml
   name: Deploy Frontend

   # 触发条件：当代码推送到 main 分支时触发
   on:
     push:
       branches:
         - main

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest

       steps:
       # 1. 检出代码
       - name: Checkout code
         uses: actions/checkout@v3

       # 2. 安装依赖
       - name: Install dependencies
         run: |
           npm install

       # 3. 构建项目
       - name: Build project
         run: |
           npm run build

       # 4. 部署到服务器
       - name: Deploy to server
         uses: easingthemes/ssh-deploy@v2.1.5
         with:
           SSH_PRIVATE_KEY: ${{ secrets.SSH_KEY }}
           REMOTE_HOST: ${{ secrets.REMOTE_HOST }}
           REMOTE_USER: ${{ secrets.REMOTE_USER }}
           TARGET: ${{ secrets.TARGET_PATH }}
   ```

---

### 3.3 配置 Nginx（服务器端）
1. **安装 Nginx**：
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

2. **配置 Nginx 虚拟主机**：
   - 编辑 Nginx 配置文件：
     ```bash
     sudo nano /etc/nginx/sites-available/default
     ```
   - 配置内容：
     ```nginx
     server {
         listen 80;
         server_name your-domain.com;

         root /var/www/html;
         index index.html;

         location / {
             try_files $uri /index.html;
         }
     }
     ```
   - 保存并重启 Nginx：
     ```bash
     sudo systemctl restart nginx
     ```

3. **测试 Nginx 是否正常运行**：
   - 在浏览器中访问服务器 IP 地址，确保能看到默认页面。

---

### 3.4 推送代码并触发部署
1. **推送代码到 GitHub**：
   ```bash
   git add .
   git commit -m "Update code"
   git push origin main
   ```

2. **查看 Actions 执行状态**：
   - 打开 GitHub 仓库，进入 **Actions** 页面。
   - 查看工作流是否成功执行。

3. **验证部署结果**：
   - 在浏览器中访问服务器的域名或 IP 地址，查看是否成功加载前端页面。

---

## 4. **GitLab CI/CD 自动化部署详细步骤**

如果使用 GitLab 仓库，可以通过 GitLab CI/CD 实现自动化部署。

### 4.1 配置 `.gitlab-ci.yml`
在项目根目录下创建 `.gitlab-ci.yml` 文件：
```yaml
stages:
  - build
  - deploy

build:
  stage: build
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - dist/

deploy:
  stage: deploy
  script:
    - apt-get update -y
    - apt-get install -y rsync
    - rsync -avz --delete dist/ user@your-server:/var/www/html
  only:
    - main
```

### 4.2 推送代码并触发 CI/CD
1. 推送代码到 GitLab：
   ```bash
   git push origin main
   ```
2. 查看 GitLab 的 **CI/CD > Pipelines** 页面，检查任务执行状态。

---

## 5. **Jenkins 自动化部署详细步骤**

如果需要更灵活的配置，可以使用 Jenkins。

### 5.1 安装 Jenkins
1. 在服务器上安装 Jenkins：
   ```bash
   sudo apt update
   sudo apt install openjdk-11-jdk
   sudo apt install jenkins
   ```

2. 启动 Jenkins：
   ```bash
   sudo systemctl start jenkins
   ```

3. 在浏览器中访问 `http://your-server-ip:8080`，完成 Jenkins 初始化配置。

### 5.2 配置 Jenkins 任务
1. 创建一个新任务，选择 **Pipeline** 类型。
2. 在 Pipeline 配置中添加以下脚本：
   ```groovy
   pipeline {
       agent any
       stages {
           stage('Checkout') {
               steps {
                   checkout scm
               }
           }
           stage('Install Dependencies') {
               steps {
                   sh 'npm install'
               }
           }
           stage('Build') {
               steps {
                   sh 'npm run build'
               }
           }
           stage('Deploy') {
               steps {
                   sh 'scp -r dist/* user@your-server:/var/www/html'
               }
           }
       }
   }
   ```

3. 保存并运行任务。

---

## 6. **总结**
| 工具           | 优点                                   | 缺点                                   |
|----------------|----------------------------------------|----------------------------------------|
| **GitHub Actions** | 与 GitHub 集成，配置简单，免费使用       | 仅适用于 GitHub 仓库                   |
| **GitLab CI/CD**   | 与 GitLab 集成，支持高级功能             | 仅适用于 GitLab 仓库                   |
| **Jenkins**        | 功能强大，适合复杂场景                 | 配置复杂，维护成本较高                 |

通过以上步骤，您可以实现前端项目的自动化打包和部署。如果需要更详细的某个工具配置，可以告诉我！