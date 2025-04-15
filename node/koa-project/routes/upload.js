const Router = require('koa-router');
const multer = require('@koa/multer');
const path = require('path');
const fs = require('fs/promises'); // 使用 fs 的 Promise API

const router = new Router();

// 配置上传目录
const upload = multer({ dest: path.join(__dirname, '../../uploads/') });

// 单文件上传并处理
router.post('/upload', upload.single('file'), async (ctx) => {
  const file = ctx.file;

  try {
    // 检查文件是否存在
    const fileExists = await fs.access(file.path).then(() => true).catch(() => false);
    if (!fileExists) {
      ctx.status = 404;
      ctx.body = { message: '上传的文件不存在' };
      return;
    }

    // 重命名文件
    const newFilePath = path.join(file.destination, `${file.originalname}`);
    await fs.rename(file.path, newFilePath);

    // 读取文件内容（仅限文本文件）
    let fileContent = '';
    if (file.mimetype.startsWith('text')) {
      fileContent = await fs.readFile(newFilePath, 'utf8');
    }

    ctx.body = {
      message: '文件上传并处理成功',
      file: {
        originalName: file.originalname,
        newPath: newFilePath,
        size: file.size,
        content: fileContent.slice(0, 100), // 返回前 100 个字符
      },
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { message: '文件处理失败', error: err.message };

    // 删除临时文件
    if (file && file.path) {
      await fs.unlink(file.path).catch(() => {});
    }
  }
});

// 多文件上传并处理
router.post('/uploads', upload.array('files', 5), async (ctx) => {
  const files = ctx.files;

  try {
    const processedFiles = await Promise.all(
      files.map(async (file) => {
        // 重命名文件
        const newFilePath = path.join(file.destination, `${file.originalname}`);
        await fs.rename(file.path, newFilePath);

        // 读取文件内容（仅限文本文件）
        let fileContent = '';
        if (file.mimetype.startsWith('text')) {
          fileContent = await fs.readFile(newFilePath, 'utf8');
        }

        return {
          originalName: file.originalname,
          newPath: newFilePath,
          size: file.size,
          content: fileContent.slice(0, 100), // 返回前 100 个字符
        };
      })
    );

    ctx.body = {
      message: '多文件上传并处理成功',
      files: processedFiles,
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { message: '文件处理失败', error: err.message };

    // 删除所有临时文件
    await Promise.all(
      files.map((file) => fs.unlink(file.path).catch(() => {}))
    );
  }
});

module.exports = router;