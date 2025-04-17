以下是 **uni-app 常用 API 总结**，涵盖了生命周期、页面路由、数据请求、存储、设备信息、文件操作等核心功能，帮助快速掌握 uni-app 的开发技巧。

---

# uni-app 常用 API 总结

---

## **1. 生命周期**

### **1.1 应用生命周期**
- **onLaunch**: 小程序初始化时触发。
- **onShow**: 小程序启动或从后台进入前台时触发。
- **onHide**: 小程序从前台进入后台时触发。

#### **示例**
```javascript
export default {
  onLaunch() {
    console.log('App 启动');
  },
  onShow() {
    console.log('App 显示');
  },
  onHide() {
    console.log('App 隐藏');
  }
};
```

---

### **1.2 页面生命周期**
- **onLoad**: 页面加载时触发。
- **onShow**: 页面显示时触发。
- **onReady**: 页面初次渲染完成时触发。
- **onHide**: 页面隐藏时触发。
- **onUnload**: 页面卸载时触发。

#### **示例**
```javascript
export default {
  onLoad() {
    console.log('页面加载');
  },
  onShow() {
    console.log('页面显示');
  },
  onReady() {
    console.log('页面初次渲染完成');
  },
  onHide() {
    console.log('页面隐藏');
  },
  onUnload() {
    console.log('页面卸载');
  }
};
```

---

## **2. 页面路由**

### **2.1 跳转到新页面**
- **API**: `uni.navigateTo`
- **作用**: 打开新页面。

#### **示例**
```javascript
uni.navigateTo({
  url: '/pages/detail/detail'
});
```

---

### **2.2 返回上一页**
- **API**: `uni.navigateBack`
- **作用**: 返回上一页。

#### **示例**
```javascript
uni.navigateBack({
  delta: 1 // 返回的页面层级
});
```

---

### **2.3 重定向页面**
- **API**: `uni.redirectTo`
- **作用**: 关闭当前页面，跳转到指定页面。

#### **示例**
```javascript
uni.redirectTo({
  url: '/pages/home/home'
});
```

---

### **2.4 切换 Tab 页面**
- **API**: `uni.switchTab`
- **作用**: 跳转到 Tab 页面，并关闭其他非 Tab 页面。

#### **示例**
```javascript
uni.switchTab({
  url: '/pages/index/index'
});
```

---

## **3. 数据请求**

### **3.1 发起网络请求**
- **API**: `uni.request`
- **作用**: 发送 HTTP 请求。

#### **示例**
```javascript
uni.request({
  url: 'https://api.example.com/data',
  method: 'GET',
  success: (res) => {
    console.log(res.data);
  },
  fail: (err) => {
    console.error(err);
  }
});
```

---

### **3.2 上传文件**
- **API**: `uni.uploadFile`
- **作用**: 上传文件到服务器。

#### **示例**
```javascript
uni.uploadFile({
  url: 'https://api.example.com/upload',
  filePath: '/path/to/file',
  name: 'file',
  success: (res) => {
    console.log(res.data);
  }
});
```

---

### **3.3 下载文件**
- **API**: `uni.downloadFile`
- **作用**: 下载文件到本地。

#### **示例**
```javascript
uni.downloadFile({
  url: 'https://example.com/file.pdf',
  success: (res) => {
    if (res.statusCode === 200) {
      console.log('文件下载成功:', res.tempFilePath);
    }
  }
});
```

---

## **4. 本地存储**

### **4.1 设置存储**
- **API**: `uni.setStorage`
- **作用**: 将数据存储到本地。

#### **示例**
```javascript
uni.setStorage({
  key: 'userInfo',
  data: { name: 'John', age: 30 },
  success: () => {
    console.log('数据存储成功');
  }
});
```

---

### **4.2 获取存储**
- **API**: `uni.getStorage`
- **作用**: 获取本地存储的数据。

#### **示例**
```javascript
uni.getStorage({
  key: 'userInfo',
  success: (res) => {
    console.log(res.data);
  }
});
```

---

### **4.3 删除存储**
- **API**: `uni.removeStorage`
- **作用**: 删除本地存储的数据。

#### **示例**
```javascript
uni.removeStorage({
  key: 'userInfo',
  success: () => {
    console.log('数据删除成功');
  }
});
```

---

## **5. 设备信息**

### **5.1 获取系统信息**
- **API**: `uni.getSystemInfo`
- **作用**: 获取设备的系统信息。

#### **示例**
```javascript
uni.getSystemInfo({
  success: (res) => {
    console.log(res);
  }
});
```

---

### **5.2 获取网络状态**
- **API**: `uni.getNetworkType`
- **作用**: 获取设备的网络状态。

#### **示例**
```javascript
uni.getNetworkType({
  success: (res) => {
    console.log('网络类型:', res.networkType);
  }
});
```

---

## **6. 文件操作**

### **6.1 保存文件**
- **API**: `uni.saveFile`
- **作用**: 将临时文件保存到本地。

#### **示例**
```javascript
uni.saveFile({
  tempFilePath: '/path/to/temp/file',
  success: (res) => {
    console.log('文件保存成功:', res.savedFilePath);
  }
});
```

---

### **6.2 获取文件信息**
- **API**: `uni.getFileInfo`
- **作用**: 获取文件的详细信息。

#### **示例**
```javascript
uni.getFileInfo({
  filePath: '/path/to/file',
  success: (res) => {
    console.log('文件大小:', res.size);
  }
});
```

---

## **7. 交互反馈**

### **7.1 显示提示框**
- **API**: `uni.showToast`
- **作用**: 显示消息提示框。

#### **示例**
```javascript
uni.showToast({
  title: '操作成功',
  icon: 'success',
  duration: 2000
});
```

---

### **7.2 显示模态框**
- **API**: `uni.showModal`
- **作用**: 显示模态对话框。

#### **示例**
```javascript
uni.showModal({
  title: '提示',
  content: '确定要删除吗？',
  success: (res) => {
    if (res.confirm) {
      console.log('用户点击确定');
    } else if (res.cancel) {
      console.log('用户点击取消');
    }
  }
});
```

---
