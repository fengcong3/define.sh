# 网站修改记录

## 2026年9月6日

- 根据 2K 屏幕反馈扩大版心、正文与论文信息字号并增强对比度；重做首屏标题层级，头像改为完整照片展示，移除装饰底板和基因条纹。

- 重建为研究导向的静态网站：研究方向、论文、科学软件、职业经历、学习笔记与联系方式。
- 加入 2026 年 1 月下旬开始的香港大学 Research Assistant 经历；农科院旧职位只标明已有起始日期，不推断离职月份。
- 从仓库中的已有简历补充研究工作、BGI 实习和其他论文，保留所有 DOI、博客、数据门户与云盘链接。
- 保留 WWWG2B 和 Mendel Pea G2P 的 Zejian Huang 制作署名。
- 原有 AI 知识库及 PDF 简历保持原文件；CV 页面明确区分存档与当前经历。
- 去除旧模板的页签、技能百分比、筛选/模态脚本和未用图片，移除首页外部字体与图标运行依赖。
- 增加响应式布局、键盘焦点、跳转链接、打印样式、SEO 元信息、结构化数据、站点地图与 404 页面。
- 保留 GitHub Pages、main 分支与 define.sh 域名部署方式。


## 2025年4月27日

### 1. Publications and tools 部分修改
- 添加了《Harnessing Landrace Diversity Empowers Wheat Breeding》论文
- 添加了《Genomic and Genetic Insights into Mendel's Pea Genes》论文
- 修改了显示方式：从横向滚动改为竖向显示，每行只展示一个文章
- 禁用了水平滚动功能，使阅读体验更佳
- 移除了原有的框框格式，改为简洁文本形式
- 作者名 "Cong Feng" 加粗显示，期刊名斜体显示
- 按照标准学术引用格式展示论文信息

### 2. About me 部分优化
- 更新了自我介绍文本，使其更加专业
- 将职位从"Assistant Researcher"改为"Bioinformatics Engineer"
- 添加了关于在农业基因组研究所工作经验的内容
- 补充了技能和兴趣点描述

### 3. Portfolio 部分调整
- 保留了中文博客、English blog、G3RP、Cloud Disk四个项目
- 移除了其他项目展示
- 添加了两个新网页：Watkins & Worldwide Wheat G2B 和 Mendel Pea G2P
- 修复了图片比例问题：统一设置为4:3，通过CSS object-fit:cover 确保图片不变形

### 4. What I'm doing 部分改进
- 重写了四个服务项的描述，使语言更专业
- 将"Pipeline Development"更改为"AI for Agriculture"
- 更新了AI for Agriculture的描述：利用AI增强农业研究、基因挖掘和智慧育种
- 优化了文字描述，使其更加清晰简洁

### 5. Contact 部分优化
- 移除了Google地图部分
- 将联系表单改为直接"Email Me"按钮，点击即可发送邮件
- 简化了联系信息，保留了Email和Location信息
- 增加了GitHub链接，指向https://github.com/fengcong3
- 优化了布局和样式，使其更加清晰直观

### 6. JavaScript错误修复
- 修复了导致导航栏无法点击的JavaScript错误
- 为所有DOM元素查询添加了空值检查，确保在元素不存在时不会引发错误
- 增强了代码健壮性，防止因HTML结构变化导致的JavaScript错误

### 7. 文本样式优化
- 统一设置加粗文本比普通文本大5%（font-size: 1.05em）
- 增强了加粗文字的视觉区分度，使重要内容更加突出
- 改善了加粗文本的颜色，使其在黑色背景上更加醒目