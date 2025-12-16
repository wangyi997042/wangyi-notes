GitHub Copilot

Lighthouse 简洁说明（中文，重点、可操作）

- 定义：Lighthouse 是 Google 开源的网页质量自动化检测工具，用于评估页面的性能、可访问性、最佳实践、SEO 和 PWA 能力。它在“实验室环境”对页面进行一系列自动化测试并给出分数与改进建议。  

- 核心检测项：
  - Performance（性能）：包括 LCP、CLS、INP（或 FID）、TTFB、总阻塞时间等指标。  
  - Accessibility（可访问性）：ARIA、颜色对比、标签等无障碍问题。  
  - Best Practices（最佳实践）：安全、HTTPS、无过时 API 等。  
  - SEO：基础 SEO 检查（meta、语义化标签等）。  
  - Progressive Web App（PWA）：离线、Service Worker、manifest 等。

- 如何运行（常用方式）：
  - Chrome DevTools → Audits / Lighthouse：右键 → Inspect → Lighthouse 面板，适合单次手动检测。  
  - CLI：npm install -g lighthouse  
    ```bash
    lighthouse https://example.com --output html --output-path ./report.html
    ```  
  - Node 集成 / 编写脚本：可在 CI 中调用自动生成报告。  
  - Lighthouse CI：用于在 CI/CD 中做持续质量校验（可作为门禁）。  
  - PageSpeed Insights：Google 的在线服务，内部也使用 Lighthouse。

- 报告与修复建议：
  - 报告会给出评分、实验室指标、逐项建议和优先级（优先修复影响分数高的问题）。  
  - 常见优化方向：减小/拆分 JS、延迟/异步加载脚本、图片压缩/懒加载、启用缓存和 gzip/brotli、减少渲染阻塞资源、优化服务器响应、使用 CDN、改善字体加载策略等。

- 使用场景与注意点：
  - 适合开发阶段、性能回归检测与发布前检查。  
  - Lighthouse 是基于模拟环境（单次/受控网络/CPU），真实用户体验需结合现场指标（Real User Monitoring）。  
  - 在 CI 中使用 Lighthouse CI 可防止性能回退并自动生成可视化报告。

如需，我可以：
- 把一段“Lighthouse 基础说明 + 常用命令 + CI 示例”写入你当前文件 /Users/wangwang/Public/develop/web/xue/wangyi-notes/ligthhouse/index.md；  
- 或生成一个可运行的 Lighthouse CLI/CI 示例脚本。哪一个需要我帮你写？