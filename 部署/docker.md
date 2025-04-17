### **Docker 使用详细介绍**

Docker 是一个开源的容器化平台，用于开发、部署和运行应用程序。它通过容器技术将应用程序及其依赖打包在一起，确保在任何环境中都能一致运行。

---

## **1. Docker 的核心概念**

1. **镜像（Image）**:
   - 镜像是一个只读的模板，包含运行应用程序所需的所有内容（如代码、运行时、库等）。
   - 类似于虚拟机的快照。

2. **容器（Container）**:
   - 容器是镜像的运行实例，包含应用程序和其运行时环境。
   - 容器是轻量级的，启动速度快。

3. **Dockerfile**:
   - 用于定义镜像的构建过程的文件，包含一系列指令（如安装依赖、复制文件等）。

4. **Docker Hub**:
   - Docker 官方的镜像仓库，用于存储和分发镜像。

5. **Docker 引擎**:
   - Docker 的核心组件，负责管理镜像、容器、网络和存储。

---

## **2. Docker 的安装**

### **2.1 在 Mac 上安装**
1. 下载 Docker Desktop：
   - [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop)
2. 安装并启动 Docker Desktop。
3. 验证安装：
   ```bash
   docker --version
   ```

### **2.2 在 Linux 上安装**
1. 更新系统包：
   ```bash
   sudo apt-get update
   sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
   ```
2. 添加 Docker 官方 GPG 密钥：
   ```bash
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
   ```
3. 添加 Docker 仓库：
   ```bash
   echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   ```
4. 安装 Docker：
   ```bash
   sudo apt-get update
   sudo apt-get install -y docker-ce docker-ce-cli containerd.io
   ```
5. 验证安装：
   ```bash
   docker --version
   ```

---

## **3. Docker 的基本命令**

### **3.1 镜像相关命令**
1. **拉取镜像**:
   ```bash
   docker pull <镜像名>:<标签>
   ```
   示例：
   ```bash
   docker pull nginx:latest
   ```

2. **查看本地镜像**:
   ```bash
   docker images
   ```

3. **删除镜像**:
   ```bash
   docker rmi <镜像ID>
   ```

---

### **3.2 容器相关命令**
1. **运行容器**:
   ```bash
   docker run -d --name <容器名> -p <主机端口>:<容器端口> <镜像名>
   ```
   示例：
   ```bash
   docker run -d --name my-nginx -p 8080:80 nginx
   ```

2. **查看运行中的容器**:
   ```bash
   docker ps
   ```

3. **查看所有容器（包括停止的）**:
   ```bash
   docker ps -a
   ```

4. **停止容器**:
   ```bash
   docker stop <容器ID或容器名>
   ```

5. **启动容器**:
   ```bash
   docker start <容器ID或容器名>
   ```

6. **删除容器**:
   ```bash
   docker rm <容器ID或容器名>
   ```

7. **进入容器**:
   ```bash
   docker exec -it <容器ID或容器名> /bin/bash
   ```

---

### **3.3 Docker 网络**
1. **查看网络**:
   ```bash
   docker network ls
   ```

2. **创建网络**:
   ```bash
   docker network create <网络名>
   ```

3. **将容器连接到网络**:
   ```bash
   docker network connect <网络名> <容器名>
   ```

4. **断开容器与网络的连接**:
   ```bash
   docker network disconnect <网络名> <容器名>
   ```

---

### **3.4 Docker 数据卷**
1. **创建数据卷**:
   ```bash
   docker volume create <数据卷名>
   ```

2. **查看数据卷**:
   ```bash
   docker volume ls
   ```

3. **挂载数据卷**:
   ```bash
   docker run -d --name <容器名> -v <数据卷名>:<容器内路径> <镜像名>
   ```
   示例：
   ```bash
   docker run -d --name my-nginx -v my-data:/usr/share/nginx/html nginx
   ```

4. **删除数据卷**:
   ```bash
   docker volume rm <数据卷名>
   ```

---

## **4. Dockerfile 的使用**

### **4.1 什么是 Dockerfile？**
Dockerfile 是一个文本文件，定义了如何构建镜像的步骤。

### **4.2 Dockerfile 示例**
```dockerfile
# 使用基础镜像
FROM node:14

# 设置工作目录
WORKDIR /app

# 复制项目文件
COPY package.json ./
COPY . .

# 安装依赖
RUN npm install

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["npm", "start"]
```

### **4.3 构建镜像**
```bash
docker build -t <镜像名>:<标签> <Dockerfile所在目录>
```
示例：
```bash
docker build -t my-node-app:1.0 .
```

---

## **5. Docker Compose**

### **5.1 什么是 Docker Compose？**
Docker Compose 是一个工具，用于定义和管理多容器应用。

### **5.2 Docker Compose 示例**
创建 `docker-compose.yml` 文件：
```yaml
version: '3'
services:
  web:
    image: nginx
    ports:
      - "8080:80"
  app:
    image: node:14
    volumes:
      - ./app:/app
    working_dir: /app
    command: ["npm", "start"]
```

启动服务：
```bash
docker-compose up -d
```

停止服务：
```bash
docker-compose down
```

---

## **6. Docker 的优势**

1. **轻量级**:
   - 容器共享主机内核，启动速度快，占用资源少。

2. **跨平台**:
   - 容器可以在任何支持 Docker 的环境中运行。

3. **一致性**:
   - 开发、测试和生产环境一致，减少环境问题。

4. **高效**:
   - 支持快速部署和扩展。

---

## **7. 总结**

Docker 是现代开发和部署的核心工具，通过容器化技术简化了应用的开发、测试和部署流程。无论是单一应用还是复杂的微服务架构，Docker 都能提供高效、灵活的解决方案。
