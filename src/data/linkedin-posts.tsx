import type { LinkedInPostProps } from '@/types/LinkedInPostProps';

export const linkedinPosts: LinkedInPostProps[] = [
  {
    id: 0,
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7479114919326461953/',
    title: {
      ar: 'اتخرجنا. ودليل لسه في البداية.',
      en: 'We graduated. Daleel is just getting started.',
    },
    topic: {
      ar: 'بناء في العلن',
      en: 'Building in public',
    },
    excerpt: {
      ar: 'تطبيق موبايل بيساعد الناس تخلص مصالحها الحكومية: الورق المطلوب، المصاريف، والمكاتب. شهور من الشغل، وأكتر من 395 خدمة في 50 فئة.',
      en: 'A mobile app that helps people finish government paperwork: the documents, the fees, and the offices. Months of work, 395+ services across 50 categories.',
    },
    arabicParagraphs: [
      <>الحمدلله، اتخرجنا<br />ومشروع تخرجنا عن دليل</>,
      <>دليل هو موبايل أبليكيشن بيساعدك تنجز أي مصلحة حكومية محتاجة منك ورق، عن طريق إنه بيدلك على اللي هتحتاجه بالظبط، زي مثلا:<br />- الورق المطلوب<br />- المصاريف الإدارية<br />- أماكن المصالح الحكومية اللي محتاج تروحها<br />- وغيرها كتير</>,
      <>ف بدل ما تنزل من بيتك عشان تعمل رخصة السواقة بتاعتك وفي الآخر تلاقي الموظف بيقولك انت ناقصك شهادة فحص طبي، وتضرب المشوار على الفاضي<br />ف ليه ودليل موجود، دا انت غريب يا أخي 🤷🏻‍♂️🤷🏻‍♂️</>,
      <>بس احنا هنساعدك، بقالنا شهور شغالين على الداتا اللي هنعرضها وقدرنا نجمع أكتر من 395 خدمة حكومية متوزعين على 50 فئة، عندك مثلا:<br />- السجل المدني<br />- التعليم العالي<br />- رخص القيادة والمرور<br />- الإسكان والتمويل العقاري<br />- السجل التجاري، وغيرهم</>,
      <>احنا مؤمنين جدا بالفكرة وبالنسبالنا مش مجرد مشروع تخرج خلاص ويتنسي<br />ف استنوا أخبار جديدة عن دليل في الأسابيع القادمة بإذن الله 🇪🇬🇪🇬⏳</>,
    ],
    englishParagraphs: [
      <>Thank God, we’ve graduated!<br />Our graduation project is Daleel.</>,
      <>Daleel is a mobile app that helps you complete government procedures that require paperwork. It guides you through exactly what you need, such as:<br />- Required documents<br />- Administrative fees<br />- The government offices you need to visit<br />- And much more</>,
      <>So instead of leaving home to get your driver’s license, only to have an employee tell you that you’re missing a medical exam certificate and send you all the way back for nothing…<br />Why go through that when Daleel is here? You’d have to be a little strange not to use it 🤷🏻‍♂️🤷🏻‍♂️</>,
      <>We’re here to help. We’ve spent months working on the data the app will show, and we’ve gathered information on more than 395 government services across 50 categories, including:<br />- Civil registry<br />- Higher education<br />- Driver’s licenses and traffic services<br />- Housing and mortgage finance<br />- Commercial registry, and many more</>,
      <>We really believe in this idea. To us, Daleel isn’t just a graduation project that we’ll forget about.<br />Stay tuned for more news about Daleel in the coming weeks, God willing 🇪🇬🇪🇬⏳</>,
    ],
    images: [
      { src: '/posts/grad-1.jpeg', alt: 'Five graduates in suits talking together outside on graduation day' },
      { src: '/posts/grad-2.jpeg', alt: 'Five graduates in suits pointing toward the camera' },
      { src: '/posts/grad-3.jpeg', alt: 'Two men in suits taking a mirror selfie, one giving a thumbs up' },
      { src: '/posts/grad-4.jpeg', alt: 'Daleel graduation project logo with the Arabic word دليل and the English name DALEEL on a green background' },
    ],
    reactions: 100,
    comments: 22,
    reposts: 3,
  },
  {
		id: 1,
    url: "https://lnkd.in/p/eg_HdRtU",
    title: {
      ar: 'Selectors في Tailwind بتوفر عليك تكرار الكود',
      en: 'Tailwind selectors that cut the repetition',
    },
    topic: {
      ar: 'صنعة الواجهات',
      en: 'Frontend craft',
    },
    excerpt: {
      ar: 'الـArbitrary selectors بتقلل تكرار الكود وتسرّع بناء الواجهة. شرحتهم خطوة بخطوة بأمثلة في الصور.',
      en: 'Arbitrary selectors reduce repeated code and speed up UI work. I broke the syntax down with examples.',
    },
	    arabicParagraphs: [
      <>فيه حاجة لو عرفتها في Tailwindcss هتوفر عليك وقت ومجهود وانت بتعمل ستايلنج للعناصر وبتبني الUI.<br />اسمها Arbitrary Selectors، ودي اساليب بتقلل تكرار الكود وبتسرع شغلك بشكل كبير، هتلاقي الشرح في الصور ابقى بص عليهم بصة.</>,
      <>وفي الكومنتات هتلاقي فايل فيه React Component فيه امثلة ادفانسد اكتر لو حابب تتدرب.</>,
    ],
	    englishParagraphs: [
	      <>There’s something in Tailwind CSS that can save you time and effort when styling elements and building your UI.<br />They’re called arbitrary selectors. They help reduce repeated code and speed up your workflow. I’ve explained them in the images, so take a look.</>,
	      <>You’ll also find a file in the comments with a React component and more advanced examples to practice with.</>,
	    ],
    images: [
      { src: '/posts/classes-1.jpeg', alt: 'Tailwind CSS arbitrary (*) selector example' },
      { src: '/posts/classes-2.jpeg', alt: 'Tailwind CSS arbitrary (&tag) selector example' },
      { src: '/posts/classes-3.jpeg', alt: 'Tailwind CSS arbitrary (&[attribute]) selector example' },
    ],
    reactions: 200,
    comments: 14,
    reposts: 52,
	},
	{
	id: 5,
    url: "https://lnkd.in/p/ergru_EX",
    title: {
      ar: 'شغل GitHub مع تيم من غير صداع',
      en: 'A calmer GitHub workflow for teams',
    },
    topic: {
      ar: 'شغل التيم',
      en: 'Team workflow',
    },
    excerpt: {
      ar: 'العادات اللي بتخلي التيم مايدوسش على بعض: branches منفصلة، rebase، commits واضحة، pull requests، وتنضيف بعد الدمج.',
      en: 'The habits that keep a team out of each other’s way: separate branches, rebases, focused commits, pull requests, and cleanup.',
    },
	    arabicParagraphs: [
      <>لو هتشتغل مع تيم على GitHub قريب، دول اهم الحاجات اللي هتساعدك تشتغل بنظام اكتر وتقدر تتفادى الConflicts بقدر الامكان.</>,
      <>ودا لينك GitHub Repo فيه كل الأوامر الموجودة في الصور:<br /><a className="text-primary underline underline-offset-4 hover:text-primary/80" dir="ltr" href="https://lnkd.in/d_hunKij" target="_blank" rel="noreferrer">https://lnkd.in/d_hunKij</a></>,
    ],
	    englishParagraphs: [
	      <>If you’re about to work with a team on GitHub, these are some of the most useful practices for keeping your workflow organized and avoiding conflicts as much as possible.</>,
	      <>Here’s a GitHub repository with all the commands shown in the images:<br /><a className="text-primary underline underline-offset-4 hover:text-primary/80" dir="ltr" href="https://lnkd.in/d_hunKij" target="_blank" rel="noreferrer">https://lnkd.in/d_hunKij</a></>,
	    ],
    images: [
      { src: '/posts/github-1.jpeg', alt: 'Git setup steps: clone the repository, create a feature branch, and confirm the branch' },
      { src: '/posts/github-2.jpeg', alt: 'Daily habit: pulling the latest main with rebase before starting work' },
      { src: '/posts/github-3.jpeg', alt: 'Daily commit habits: checking status, staging, committing, and viewing the log' },
      { src: '/posts/github-4.jpeg', alt: 'Pushing a feature branch and opening a pull request' },
      { src: '/posts/github-5.jpeg', alt: 'Cleaning up local and remote branches after a pull request is merged' },
      { src: '/posts/github-6.jpeg', alt: 'Fetching and checking out a teammate’s branch for testing' },
      { src: '/posts/github-7.jpeg', alt: 'Git practices to avoid: pushing to main, force pushing, and vague commit messages' },
    ],
    reactions: 69,
    comments: 3,
    reposts: 9,
  },
  {
		id: 2,
    url: "https://lnkd.in/p/evzJwkqS",
    title: {
      ar: 'TypeScript إمتى بقت تستاهل؟',
      en: 'Why TypeScript stopped feeling like extra work',
    },
    topic: {
      ar: 'Types والأدوات',
      en: 'Types & tooling',
    },
    excerpt: {
      ar: 'بريزنتيشن في Huma-volve عن إزاي الـtypes بتخلي الكود أنضف وأأمن، وبتوضّح التواصل بين الـfrontend والـbackend.',
      en: 'A presentation for Huma-volve on how types make code cleaner, safer, and clearer between frontend and backend.',
    },
	    arabicParagraphs: [
      <>في جزء من تدريب الـFrontend الحالي بتاعي مع Huma-volve💙، قدمت بريزنتيشن عن TypeScript وازاي ممكن تساعد اي مبرمج انه يكتب كود انضف وأأمن.</>,
      <>اول ما بدات اتعلم Typescript سألت نفسي، هوا ليه اصلا؟ ما Javascript مزعلتناش في حاجة وشغالة زي الفل اهو، ليه استخدم لغة برمجة تجبرني "ازود" على نفسي كود؟</>,
      <>وانا كنت ساعتها صح، بس غلط في نفس الوقت، وهقولك ليه👇:</>,
      <>بحكم اني كنت لسة في بداياتي فالمشاريع اللي كنت بشتغل كانت صغيرة، مفيهاش داتا كتير، ومفيش قواعد صارمة لازم امشي عليها.<br />بس لما بدأت اشتغل على مشاريع أكبر ومعقدة اكتر، كان لازم لازم يكون في نظام وضمان إن كل جزء في الكود فاهم التاني.</>,
      <>فبدأت افهم ليه الناس بتحب اللغة دي.<br />في الـ TypeScript انا عارف كل متغير نوعه ايه، كل فانكشن راجعة بايه، وكل object شكله عامل ازاي.</>,
      <>فلما بيحصل مشكلة بتلاقي الايرور في وشك اااد كدا، على عكس الـJavascript اللي حرفيا بتعاني في صمت..</>,
      <>غير كده لما تشتغل في تيم، وجود types بيخلي التواصل بين اعضاء الفريق اوضح بكتير، خصوصا لما الـfrontend بيتعامل مع الـbackend بتكون عارف شكل الداتا اللي جاية واللي رايحة بالظبط.</>,
      <>في الآخر، قدرت اوصل ان TypeScript مش عبء، بالعكس دي اداة بتخليك تكتب كود افضل، وسهل يتطور مع الوقت.</>,
      <>الPresentation document كان بسيط جدا عشان حبيت اركز على الشرح العملي اكتر، بس لو حابب تبص عليها هتلاقيه في الكومنتس❤</>,
    ],
	    englishParagraphs: [
	      <>As part of my current frontend training with Huma-volve 💙, I gave a presentation about TypeScript and how it can help developers write cleaner, safer code.</>,
	      <>When I first started learning TypeScript, I asked myself: why do I even need it? JavaScript hasn’t let me down; it works just fine. Why use a language that makes me write “extra” code?</>,
	      <>At the time, I was right—and wrong at the same time. Here’s why 👇</>,
	      <>I was still at the beginning of my journey, and the projects I worked on were small. They didn’t have much data or strict rules to follow.<br />But when I started working on bigger, more complex projects, I needed structure and a way to make sure every part of the code understood the others.</>,
	      <>That’s when I started to understand why people like TypeScript.<br />With TypeScript, I know the type of each variable, what each function returns, and what each object looks like.</>,
	      <>When something goes wrong, the error shows itself right away—unlike JavaScript, which can leave you suffering in silence.</>,
	      <>Also, when you work in a team, types make communication much clearer. This is especially helpful when the frontend works with the backend, because you know exactly what the incoming and outgoing data should look like.</>,
	      <>In the end, I realized TypeScript isn’t a burden. It’s a tool that helps you write better code that’s easier to maintain and grow over time.</>,
	      <>The presentation was simple because I wanted to focus more on practical explanations. If you’d like to see it, you’ll find it in the comments ❤</>,
	    ],
    images: [
      { src: '/posts/ts-vs-js.jpeg', alt: 'TypeScript vs JavaScript presentation slide from Huma-volve' },
    ],
    reactions: 99,
    comments: 24,
    reposts: 2,
  },
  {
		id: 3,
    url: "https://lnkd.in/p/eDxbT6K8",
    title: {
      ar: 'خمسة أيام عشان أفهم قيمة الـstructure',
      en: 'A five-day lesson in project structure',
    },
    topic: {
      ar: 'الهيكلة',
      en: 'Structure',
    },
    excerpt: {
      ar: 'رجعت لمشاريع قديمة بـHTML وCSS ودفعت تمن كل اختصار. اللي كان ممكن ياخد يوم، خد خمسة.',
      en: 'I revisited old HTML and CSS projects and paid for every shortcut. A job that should have taken a day took five.',
    },
	    arabicParagraphs: [
      <>انا دايما كنت بسمع عن مبدأ الscalability في المشاريع وإنه لازم وانا ببني المشروع ابقى عامل حسابي اني هزوره في المستقبل واضيف فيه حاجات وكدا<br />والكلام جميل اوي وهوا نظري بس مكنتش مستوعب لأي درجة النصيحة دي مهمة</>,
      <>الاسبوع اللي فات لما حصل المشكلة بتاعت حريق رمسيس والنت فصل وكدا مكنتش عارف اشتغل يعتبر فقولت اما اقلب في المشاريع القديمة اوي اللي عملتها بhtmlوcss واروق عليهم بشوية شوييية جافا سكريبت موضوع مش كبير يعني</>,
      <>كنت بشد في شعري حرفيا وانا بعدل عالكود، حاجات موجودة في مكان المفروض متكونش موجودة فيه، حاجات مش موجودا في مكان المفروض تكون موجودة فيه، حاجات لو قولتلها سامو عليكو بس تقوم تbreak الكود، فالموضوع اتحول من مجرد جافا سكريبت لموال وبقا اللي هوا مين الحمار اللي كان شغال قبلي، والموضوع اللي كان ممكن ياخد يوم بالكتير خد 5 ايام</>,
      <>الحلو في الموضوع اني عرفت قيمة المفهوم دا واي حاجة هشتغل فيها في المستقبل هكون عامل حساب اني مقعش في المشكلة دي تاني، وإن اد ايه، اد ايه اد اييييه الstructure بتاع المشاريع اد ايه مهم</>,
      <>وكويس انها مجاتش في عيل من العيال</>,
    ],
	    englishParagraphs: [
	      <>I’d always heard about scalability in software projects: when building something, you should plan for revisiting it later and adding new features.<br />It sounds great in theory, but I didn’t realize just how important that advice was.</>,
	      <>Last week, after the Ramses fire caused an internet outage, I couldn’t really work. So I decided to revisit some really old projects I’d built with HTML and CSS and spruce them up with a little JavaScript. It didn’t sound like a big deal.</>,
	      <>I was literally pulling my hair out while editing the code. Things were in places they shouldn’t be; other things were missing from where they belonged. Some parts could break the code just by saying hello. What started as a little JavaScript turned into a whole saga. I kept thinking, “Who was the idiot working on this before me?” A job that could have taken a day at most ended up taking five.</>,
	      <>The good thing is that I finally understood the value of this idea. In anything I work on from now on, I’ll plan ahead so I don’t fall into the same trap again. Project structure matters so, so, so much.</>,
	      <>At least it didn’t happen to one of the kids.</>,
	    ],
    reactions: 11,
  },
  {
		id: 4,
		url: "https://lnkd.in/p/e_Gt8Q-5",
    title: {
      ar: 'كتاب TypeScript كنت نفسي أقراه بدري',
      en: 'The TypeScript book I wish I’d read sooner',
    },
    topic: {
      ar: 'التعلّم',
      en: 'Learning in public',
    },
    excerpt: {
      ar: 'TypeScript Deep Dive شرح الـgenerics والـclasses وربط TypeScript بـReact بشكل أوضح من الـdocs الرسمي بالنسبة لي.',
      en: 'TypeScript Deep Dive explained generics, classes, and React typing more clearly than the official docs for me.',
    },
	    arabicParagraphs: [
      <>لو ناوي تتعلم typescript قريب فا فيه كتاب هيفيدك اوي اسمو<br />Typescript Deep Dive</>,
      <>بالنسبالي كان مفيد اكتر من ال documentation الرسمي بكتير خصوصا في حتة ربط typescript مع react، وتوضيح المفاهيم المعقدة بتاعت اللغة زي الgenerics والclasses</>,
      <>الكتاب كمان مغطي حاجات الdocumentation الرسمي مش بيغطيها بنفس السلاسة زي التعامل مع الcomponents اللي انت بتبنيها في ريأكت</>,
      <>فا لو اسلوبك المفضل في التعلم هو القراية فانت هتحبو وتستفيد منه جدا.</>,
      <>ممكن تقراه من هنا:<br /><a className="text-primary underline underline-offset-4 hover:text-primary/80" dir="ltr" href="https://lnkd.in/d8E9FTnT" target="_blank" rel="noreferrer">👉🏻 [ https://lnkd.in/d8E9FTnT ] 👈🏻</a></>,
    ],
	    englishParagraphs: [
	      <>If you’re planning to learn TypeScript soon, there’s a book that can really help: <br />TypeScript Deep Dive</>,
	      <>I found it much more helpful than the official documentation, especially for using TypeScript with React and understanding complex concepts like generics and classes.</>,
	      <>The book also covers some topics that the official documentation doesn’t explain as smoothly, such as working with the components you build in React.</>,
	      <>So if you learn best by reading, I think you’ll enjoy it and get a lot out of it.</>,
	      <>You can read it here:<br /><a className="text-primary underline underline-offset-4 hover:text-primary/80" dir="ltr" href="https://lnkd.in/d8E9FTnT" target="_blank" rel="noreferrer">👉🏻 [ https://lnkd.in/d8E9FTnT ] 👈🏻</a></>,
	    ],
    reactions: 10,
  },
];
