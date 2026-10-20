import type { Work } from './data';

type Locale = 'en' | 'zh';
type WorkCopy = Pick<Work, 'title' | 'subtitle' | 'badge' | 'meta' | 'description' | 'tags' | 'details'>;

const linkLabels: Record<string, string> = {
  'Research overview': '研究概述',
  'Code contribution': '代码贡献',
  'Experiment toolkit': '实验工具',
  'Related attention toolkit': '相关注意力实验工具',
  'Play demo': '体验演示',
  'Project story': '项目介绍',
  'Project details': '项目详情',
  'Rodin platform': 'Rodin 平台',
  'Live demo': '在线演示',
  'Live benchmark': '在线验证',
  Details: '了解更多',
  Explore: '进入探索',
  GitHub: 'GitHub',
};

const workCopy: Record<string, WorkCopy> = {
  mntp: {
    title: '掩码下一词元预测',
    subtitle: '语言模型中间计算机制的统一研究框架',
    badge: '第一作者 · 研究工作',
    meta: '屠可伟教授指导 · 上海科技大学 · 2026',
    description: '围绕下一词元预测前的掩码阶段与潜在计算阶段，构建统一设计空间，连接暂停词元、连续潜在推理与循环 Transformer。',
    tags: ['语言模型', '中间计算', '模型架构'],
    details: `<h3>语言模型在给出预测之前，应当如何计算？</h3><p>标准自回归 Transformer 为每次预测分配固定的计算量。这项工作将暂停词元、连续潜在推理、过度词元化与循环 Transformer 引入的额外计算纳入共同的设计空间，系统分析它们之间的联系。</p><p>我围绕中间状态构造、注意力依赖、位置分配、参数共享与计算阶段深度开展受控比较，分析性能变化来自怎样的计算机制，以及增加计算预算所起的作用。</p><h3>从统一设计空间到受控实验</h3><p>实验采用 LLaMA 风格骨干网络，以 5,170 万参数模型为主要设置，并将部分配置扩展至 4.1 亿参数。通过匹配计算预算的基线与消融实验，考察额外计算在什么条件下能够改善预测。</p>`,
  },
  alcot: {
    title: 'ALCOT：自适应潜在思维链',
    subtitle: '通过前置路由器与门控 Jacobi 模块实现词元级自适应计算',
    badge: '第一作者 · 研究工作',
    meta: '屠可伟教授指导 · 上海科技大学 · 2025–2026',
    description: '由轻量路由器为各个词元分配额外的潜在计算，结合并行 Jacobi 模块与可调节的推理阈值，探索质量与计算开销之间的平衡。',
    tags: ['自适应计算', '潜在推理', '计算效率'],
    details: `<h3>把更多思考分配给需要它的词元</h3><p>ALCOT 将潜在计算引入词元级的下一词元预测预训练。轻量前置路由器位于并行 Jacobi 潜在模块之外，决定哪些词元需要进入额外的计算阶段。</p><p>基础路径与潜在路径之间采用软混合，使模型能够在无需词元级难度标注的条件下进行可微训练。结合置信度的路由惩罚与预热策略，引导计算资源分配；推理时可通过阈值调节质量与计算开销之间的取舍，无需重新训练。</p><p>这项工作围绕方法设计与实验方案展开，研究词元级自适应计算的实现方式与表现。</p>`,
  },
  'probabilistic-transformer': {
    title: '重新思考注意力归一化',
    subtitle: '概率 Transformer 的理论分析与结构扩展',
    badge: '第一作者 · 研究工作',
    meta: '屠可伟教授指导 · 上海科技大学 · 2025',
    description: '从概率语义、结构归纳偏置与实验表现出发，研究基于 sigmoid 的依存头更新与具有竞争性的通道归一化机制。',
    tags: ['概率模型', '注意力机制', '自然语言处理'],
    details: `<h3>从概率解释出发理解模型结构</h3><p>我研究了概率 Transformer 中不同的注意力归一化方式，包括基于 sigmoid 的依存头更新，以及沿通道维度进行的 softmax 归一化。</p><p>这项工作分析多通道的加性更新在引入竞争性聚合后如何变化，并将这些结构变化与其概率解释、在自然语言处理任务上的表现联系起来。</p><p>通过理论与实验分析，梳理不同归一化选择的特点与适用条件，为理解和设计模型结构提供依据。</p>`,
  },
  objecttalk: {
    title: 'ObjectTalk：会回应你的世界',
    subtitle: '在沉浸式多人世界里，通过共同游戏练习英语',
    badge: '第一名 · 上海科技大学黑客松',
    meta: '交互式 AI · 三维环境 · 团队项目',
    description: '逛一逛夜市，探索一家咖啡馆，一起练习英语。空间游戏将日常物件与情境化互动转化为共同完成的语言学习体验。',
    tags: ['精选', 'AI × 交互', '语言学习', '三维交互'],
    details: `<h3>让语言学习成为可以走进去的世界</h3><p>ObjectTalk 将语言练习融入可探索的三维环境。日常物件、情境互动与多人协作，为学习者提供具体而自然的交流内容。</p><p>项目获得上海科技大学黑客松第一名，将交互式 AI、空间界面与协作游戏结合起来。</p><h3>让协作成为开口交流的理由</h3><p>信息差任务让一位玩家掌握目标，另一位玩家负责操作。与朋友或 AI 队友共同完成任务，使口语交流成为解决问题的一部分；场景智能体（Scene Agent）则负责创建并验证新的可玩世界。</p><h3>走进项目原型</h3><p>公开演示包含夜市与咖啡馆等场景，可以进入其中体验基于真实生活情境的协作任务。</p>`,
  },
  rodin: {
    title: 'Rodin：从设计草图到结构化视图',
    subtitle: '面向三维生成流程的多视图识别',
    badge: '三维视觉 · Rodin',
    meta: '影眸科技 · Rodin 平台合作项目 · 2024',
    description: '在设计草图中检测并分割不同视图，为三维生成流程提取结构化输入，并将多视图识别模块接入 Rodin 后端。',
    tags: ['精选', '计算机视觉', '三维生成'],
    details: `<h3>将一张设计稿转化为可用的三维生成输入</h3><p>设计草图经常在同一张画布上包含多个视图。我在 MMYOLO 框架下，使用 YOLOv8 与 YOLO-World 构建视图定位与分割模块，将整张设计稿转化为三维生成流程可使用的结构化输入。</p><p>这一模块集成至 Rodin 后端，连接草图识别与后续三维生成。</p>`,
  },
  citylens: {
    title: 'CityLens：用脚步读懂一座城',
    subtitle: '面向十五分钟生活圈的分析与规划工具',
    badge: '开源项目',
    meta: '城市计算 · 地图 · 基于证据的 AI',
    description: '结合步行时间测算、设施覆盖分析、选址试算与带引用的 AI 问答，让社区可达性与规划假设更容易理解。',
    tags: ['精选', '城市计算', '地图', 'AI 工具'],
    details: `<h3>“步行十五分钟可达”究竟意味着什么？</h3><p>CityLens 基于百度地图的步行时间估计，分析日常生活设施的可达性。项目整合设施分析、候选选址模拟，以及附有引用的 AI 问答界面。</p><p>通过将城市数据与可交互的界面连接，项目让规划假设变得清晰可见，支持进一步比较与探索。</p>`,
  },
  ymoon: {
    title: 'Ymoon：跨运行时的协同编辑',
    subtitle: '在 MoonBit 中实现兼容 Yjs 的 CRDT',
    badge: '开源工程',
    meta: 'MoonBit · 分布式系统 · 开发工具',
    description: '实现共享数据类型、同步与感知协议，以及 WebSocket 协作房间；通过差分测试检验与 Yjs 的字节级兼容性。',
    tags: ['精选', 'CRDT', 'MoonBit', '互操作性'],
    details: `<h3>让共享状态跨越语言边界</h3><p>Ymoon 在 MoonBit 中实现与 Yjs 兼容的协作数据结构，涵盖共享类型、二进制更新互操作、同步与感知协议，以及 y-websocket 协作房间。</p><p>差分测试将其行为与 Yjs 对照，部分核心组件采用形式化验证。在线验证页面直观展示不同运行时之间的状态与字节一致性。</p>`,
  },
  bactrian: {
    title: 'Bactrian：为智能体计划划定边界',
    subtitle: '面向大语言模型生成程序的信息流追踪',
    badge: '开源工程',
    meta: 'MoonBit · AI 智能体 · 信息流',
    description: '受 CaMeL 启发的解释器，通过显式数据流边界与执行策略，探索如何约束大语言模型生成计划的行为。',
    tags: ['智能体安全', '解释器', 'MoonBit'],
    details: `<h3>让信任边界成为可执行的规则</h3><p>Bactrian 使用 MoonBit 实现面向大语言模型生成计划的解释器，借鉴 CaMeL 的信息流方法。运行时追踪值的来源，并根据策略约束这些值的使用。</p><p>项目在解释器层面探索智能体的安全边界，将数据来源、行为策略与执行过程联系起来；仓库中记录了设计范围、测试与实现细节。</p>`,
  },
  moonwalk: {
    title: 'Moonwalk：回溯一次失败的测试',
    subtitle: '面向 MoonBit 的全知式时间回溯调试器',
    badge: '开发工具',
    meta: 'MoonBit · 执行轨迹 · 调试',
    description: '记录一次程序执行，沿时间线查看历史，并追踪一个值为何变成现在的样子，让程序行为的来龙去脉清晰可见。',
    tags: ['调试', '程序分析', 'MoonBit'],
    details: `<h3>沿时间线理解程序</h3><p>Moonwalk 记录失败测试的执行过程，并提供可浏览的程序状态历史。开发者能够前后移动、查看已经发生的操作，沿执行轨迹追踪值的变化与来源。</p>`,
  },
  'human-atlas': {
    title: 'Human Atlas 3D',
    subtitle: '浏览器中的交互式人体解剖图谱',
    badge: '交互式三维项目',
    meta: 'Three.js · WebGL2 · 双语界面',
    description: '通过可交互的三维视图探索男性与女性人体模型，结合局部特写和中英双语标注，理解解剖结构及其空间关系。',
    tags: ['三维可视化', '教育', 'WebGL'],
    details: `<h3>让复杂结构可以亲手探索</h3><p>基于 Three.js 与 WebGL2 构建浏览器端人体解剖图谱，将男性与女性模型、局部特写和双语标注整合于同一界面，支持对人体结构的直观探索。</p><p>项目关注面向学习的交互与可视化呈现。</p>`,
  },
  cargotwin: {
    title: 'CargoTwin',
    subtitle: '一座物流系统持续运转的微缩城市',
    badge: '创意工程',
    meta: 'Three.js · Blender Python · 数字孪生',
    description: '仓库、叉车与货车构成实时运行的低多边形物流城市，将程序化场景构建与浏览器交互体验结合起来。',
    tags: ['数字孪生', '程序化三维', '仿真'],
    details: `<h3>可以走近观察的物流场景</h3><p>CargoTwin 是一个实时三维物流可视化项目，包含低多边形城市、仓库、叉车与货车。资产通过 Blender Python 生成，在 Three.js 中渲染，整个体验直接运行于浏览器。</p>`,
  },
  'harbour-stack': {
    title: 'Harbour Stack',
    subtitle: '一座可以漫游的微缩港口小镇',
    badge: '创意工程',
    meta: 'React Three Fiber · 程序化资产 · 着色器',
    description: '在小岛漫步，乘船出发，或停下来观察天气变化。程序化建模、着色器海水与空间氛围共同构成一座微缩港口。',
    tags: ['创意编程', '三维环境', 'WebGL'],
    details: `<h3>一处值得停留的小世界</h3><p>Harbour Stack 是交互式等距港口场景，包含四种天气、小岛漫步与乘船探索，以及着色器海水和船只尾迹。</p><p>项目结合 React Three Fiber、Blender Python 程序化建模与 Hyper3D Rodin 资产，营造可以游走和观察的三维世界。</p>`,
  },
  repopilot: {
    title: 'RepoPilot',
    subtitle: '帮助理解陌生代码库的学习助手',
    badge: 'AI 工具',
    meta: '代码库理解 · 开发者体验',
    description: '面向代码库学习的助手，帮助读者探索项目结构与实现，逐步建立对陌生代码库的理解。',
    tags: ['开发工具', 'AI', '代码理解'],
    details: `<h3>从陌生代码库中找到方向</h3><p>RepoPilot 探索 AI 助手如何帮助读者理解新的代码库，围绕仓库学习与开发者体验，连接项目结构、具体实现和逐步深入的探索过程。</p>`,
  },
};

/** Translate reader-facing copy while preserving identity, media, and destinations. */
export function localizeWork(work: Work, locale: Locale): Work {
  if (locale === 'en') return work;
  const copy = workCopy[work.id];
  if (!copy) return work;
  return {
    ...work,
    ...copy,
    links: work.links.map(link => ({ ...link, label: linkLabels[link.label] ?? link.label })),
  };
}

const smallProjectCopy: Record<string, { title?: string; summary: string; category: string }> = {
  Sonnet: {
    summary: '交互式音乐回忆墙：让照片、故事与歌曲组成富有纸张触感、可以拖动的明信片。数据保存在浏览器本地的产品原型。',
    category: '交互原型',
  },
  'Spatial Inventory': {
    summary: '连接二维库存与交互式三维视图的空间工作区原型。',
    category: '产品原型',
  },
  Lingxi: {
    summary: '面向人工客服的共情副驾，提供基于证据的回复、承诺跟踪与风险提示。欧莱雅美妆科技黑客松原型，使用合成数据演示。',
    category: 'AI 原型',
  },
  'MotorMap / Windward': {
    summary: '参与原生 iOS 客户端开发，结合 SwiftUI、MapKit、设备界面与 iOS 26 Liquid Glass 交互。',
    category: '团队贡献',
  },
  'Twin Campus': {
    summary: '使用 Blender Python 程序化构建三维校园，并通过 Three.js 在浏览器中实时呈现。',
    category: '三维可视化',
  },
  'LLM Tokenization: Rate–Distortion–Complexity': {
    title: 'LLM 分词：率–失真–复杂度',
    summary: '从信息论角度研究语言模型分词的课程项目，包含实验代码与研究材料。',
    category: '课程研究',
  },
  'Transformer experiment toolkits': {
    title: 'Transformer 实验工具集',
    summary: '面向注意力机制与思维链架构变体的模块化 Hugging Face 实验工具。',
    category: '科研工具',
  },
  'arXiv MCP Server': {
    summary: '用于搜索和分析 arXiv 论文的模型上下文协议（MCP）服务。',
    category: '开发工具',
  },
  'New Tab': {
    summary: '用于整理浏览器标签页、组织工作空间与概览当前任务的效率工具。',
    category: '效率工具',
  },
  'Douyin Toolkit': {
    summary: '用于提取作品链接、管理选定喜欢与收藏内容的浏览器用户脚本。',
    category: '实用工具',
  },
  'WeChat Audio Tools': {
    summary: '面向 SILK、AMR 与 MP3 录音的音频格式转换与合并工具。',
    category: '实用工具',
  },
  CourseBench: {
    summary: '为学生课程分享平台提出嵌套回复功能改进。',
    category: '开源贡献提案',
  },
  'Physics Lab Resources': {
    summary: '开放共享普通物理 I 实验笔记、数据分析脚本与报告示例。',
    category: '开放教育',
  },
  'Student resource templates': {
    title: '学生资源模板',
    summary: '可复用的个人简历、讲座海报与数学作业模板。',
    category: '开放教育',
  },
  'Scientific computing & course projects': {
    title: '科学计算与课程项目',
    summary: '数值优化、相变建模、自然语言处理与物理实验数据分析。',
    category: '学习档案',
  },
};

export function localizeSmallProjects(items: string[][], locale: Locale): string[][] {
  if (locale === 'en') return items;
  return items.map(item => {
    const copy = smallProjectCopy[item[0]];
    if (!copy) return item;
    const translated = [...item];
    translated[0] = copy.title ?? item[0];
    translated[1] = copy.summary;
    translated[3] = copy.category;
    return translated;
  });
}
