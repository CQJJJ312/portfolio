import { resolveMedia } from './assetPath.js';
// Project copy supplied by Scarlett; media stays grouped by its source project.
const image = (folder, file, alt, width, height) => ({ type: 'image', src: `/media/${folder}/${file}`, alt, width, height });
const video = (folder, file, label, poster) => ({ type: 'video', src: `/media/${folder}/${file}`, label, poster });
export const projects = [
  { designFiles: [{"type":"image","src":"/media/design-barbour/1.png","width":1967,"height":1192},{"type":"image","src":"/media/design-barbour/2.png","width":1192,"height":1192},{"type":"image","src":"/media/design-barbour/3.png","width":3451,"height":1192},{"type":"image","src":"/media/design-barbour/4.png","width":1683,"height":1192},{"type":"video","src":"/media/design-barbour/5.mp4","width":720,"height":1280},{"type":"image","src":"/media/design-barbour/6.png","width":825,"height":804},{"type":"image","src":"/media/design-barbour/7.png","width":1414,"height":1180},{"type":"image","src":"/media/design-barbour/8.png","width":1744,"height":1180}], id: 'barbour', name: 'Barbour', layout: 'barbour', subtitle: 'Spring with Barbour', client: 'Barbour', year: '2026', roles: ['Graphic Design', '3D Visualization'], description: {
  "zh": [
    "「Spring with Barbour 春迹漫行」是一场融合音乐演出、互动游戏与户外生活方式的春日品牌活动。活动的创意围绕 Barbour 经典夹克系列与户外生活的联系展开，将钓鱼、骑行、观鸟等使用场景转化为轻松有趣的互动游戏，让来宾在游玩中认识产品，感受品牌所倡导的户外生活方式。",
    "我负责活动的平面视觉设计，包括现场物料及数字传播内容，并完成了部分 3D 场景的设计与视觉呈现。"
  ],
  "en": [
    "Spring with Barbour was a spring brand event combining live music, interactive games, and outdoor experiences. The creative concept explored the connection between Barbour’s classic jackets and outdoor life, translating activities such as fishing, cycling, and birdwatching into playful experiences. Guests could discover the products through participation while connecting with the brand’s outdoor lifestyle.",
    "I was responsible for graphic design across on-site materials and digital communications, as well as the design and visualization of selected 3D scenes."
  ]
}, images: [
    image('barbour','overview.jpg','Barbour outdoor event — site overview',2400,1600),
    image('barbour','detail.jpg','Barbour cap installation and event pavilion',2400,1600),
    image('barbour','truck.jpg','Barbour food truck and checked graphic treatment',2400,1600),
    image('barbour','bikes.jpg','Barbour event bicycle display and graphic signage',2400,1600),
  ], videos: [video('barbour','event.mp4','Event film','/media/barbour/overview.jpg')] },
  { designFiles: [{"type":"image","src":"/media/design-newbalance/1.png","width":2334,"height":1681},{"type":"image","src":"/media/design-newbalance/2.png","width":3394,"height":1285},{"type":"image","src":"/media/design-newbalance/3.png","width":2375,"height":1681},{"type":"image","src":"/media/design-newbalance/4.png","width":2120,"height":1681},{"type":"image","src":"/media/design-newbalance/5.png","width":2757,"height":1214},{"type":"video","src":"/media/design-newbalance/6.mp4","width":640,"height":352},{"type":"image","src":"/media/design-newbalance/7.png","width":4271,"height":1160},{"type":"image","src":"/media/design-newbalance/8.png","width":2009,"height":1682}], id: 'new-balance', name: 'New Balance', layout: 'new-balance', subtitle: 'ABZORB 1890', client: 'New Balance', year: '2026', roles: ['Graphic Design', 'Motion Design'], description: {
  "zh": [
    "围绕「1890寻常之外」主题，New Balance 通过线下红人体验与拍照传播，结合天猫直播，实现线上线下联动传播。创意将拍照本身变成一场视觉游戏，呼应雷内·马格利特的超现实趣味，通过透视错位与虚实转换，让来宾进入画面，创造意想不到的照片。",
    "我提出将体验与传播放在同一过程中：来宾参与视觉游戏的同时，也完成了可供分享的影像创作。我负责项目的平面视觉设计与动态内容制作，包括现场视觉物料、品牌传播设计及动态邀请函。"
  ],
  "en": [
    "Under the theme “1890 Beyond the Ordinary,” New Balance connected offline creator experiences and photo-led social sharing with Tmall livestreaming. The concept turned photography itself into a visual game. Drawing on René Magritte’s surrealist sensibility, it used perspective illusions and shifts between real and imagined space to invite guests into the scene and create unexpected photographs.",
    "I proposed bringing participation and communication together, so that taking part in the visual game also became the process of creating shareable images. I was responsible for graphic and motion design, including on-site visual materials, brand communications, and animated invitations."
  ]
}, images: [
    image('newbalance','space.jpg','ABZORB 1890 event space with curved installation',1440,960),
    image('newbalance','display.jpg','ABZORB 1890 illuminated product display',1440,960),
    image('newbalance','performance.jpg','New Balance event performance and motion visuals',1440,960),
    image('newbalance','event-detail.jpg','ABZORB 1890 event detail',1440,960),
  ], videos: [
    video('newbalance','overview.mp4','Event overview','/media/newbalance/space.jpg'),
    { ...video('newbalance','invitation-motion.mp4','Invitation motion'), ratio: '1244 / 1660' },
  ] },
  { id: 'boucheron', name: 'Boucheron', layout: 'boucheron', subtitle: 'VIP Dinner Archive Films', client: 'Boucheron', year: '2026', roles: ['Visual Research', 'Motion Design', 'Video Editing'], description: {
    zh: ['为 Boucheron VIP 晚宴制作品牌历史影像，将档案照片转化为具有复古质感的动态短片。', '我参与了历史素材研究与版权授权，并通过 AI 动态处理、调色及剪辑，将不同来源的影像整合为完整影片。'],
    en: ['A series of archival films for Boucheron’s VIP dinner, bringing historical photographs to life through vintage-inspired motion.', 'I worked on archival research and licensing, AI-assisted animation, color grading, and video editing.'],
  }, images: [image('boucheron','dinner.jpg','BOUCHERON dinner space visualization',2400,1190)], videos: [
    { ...video('boucheron','dinner-ambience.mp4','Dinner ambience','/media/boucheron/dinner.jpg'), ratio: '1080 / 1162' },
    { ...video('boucheron','archive.mp4','Dinner video — archive'), ratio: '1080 / 1162' },
  ] },
  {id:'skp',name:'SKP',layout:'skp',subtitle:'Creative Concept / Window Display Proposal',client:'SKP',roles:['Creative Concept','Visual Design','3D Visualization'],description: {
  "zh": [
    "为 SKP 马年新年橱窗提出创意概念，以现代设计语言重新演绎传统新年主题。橱窗创意以迈布里奇的奔马连续摄影为起点，从马匹向前奔跑的动态中延伸出列车行进与新年启程的联想，让四组橱窗串联成一段从过去驶向当下、迎向新年的旅程，传递辞旧迎新、不断向前的寓意。",
    "我独立提出这一叙事方向，并负责从创意构思、概念发展到视觉设计及 3D 效果呈现的完整过程，将概念发展为具体的橱窗提案。"
  ],
  "en": [
    "A creative proposal for SKP’s Year of the Horse New Year window displays, reinterpreting a traditional festive theme through a contemporary design language. The window concept took Eadweard Muybridge’s sequential photographs of a galloping horse as its starting point. The horse’s forward motion inspired a narrative connecting moving trains with the idea of embarking on a new year. Across four windows, the displays formed a continuous journey from past to present and into the year ahead, expressing renewal and forward momentum.",
    "I independently developed this narrative direction and carried the project from initial concept through visual design and 3D visualization, translating the idea into a complete window display proposal."
  ]
},designFiles:[image('skp','window-01.png','SKP window display 1',1033,469),image('skp','material-detail.png','SKP window detail 1',621,823),image('skp','window-variation.png','SKP window display 2',1033,469),image('skp','window-03.png','SKP window display 3',1033,469),image('skp','material-detail-02.png','SKP window detail 2',621,823),image('skp','window-concept.png','SKP window display 4',1033,469)],images:[],videos:[{...video('skp','motion-study.mp4','SKP window display proposal'),hideCaption:true}]},
  {id:'a-day-in-barbour',name:'A Day in Barbour',layout:'barbour-guideline',subtitle:'KOL Video Guidelines / Visual System',client:'Barbour',roles:['Visual Design','Layout Design','Video Guidelines'],description:{zh:['为 Barbour「A Day in Barbour」系列 KOL 视频设计统一的视觉规范，涵盖封面版式、时间标记、字体系统及片尾画面，并制作 Storyboard 分镜脚本，为拍摄与剪辑提供视觉参考。在保持整体视觉一致性的同时，为不同创作者的内容保留灵活性。'],en:['Developed a consistent visual system for the A Day in Barbour KOL video series, including cover layouts, timestamp graphics, typography, and end frames, alongside storyboards to guide filming and editing. The guidelines establish a recognizable visual identity while allowing flexibility across different creators\' content.']},images:[{...image('barbour-guideline','cover-design.png','A Day in Barbour cover design — woman seated in a car',1494,2655),caption:'01 / COVER DESIGN'},{...image('barbour-guideline','timestamp-graphic.png','A Day in Barbour timestamp graphic — morning dog walk',1120,1992),caption:'02 / TIMESTAMP GRAPHIC'}],videos:[{ratio:'9 / 16',...video('barbour-guideline','guideline.mp4','A Day in Barbour — KOL video guideline'),hideCaption:true}]},
  {id:'3d-works',name:'3D Works',layout:'three-d',subtitle:'Selected Modeling & Rendering',roles:['3D Modeling','Materials','Lighting & Rendering'],description:{zh:['精选 3D 作品，展示建筑造型与硬表面建模，以及材质、灯光和渲染表现。'],en:['Selected 3D studies in architectural and hard-surface modeling, materials, lighting, and rendering.']},images:[image('3d-works','pavilion.png','Detailed pavilion model with textured architectural materials',3840,2160),image('3d-works','vehicle.png','Hard-surface vehicle study with layered materials and lighting',3840,2160)],videos:[]},
].sort((a,b)=>['barbour','new-balance','skp','a-day-in-barbour','boucheron','3d-works'].indexOf(a.id)-['barbour','new-balance','skp','a-day-in-barbour','boucheron','3d-works'].indexOf(b.id)).map(project=>({...project,images:project.images.map(resolveMedia),videos:project.videos.map(resolveMedia),...(project.designFiles?{designFiles:project.designFiles.map(resolveMedia)}:{})}));
export const contact = { name: '陈秋嘉 Scarlett Chen', phone: '+86 15801924146', wechat: 'DLXL_12345', email: 'cqqq312@outlook.com', linkedin: 'https://www.linkedin.com/in/scarlett-chen-bb5496267/?isSelfProfile=true', artstation: 'https://www.artstation.com/scarlett_chen', flickr: 'https://www.flickr.com/people/203555808@N05/' };
export const clients = [
  {name:'New Balance',file:'newbalance.svg',width:58},
  {name:'Boucheron',file:'boucheron-official.png',width:110},
  {name:'Barbour',file:'barbour.svg',width:83},
  {name:'Lacoste',file:'lacoste.svg',width:108},
  {name:'Cartier',file:'cartier.svg',width:91},
  {name:'Melco',file:'melco.png',width:108},
  {name:'Shangri-La',file:'shangrila.png',width:110},
  {name:'iFI',file:'ifi.png',width:115},
];
