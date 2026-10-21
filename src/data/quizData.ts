/**
 * SoundCraft Studio - Knowledge Assessment Quiz Data
 * Academic Knowledge Base for Radio Broadcasting, Scriptwriting, Sound Design & On-Air Production
 */

export interface QuizOption {
  id: string; // 'A' | 'B' | 'C' | 'D'
  text: string;
}

export interface QuizQuestion {
  id: string;
  category: 'radio-vs-podcast' | 'formats' | 'spot-30s' | '6t-3h' | 'script-structure' | 'audio-tech';
  categoryName: string;
  question: string;
  scenario?: string; // Situational scenario in studio
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
  referenceSource: string;
}

export interface QuizCategoryInfo {
  id: string;
  name: string;
  description: string;
  iconName: string;
  questionCount: number;
}

export const QUIZ_CATEGORIES: QuizCategoryInfo[] = [
  {
    id: 'all',
    name: 'ข้อสอบจำลองรวมทุกหมวด (Comprehensive Studio Exam)',
    description: 'ประเมินความรู้รอบด้านทั้ง 6 หมวดวิทยุกระจายเสียงและสื่อเสียงดิจิทัล',
    iconName: 'Award',
    questionCount: 20,
  },
  {
    id: 'radio-vs-podcast',
    name: '1. วิทยุออนไลน์ vs Podcast',
    description: 'การกระจายสัญญาณ, รูปแบบเวลา, พฤติกรรมผู้ฟัง และเกณฑ์มาตรฐานเสียง',
    iconName: 'Radio',
    questionCount: 3,
  },
  {
    id: 'formats',
    name: '2. รูปแบบรายการวิทยุ 9 ประเภท',
    description: 'Talk, Magazine, ละครวิทยุ, สารคดี, ข่าว และสัดส่วนเสียงพูดต่อดนตรี',
    iconName: 'Layers',
    questionCount: 3,
  },
  {
    id: 'spot-30s',
    name: '3. เทคนิคการผลิต Jingle และ Spot 30s',
    description: 'สูตรเวลา 0-30 วินาที, Hook, Core, Solution, CTA และ 3 Audio Layers',
    iconName: 'Clock',
    questionCount: 3,
  },
  {
    id: '6t-3h',
    name: '4. หลักการจัดรายการ 6T 3H',
    description: 'Time, Timing, Tone, Topic, Technique, Target และ Head, Heart, Humor',
    iconName: 'Heart',
    questionCount: 4,
  },
  {
    id: 'script-structure',
    name: '5. โครงสร้างบทและตาราง 3 ช่อง',
    description: 'ส่วนหัว Heading, ผู้ร่วมงาน Crew, เนื้อหา Content, เครดิต Credit และคิวเสียง',
    iconName: 'FileEdit',
    questionCount: 3,
  },
  {
    id: 'audio-tech',
    name: '6. คำสั่งเทคนิคเสียง & การมิกซ์',
    description: 'FI, FO, FU, FD, Crossfade, Segue, Auto-Ducking และระดับ dBFS/LUFS',
    iconName: 'Sliders',
    questionCount: 4,
  },
];

export const ALL_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'radio-vs-podcast',
    categoryName: 'วิทยุออนไลน์ vs Podcast',
    question: 'ความแตกต่างสำคัญที่สุดระหว่างวิทยุออนไลน์ (Internet Radio) กับ พอดแคสต์ (Podcast) ในด้านโครงสร้างเวลา (Pacing & Schedule) คือข้อใด?',
    scenario: 'สถานี SoundCraft ต้องการขยายกลุ่มผู้ฟัง โดยวางแผนจะผลิตคอนเทนต์ทั้งระบบสตรีมสดและพอดแคสต์ให้ตรงจริตผู้ฟัง',
    options: [
      { id: 'A', text: 'วิทยุออนไลน์ยึดผังเวลาเข้มงวดแบบ Linear/Clock Format ส่วน Podcast เป็นแบบ On-Demand ที่ผู้ฟังเลือกเวลาฟังเองได้อย่างยืดหยุ่น' },
      { id: 'B', text: 'วิทยุออนไลน์ต้องบันทึกเสียงไว้ล่วงหน้าเสมอ ส่วน Podcast ต้องสตรีมสดเท่านั้น' },
      { id: 'C', text: 'วิทยุออนไลน์ใช้ไฟล์ MP3 ขนาดเล็ก ส่วน Podcast ใช้ไฟล์วิดีโอความคมชัดสูง' },
      { id: 'D', text: 'วิทยุออนไลน์ไม่มีการเปิดเพลง ส่วน Podcast เน้นเปิดเพลงฮิตติดอันดับเป็นหลัก' },
    ],
    correctOptionId: 'A',
    explanation: 'วิทยุออนไลน์ (Internet Radio) เป็นสื่อแบบ Linear Live Streaming ที่ดำเนินตามผังเวลาจริง (Clock Format) ขณะที่ Podcast เผยแพร่ผ่าน RSS Feed ให้ผู้ฟังดาวน์โหลดหรือสตรีมฟังเมื่อใดก็ได้ตามความสะดวก (On-Demand Intimacy)',
    referenceSource: 'หลักสูตรเปรียบเทียบเชิงลึกด้านการกระจายเสียงดิจิทัล (Comparative Media Typology)',
  },
  {
    id: 'q2',
    category: 'radio-vs-podcast',
    categoryName: 'วิทยุออนไลน์ vs Podcast',
    question: 'ระดับความดังเสียงรวมมาตรฐาน (Loudness Units Full Scale: LUFS) ที่นิยมใช้ในการส่งกระจายเสียงวิทยุออนไลน์ แตกต่างจากมาตรฐาน Podcast Streaming ทั่วไปอย่างไร?',
    options: [
      { id: 'A', text: 'วิทยุมาตรฐานอยู่ที่ -18 ถึง -23 LUFS ส่วนพอดแคสต์สตรีมมิ่งมักอยู่ที่ -14 ถึง -16 LUFS' },
      { id: 'B', text: 'วิทยุมาตรฐานอยู่ที่ 0 dB ส่วนพอดแคสต์อยู่ที่ +6 dB' },
      { id: 'C', text: 'พอดแคสต์ต้องดังกว่าวิทยุ 5 เท่าเสมอ' },
      { id: 'D', text: 'ทั้งวิทยุและพอดแคสต์ต้องตั้งค่าความดังไว้ที่ -50 LUFS เท่ากัน' },
    ],
    correctOptionId: 'A',
    explanation: 'ตามมาตรฐาน EBU R128 / AES งานออกอากาศวิทยุจะรักษาระดับความดังไว้ที่ประมาณ -18 ถึง -23 LUFS เพื่อรักษาไดนามิกเสียง ส่วนแพลตฟอร์ม Podcast เช่น Spotify หรือ Apple Podcasts กำหนดไว้ที่ -14 ถึง -16 LUFS เพื่อให้เสียงมีความดังพอดีกับการฟังผ่านหูฟังในที่สาธารณะ',
    referenceSource: 'มาตรฐาน EBU R128 และเกณฑ์สากล AES TD1004',
  },
  {
    id: 'q3',
    category: 'radio-vs-podcast',
    categoryName: 'วิทยุออนไลน์ vs Podcast',
    question: 'พฤติกรรมของผู้ฟังวิทยุกระจายเสียงส่วนใหญ่ถูกจัดอยู่ในลักษณะใดเมื่อเปรียบเทียบกับผู้ฟัง Podcast?',
    options: [
      { id: 'A', text: 'Passive / Companion Listening (ฟังคลอเป็นเพื่อนร่วมทำกิจกรรม เช่น ขับรถ หรือทำงาน)' },
      { id: 'B', text: 'Active Intentional Only (จดจ่อทุกคำพูดโดยไม่ทำกิจกรรมอื่นเด็ดขาด)' },
      { id: 'C', text: 'Visual Dominant (เน้นดูภาพกราฟิกประกอบเสียงตลอดเวลา)' },
      { id: 'D', text: 'Academic Reading (ต้องอ่านตัวอักษรตามบทพูดเสมอ)' },
    ],
    correctOptionId: 'A',
    explanation: 'ผู้ฟังวิทยุส่วนใหญ่มักเปิดคลอเพื่อเป็นเพื่อน (Companion Medium) ระหว่างเดินทาง ทำงานบ้าน หรือขับรถ ในขณะที่ผู้ฟังพอดแคสต์มักมีความตั้งใจฟังเฉพาะเจาะจงในหัวข้อที่ตนเองสนใจ (Active/Intentional Listening)',
    referenceSource: 'ทฤษฎีพฤติกรรมการเสพสื่อเสียงดิจิทัล (Radio Audience Behavior)',
  },
  {
    id: 'q4',
    category: 'formats',
    categoryName: 'รูปแบบรายการวิทยุ 9 ประเภท',
    question: 'รายการประเภท "ละครวิทยุ (Radio Drama)" ได้รับการขนานนามว่าเป็น "โรงละครแห่งจินตนาการ (Theater of the Mind)" เนื่องจากเหตุผลใด?',
    scenario: 'นักศึกษากำลังร่างบทละครวิทยุสั้น 5 นาที โดยต้องออกแบบเสียงให้ผู้ฟังเห็นภาพห้องใต้หลังคาเก่า',
    options: [
      { id: 'A', text: 'เพราะใช้เพียงองค์ประกอบเสียง (คำพูด, ดนตรีบรรยายอารมณ์, SFX) ชักนำให้ผู้ฟังจินตนาการภาพสถานที่และอารมณ์ขึ้นในใจตนเอง' },
      { id: 'B', text: 'เพราะต้องมีฉายภาพสไลด์บนหน้าจอให้ผู้ฟังดูควบคู่ไปด้วย' },
      { id: 'C', text: 'เพราะผู้แสดงทุกคนต้องสวมหน้ากากละครขณะอยู่ในห้องส่ง' },
      { id: 'D', text: 'เพราะต้องจัดเวทีจริงในโรงละครและถ่ายทอดสดผ่านกล้องโทรทัศน์' },
    ],
    correctOptionId: 'A',
    explanation: 'ละครวิทยุใช้อำนาจของเสียง (Power of Sound) ทั้งบทสนทนา เสียงประกอบสมจริง (SFX/Foley) และดนตรีบรรเลง เพื่อกระตุ้นระบบประสาทการรับรู้ของผู้ฟังให้วาดภาพฉาก ตัวละคร และบรรยากาศขึ้นมาในความคิดตนเองอย่างอิสระ',
    referenceSource: 'ทฤษฎีการสื่อสารด้วยเสียงและศิลปะละครวิทยุ (Radio Drama Aesthetics)',
  },
  {
    id: 'q5',
    category: 'formats',
    categoryName: 'รูปแบบรายการวิทยุ 9 ประเภท',
    question: 'ในรายการประเภท "นิตยสารทางอากาศ (Radio Magazine)" มักมีเอกลักษณ์และโครงสร้างรายการที่โดดเด่นอย่างไร?',
    options: [
      { id: 'A', text: 'แบ่งเนื้อหาออกเป็นคอลัมน์ย่อยๆ หลากหลายหัวข้อ (เช่น สุขภาพ, แฟชั่น, เทคโนโลยี) คั่นด้วยดนตรีหรือเพลงสั้นๆ' },
      { id: 'B', text: 'มีแต่การอ่านประกาศข่าวราชการติดต่อกัน 60 นาทีโดยไม่เปิดเพลง' },
      { id: 'C', text: 'ผู้จัดรายการต้องแจกหนังสือนิตยสารกระดาษให้ผู้ฟังทางไปรษณีย์' },
      { id: 'D', text: 'ไม่มีผู้จัดรายการ ใช้คอมพิวเตอร์สุ่มเปิดเพลงอย่างเดียว' },
    ],
    correctOptionId: 'A',
    explanation: 'รายการนิตยสารทางอากาศจำลองโครงสร้างจากนิตยสารสิ่งพิมพ์ โดยมีผู้จัดหลักทำหน้าที่เป็นบรรณาธิการ ร้อยเรียงคอลัมน์สั้นๆ 3-5 นาทีหลากหลายรสชาติคั่นด้วยเพลงหรือจิงเกิลประจำคอลัมน์',
    referenceSource: 'คู่มือการผลิตรายการวิทยุกระจายเสียงรูปแบบนิตยสารทางอากาศ',
  },
  {
    id: 'q6',
    category: 'formats',
    categoryName: 'รูปแบบรายการวิทยุ 9 ประเภท',
    question: 'ในรายการประเภท "สารคดีวิทยุ (Radio Documentary)" องค์ประกอบเสียงใดที่มีความสำคัญอย่างยิ่งในการยืนยันความจริงและความน่าเชื่อถือ?',
    options: [
      { id: 'A', text: 'เสียงบันทึกเหตุการณ์จริงและเสียงสัมภาษณ์ผู้เกี่ยวข้องในพื้นที่ (Actuality Sound / Sound Bites)' },
      { id: 'B', text: 'เสียงหัวเราะสังเคราะห์จากเครื่องกดซาวด์เอฟเฟกต์ (Canned Laughter)' },
      { id: 'C', text: 'เสียงเปิดเพลงร็อกเสียงดังเพื่อกลบเสียงพูด' },
      { id: 'D', text: 'เสียงบี๊บเซ็นเซอร์ทุกๆ 10 วินาที' },
    ],
    correctOptionId: 'A',
    explanation: 'สารคดีวิทยุให้คุณค่าสูงสุดกับ "Actuality Sound" หรือเสียงบรรยากาศจริงในพื้นที่ และเสียงสัมภาษณ์ผู้ประสบเหตุการณ์ เพื่อสร้างความน่าเชื่อถือและความสมจริงเชิงประจักษ์',
    referenceSource: 'หลักการผลิตสารคดีเสียงเชิงวารสารศาสตร์ (Audio Journalism)',
  },
  {
    id: 'q7',
    category: 'spot-30s',
    categoryName: 'เทคนิคการผลิต Jingle และ Spot 30s',
    question: 'ในสูตรโครงสร้างเวลา 30 วินาทีของสปอตรณรงค์สังคม ช่วง 0-5 วินาทีแรก (The Hook) มีเป้าหมายสูงสุดคืออะไร?',
    scenario: 'สปอตรณรงค์ "หยุดโทรขณะขับรถ" กำลังออกแบบเสียงเปิดหัวรายการ 5 วินาทีแรก',
    options: [
      { id: 'A', text: 'กระตุกความสนใจทันทีด้วยเสียง SFX โดดเด่น หรือคำถามกระแทกใจ ก่อนที่ผู้ฟังจะเปลี่ยนคลื่นหรือละความสนใจ' },
      { id: 'B', text: 'อ่านรายชื่อคณะกรรมการผู้จัดทำและเบอร์โทรศัพท์ของสถานีให้ครบถ้วน' },
      { id: 'C', text: 'เปิดเพลงบรรเลงช้าๆ ปล่อยให้มีเสียงเงียบ 3 วินาทีเพื่อให้ผู้ฟังปรับอารมณ์' },
      { id: 'D', text: 'ทักทายสวัสดีตอนเช้าและถามสารทุกข์สุกดิบของผู้ฟังอย่างเป็นกันเอง' },
    ],
    correctOptionId: 'A',
    explanation: 'ธรรมชาติของผู้ฟังวิทยุจะตัดสินใจว่าจะฟังต่อหรือเปลี่ยนคลื่นภายใน 3-5 วินาทีแรก ดังนั้นสปอตที่ดีจึงต้องมี "The Hook" ที่ดึงความสนใจทันที เช่น เสียงเบรกเอี๊ยด! หรือประโยคคำถามที่กระตุกต่อมคิด ห้ามเปิดด้วยคำทักทายเยิ่นเย้อ',
    referenceSource: 'สูตรโครงสร้างการผลิตสปอตวิทยุ 30 วินาที (Commercial & PSA Production Blueprint)',
  },
  {
    id: 'q8',
    category: 'spot-30s',
    categoryName: 'เทคนิคการผลิต Jingle และ Spot 30s',
    question: 'ลำดับโครงสร้างเวลามาตรฐาน 4 ส่วน (Blueprint 0-30s) ของสปอตรณรงค์ความยาว 30 วินาที ข้อใดถูกต้องที่สุด?',
    options: [
      { id: 'A', text: '0-5s Hook (ดึงดูด) -> 6-18s Core Problem (ปัญหา) -> 19-25s Solution (ทางออก) -> 26-30s CTA & Slogan (สโลแกนตอกย้ำ)' },
      { id: 'B', text: '0-15s ขอบคุณสปอนเซอร์ -> 16-25s ทักทาย -> 26-30s บอกลา' },
      { id: 'C', text: '0-10s บรรเลงเพลง -> 11-20s เสียงเงียบ -> 21-30s เล่าเรื่องขำขัน' },
      { id: 'D', text: '0-5s บอกเบอร์โทร -> 6-25s เปิดเพลงร็อก -> 26-30s บอกชื่อคลื่น' },
    ],
    correctOptionId: 'A',
    explanation: 'สูตรมาตรฐาน 4 ขั้นตอน: 1) Hook (0-5s) ปลุกความสนใจ 2) Problem (6-18s) อธิบายปัญหา 3) Solution (19-25s) ให้ทางออก และ 4) Call to Action & Slogan (26-30s) ตอกย้ำข้อความสั้นจำง่ายพร้อมจิงเกิลส่งท้าย',
    referenceSource: 'โครงสร้างสปอตรณรงค์เพื่อสังคม (Public Service Announcement Framework)',
  },
  {
    id: 'q9',
    category: 'spot-30s',
    categoryName: 'เทคนิคการผลิต Jingle และ Spot 30s',
    question: 'ในการมิกซ์เสียง 3 ชั้น (3 Audio Layers) ของสปอตวิทยุ ข้อใดคือการกำหนดระดับความสัมพันธ์ของเสียงที่ถูกต้องตามหลักวิชาชีพ?',
    options: [
      { id: 'A', text: 'เสียงพากย์ (VO) เป็นแกนหลักชัดเจน ดนตรี (BGM) คลอเบาด้านหลังด้วย Auto-Ducking และ SFX ใส่เฉพาะจุดที่ต้องการเน้นความหมาย' },
      { id: 'B', text: 'ดนตรีต้องดังที่สุดจนกลบเสียงพากย์ เพื่อให้ผู้ฟังตื่นเต้น' },
      { id: 'C', text: 'ใส่เสียงเอฟเฟกต์ SFX ดังตลอด 30 วินาทีโดยไม่มีเสียงพากย์' },
      { id: 'D', text: 'ปรับทุกแทร็กเสียงให้ดังเท่ากันที่ 0 dBFS ตลอดทั้งชิ้นงาน' },
    ],
    correctOptionId: 'A',
    explanation: 'การจัดเลเยอร์เสียง: 1) Voiceover ต้องชัดถ้อยชัดคำ (-18 ถึง -14 dBFS) 2) Music Bed คลอรองหลังโดยถูกดักกิ้ง (-8 ถึง -12 dB) เมื่อมีเสียงพูด 3) SFX ใช้เน้นย้ำความหมายเฉพาะจุด ไม่ใส่พร่ำเพรื่อจนกลายเป็น Noise',
    referenceSource: 'เทคนิคการมิกซ์เสียงและจัดเลเยอร์ระบบเสียงออกอากาศ (Audio Layering Principles)',
  },
  {
    id: 'q10',
    category: '6t-3h',
    categoryName: 'หลักการจัดรายการ 6T 3H',
    question: 'ศัพท์เทคนิค "Hit the Post" ในการจัดรายการวิทยุสด หมายถึงทักษะและความสามารถใดของดีเจ?',
    scenario: 'ดีเจกำลังเปิดเพลงฮิตใหม่ที่มีดนตรีท่อนอินโทรยาว 14 วินาทีก่อนที่นักร้องจะร้องคำแรก',
    options: [
      { id: 'A', text: 'การพูดเกริ่นแนะนำเพลงบนดนตรีท่อน Intro แล้วหยุดพูดจบลงตรงวินาทีที่นักร้องเริ่มร้องคำแรกพอดีเป๊ะ' },
      { id: 'B', text: 'การทุบเสาไมโครโฟนเพื่อส่งสัญญาณขอเวลาเบรก' },
      { id: 'C', text: 'การโพสต์ภาพห้องส่งลงบนโซเชียลมีเดียขณะกำลังจัดรายการ' },
      { id: 'D', text: 'การตัดสัญญาณเสียงเพลงทิ้งทันทีเมื่อเพลงกำลังไพเราะ' },
    ],
    correctOptionId: 'A',
    explanation: '"Hit the Post" (หรือ Backtiming to the Vocal) คือทักษะชั้นสูงของนักจัดรายการมืออาชีพ ที่สามารถควบคุมสปีดคำพูดและกะจังหวะเวลา (Timing) ได้พอดีกับจังหวะที่เสียงร้องเริ่มขึ้นโดยไม่มีคำพูดเหลื่อมล้ำ',
    referenceSource: 'หลักการ Timing ในการจัดรายการวิทยุมืออาชีพ (Broadcasting Timing & Cadence)',
  },
  {
    id: 'q11',
    category: '6t-3h',
    categoryName: 'หลักการจัดรายการ 6T 3H',
    question: 'ภาวะ "Dead Air" ในห้องส่งวิทยุกระจายเสียงหมายถึงข้อใด และส่งผลเสียต่อสถานีอย่างไร?',
    options: [
      { id: 'A', text: 'สัญญาณออกอากาศเงียบสนิทไม่มีเสียงใดๆ เกินกว่า 3-5 วินาที ทำให้ผู้ฟังคิดว่าสถานีล่มหรือปิดเครื่องรับ' },
      { id: 'B', text: 'เครื่องปรับอากาศในห้องส่งเสียทำให้บรรยากาศร้อนอบอ้าว' },
      { id: 'C', text: 'การเปิดเพลงที่มีเนื้อหาเกี่ยวกับความตาย' },
      { id: 'D', text: 'เสียงลมหายใจของดีเจที่ดังเกินไป' },
    ],
    correctOptionId: 'A',
    explanation: 'Dead Air คือข้อผิดพลาดร้ายแรงที่สุดในงานกระจายเสียงสด เพราะหากเกิดความเงียบเกิน 3-5 วินาที ระบบตรวจจับฉุกเฉิน (Silence Sensor) จะแจ้งเตือน และผู้ฟังมีแนวโน้มจะเปลี่ยนคลื่นทันที',
    referenceSource: 'ระเบียบการควบคุมการออกอากาศและมาตรฐานการป้องกัน Dead Air',
  },
  {
    id: 'q12',
    category: '6t-3h',
    categoryName: 'หลักการจัดรายการ 6T 3H',
    question: 'ตามหลักการ "6T" ข้อใดหมายถึงการควบคุมระดับเสียง ความอบอุ่น ความสดใส ให้สอดคล้องกับช่วงเวลาของวันและธีมรายการ?',
    options: [
      { id: 'A', text: 'Tone (น้ำเสียงและอารมณ์)' },
      { id: 'B', text: 'Time (เวลาที่ได้รับมอบหมาย)' },
      { id: 'C', text: 'Topic (ประเด็นเนื้อหา)' },
      { id: 'D', text: 'Target (กลุ่มผู้ฟังเป้าหมาย)' },
    ],
    correctOptionId: 'A',
    explanation: 'Tone คือน้ำเสียงและบรรยากาศอารมณ์ที่สื่อสารออกมา เช่น ช่วงเช้าใช้น้ำเสียงกระปรี้กระเปร่าตื่นตัว ช่วงบ่ายสดใสมีพลัง และช่วงดึกใช้น้ำเสียงนุ่มนวลอบอุ่นผ่อนคลาย',
    referenceSource: 'ทฤษฎี 6T 3H สื่อสารเพื่อมวลชน (Professional On-Air Framework)',
  },
  {
    id: 'q13',
    category: '6t-3h',
    categoryName: 'หลักการจัดรายการ 6T 3H',
    question: 'แกน "3H" ในการมัดใจผู้ฟังรายการวิทยุ ประกอบด้วยคุณค่าด้านใดบ้าง?',
    options: [
      { id: 'A', text: 'Head (สาระปัญญา), Heart (อารมณ์ความรู้สึกบันดาลใจ), Humor (อารมณ์ขันและความผ่อนคลาย)' },
      { id: 'B', text: 'Hot, Heavy, Huge' },
      { id: 'C', text: 'Host, Hardware, Headphones' },
      { id: 'D', text: 'History, Health, Homework' },
    ],
    correctOptionId: 'A',
    explanation: '3H คือหลักคิดการออกแบบเนื้อหา: 1) Head ต้องให้ข้อมูลความจริงที่เป็นประโยชน์ 2) Heart สร้างความผูกพัน ซาบซึ้ง ให้กำลังใจ และ 3) Humor เติมรอยยิ้ม ความเพลิดเพลินอย่างสุภาพ ไม่ตึงเครียด',
    referenceSource: 'หลักวิชาชีพนิเทศศาสตร์กระจายเสียง 6T 3H',
  },
  {
    id: 'q14',
    category: 'script-structure',
    categoryName: 'โครงสร้างบทและตาราง 3 ช่อง',
    question: 'บทวิทยุกระจายเสียงมาตรฐานสากล แบ่งโครงสร้างหลักออกเป็นกี่ส่วน และประกอบด้วยส่วนใดบ้าง?',
    options: [
      { id: 'A', text: '4 ส่วน: ส่วนหัว (Heading), ส่วนผู้ร่วมงาน (Crew), ส่วนเนื้อหา (Content), และส่วนปิดท้าย/เครดิต (Credit)' },
      { id: 'B', text: '2 ส่วน: ส่วนคำนำ และส่วนสรุป เท่านั้น' },
      { id: 'C', text: '1 ส่วน: เขียนเป็นบทความยาวรวดเดียวโดยไม่ต้องแบ่งส่วน' },
      { id: 'D', text: '6 ส่วน: แบ่งตามวันในสัปดาห์ จันทร์ถึงเสาร์' },
    ],
    correctOptionId: 'A',
    explanation: 'โครงสร้าง 4 ส่วนมาตรฐาน: 1) Heading ระบุชื่อรายการ คลื่น วันที่ และความยาว 2) Crew ระบุโปรดิวเซอร์ ดีเจ เจ้าหน้าที่เสียง 3) Content ตารางลำดับบทพูดและคิวเสียง และ 4) Credit ระบุแหล่งข้อมูล ผู้สนับสนุน และเอกสารอ้างอิง',
    referenceSource: 'คู่มือการเขียนบทวิทยุกระจายเสียงมาตรฐาน กสทช. และสถาบันการศึกษา',
  },
  {
    id: 'q15',
    category: 'script-structure',
    categoryName: 'โครงสร้างบทและตาราง 3 ช่อง',
    question: 'ในตารางเขียนบทวิทยุ 3 ช่อง (3-Column Script) ช่องที่ 3 มักถูกกำหนดให้เป็นช่องสำหรับสิ่งใด?',
    scenario: 'นักศึกษากำลังกรอกตารางบท โดยช่อง 1 คือ เวลา/คิว (00:00 - 00:30) ช่อง 2 คือ รายละเอียดเสียง Voice/SFX/BGM',
    options: [
      { id: 'A', text: 'หมายเหตุและคำสั่งเทคนิคควบคุมเสียง (Remarks / Tech Cues เช่น FI, FO, FU, Segue)' },
      { id: 'B', text: 'เนื้อเพลงภาษาอังกฤษทั้งหมด' },
      { id: 'C', text: 'ภาพวาดการ์ตูนประกอบรายการ' },
      { id: 'D', text: 'คะแนนการสอบของนักศึกษา' },
    ],
    correctOptionId: 'A',
    explanation: 'ตาราง 3 ช่องมาตรฐาน: ช่อง 1 = เวลา/ลำดับคิว (Time/Cue), ช่อง 2 = รายละเอียดเสียงบทพูดและแหล่งกำเนิดเสียง (Audio Content / Voice / SFX), ช่อง 3 = คำสั่งเทคนิคสำหรับซาวด์เอ็นจิเนียร์ (Technical Cues/Remarks)',
    referenceSource: 'มาตรฐานตารางบทวิทยุ 3 คอลัมน์ (Standard Broadcast Script Grid)',
  },
  {
    id: 'q16',
    category: 'script-structure',
    categoryName: 'โครงสร้างบทและตาราง 3 ช่อง',
    question: 'หลักการ "เขียนเพื่อการฟัง (Writing for the Ear)" ในบทวิทยุ แตกต่างจากการเขียนบทความเพื่อการอ่านด้วยตา (Writing for the Eye) อย่างไร?',
    options: [
      { id: 'A', text: 'ต้องใช้ประโยคสั้น กระชับ ใช้ภาษาพูดที่เป็นธรรมชาติ ไม่ซับซ้อน และสร้างมโนภาพได้ยินชัดเจน' },
      { id: 'B', text: 'ต้องใช้คำศัพท์โบราณและประโยคซ้อน 5 ชั้นเพื่อให้ดูมีความรู้ลึกซึ้ง' },
      { id: 'C', text: 'ต้องเขียนเฉพาะตัวเลขสถิติอย่างเดียวโดยไม่มีคำบรรยาย' },
      { id: 'D', text: 'ต้องใช้คำย่อภาษาละตินให้มากที่สุด' },
    ],
    correctOptionId: 'A',
    explanation: 'ผู้ฟังวิทยุไม่สามารถ "อ่านย้อนหลัง" คำพูดที่ผ่านไปแล้วได้ ดังนั้นบทวิทยุต้องมีความชัดเจนในทันที (Instant Clarity) ประโยคตรงไปตรงมา และใช้ภาษาพูดที่อบอุ่นเป็นธรรมชาติ',
    referenceSource: 'ศิลปะการเขียนบทเพื่อสื่อโสตทัศน์ (Writing for Broadcast Media)',
  },
  {
    id: 'q17',
    category: 'audio-tech',
    categoryName: 'คำสั่งเทคนิคเสียง & การมิกซ์',
    question: 'คำสั่งเทคนิคเสียง "FI (Fade In)" และ "FO (Fade Out)" ในบทวิทยุหมายถึงการทำงานลักษณะใดตามลำดับ?',
    options: [
      { id: 'A', text: 'ค่อยๆ เร่งเสียงขึ้นจากความเงียบจนดังปกติ (FI) และ ค่อยๆ หรี่เสียงลงจนเงียบสนิท (FO)' },
      { id: 'B', text: 'ปิดไมค์ทันที (FI) และ เปิดเพลงเร็วขึ้น 2 เท่า (FO)' },
      { id: 'C', text: 'เปิดเสียงหวูดเตือนภัย (FI) และ ปิดระบบส่งสัญญาณ (FO)' },
      { id: 'D', text: 'เปลี่ยนเป็นเพลงช้า (FI) และ สลับเสียงเป็นภาษาอังกฤษ (FO)' },
    ],
    correctOptionId: 'A',
    explanation: 'Fade In (FI) คือการค่อยๆ ดึงระดับเสียงขึ้นอย่างราบรื่นจาก 0 dB ส่วน Fade Out (FO) คือการค่อยๆ ผ่อนระดับเสียงลงจนเงียบสนิท นิยมใช้เปิด-ปิดเบรกหรือจบเพลง',
    referenceSource: 'พจนานุกรมศัพท์เทคนิคการกระจายเสียงสากล (NAB Broadcast Glossary)',
  },
  {
    id: 'q18',
    category: 'audio-tech',
    categoryName: 'คำสั่งเทคนิคเสียง & การมิกซ์',
    question: 'คำสั่งเทคนิค "FU (Fade Under)" หมายถึงการควบคุมเสียงในสถานการณ์ใด?',
    options: [
      { id: 'A', text: 'หรี่ระดับเสียงดนตรีหรือเอฟเฟกต์ลงไปคลออยู่เบื้องหลัง เพื่อให้ได้ยินเสียงพูดของผู้จัดรายการอย่างชัดเจน' },
      { id: 'B', text: 'ปิดเสียงทุกแทร็กทันทีเมื่อมีสายโทรศัพท์เข้า' },
      { id: 'C', text: 'เร่งเสียงเบสให้ดังทะลุลำโพง' },
      { id: 'D', text: 'ลบไฟล์เสียงทิ้งออกจากฮาร์ดดิสก์' },
    ],
    correctOptionId: 'A',
    explanation: 'Fade Under (FU) คือการลดระดับเสียง BGM ลงไปอยู่ใต้ระดับเสียงพูด โดยยังคงเปิดคลอต่อเนื่องเพื่อให้รายการมีบรรยากาศและจังหวะที่ไม่แห้งแล้ง',
    referenceSource: 'คำสั่งเทคนิคเสียงในห้องควบคุมการกระจายเสียง (Audio Console Directives)',
  },
  {
    id: 'q19',
    category: 'audio-tech',
    categoryName: 'คำสั่งเทคนิคเสียง & การมิกซ์',
    question: 'ความแตกต่างระหว่างเทคนิค "Crossfade" กับ "Segue" ในการต่อเพลงออกอากาศคือข้อใด?',
    options: [
      { id: 'A', text: 'Crossfade คือเพลงเก่าค่อยๆ เบาลงพร้อมกับเพลงใหม่ค่อยๆ ดังขึ้นซ้อนทับกัน ส่วน Segue คือเพลงใหม่เริ่มเล่นต่อท้ายเพลงเก่าทันทีโดยไม่มีเสียงซ้อนทับและไม่มีช่องว่าง' },
      { id: 'B', text: 'Crossfade ใช้เฉพาะเพลงช้า ส่วน Segue ใช้เฉพาะเพลงสากล' },
      { id: 'C', text: 'Crossfade ทำให้เกิด Dead Air ส่วน Segue ตัดเสียงไมโครโฟน' },
      { id: 'D', text: 'ทั้งสองคำมีความหมายเดียวกันทุกประการ' },
    ],
    correctOptionId: 'A',
    explanation: 'Crossfade เป็นการผสมผสานเสียง 2 แหล่งให้เหลื่อมซ้อนทับกัน (Overlapping Transition) ส่วน Segue (ออกเสียงว่า เซก-เวย์) คือการตัดต่อเสียงแบบชนหัวชนท้าย (Butt-cut / Direct Continuity) โดยไม่มีความเงียบและไม่มีการซ้อนทับเสียง',
    referenceSource: 'ทฤษฎีการตัดต่อและการเปลี่ยนฉากเสียง (Audio Transitions & Editing)',
  },
  {
    id: 'q20',
    category: 'audio-tech',
    categoryName: 'คำสั่งเทคนิคเสียง & การมิกซ์',
    question: 'ในการมอนิเตอร์ระดับเสียงสัญญาณดิจิทัล (Digital Peak Meter) ระดับเสียงพูดของผู้ดำเนินรายการ (Voiceover) ควรควบคุมให้อยู่ในช่วงใดเพื่อป้องกันเสียงแตกพร่า (Digital Clipping)?',
    options: [
      { id: 'A', text: 'ระดับ Nominal -18 ถึง -14 dBFS และยอดเสียงพีก (Peak) ไม่เกิน -6 ถึง -3 dBFS' },
      { id: 'B', text: 'ให้เข็มแตะไฟสีแดงเกิน +10 dBFS ตลอดเวลาเพื่อให้เสียงดังกังวาน' },
      { id: 'C', text: 'กดให้อยู่ต่ำกว่า -60 dBFS เพื่อไม่ให้ผู้ฟังตกใจ' },
      { id: 'D', text: 'ให้แตะ 0 dBFS พอดีเป๊ะทุกวินาที' },
    ],
    correctOptionId: 'A',
    explanation: 'ในระบบดิจิทัล 0 dBFS คือขีดจำกัดสูงสุด (Ceiling) หากสัญญาณเกินจะเกิดการตัดยอดคลื่น (Clipping Distortion) ที่ทำให้เสียงแตกพร่าทันที ดังนั้นจึงต้องรักษาระดับพูดปกติไว้ที่ -18 ถึง -14 dBFS และเหลือ Headroom สำหรับพีกเสียงไว้ -6 ถึง -3 dBFS',
    referenceSource: 'คู่มือวิศวกรรมเสียงดิจิทัลและการตั้งเกนไมโครโฟน (Audio Gain Staging)',
  },
];

export interface QuizResultSummary {
  totalQuestions: number;
  correctCount: number;
  scorePercentage: number;
  gradeTitle: string;
  gradeDescription: string;
  badgeLevel: 'master' | 'professional' | 'trainee' | 'practice';
  passed: boolean;
  categoryScores: {
    category: string;
    categoryName: string;
    total: number;
    correct: number;
    percentage: number;
  }[];
  completedAt: string;
  certificateId: string;
}

export function evaluateQuizResult(
  userAnswers: { [questionId: string]: string },
  questions: QuizQuestion[]
): QuizResultSummary {
  let correctCount = 0;
  const categoryMap: { [cat: string]: { total: number; correct: number; name: string } } = {};

  questions.forEach((q) => {
    if (!categoryMap[q.category]) {
      categoryMap[q.category] = { total: 0, correct: 0, name: q.categoryName };
    }
    categoryMap[q.category].total += 1;

    const chosen = userAnswers[q.id];
    if (chosen && chosen === q.correctOptionId) {
      correctCount += 1;
      categoryMap[q.category].correct += 1;
    }
  });

  const totalQuestions = questions.length;
  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

  let gradeTitle = '';
  let gradeDescription = '';
  let badgeLevel: 'master' | 'professional' | 'trainee' | 'practice' = 'practice';
  let passed = false;

  if (scorePercentage >= 90) {
    gradeTitle = 'ยอดเยี่ยม (Master Broadcaster)';
    gradeDescription = 'ท่านมีความรอบรู้เชิงทฤษฎีและทักษะปฏิบัติการวิทยุกระจายเสียงในระดับดีเยี่ยม พร้อมสำหรับการเป็นโปรดิวเซอร์และนักเขียนบทมืออาชีพ!';
    badgeLevel = 'master';
    passed = true;
  } else if (scorePercentage >= 75) {
    gradeTitle = 'ผ่านเกณฑ์มาตรฐาน (Professional Producer)';
    gradeDescription = 'ท่านเข้าใจหลักการผลิตสื่อเสียง โครงสร้างบท และเทคนิคการจัดรายการตามมาตรฐานสากลเป็นอย่างดี';
    badgeLevel = 'professional';
    passed = true;
  } else if (scorePercentage >= 60) {
    gradeTitle = 'ผ่านเกณฑ์ขั้นต้น (Broadcasting Trainee)';
    gradeDescription = 'ท่านมีความรู้พื้นฐานเพียงพอในการปฏิบัติงานเบื้องต้น แนะนำให้ทบทวนเพิ่มเติมในหมวดเทคนิคเสียงและสูตรเวลาสปอต';
    badgeLevel = 'trainee';
    passed = true;
  } else {
    gradeTitle = 'ต้องฝึกฝนเพิ่มเติม (Needs Review)';
    gradeDescription = 'คะแนนยังไม่ผ่านเกณฑ์มาตรฐาน 60% แนะนำให้กลับไปศึกษาใน "คลังความรู้การจัดรายการ" แล้วกลับมาทดสอบใหม่อีกครั้ง';
    badgeLevel = 'practice';
    passed = false;
  }

  const categoryScores = Object.entries(categoryMap).map(([catKey, data]) => ({
    category: catKey,
    categoryName: data.name,
    total: data.total,
    correct: data.correct,
    percentage: Math.round((data.correct / data.total) * 100),
  }));

  const now = new Date();
  const dateStr = now.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
  const certificateId = `SCS-CERT-${now.getFullYear()}-${randomSuffix}`;

  return {
    totalQuestions,
    correctCount,
    scorePercentage,
    gradeTitle,
    gradeDescription,
    badgeLevel,
    passed,
    categoryScores,
    completedAt: dateStr,
    certificateId,
  };
}
