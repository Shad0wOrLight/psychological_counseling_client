// 测评专题分类介绍
const evaluationTypeList = [
  {
    id: 1,
    text: "健康",
    icon: require("../img/evaluationType/1.png"),
    path: "/evaluation/details/type/健康",
    desc: "<p >每个人都非常关心自己的健康，无论是心理上的还是生理上的，那么，什么才是心理健康呢？它是指一种持续且积极发展的心理状态，在这种状态下，主体能作出良好的适应，并且充分发挥其身心潜能。<br><br>为此，心理咨询平台为您提供专业心理健康测评（如常见的抑郁症、焦虑症、恐惧症、强迫症、躁狂症、精神压力等），希望可以帮助您更好的了解自己的心理健康。</p>",
  },
  {
    id: 2,
    text: "婚恋",
    icon: require("../img/evaluationType/2.png"),
    path: "/evaluation/details/type/婚恋",
    desc: "<p >在不同的人心里,对恋爱也有不一样的情感要求和寄托,那么,谈恋爱对你来说更像是什么呢？<br><br>深爱的人总以为能够长相厮守,但现实却也总不对人心，那爱到深处却无疾而终的原因是什么呢?&nbsp;<br><br>做一道情感测评看看吧，心理咨询平台为您提供专业的情感测试题及答案，希望可以帮助您深入了解自己的爱情性格类型。</p>",
  },
  {
    id: 3,
    text: "职场",
    icon: require("../img/evaluationType/3.png"),
    path: "/evaluation/details/type/职场",
    desc: "<p >你是否对自己的未来没有规划？<br>如何努力才能更好的发挥自己的优点和长处呢？<br>如何才能更快攻克一道道职场难关呢？<br><br>那么就需要首先了解自己，会做什么、能做什么、擅长什么？<br>心理咨询平台为您提供的专业职场测评，希望可以帮助你了解自己的职场价值，让你更详细的了解自己所选职种的特点。</p>",
  },
  {
    id: 4,
    text: "亲子",
    icon: require("../img/evaluationType/4.png"),
    path: "/evaluation/details/type/亲子",
    desc: "<p >你跟孩子的关系好吗？<br>与孩子有多亲近呢？<br>你们之间又存在着一些什么问题？<br><br>无论做父母的和自己的孩子每天在一起的时间有多长，他们之间总有许多互不了解的地方。<br>为此，心理咨询平台为您提供了专业亲子测评，希望能帮助你更好的了解孩子，在处理亲子关系之前，请先检测一下自己跟孩子之间关系的融洽性吧。</p>",
  },

  {
    id: 5,
    text: "能力",
    icon: require("../img/evaluationType/5.png"),
    path: "/evaluation/details/type/能力",
    desc: "<p >能力测评又称认知测评，是指对一个人或某一团体的某种能力作出评价。这种能力可以是当前所具有的实际能力，或者是将来可能有的潜在能力。<br><br>你对自己的能力了解吗？<br>心理咨询平台为您提供智力智商、专注力、适应力、意志力、自信自尊度等等专业测评测评，希望可以帮助你更好的了解自己。</p>",
  },
  {
    id: 6,
    text: "人格",
    icon: require("../img/evaluationType/6.png"),
    path: "/evaluation/details/type/人格",
    desc: "<p >虽然从心理学的角度上来讲，性格（character）全然不同于人格（Personality），但我们日常交流中所谈论的性格含义，实际上是指心理学上的人格概念。心理学家对人格的心理学含义尽管存在众多不同的看法，但在通常意义上是指一个人相对稳定的心理特征和行为倾向。<br><br>你对自己的“性格”了解吗？<br>心理咨询平台为您提供专业的性格测评，希望可以帮助您深入了解自己的心理特征和行为倾向。</p>",
  },
];

export default evaluationTypeList;
