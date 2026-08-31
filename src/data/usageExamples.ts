import type { VocabularySeedItem } from "../types";
import { CURATED_USAGE_EXAMPLES } from "./curatedUsageExamples.ts";

export type UsageExample = {
  exampleEn: string;
  exampleJa: string;
};

type ExampleSource = Pick<
  VocabularySeedItem,
  "definitionEn" | "exampleEn" | "exampleJa" | "itemType" | "meaningJa" | "pos" | "term"
>;

const FUNCTION_WORD_EXAMPLES: Record<string, UsageExample> = {
  the: {
    exampleEn: "I read the note before class.",
    exampleJa: "授業の前にそのメモを読みました。"
  },
  a: {
    exampleEn: "I need a minute to check this.",
    exampleJa: "これを確認するのに1分必要です。"
  },
  and: {
    exampleEn: "She opened the file and checked the name.",
    exampleJa: "彼女はファイルを開き、名前を確認しました。"
  },
  of: {
    exampleEn: "The end of the story was surprising.",
    exampleJa: "その話の結末は驚くものでした。"
  },
  to: {
    exampleEn: "We walked to the station together.",
    exampleJa: "私たちは一緒に駅へ歩きました。"
  },
  in: {
    exampleEn: "The keys are in the drawer.",
    exampleJa: "鍵は引き出しの中にあります。"
  },
  it: {
    exampleEn: "It looks better than before.",
    exampleJa: "それは以前よりよく見えます。"
  },
  you: {
    exampleEn: "You can start whenever you are ready.",
    exampleJa: "準備ができたらいつでも始められます。"
  },
  he: {
    exampleEn: "He answered the question clearly.",
    exampleJa: "彼はその質問にはっきり答えました。"
  },
  for: {
    exampleEn: "This message is for your team.",
    exampleJa: "このメッセージはあなたのチーム宛てです。"
  },
  they: {
    exampleEn: "They arrived before the meeting started.",
    exampleJa: "彼らは会議が始まる前に到着しました。"
  },
  we: {
    exampleEn: "We need more time to decide.",
    exampleJa: "私たちは決めるためにもう少し時間が必要です。"
  },
  on: {
    exampleEn: "The report is on the desk.",
    exampleJa: "報告書は机の上にあります。"
  },
  with: {
    exampleEn: "I went with my friend.",
    exampleJa: "私は友人と一緒に行きました。"
  },
  i: {
    exampleEn: "I forgot to bring my notebook.",
    exampleJa: "私はノートを持ってくるのを忘れました。"
  },
  as: {
    exampleEn: "Use this room as a quiet study space.",
    exampleJa: "この部屋を静かな学習スペースとして使ってください。"
  },
  at: {
    exampleEn: "Let's meet at the main entrance.",
    exampleJa: "正面入口で会いましょう。"
  },
  she: {
    exampleEn: "She sent the email this morning.",
    exampleJa: "彼女は今朝そのメールを送りました。"
  },
  but: {
    exampleEn: "I wanted to go, but I was too busy.",
    exampleJa: "行きたかったのですが、忙しすぎました。"
  },
  from: {
    exampleEn: "This train goes from Tokyo to Kyoto.",
    exampleJa: "この電車は東京から京都へ行きます。"
  },
  by: {
    exampleEn: "The cafe is by the station.",
    exampleJa: "そのカフェは駅の近くにあります。"
  },
  or: {
    exampleEn: "You can call me today or tomorrow.",
    exampleJa: "今日か明日に私へ電話できます。"
  },
  all: {
    exampleEn: "All students must submit the form.",
    exampleJa: "すべての学生はその用紙を提出しなければなりません。"
  },
  if: {
    exampleEn: "If it rains, we will meet inside.",
    exampleJa: "雨が降れば、私たちは屋内で会います。"
  },
  about: {
    exampleEn: "We talked about the new schedule.",
    exampleJa: "私たちは新しい予定について話しました。"
  },
  which: {
    exampleEn: "Which answer seems correct?",
    exampleJa: "どちらの答えが正しそうですか。"
  },
  who: {
    exampleEn: "Who left this message?",
    exampleJa: "誰がこのメッセージを残しましたか。"
  },
  what: {
    exampleEn: "What do you want to review first?",
    exampleJa: "最初に何を復習したいですか。"
  },
  because: {
    exampleEn: "I stayed home because I felt tired.",
    exampleJa: "疲れていたので家にいました。"
  },
  than: {
    exampleEn: "This route is faster than the other one.",
    exampleJa: "この経路はもう一方より速いです。"
  },
  into: {
    exampleEn: "She put the receipt into her bag.",
    exampleJa: "彼女はレシートをバッグの中に入れました。"
  },
  first: {
    exampleEn: "First, check the title.",
    exampleJa: "まず、タイトルを確認してください。"
  },
  over: {
    exampleEn: "The lamp hangs over the table.",
    exampleJa: "ランプはテーブルの上に掛かっています。"
  },
  any: {
    exampleEn: "Do you have any questions?",
    exampleJa: "何か質問はありますか。"
  },
  after: {
    exampleEn: "We can talk after lunch.",
    exampleJa: "昼食の後で話せます。"
  },
  many: {
    exampleEn: "Many people use this phrase.",
    exampleJa: "多くの人がこの表現を使います。"
  },
  last: {
    exampleEn: "The last train leaves at midnight.",
    exampleJa: "終電は真夜中に出ます。"
  },
  before: {
    exampleEn: "Please check the room before you leave.",
    exampleJa: "出る前に部屋を確認してください。"
  },
  through: {
    exampleEn: "We walked through the park.",
    exampleJa: "私たちは公園を通り抜けました。"
  },
  between: {
    exampleEn: "The office is between the bank and the hotel.",
    exampleJa: "そのオフィスは銀行とホテルの間にあります。"
  },
  both: {
    exampleEn: "Both answers are possible.",
    exampleJa: "両方の答えが可能です。"
  },
  own: {
    exampleEn: "She made her own decision.",
    exampleJa: "彼女は自分自身の判断をしました。"
  },
  something: {
    exampleEn: "I need something warm to drink.",
    exampleJa: "何か温かい飲み物が必要です。"
  },
  another: {
    exampleEn: "Let's try another example.",
    exampleJa: "別の例を試してみましょう。"
  },
  next: {
    exampleEn: "The next bus comes in ten minutes.",
    exampleJa: "次のバスは10分後に来ます。"
  },
  while: {
    exampleEn: "I listened while she explained the rule.",
    exampleJa: "彼女が規則を説明している間、私は聞いていました。"
  },
  around: {
    exampleEn: "We walked around the campus.",
    exampleJa: "私たちはキャンパスの周りを歩きました。"
  },
  every: {
    exampleEn: "Every answer needs a reason.",
    exampleJa: "すべての答えには理由が必要です。"
  },
  during: {
    exampleEn: "Please stay quiet during the test.",
    exampleJa: "テスト中は静かにしてください。"
  },
  since: {
    exampleEn: "Since it is late, we should leave now.",
    exampleJa: "もう遅いので、今出るべきです。"
  },
  under: {
    exampleEn: "The notebook is under the chair.",
    exampleJa: "ノートは椅子の下にあります。"
  },
  few: {
    exampleEn: "A few students stayed after class.",
    exampleJa: "数人の学生が授業後に残りました。"
  },
  without: {
    exampleEn: "She finished the task without help.",
    exampleJa: "彼女は助けなしでその作業を終えました。"
  },
  against: {
    exampleEn: "The ladder is against the wall.",
    exampleJa: "はしごは壁に立てかけてあります。"
  },
  second: {
    exampleEn: "This is my second visit to the office.",
    exampleJa: "これは私のそのオフィスへの2回目の訪問です。"
  },
  though: {
    exampleEn: "It was late, though the room was still busy.",
    exampleJa: "遅い時間でしたが、その部屋はまだ混んでいました。"
  },
  yes: {
    exampleEn: "Yes, that time works for me.",
    exampleJa: "はい、その時間で大丈夫です。"
  },
  until: {
    exampleEn: "We waited until the rain stopped.",
    exampleJa: "私たちは雨が止むまで待ちました。"
  },
  whether: {
    exampleEn: "I don't know whether he will join us.",
    exampleJa: "彼が参加するかどうか分かりません。"
  },
  although: {
    exampleEn: "Although it was cold, we kept walking.",
    exampleJa: "寒かったけれど、私たちは歩き続けました。"
  },
  least: {
    exampleEn: "Choose the least expensive option.",
    exampleJa: "最も安い選択肢を選んでください。"
  },
  within: {
    exampleEn: "Please reply within three days.",
    exampleJa: "3日以内に返信してください。"
  },
  anything: {
    exampleEn: "You can ask me anything about the plan.",
    exampleJa: "その計画について何でも私に聞けます。"
  },
  past: {
    exampleEn: "We drove past the station.",
    exampleJa: "私たちは駅を通り過ぎました。"
  },
  nothing: {
    exampleEn: "Nothing changed after the meeting.",
    exampleJa: "会議の後、何も変わりませんでした。"
  },
  half: {
    exampleEn: "Half the class finished early.",
    exampleJa: "クラスの半分が早く終えました。"
  },
  per: {
    exampleEn: "The room costs fifty dollars per night.",
    exampleJa: "その部屋は1泊50ドルです。"
  },
  among: {
    exampleEn: "She was among the first to arrive.",
    exampleJa: "彼女は最初に到着した人たちの一人でした。"
  },
  across: {
    exampleEn: "The store is across the street.",
    exampleJa: "その店は通りの向こう側にあります。"
  },
  along: {
    exampleEn: "We walked along the river.",
    exampleJa: "私たちは川沿いを歩きました。"
  },
  toward: {
    exampleEn: "He walked toward the exit.",
    exampleJa: "彼は出口の方へ歩きました。"
  },
  everything: {
    exampleEn: "Everything is ready for the lesson.",
    exampleJa: "授業の準備はすべて整っています。"
  },
  near: {
    exampleEn: "Our table is near the window.",
    exampleJa: "私たちの席は窓の近くです。"
  },
  someone: {
    exampleEn: "Someone left a message for you.",
    exampleJa: "誰かがあなたに伝言を残しました。"
  },
  above: {
    exampleEn: "The clock is above the door.",
    exampleJa: "時計はドアの上にあります。"
  },
  himself: {
    exampleEn: "He introduced himself to the class.",
    exampleJa: "彼はクラスに自己紹介しました。"
  },
  themselves: {
    exampleEn: "They prepared the room themselves.",
    exampleJa: "彼らは自分たちで部屋を準備しました。"
  },
  behind: {
    exampleEn: "The parking lot is behind the building.",
    exampleJa: "駐車場は建物の後ろにあります。"
  },
  itself: {
    exampleEn: "The system fixed itself overnight.",
    exampleJa: "そのシステムは一晩で自然に直りました。"
  },
  upon: {
    exampleEn: "The decision depends upon the results.",
    exampleJa: "その決定は結果次第です。"
  },
  former: {
    exampleEn: "Her former teacher visited the school.",
    exampleJa: "彼女の以前の先生が学校を訪れました。"
  },
  everyone: {
    exampleEn: "Everyone needs to sign the list.",
    exampleJa: "全員がその名簿に署名する必要があります。"
  },
  inside: {
    exampleEn: "Please wait inside the building.",
    exampleJa: "建物の中で待ってください。"
  },
  myself: {
    exampleEn: "I made the schedule myself.",
    exampleJa: "私は自分で予定を作りました。"
  },
  whatever: {
    exampleEn: "Choose whatever feels easiest.",
    exampleJa: "一番簡単に感じるものを何でも選んでください。"
  },
  anyone: {
    exampleEn: "Anyone can join the review session.",
    exampleJa: "誰でも復習会に参加できます。"
  },
  below: {
    exampleEn: "Write your name below the title.",
    exampleJa: "題名の下に名前を書いてください。"
  },
  despite: {
    exampleEn: "Despite the delay, we finished on time.",
    exampleJa: "遅れにもかかわらず、私たちは時間通りに終えました。"
  },
  yourself: {
    exampleEn: "Please introduce yourself briefly.",
    exampleJa: "簡単に自己紹介してください。"
  },
  beyond: {
    exampleEn: "The answer is beyond my knowledge.",
    exampleJa: "その答えは私の知識を超えています。"
  },
  except: {
    exampleEn: "Everyone came except Ken.",
    exampleJa: "ケン以外は全員来ました。"
  },
  throughout: {
    exampleEn: "The rule applies throughout the course.",
    exampleJa: "その規則はコース全体に適用されます。"
  },
  everybody: {
    exampleEn: "Everybody understood the example.",
    exampleJa: "全員がその例を理解しました。"
  },
  mine: {
    exampleEn: "That notebook is mine.",
    exampleJa: "そのノートは私のものです。"
  },
  nor: {
    exampleEn: "She did not call, nor did she send a message.",
    exampleJa: "彼女は電話もせず、メッセージも送りませんでした。"
  },
  yeah: {
    exampleEn: "Yeah, I can help with that.",
    exampleJa: "うん、それは手伝えます。"
  },
  somebody: {
    exampleEn: "Somebody opened the window.",
    exampleJa: "誰かが窓を開けました。"
  },
  welcome: {
    exampleEn: "Welcome to our study group.",
    exampleJa: "私たちの勉強会へようこそ。"
  },
  herself: {
    exampleEn: "She checked the answer herself.",
    exampleJa: "彼女は自分で答えを確認しました。"
  },
  unless: {
    exampleEn: "We will go unless it rains.",
    exampleJa: "雨が降らない限り、私たちは行きます。"
  },
  none: {
    exampleEn: "None of the answers were correct.",
    exampleJa: "答えはどれも正しくありませんでした。"
  },
  nobody: {
    exampleEn: "Nobody knew the exact reason.",
    exampleJa: "誰も正確な理由を知りませんでした。"
  },
  plus: {
    exampleEn: "The fee is twenty dollars plus tax.",
    exampleJa: "料金は20ドルに税金が加わります。"
  },
  whereas: {
    exampleEn: "This task is simple, whereas that one is complex.",
    exampleJa: "この作業は簡単ですが、あちらは複雑です。"
  },
  onto: {
    exampleEn: "Move the file onto the desktop.",
    exampleJa: "そのファイルをデスクトップ上へ移してください。"
  },
  anybody: {
    exampleEn: "Anybody can make a mistake.",
    exampleJa: "誰でも間違えることがあります。"
  },
  till: {
    exampleEn: "The library is open till nine.",
    exampleJa: "図書館は9時まで開いています。"
  },
  ourselves: {
    exampleEn: "We cleaned the room ourselves.",
    exampleJa: "私たちは自分たちで部屋を掃除しました。"
  },
  latter: {
    exampleEn: "I prefer the latter option.",
    exampleJa: "私は後者の選択肢の方が好きです。"
  },
  via: {
    exampleEn: "I sent the file via email.",
    exampleJa: "私はメール経由でそのファイルを送りました。"
  },
  unlike: {
    exampleEn: "Unlike yesterday, the train was quiet.",
    exampleJa: "昨日とは違って、電車は静かでした。"
  },
  hi: {
    exampleEn: "Hi, do you have a minute?",
    exampleJa: "こんにちは、少し時間はありますか。"
  },
  beside: {
    exampleEn: "The chair is beside the desk.",
    exampleJa: "椅子は机のそばにあります。"
  },
  beneath: {
    exampleEn: "The old box was beneath the table.",
    exampleJa: "古い箱はテーブルの下にありました。"
  },
  versus: {
    exampleEn: "The chart compares cost versus speed.",
    exampleJa: "その表は費用と速度を比較しています。"
  },
  whilst: {
    exampleEn: "Please wait here whilst I check the list.",
    exampleJa: "私が名簿を確認する間、ここで待ってください。"
  },
  damn: {
    exampleEn: "Damn, I forgot the file.",
    exampleJa: "くそ、ファイルを忘れました。"
  },
  alongside: {
    exampleEn: "She worked alongside the new staff.",
    exampleJa: "彼女は新しいスタッフと並んで働きました。"
  },
  hello: {
    exampleEn: "Hello, my name is Saki.",
    exampleJa: "こんにちは、私の名前はサキです。"
  },
  be: {
    exampleEn: "Please be careful on your way home.",
    exampleJa: "帰り道は気をつけてください。"
  },
  have: {
    exampleEn: "I have a meeting after lunch.",
    exampleJa: "昼食後に会議があります。"
  },
  do: {
    exampleEn: "Please do your homework before dinner.",
    exampleJa: "夕食前に宿題をしてください。"
  },
  go: {
    exampleEn: "We go to the library every Friday.",
    exampleJa: "私たちは毎週金曜日に図書館へ行きます。"
  },
  get: {
    exampleEn: "I will get the results tomorrow.",
    exampleJa: "明日その結果を受け取ります。"
  },
  make: {
    exampleEn: "She will make a new schedule tonight.",
    exampleJa: "彼女は今夜、新しい予定を作ります。"
  },
  take: {
    exampleEn: "Please take this seat.",
    exampleJa: "この席に座ってください。"
  },
  decide: {
    exampleEn: "I need to decide on a time for tomorrow.",
    exampleJa: "明日の時間を決める必要があります。"
  },
  altogether: {
    exampleEn: "We spent twenty dollars altogether at the cafe.",
    exampleJa: "そのカフェで全部で20ドル使いました。"
  },
  matter: {
    exampleEn: "What's the matter? You look worried.",
    exampleJa: "どうしたのですか。心配そうに見えます。"
  },
  main: {
    exampleEn: "The main entrance is next to the cafe.",
    exampleJa: "正面入口はカフェの隣にあります。"
  },
  save: {
    exampleEn: "I save a little money every week.",
    exampleJa: "私は毎週少しずつお金を貯めています。"
  },
  evening: {
    exampleEn: "I usually take a walk in the evening.",
    exampleJa: "私はたいてい夕方に散歩します。"
  },
  beautiful: {
    exampleEn: "The sky was beautiful after the rain stopped.",
    exampleJa: "雨が止んだ後、空が美しかったです。"
  },
  disease: {
    exampleEn: "Regular sleep can help lower the risk of disease.",
    exampleJa: "規則正しい睡眠は病気のリスクを下げる助けになります。"
  },
  block: {
    exampleEn: "The grocery store is one block from my apartment.",
    exampleJa: "食料品店は私のアパートから1ブロック先にあります。"
  },
  consumer: {
    exampleEn: "A consumer should compare prices before buying online.",
    exampleJa: "消費者はオンラインで買う前に価格を比べるべきです。"
  },
  waste: {
    exampleEn: "Don't waste food if you can save it for tomorrow.",
    exampleJa: "明日に取っておけるなら、食べ物を無駄にしないでください。"
  },
  vary: {
    exampleEn: "Prices vary by store, so I check two places.",
    exampleJa: "価格は店によって変わるので、私は2か所確認します。"
  },
  capacity: {
    exampleEn: "The room has a capacity of twenty people.",
    exampleJa: "その部屋の定員は20人です。"
  },
  narrow: {
    exampleEn: "The street is narrow, so cars move slowly.",
    exampleJa: "その道は狭いので、車はゆっくり進みます。"
  },
  thin: {
    exampleEn: "I wore a thin jacket because the weather was mild.",
    exampleJa: "天気が穏やかだったので、薄い上着を着ました。"
  },
  accompany: {
    exampleEn: "I will accompany my grandmother to the clinic.",
    exampleJa: "祖母に付き添ってクリニックへ行きます。"
  },
  install: {
    exampleEn: "I need to install the app before tomorrow's class.",
    exampleJa: "明日の授業までにそのアプリをインストールする必要があります。"
  },
  retail: {
    exampleEn: "Retail prices are usually higher than wholesale prices.",
    exampleJa: "小売価格はたいてい卸売価格より高いです。"
  },
  height: {
    exampleEn: "Please write your height on the health form.",
    exampleJa: "健康診断の用紙に身長を書いてください。"
  },
  blind: {
    exampleEn: "The blind student uses audio books in class.",
    exampleJa: "その目の見えない学生は授業で音声の本を使います。"
  },
  charm: {
    exampleEn: "The small cafe has a quiet charm.",
    exampleJa: "その小さなカフェには静かな魅力があります。"
  },
  equation: {
    exampleEn: "I solved the equation before dinner.",
    exampleJa: "夕食前にその方程式を解きました。"
  },
  amendment: {
    exampleEn: "The landlord sent an amendment to the rental contract.",
    exampleJa: "大家さんが賃貸契約の修正条項を送ってきました。"
  },
  supplement: {
    exampleEn: "I take a vitamin supplement with breakfast.",
    exampleJa: "朝食と一緒にビタミンのサプリメントを飲みます。"
  },
  accountability: {
    exampleEn: "Clear accountability helps everyone know who owns the task.",
    exampleJa: "責任の所在が明確だと、誰がその作業を担当するのか全員が分かります。"
  },
  ambiguous: {
    exampleEn: "The message was ambiguous, so I asked what she meant.",
    exampleJa: "そのメッセージは曖昧だったので、彼女が何を言いたいのか尋ねました。"
  },
  availability: {
    exampleEn: "Please send me your availability for next week.",
    exampleJa: "来週の都合がいい時間を送ってください。"
  },
  clarification: {
    exampleEn: "I asked for clarification before I signed the form.",
    exampleJa: "用紙に署名する前に、説明を求めました。"
  },
  compliance: {
    exampleEn: "The new rule helps with compliance at work.",
    exampleJa: "新しい規則は職場での法令遵守に役立ちます。"
  },
  consent: {
    exampleEn: "You need consent before sharing someone's photo.",
    exampleJa: "誰かの写真を共有する前には同意が必要です。"
  },
  deadline: {
    exampleEn: "I put the deadline on my calendar right away.",
    exampleJa: "締め切りをすぐにカレンダーに入れました。"
  },
  eligibility: {
    exampleEn: "Check your eligibility before you apply.",
    exampleJa: "申し込む前に、資格があるか確認してください。"
  },
  feasible: {
    exampleEn: "A ten-minute review every morning feels feasible.",
    exampleJa: "毎朝10分の復習なら現実的にできそうです。"
  },
  hesitant: {
    exampleEn: "She sounded hesitant when I invited her to dinner.",
    exampleJa: "夕食に誘った時、彼女はためらっているように聞こえました。"
  },
  inconvenient: {
    exampleEn: "That time is inconvenient, but Friday works for me.",
    exampleJa: "その時間は都合が悪いですが、金曜日なら大丈夫です。"
  },
  mandatory: {
    exampleEn: "The safety training is mandatory for new staff.",
    exampleJa: "安全研修は新しいスタッフに必須です。"
  },
  misconception: {
    exampleEn: "A common misconception is that you need perfect grammar to speak.",
    exampleJa: "よくある誤解は、話すには完璧な文法が必要だということです。"
  },
  prerequisite: {
    exampleEn: "A reservation is a prerequisite for that workshop.",
    exampleJa: "そのワークショップには予約が前提条件です。"
  },
  refund: {
    exampleEn: "I asked for a refund after the app charged me twice.",
    exampleJa: "アプリに二重請求された後、返金を求めました。"
  },
  reluctant: {
    exampleEn: "I was reluctant to call so late at night.",
    exampleJa: "そんなに夜遅く電話するのは気が進みませんでした。"
  },
  reservation: {
    exampleEn: "I changed the reservation to seven o'clock.",
    exampleJa: "予約を7時に変更しました。"
  },
  straightforward: {
    exampleEn: "The instructions were straightforward, so I finished quickly.",
    exampleJa: "説明が分かりやすかったので、すぐに終わりました。"
  },
  subscription: {
    exampleEn: "I canceled the subscription before the free trial ended.",
    exampleJa: "無料体験が終わる前にサブスクリプションを解約しました。"
  },
  tentative: {
    exampleEn: "We made a tentative plan to meet on Sunday.",
    exampleJa: "日曜日に会う仮の予定を立てました。"
  },
  transparent: {
    exampleEn: "The price should be transparent before people sign up.",
    exampleJa: "申し込む前に、料金は分かりやすく示されるべきです。"
  },
  acknowledgment: {
    exampleEn: "I sent a quick acknowledgment after receiving the email.",
    exampleJa: "メールを受け取った後、短い受領確認を送りました。"
  },
  discrepancy: {
    exampleEn: "There was a discrepancy between the receipt and my bank app.",
    exampleJa: "レシートと銀行アプリの表示に食い違いがありました。"
  },
  drawback: {
    exampleEn: "The main drawback is that the bus stops running early.",
    exampleJa: "主な欠点は、バスが早い時間に終わることです。"
  },
  flexibility: {
    exampleEn: "This job gives me more flexibility in the morning.",
    exampleJa: "この仕事は朝の時間により融通が利きます。"
  },
  misunderstanding: {
    exampleEn: "We cleared up the misunderstanding over coffee.",
    exampleJa: "コーヒーを飲みながら、その誤解を解きました。"
  },
  reimbursement: {
    exampleEn: "Keep the receipt if you want reimbursement.",
    exampleJa: "経費の払い戻しを受けたいなら、レシートを保管してください。"
  },
  reliability: {
    exampleEn: "Reliability matters when I choose a phone plan.",
    exampleJa: "携帯プランを選ぶ時は信頼性が重要です。"
  },
  scenario: {
    exampleEn: "In this scenario, we should leave ten minutes earlier.",
    exampleJa: "この想定状況では、10分早く出るべきです。"
  },
  valid: {
    exampleEn: "Your ticket is still valid until midnight.",
    exampleJa: "あなたのチケットは真夜中までまだ有効です。"
  },
  overwhelmed: {
    exampleEn: "I felt overwhelmed after three meetings in a row.",
    exampleJa: "会議が3つ続いた後、手いっぱいに感じました。"
  },
  awkward: {
    exampleEn: "The silence felt awkward after I forgot his name.",
    exampleJa: "彼の名前を忘れた後、その沈黙は気まずく感じました。"
  },
  frustrated: {
    exampleEn: "I felt frustrated when the train was late again.",
    exampleJa: "電車がまた遅れて、いら立ちました。"
  },
  convenient: {
    exampleEn: "This location is convenient because it is near the station.",
    exampleJa: "ここは駅に近いので便利です。"
  },
  willing: {
    exampleEn: "I'm willing to help if you send me the file.",
    exampleJa: "ファイルを送ってくれれば、手伝うつもりがあります。"
  },
  feedback: {
    exampleEn: "I read the feedback before changing my presentation.",
    exampleJa: "発表を直す前に、その意見を読みました。"
  },
  receipt: {
    exampleEn: "I took a photo of the receipt before I left the store.",
    exampleJa: "店を出る前にレシートの写真を撮りました。"
  },
  worthwhile: {
    exampleEn: "The long walk was worthwhile because the view was beautiful.",
    exampleJa: "景色がきれいだったので、長く歩いた価値がありました。"
  },
  affordable: {
    exampleEn: "We found an affordable apartment near the station.",
    exampleJa: "駅の近くで手頃な家賃のアパートを見つけました。"
  },
  overdue: {
    exampleEn: "The library book is overdue, so I need to return it today.",
    exampleJa: "図書館の本は返却期限を過ぎているので、今日返さなければなりません。"
  }
};

const PHRASE_EXAMPLES: Record<string, UsageExample> = {
  "go on": {
    exampleEn: "The meeting will go on without him.",
    exampleJa: "会議は彼なしで続きます。"
  },
  "pick up": {
    exampleEn: "I will pick up the tickets after work.",
    exampleJa: "仕事の後でチケットを受け取ります。"
  },
  "come back": {
    exampleEn: "Please come back before dinner.",
    exampleJa: "夕食前に戻ってきてください。"
  },
  "take over": {
    exampleEn: "She will take over the project next week.",
    exampleJa: "彼女が来週そのプロジェクトを引き継ぎます。"
  },
  "find out": {
    exampleEn: "I need to find out what happened.",
    exampleJa: "何が起きたのか調べて知る必要があります。"
  },
  "give up": {
    exampleEn: "Don't give up after one mistake.",
    exampleJa: "一度の失敗であきらめないでください。"
  },
  "look forward to": {
    exampleEn: "I look forward to hearing from you.",
    exampleJa: "ご連絡を楽しみにしています。"
  },
  "as soon as": {
    exampleEn: "Call me as soon as you arrive.",
    exampleJa: "到着したらすぐに電話してください。"
  },
  "in order to": {
    exampleEn: "We left early in order to avoid traffic.",
    exampleJa: "渋滞を避けるために早く出発しました。"
  },
  "due to": {
    exampleEn: "The train was late due to heavy rain.",
    exampleJa: "大雨のため電車は遅れました。"
  },
  "based on": {
    exampleEn: "The decision was based on the data.",
    exampleJa: "その判断はデータに基づいていました。"
  },
  "by the way": {
    exampleEn: "By the way, I sent the file yesterday.",
    exampleJa: "ところで、昨日そのファイルを送りました。"
  },
  "in fact": {
    exampleEn: "In fact, the first answer was correct.",
    exampleJa: "実際、最初の答えが正解でした。"
  },
  "for example": {
    exampleEn: "For example, you can review ten words a day.",
    exampleJa: "例えば、1日に10語復習できます。"
  },
  "on the other hand": {
    exampleEn: "On the other hand, this method is faster.",
    exampleJa: "一方で、この方法の方が速いです。"
  },
  "at the same time": {
    exampleEn: "At the same time, we need to be careful.",
    exampleJa: "同時に、注意する必要があります。"
  },
  "as a result": {
    exampleEn: "As a result, the team finished early.",
    exampleJa: "その結果、チームは早く終えました。"
  },
  "in any case": {
    exampleEn: "In any case, we should check again.",
    exampleJa: "いずれにしても、もう一度確認すべきです。"
  },
  "to be honest": {
    exampleEn: "To be honest, I need more practice.",
    exampleJa: "正直に言うと、もっと練習が必要です。"
  },
  "first of all": {
    exampleEn: "First of all, write your name.",
    exampleJa: "まず最初に、名前を書いてください。"
  },
  "all of a sudden": {
    exampleEn: "All of a sudden, the room became quiet.",
    exampleJa: "突然、部屋が静かになりました。"
  },
  "on purpose": {
    exampleEn: "He left the space blank on purpose.",
    exampleJa: "彼はわざとその空欄を残しました。"
  },
  "as usual": {
    exampleEn: "She arrived early as usual.",
    exampleJa: "彼女はいつものように早く到着しました。"
  },
  "of course": {
    exampleEn: "Of course, you can ask a question.",
    exampleJa: "もちろん、質問してもいいです。"
  },
  "no problem": {
    exampleEn: "No problem, I can wait.",
    exampleJa: "大丈夫です、待てます。"
  },
  "sounds good": {
    exampleEn: "Sounds good. Let's meet at three.",
    exampleJa: "いいですね。3時に会いましょう。"
  },
  "that's right": {
    exampleEn: "That's right, the answer is B.",
    exampleJa: "その通りです、答えはBです。"
  },
  "i see": {
    exampleEn: "I see. That explains the delay.",
    exampleJa: "なるほど。それで遅れた理由が分かります。"
  },
  "let me know": {
    exampleEn: "Please let me know when you finish.",
    exampleJa: "終わったら知らせてください。"
  },
  "take care of": {
    exampleEn: "I will take care of the reservation.",
    exampleJa: "予約の対応は私がします。"
  },
  "make sure": {
    exampleEn: "Make sure the door is locked.",
    exampleJa: "ドアに鍵がかかっていることを必ず確認してください。"
  },
  "have to": {
    exampleEn: "We have to leave before six.",
    exampleJa: "私たちは6時前に出発しなければなりません。"
  },
  "be supposed to": {
    exampleEn: "I am supposed to sign here before noon.",
    exampleJa: "正午までにここに署名することになっています。"
  },
  "get used to": {
    exampleEn: "You will get used to the new schedule.",
    exampleJa: "新しい予定に慣れていくでしょう。"
  },
  "be in charge of": {
    exampleEn: "She will be in charge of the event.",
    exampleJa: "彼女がそのイベントを担当する予定です。"
  },
  "right now": {
    exampleEn: "I can't talk right now.",
    exampleJa: "今すぐには話せません。"
  },
  "on time": {
    exampleEn: "The train arrived on time.",
    exampleJa: "電車は時間通りに到着しました。"
  },
  "in person": {
    exampleEn: "We should meet in person next time.",
    exampleJa: "次回は直接会うべきです。"
  },
  "out of stock": {
    exampleEn: "The notebook is out of stock.",
    exampleJa: "そのノートは在庫切れです。"
  },
  "a piece of cake": {
    exampleEn: "The first exercise was a piece of cake.",
    exampleJa: "最初の練習問題はとても簡単でした。"
  },
  "come up with": {
    exampleEn: "We need to come up with a better idea.",
    exampleJa: "もっとよい考えを思いつく必要があります。"
  },
  "get back to": {
    exampleEn: "I will get back to you after lunch.",
    exampleJa: "昼食後に返事をします。"
  },
  "put up with": {
    exampleEn: "I can't put up with this noise.",
    exampleJa: "この騒音には我慢できません。"
  },
  "let me see": {
    exampleEn: "Let me see the photo again.",
    exampleJa: "その写真をもう一度見せてください。"
  },
  "call out": {
    exampleEn: "Please call out my name when the food is ready.",
    exampleJa: "料理ができたら、私の名前を大きな声で呼んでください。"
  },
  "turn off": {
    exampleEn: "Please turn off the lights when you leave.",
    exampleJa: "出る時に電気を消してください。"
  },
  "get on": {
    exampleEn: "We need to get on the bus at the next stop.",
    exampleJa: "次の停留所でバスに乗る必要があります。"
  },
  "take a seat": {
    exampleEn: "Please take a seat by the window.",
    exampleJa: "窓際の席にお座りください。"
  },
  "according to": {
    exampleEn: "According to the forecast, it will rain tonight.",
    exampleJa: "天気予報によると、今夜は雨が降ります。"
  }
};

export function withUsageExamples<T extends VocabularySeedItem>(
  items: readonly T[]
): Array<T & UsageExample> {
  return items.map((item) => ({
    ...item,
    ...getUsageExample(item)
  }));
}

export function getUsageExample(item: ExampleSource): UsageExample {
  if (item.exampleEn?.trim() && item.exampleJa?.trim()) {
    return {
      exampleEn: item.exampleEn.trim(),
      exampleJa: item.exampleJa.trim()
    };
  }

  const normalizedTerm = normalizeTerm(item.term);
  const override =
    CURATED_USAGE_EXAMPLES[normalizedTerm] ??
    FUNCTION_WORD_EXAMPLES[normalizedTerm] ??
    PHRASE_EXAMPLES[normalizedTerm];

  if (override) {
    return override;
  }

  if (item.itemType === "phrase") {
    return buildPhraseExample(item);
  }

  return buildWordExample(item);
}

function buildWordExample(item: ExampleSource): UsageExample {
  const term = item.term.trim();
  const meaning = getPrimaryMeaning(item.meaningJa);
  const pos = getWordKind(item);

  if (pos === "noun") {
    return buildNounExample(item, term, meaning);
  }

  if (pos === "adjective") {
    return buildAdjectiveExample(term, meaning);
  }

  if (pos === "adverb") {
    return buildAdverbExample(term, meaning);
  }

  if (pos === "verb") {
    return buildVerbExample(item, term, meaning);
  }

  return pickByTerm(term, [
    {
      exampleEn: `I wrote ${term} on the note so I would remember it.`,
      exampleJa: `忘れないように、メモに${meaning}と書きました。`
    },
    {
      exampleEn: `The teacher used ${term} in a simple sentence.`,
      exampleJa: `先生は${meaning}を簡単な文で使いました。`
    },
    {
      exampleEn: `I heard ${term} during a casual conversation at lunch.`,
      exampleJa: `昼食中の何気ない会話で${meaning}を聞きました。`
    }
  ]);
}

function getWordKind(item: ExampleSource) {
  const pos = item.pos.toLocaleLowerCase("en-US");
  const term = normalizeTerm(item.term);
  const definition = item.definitionEn.trim().toLocaleLowerCase("en-US");

  if (pos.includes("noun")) {
    return "noun";
  }

  if (pos.includes("adjective")) {
    return "adjective";
  }

  if (pos.includes("adverb")) {
    return "adverb";
  }

  if (pos.includes("verb")) {
    return "verb";
  }

  if (definition.startsWith("to ") || definition.startsWith("used to ")) {
    return "verb";
  }

  if (
    definition.startsWith("having ") ||
    definition.startsWith("able ") ||
    definition.startsWith("required ") ||
    definition.startsWith("possible ") ||
    definition.startsWith("not ") ||
    /(able|ible|al|ful|ic|ive|less|ous|ent|ant|ary|ed)$/.test(term)
  ) {
    return "adjective";
  }

  if (term.endsWith("ly")) {
    return "adverb";
  }

  return "noun";
}

function buildNounExample(item: ExampleSource, term: string, meaning: string): UsageExample {
  const context = `${item.definitionEn} ${item.meaningJa} ${term}`.toLocaleLowerCase("en-US");
  const definition = item.definitionEn.trim().toLocaleLowerCase("en-US");

  if (isPersonNoun(definition, term)) {
    return pickByTerm(term, [
      {
        exampleEn: `I spoke with the ${term} after the meeting.`,
        exampleJa: `会議の後、その${meaning}と話しました。`
      },
      {
        exampleEn: `The ${term} answered my question politely.`,
        exampleJa: `その${meaning}は私の質問に丁寧に答えてくれました。`
      },
      {
        exampleEn: `A ${term} joined the meeting late.`,
        exampleJa: `${meaning}が会議に遅れて参加しました。`
      }
    ]);
  }

  if (hasAny(context, ["time", "day", "week", "month", "year", "hour", "minute", "morning", "night", "period", "schedule", "date"])) {
    return pickByTerm(term, [
      {
        exampleEn: `I checked the ${term} before making plans for the weekend.`,
        exampleJa: `週末の予定を立てる前に${meaning}を確認しました。`
      },
      {
        exampleEn: `Please write the ${term} on the calendar.`,
        exampleJa: `カレンダーに${meaning}を書いてください。`
      },
      {
        exampleEn: `The ${term} works well for everyone in the group.`,
        exampleJa: `その${meaning}はグループ全員に都合がいいです。`
      }
    ]);
  }

  if (hasAny(context, ["money", "price", "cost", "fee", "payment", "tax", "sale", "budget", "refund", "income"])) {
    return pickByTerm(term, [
      {
        exampleEn: `I checked the ${term} before paying at the store.`,
        exampleJa: `店で支払う前に${meaning}を確認しました。`
      },
      {
        exampleEn: `The ${term} was higher than I expected.`,
        exampleJa: `その${meaning}は予想より高かったです。`
      },
      {
        exampleEn: `We wrote the ${term} in our monthly budget.`,
        exampleJa: `私たちは月の予算に${meaning}を書きました。`
      }
    ]);
  }

  if (hasAny(context, ["number", "amount", "size", "weight", "height", "length", "width", "rate", "level", "degree", "score", "average", "total", "capacity", "limit", "mile", "quarter"])) {
    return pickByTerm(term, [
      {
        exampleEn: `I checked the ${term} before I filled out the form.`,
        exampleJa: `用紙に記入する前に${meaning}を確認しました。`
      },
      {
        exampleEn: `The ${term} changed after we measured it again.`,
        exampleJa: `もう一度測ると、その${meaning}が変わりました。`
      },
      {
        exampleEn: `Please write the ${term} next to your name.`,
        exampleJa: `名前の横に${meaning}を書いてください。`
      }
    ]);
  }

  if (hasAny(context, ["place", "room", "city", "country", "station", "building", "area", "house", "office", "park", "street", "land"])) {
    return pickByTerm(term, [
      {
        exampleEn: `We found a quiet ${term} near the station.`,
        exampleJa: `駅の近くで静かな${meaning}を見つけました。`
      },
      {
        exampleEn: `The ${term} was easy to find on the map.`,
        exampleJa: `その${meaning}は地図で見つけやすかったです。`
      },
      {
        exampleEn: `I walked around the ${term} before dinner.`,
        exampleJa: `夕食前にその${meaning}の周りを歩きました。`
      }
    ]);
  }

  if (hasAny(context, ["body", "mouth", "brain", "muscle", "breast", "throat", "stomach", "nerve", "hair", "face", "eye", "hand"])) {
    return pickByTerm(term, [
      {
        exampleEn: `My ${term} felt sore after the long day.`,
        exampleJa: `長い一日の後、${meaning}が痛く感じました。`
      },
      {
        exampleEn: `The doctor checked my ${term} during the visit.`,
        exampleJa: `診察中、医師が私の${meaning}を確認しました。`
      },
      {
        exampleEn: `Please keep your ${term} relaxed while you breathe.`,
        exampleJa: `呼吸している間、${meaning}の力を抜いてください。`
      }
    ]);
  }

  if (hasAny(context, ["tool", "device", "machine", "equipment", "furniture", "clothing", "clothes", "vehicle", "book", "photo", "picture", "box", "key", "window", "door", "chair", "bed", "phone", "card", "bag", "plant", "tree"])) {
    return pickByTerm(term, [
      {
        exampleEn: `I checked the ${term} before leaving home.`,
        exampleJa: `家を出る前に${meaning}を確認しました。`
      },
      {
        exampleEn: `Please move the ${term} closer to the window.`,
        exampleJa: `${meaning}を窓の近くに動かしてください。`
      },
      {
        exampleEn: `I cleaned the ${term} after dinner.`,
        exampleJa: `夕食後に${meaning}をきれいにしました。`
      }
    ]);
  }

  if (hasAny(context, ["food", "meal", "drink", "coffee", "bread", "rice", "fish", "oil"])) {
    return pickByTerm(term, [
      {
        exampleEn: `I bought fresh ${term} on my way home.`,
        exampleJa: `帰り道に新鮮な${meaning}を買いました。`
      },
      {
        exampleEn: `We shared the ${term} at lunch.`,
        exampleJa: `昼食でその${meaning}を分け合いました。`
      },
      {
        exampleEn: `Please put the ${term} in the fridge.`,
        exampleJa: `その${meaning}を冷蔵庫に入れてください。`
      }
    ]);
  }

  if (hasAny(context, ["information", "message", "report", "file", "form", "letter", "email", "data", "record", "note", "document", "answer", "question"])) {
    return pickByTerm(term, [
      {
        exampleEn: `I saved the ${term} on my phone before leaving home.`,
        exampleJa: `家を出る前に${meaning}をスマホに保存しました。`
      },
      {
        exampleEn: `Please send me the ${term} after lunch.`,
        exampleJa: `昼食後に${meaning}を送ってください。`
      },
      {
        exampleEn: `The ${term} helped us choose the next step.`,
        exampleJa: `その${meaning}のおかげで次の手順を選べました。`
      }
    ]);
  }

  if (hasAny(context, ["feeling", "emotion", "pain", "stress", "worry", "hope", "fear", "love", "interest"])) {
    return pickByTerm(term, [
      {
        exampleEn: `I felt a little ${term} before the appointment.`,
        exampleJa: `予約の前に少し${meaning}を感じました。`
      },
      {
        exampleEn: `The ${term} faded after we talked.`,
        exampleJa: `話した後、その${meaning}は薄れました。`
      },
      {
        exampleEn: `She noticed the ${term} in my voice.`,
        exampleJa: `彼女は私の声にある${meaning}に気づきました。`
      }
    ]);
  }

  if (hasAny(context, ["idea", "plan", "problem", "reason", "result", "decision", "method", "change", "effect", "issue", "case"])) {
    return pickByTerm(term, [
      {
        exampleEn: `The ${term} came up while we were planning dinner.`,
        exampleJa: `夕食の計画をしている時に、その${meaning}の話が出ました。`
      },
      {
        exampleEn: `I wrote the ${term} on a sticky note.`,
        exampleJa: `${meaning}を付箋に書きました。`
      },
      {
        exampleEn: `We talked about the ${term} on the train.`,
        exampleJa: `電車の中でその${meaning}について話しました。`
      }
    ]);
  }

  return pickByTerm(term, [
    {
      exampleEn: `We discussed the ${term} before choosing a plan.`,
      exampleJa: `計画を選ぶ前に${meaning}について話し合いました。`
    },
    {
      exampleEn: `The ${term} affected our plans for the weekend.`,
      exampleJa: `その${meaning}が週末の予定に影響しました。`
    },
    {
      exampleEn: `I asked about the ${term} before I agreed.`,
      exampleJa: `同意する前に${meaning}について尋ねました。`
    },
    {
      exampleEn: `The ${term} became clearer after we talked.`,
      exampleJa: `話した後、その${meaning}がより明確になりました。`
    },
    {
      exampleEn: `The ${term} came up during lunch with my friend.`,
      exampleJa: `友人との昼食中に${meaning}の話が出ました。`
    }
  ]);
}

function isPersonNoun(definition: string, term: string) {
  const normalizedTerm = normalizeTerm(term);
  const personTerms = new Set([
    "actor",
    "adult",
    "artist",
    "assistant",
    "baby",
    "boy",
    "brother",
    "child",
    "consumer",
    "customer",
    "daughter",
    "doctor",
    "driver",
    "employee",
    "father",
    "friend",
    "girl",
    "guest",
    "husband",
    "kid",
    "leader",
    "man",
    "member",
    "mother",
    "neighbor",
    "parent",
    "patient",
    "person",
    "player",
    "police",
    "president",
    "professor",
    "reader",
    "seller",
    "singer",
    "sister",
    "student",
    "teacher",
    "user",
    "visitor",
    "boss",
    "chief",
    "cook",
    "critic",
    "fellow",
    "folk",
    "governor",
    "historian",
    "mayor",
    "poet",
    "producer",
    "publisher",
    "pupil",
    "representative",
    "researcher",
    "secretary",
    "soldier",
    "veteran",
    "woman",
    "worker",
    "writer"
  ]);

  return /^(a|an) (person|man|woman|boy|girl|student|teacher|worker|member|friend)\b/.test(definition) || personTerms.has(normalizedTerm);
}

function buildAdjectiveExample(term: string, meaning: string): UsageExample {
  const normalizedTerm = normalizeTerm(term);
  const exactExamples: Record<string, UsageExample> = {
    this: {
      exampleEn: "This chair is comfortable.",
      exampleJa: "この椅子は座り心地がいいです。"
    },
    good: {
      exampleEn: "This soup tastes good.",
      exampleJa: "このスープはおいしいです。"
    },
    new: {
      exampleEn: "I bought a new notebook yesterday.",
      exampleJa: "昨日、新しいノートを買いました。"
    },
    right: {
      exampleEn: "You chose the right door.",
      exampleJa: "あなたは正しいドアを選びました。"
    },
    such: {
      exampleEn: "I have never seen such a long line.",
      exampleJa: "そんなに長い列は見たことがありません。"
    },
    long: {
      exampleEn: "We took a long walk after dinner.",
      exampleJa: "夕食後に長い散歩をしました。"
    },
    same: {
      exampleEn: "We ordered the same lunch.",
      exampleJa: "私たちは同じ昼食を注文しました。"
    },
    late: {
      exampleEn: "The late train made me miss dinner.",
      exampleJa: "遅れた電車のせいで夕食に間に合いませんでした。"
    },
    kind: {
      exampleEn: "The kind nurse explained everything slowly.",
      exampleJa: "親切な看護師がすべてゆっくり説明してくれました。"
    },
    small: {
      exampleEn: "I carry a small umbrella in my bag.",
      exampleJa: "バッグに小さな傘を入れています。"
    },
    young: {
      exampleEn: "The young teacher remembered every student's name.",
      exampleJa: "若い先生は生徒全員の名前を覚えていました。"
    },
    bad: {
      exampleEn: "I had a bad headache this morning.",
      exampleJa: "今朝はひどい頭痛がありました。"
    },
    sure: {
      exampleEn: "Are you sure this is the right platform?",
      exampleJa: "ここが正しいホームで間違いありませんか。"
    },
    hard: {
      exampleEn: "The chair felt hard after two hours.",
      exampleJa: "2時間座ると、その椅子は硬く感じました。"
    },
    several: {
      exampleEn: "I checked several stores before buying the shoes.",
      exampleJa: "靴を買う前にいくつかの店を確認しました。"
    },
    real: {
      exampleEn: "This is a real problem for people without cars.",
      exampleJa: "これは車がない人にとって本当の問題です。"
    },
    social: {
      exampleEn: "She feels nervous in social situations.",
      exampleJa: "彼女は社交の場で緊張します。"
    },
    political: {
      exampleEn: "We avoided political topics at dinner.",
      exampleJa: "夕食の席では政治的な話題を避けました。"
    },
    full: {
      exampleEn: "The bus was full by the time it reached my stop.",
      exampleJa: "バスは私の停留所に着く頃には満員でした。"
    },
    short: {
      exampleEn: "I took a short break after lunch.",
      exampleJa: "昼食後に短い休憩を取りました。"
    },
    human: {
      exampleEn: "Everyone makes human mistakes sometimes.",
      exampleJa: "誰でも時々人間らしいミスをします。"
    },
    major: {
      exampleEn: "The delay caused a major problem for our trip.",
      exampleJa: "その遅れは旅行に大きな問題を引き起こしました。"
    },
    else: {
      exampleEn: "Ask someone else if I am not there.",
      exampleJa: "私がいなければ他の人に聞いてください。"
    },
    particular: {
      exampleEn: "I am looking for one particular book.",
      exampleJa: "ある特定の本を探しています。"
    },
    difficult: {
      exampleEn: "The last question was difficult.",
      exampleJa: "最後の質問は難しかったです。"
    },
    white: {
      exampleEn: "Do not spill coffee on the white shirt.",
      exampleJa: "白いシャツにコーヒーをこぼさないでください。"
    },
    economic: {
      exampleEn: "The economic news affected food prices.",
      exampleJa: "経済ニュースが食料品の価格に影響しました。"
    },
    nice: {
      exampleEn: "It was nice to sit outside after work.",
      exampleJa: "仕事の後、外で座るのは気持ちよかったです。"
    },
    round: {
      exampleEn: "The round table fits well in the kitchen.",
      exampleJa: "丸いテーブルは台所によく合います。"
    },
    likely: {
      exampleEn: "Rain is likely this evening.",
      exampleJa: "今晩は雨になりそうです。"
    },
    single: {
      exampleEn: "I could not find a single empty seat.",
      exampleJa: "空席を一つも見つけられませんでした。"
    },
    wrong: {
      exampleEn: "I got on the wrong train.",
      exampleJa: "間違った電車に乗ってしまいました。"
    },
    complete: {
      exampleEn: "Please send the complete form by Friday.",
      exampleJa: "金曜日までに記入済みの用紙を送ってください。"
    },
    current: {
      exampleEn: "My current address is on the form.",
      exampleJa: "現在の住所は用紙に書いてあります。"
    },
    firm: {
      exampleEn: "The mattress is firm but comfortable.",
      exampleJa: "そのマットレスは硬めですが快適です。"
    },
    fast: {
      exampleEn: "This is the fastest route to the station.",
      exampleJa: "これが駅まで一番速い道です。"
    },
    foreign: {
      exampleEn: "I enjoy watching foreign films with subtitles.",
      exampleJa: "字幕付きの外国映画を見るのが好きです。"
    },
    official: {
      exampleEn: "Please check the official website before you go.",
      exampleJa: "行く前に公式サイトを確認してください。"
    },
    financial: {
      exampleEn: "I need financial advice before I sign the loan.",
      exampleJa: "ローンに署名する前にお金に関する助言が必要です。"
    },
    private: {
      exampleEn: "Please send private information by secure email.",
      exampleJa: "個人情報は安全なメールで送ってください。"
    },
    necessary: {
      exampleEn: "A reservation is necessary on weekends.",
      exampleJa: "週末は予約が必要です。"
    },
    various: {
      exampleEn: "The store sells various kinds of tea.",
      exampleJa: "その店はいろいろな種類のお茶を売っています。"
    },
    simple: {
      exampleEn: "A simple message is easier to understand.",
      exampleJa: "簡単なメッセージの方が分かりやすいです。"
    },
    final: {
      exampleEn: "This is the final train tonight.",
      exampleJa: "これが今夜の最終電車です。"
    },
    alone: {
      exampleEn: "I felt alone in the new class.",
      exampleJa: "新しいクラスで一人ぼっちに感じました。"
    },
    significant: {
      exampleEn: "The new bus route made a significant difference.",
      exampleJa: "新しいバス路線は大きな違いを生みました。"
    },
    direct: {
      exampleEn: "There is a direct train to the airport.",
      exampleJa: "空港まで直通電車があります。"
    },
    wide: {
      exampleEn: "The wide sidewalk is easy to walk on.",
      exampleJa: "その広い歩道は歩きやすいです。"
    },
    military: {
      exampleEn: "The museum has a military history section.",
      exampleJa: "その博物館には軍事史の展示があります。"
    },
    sorry: {
      exampleEn: "I am sorry about the late reply.",
      exampleJa: "返信が遅くなってすみません。"
    },
    red: {
      exampleEn: "The red bag by the door is mine.",
      exampleJa: "ドアのそばの赤いバッグは私のものです。"
    },
    modern: {
      exampleEn: "The hotel has a modern kitchen.",
      exampleJa: "そのホテルには現代的なキッチンがあります。"
    },
    potential: {
      exampleEn: "This small mistake could become a potential problem.",
      exampleJa: "この小さなミスは潜在的な問題になるかもしれません。"
    },
    clean: {
      exampleEn: "I need a clean shirt for tomorrow.",
      exampleJa: "明日のためにきれいなシャツが必要です。"
    },
    positive: {
      exampleEn: "She gave me positive feedback after class.",
      exampleJa: "授業後、彼女は前向きな意見をくれました。"
    },
    huge: {
      exampleEn: "There was a huge line outside the store.",
      exampleJa: "店の外にとても長い列ができていました。"
    },
    successful: {
      exampleEn: "The event was successful because everyone helped.",
      exampleJa: "全員が手伝ったので、そのイベントは成功しました。"
    },
    unclear: {
      exampleEn: "The instructions were unclear, so I asked again.",
      exampleJa: "指示が不明確だったので、もう一度尋ねました。"
    },
    separate: {
      exampleEn: "Please put the receipts in a separate folder.",
      exampleJa: "レシートは別のフォルダーに入れてください。"
    },
    male: {
      exampleEn: "The male doctor spoke gently to the patient.",
      exampleJa: "男性医師は患者に優しく話しました。"
    },
    useful: {
      exampleEn: "This phrase is useful when you ask for help.",
      exampleJa: "この表現は助けを求める時に便利です。"
    },
    previous: {
      exampleEn: "I saved the previous version of the file.",
      exampleJa: "そのファイルの前の版を保存しました。"
    },
    legal: {
      exampleEn: "You should get legal advice before signing.",
      exampleJa: "署名する前に法律上の助言を受けるべきです。"
    },
    favorite: {
      exampleEn: "This is my favorite seat in the cafe.",
      exampleJa: "ここはそのカフェで私のお気に入りの席です。"
    },
    independent: {
      exampleEn: "She became more independent after moving out.",
      exampleJa: "彼女は引っ越してからより自立しました。"
    },
    rich: {
      exampleEn: "The soup had a rich flavor.",
      exampleJa: "そのスープは濃厚な味でした。"
    },
    appropriate: {
      exampleEn: "Please wear appropriate shoes for the walk.",
      exampleJa: "散歩に合った靴を履いてください。"
    },
    safe: {
      exampleEn: "This street feels safe at night.",
      exampleJa: "この通りは夜でも安全に感じます。"
    },
    wonderful: {
      exampleEn: "We had a wonderful dinner by the river.",
      exampleJa: "川のそばで素晴らしい夕食を楽しみました。"
    }
  };

  if (exactExamples[normalizedTerm]) {
    return exactExamples[normalizedTerm];
  }

  if (hasAny(normalizedTerm, ["political", "economic", "financial", "legal", "federal", "cultural", "military", "social", "external", "genetic", "psychological", "institutional", "racial", "ethnic", "democratic", "civil"])) {
    return {
      exampleEn: `We discussed the ${term} issue after class.`,
      exampleJa: `授業後、その${meaning}問題について話し合いました。`
    };
  }

  if (hasAny(normalizedTerm, ["red", "white", "black", "blue", "green", "pale", "bright", "dark", "wooden", "round", "wide", "narrow", "thin", "thick", "huge", "small", "large", "short", "long"])) {
    return {
      exampleEn: `I chose the ${term} bag by the door.`,
      exampleJa: `ドアのそばにある${meaning}バッグを選びました。`
    };
  }

  if (hasAny(normalizedTerm, ["afraid", "ashamed", "sorry", "upset", "calm", "pleasant", "awkward", "frustrated", "overwhelmed", "hesitant", "reluctant"])) {
    return {
      exampleEn: `I felt ${term} after the phone call.`,
      exampleJa: `電話の後、${meaning}と感じました。`
    };
  }

  return pickByTerm(term, [
    {
      exampleEn: `The ${term} option worked best for today.`,
      exampleJa: `今日は${meaning}選択肢が一番合っていました。`
    },
    {
      exampleEn: `This bag feels ${term} enough for the trip.`,
      exampleJa: `このバッグは旅行には十分${meaning}感じます。`
    },
    {
      exampleEn: `Her ${term} answer helped me decide.`,
      exampleJa: `彼女の${meaning}答えが判断の助けになりました。`
    },
    {
      exampleEn: `Her answer sounded ${term}, so I asked one more question.`,
      exampleJa: `彼女の答えは${meaning}に聞こえたので、もう一つ質問しました。`
    },
    {
      exampleEn: `I chose the ${term} option for the weekend.`,
      exampleJa: `週末のために${meaning}選択肢を選びました。`
    }
  ]);
}

function buildAdverbExample(term: string, meaning: string): UsageExample {
  const normalizedTerm = normalizeTerm(term);
  const exactExamples: Record<string, UsageExample> = {
    not: {
      exampleEn: "I am not ready yet.",
      exampleJa: "私はまだ準備ができていません。"
    },
    up: {
      exampleEn: "Please speak up if you have a question.",
      exampleJa: "質問があれば大きな声で話してください。"
    },
    also: {
      exampleEn: "I also need to buy milk.",
      exampleJa: "牛乳も買う必要があります。"
    },
    where: {
      exampleEn: "Where should we meet after class?",
      exampleJa: "授業の後、どこで会いましょうか。"
    },
    most: {
      exampleEn: "I like this cafe most in the morning.",
      exampleJa: "このカフェは朝が一番好きです。"
    },
    really: {
      exampleEn: "I really enjoyed the movie.",
      exampleJa: "その映画を本当に楽しみました。"
    },
    always: {
      exampleEn: "I always check the time before I leave.",
      exampleJa: "出発前にはいつも時間を確認します。"
    },
    far: {
      exampleEn: "The station is not far from here.",
      exampleJa: "駅はここから遠くありません。"
    },
    actually: {
      exampleEn: "I actually finished the homework early.",
      exampleJa: "実は宿題を早く終えました。"
    },
    soon: {
      exampleEn: "The bus should arrive soon.",
      exampleJa: "バスはもうすぐ到着するはずです。"
    },
    probably: {
      exampleEn: "The store will probably close early.",
      exampleJa: "その店はたぶん早く閉まります。"
    },
    usually: {
      exampleEn: "I usually study on the train.",
      exampleJa: "私はたいてい電車の中で勉強します。"
    },
    easily: {
      exampleEn: "This bag fits easily under the seat.",
      exampleJa: "このバッグは座席の下に簡単に収まります。"
    },
    anyway: {
      exampleEn: "It was raining, but we went anyway.",
      exampleJa: "雨が降っていましたが、それでも行きました。"
    },
    finally: {
      exampleEn: "I finally found my keys.",
      exampleJa: "ようやく鍵を見つけました。"
    },
    more: {
      exampleEn: "I need more time to finish this.",
      exampleJa: "これを終えるにはもっと時間が必要です。"
    },
    no: {
      exampleEn: "No, I have not seen your wallet.",
      exampleJa: "いいえ、あなたの財布は見ていません。"
    },
    then: {
      exampleEn: "Finish your homework, and then you can watch TV.",
      exampleJa: "宿題を終えたら、それからテレビを見てもいいです。"
    },
    much: {
      exampleEn: "I do not have much time before work.",
      exampleJa: "仕事前にあまり時間がありません。"
    },
    less: {
      exampleEn: "I drink less coffee these days.",
      exampleJa: "最近はコーヒーを飲む量が少なくなりました。"
    },
    once: {
      exampleEn: "I visit my grandparents once a month.",
      exampleJa: "月に一度、祖父母を訪ねます。"
    },
    ago: {
      exampleEn: "I saw him two days ago.",
      exampleJa: "2日前に彼に会いました。"
    },
    perhaps: {
      exampleEn: "Perhaps we should leave a little earlier.",
      exampleJa: "もしかすると少し早めに出た方がいいかもしれません。"
    },
    forward: {
      exampleEn: "Please move forward in the line.",
      exampleJa: "列の中で前に進んでください。"
    },
    especially: {
      exampleEn: "I like this park, especially in spring.",
      exampleJa: "この公園が好きです。特に春が好きです。"
    },
    generally: {
      exampleEn: "Generally, I study better in the morning.",
      exampleJa: "一般的に、私は朝の方がよく勉強できます。"
    },
    ahead: {
      exampleEn: "The road ahead is closed.",
      exampleJa: "この先の道路は閉鎖されています。"
    },
    relatively: {
      exampleEn: "The test was relatively easy this time.",
      exampleJa: "今回のテストは比較的簡単でした。"
    },
    extremely: {
      exampleEn: "The station was extremely crowded this morning.",
      exampleJa: "今朝、駅は非常に混んでいました。"
    },
    forth: {
      exampleEn: "She stepped forth to ask a question.",
      exampleJa: "彼女は質問するために前へ進み出ました。"
    },
    indeed: {
      exampleEn: "It was indeed a difficult question.",
      exampleJa: "それは実に難しい質問でした。"
    },
    totally: {
      exampleEn: "I totally forgot about the appointment.",
      exampleJa: "予約のことを完全に忘れていました。"
    },
    moreover: {
      exampleEn: "The room is quiet; moreover, it is close to the station.",
      exampleJa: "その部屋は静かです。さらに駅にも近いです。"
    },
    fairly: {
      exampleEn: "The instructions were fairly easy to follow.",
      exampleJa: "その説明はかなり分かりやすかったです。"
    },
    definitely: {
      exampleEn: "I will definitely bring the receipt tomorrow.",
      exampleJa: "明日必ずレシートを持ってきます。"
    },
    seriously: {
      exampleEn: "You should take this warning seriously.",
      exampleJa: "この警告を真剣に受け止めるべきです。"
    },
    besides: {
      exampleEn: "I am too tired to go out; besides, it is raining.",
      exampleJa: "外出するには疲れすぎています。それに雨も降っています。"
    },
    closely: {
      exampleEn: "Please look closely at the receipt.",
      exampleJa: "レシートをよく見てください。"
    },
    furthermore: {
      exampleEn: "The plan is simple; furthermore, it saves money.",
      exampleJa: "その計画は簡単です。さらにお金も節約できます。"
    },
    equally: {
      exampleEn: "We split the bill equally.",
      exampleJa: "私たちは会計を均等に分けました。"
    },
    abroad: {
      exampleEn: "My sister wants to study abroad next year.",
      exampleJa: "姉は来年海外で勉強したいと思っています。"
    },
    personally: {
      exampleEn: "Personally, I prefer the earlier train.",
      exampleJa: "個人的には、早い方の電車が好きです。"
    },
    approximately: {
      exampleEn: "The walk takes approximately twenty minutes.",
      exampleJa: "その徒歩移動はおよそ20分かかります。"
    },
    secondly: {
      exampleEn: "Firstly, check the date; secondly, check the name.",
      exampleJa: "第一に日付を確認し、第二に名前を確認してください。"
    },
    rapidly: {
      exampleEn: "The weather changed rapidly after lunch.",
      exampleJa: "昼食後、天気が急に変わりました。"
    },
    typically: {
      exampleEn: "I typically study for ten minutes after breakfast.",
      exampleJa: "私はたいてい朝食後に10分勉強します。"
    },
    deeply: {
      exampleEn: "I deeply appreciate your help.",
      exampleJa: "あなたの助けに深く感謝しています。"
    },
    anymore: {
      exampleEn: "I do not use that app anymore.",
      exampleJa: "そのアプリはもう使っていません。"
    },
    initially: {
      exampleEn: "Initially, I thought the form was difficult.",
      exampleJa: "最初は、その用紙は難しいと思いました。"
    },
    constantly: {
      exampleEn: "My phone constantly reminds me to review.",
      exampleJa: "スマホが絶えず復習を思い出させてくれます。"
    }
  };

  if (exactExamples[normalizedTerm]) {
    return exactExamples[normalizedTerm];
  }

  if (hasAny(normalizedTerm, ["always", "usually", "often", "frequently", "sometimes", "occasionally", "rarely"])) {
    return {
      exampleEn: `I ${term} review words on the train.`,
      exampleJa: `私は${meaning}電車の中で単語を復習します。`
    };
  }

  if (hasAny(normalizedTerm, ["probably", "possibly", "apparently", "presumably"])) {
    return {
      exampleEn: `The store will ${term} close early today.`,
      exampleJa: `その店は今日${meaning}早く閉まりそうです。`
    };
  }

  if (hasAny(normalizedTerm, ["almost", "nearly", "barely", "hardly", "merely", "virtually"])) {
    return {
      exampleEn: `I ${term} missed the last train.`,
      exampleJa: `私は${meaning}終電を逃すところでした。`
    };
  }

  if (hasAny(normalizedTerm, ["slightly", "gently", "quietly", "firmly", "differently", "faithfully", "properly", "carefully", "quickly", "slowly", "clearly"])) {
    return {
      exampleEn: `She closed the door ${term}.`,
      exampleJa: `彼女はドアを${meaning}閉めました。`
    };
  }

  return pickByTerm(term, [
    {
      exampleEn: `The answer was ${term} clear after she explained it.`,
      exampleJa: `彼女が説明した後、その答えは${meaning}明確でした。`
    },
    {
      exampleEn: `She answered ${term} when I asked about the plan.`,
      exampleJa: `計画について尋ねると、彼女は${meaning}答えました。`
    },
    {
      exampleEn: `We ${term} finished the work before dinner.`,
      exampleJa: `私たちは夕食前に${meaning}作業を終えました。`
    },
    {
      exampleEn: `The plan changed ${term} after lunch.`,
      exampleJa: `昼食後、その計画は${meaning}変わりました。`
    }
  ]);
}

function buildVerbExample(item: ExampleSource, term: string, meaning: string): UsageExample {
  const context = `${item.definitionEn} ${item.meaningJa} ${term}`.toLocaleLowerCase("en-US");
  const normalizedTerm = normalizeTerm(term);
  const exactExamples: Record<string, UsageExample> = {
    become: {
      exampleEn: "The room can become noisy after lunch.",
      exampleJa: "昼食後、その部屋は騒がしくなることがあります。"
    },
    come: {
      exampleEn: "Can you come to the station after work?",
      exampleJa: "仕事の後、駅に来られますか。"
    },
    leave: {
      exampleEn: "We need to leave before six.",
      exampleJa: "6時前に出発する必要があります。"
    },
    put: {
      exampleEn: "Please put the receipt in your bag.",
      exampleJa: "レシートをバッグに入れてください。"
    },
    live: {
      exampleEn: "I live near the station.",
      exampleJa: "私は駅の近くに住んでいます。"
    },
    seem: {
      exampleEn: "The answer may seem strange at first.",
      exampleJa: "その答えは最初は変に思えるかもしれません。"
    },
    pay: {
      exampleEn: "I need to pay the bill by Friday.",
      exampleJa: "金曜日までに請求書を支払う必要があります。"
    },
    buy: {
      exampleEn: "I usually buy bread on my way home.",
      exampleJa: "帰り道によくパンを買います。"
    },
    send: {
      exampleEn: "Please send the photo after lunch.",
      exampleJa: "昼食後に写真を送ってください。"
    },
    grow: {
      exampleEn: "The plant will grow better near the window.",
      exampleJa: "その植物は窓の近くの方がよく育ちます。"
    },
    return: {
      exampleEn: "I need to return the book tomorrow.",
      exampleJa: "明日その本を返す必要があります。"
    },
    sit: {
      exampleEn: "Please sit by the window.",
      exampleJa: "窓のそばに座ってください。"
    },
    appear: {
      exampleEn: "The problem may appear again after the update.",
      exampleJa: "更新後にその問題がまた現れるかもしれません。"
    },
    sell: {
      exampleEn: "They sell fresh bread at this store.",
      exampleJa: "この店では焼きたてのパンを売っています。"
    },
    check: {
      exampleEn: "Please check the door before you leave.",
      exampleJa: "出る前にドアを確認してください。"
    },
    avoid: {
      exampleEn: "I try to avoid crowded trains.",
      exampleJa: "混んだ電車を避けるようにしています。"
    },
    throw: {
      exampleEn: "Do not throw the receipt away yet.",
      exampleJa: "まだレシートを捨てないでください。"
    },
    sing: {
      exampleEn: "We sing together at the end of class.",
      exampleJa: "授業の最後に一緒に歌います。"
    },
    search: {
      exampleEn: "I need to search for a cheaper ticket.",
      exampleJa: "もっと安いチケットを探す必要があります。"
    },
    encourage: {
      exampleEn: "Her message will encourage him to try again.",
      exampleJa: "彼女のメッセージは彼にもう一度挑戦する勇気を与えるでしょう。"
    },
    marry: {
      exampleEn: "They plan to marry next spring.",
      exampleJa: "彼らは来年の春に結婚する予定です。"
    },
    want: {
      exampleEn: "I want a quiet seat by the window.",
      exampleJa: "窓際の静かな席が欲しいです。"
    },
    give: {
      exampleEn: "Please give me a minute to check.",
      exampleJa: "確認するために1分ください。"
    },
    find: {
      exampleEn: "I need to find my keys before we leave.",
      exampleJa: "出発する前に鍵を見つける必要があります。"
    },
    need: {
      exampleEn: "I need a receipt for this payment.",
      exampleJa: "この支払いのレシートが必要です。"
    },
    mean: {
      exampleEn: "What does this sign mean?",
      exampleJa: "この標識はどういう意味ですか。"
    },
    may: {
      exampleEn: "It may rain this evening.",
      exampleJa: "今晩は雨が降るかもしれません。"
    },
    meet: {
      exampleEn: "Let us meet at the station after work.",
      exampleJa: "仕事の後、駅で会いましょう。"
    },
    begin: {
      exampleEn: "The movie will begin at seven.",
      exampleJa: "映画は7時に始まります。"
    },
    continue: {
      exampleEn: "Please continue reading after the break.",
      exampleJa: "休憩の後も読み続けてください。"
    },
    break: {
      exampleEn: "Do not break the glass cup.",
      exampleJa: "そのガラスのコップを割らないでください。"
    },
    add: {
      exampleEn: "Please add my name to the list.",
      exampleJa: "リストに私の名前を追加してください。"
    },
    join: {
      exampleEn: "Would you like to join us for lunch?",
      exampleJa: "昼食に一緒に参加しませんか。"
    },
    exist: {
      exampleEn: "Does this address still exist?",
      exampleJa: "この住所はまだ存在しますか。"
    },
    identify: {
      exampleEn: "Can you identify the owner of this bag?",
      exampleJa: "このバッグの持ち主を特定できますか。"
    },
    indicate: {
      exampleEn: "The sign will indicate the correct platform.",
      exampleJa: "その標識が正しいホームを示します。"
    },
    sleep: {
      exampleEn: "I sleep better when the room is cool.",
      exampleJa: "部屋が涼しいとよく眠れます。"
    },
    touch: {
      exampleEn: "Do not touch the hot pan.",
      exampleJa: "熱いフライパンに触らないでください。"
    },
    tend: {
      exampleEn: "I tend to forget names when I am nervous.",
      exampleJa: "緊張すると名前を忘れがちです。"
    },
    doubt: {
      exampleEn: "I doubt that the store is still open.",
      exampleJa: "その店がまだ開いているとは思えません。"
    },
    reflect: {
      exampleEn: "The window can reflect sunlight into the room.",
      exampleJa: "窓が日光を部屋の中に反射することがあります。"
    },
    earn: {
      exampleEn: "She works weekends to earn extra money.",
      exampleJa: "彼女は余分なお金を稼ぐために週末に働いています。"
    },
    admit: {
      exampleEn: "I admit that I forgot the appointment.",
      exampleJa: "予約を忘れたことを認めます。"
    },
    beat: {
      exampleEn: "We need to beat the traffic by leaving early.",
      exampleJa: "早く出て渋滞を避ける必要があります。"
    },
    ride: {
      exampleEn: "I ride my bike to the station.",
      exampleJa: "駅まで自転車に乗って行きます。"
    },
    remove: {
      exampleEn: "Please remove your shoes at the door.",
      exampleJa: "玄関で靴を脱いでください。"
    },
    display: {
      exampleEn: "The screen will display your total payment.",
      exampleJa: "画面に支払い合計が表示されます。"
    },
    intend: {
      exampleEn: "I intend to finish the form tonight.",
      exampleJa: "今夜その用紙を終えるつもりです。"
    },
    excite: {
      exampleEn: "The news will excite the children.",
      exampleJa: "その知らせは子供たちをわくわくさせるでしょう。"
    },
    satisfy: {
      exampleEn: "This meal should satisfy everyone.",
      exampleJa: "この食事なら全員が満足するはずです。"
    },
    surround: {
      exampleEn: "Tall buildings surround the station.",
      exampleJa: "高い建物が駅を囲んでいます。"
    },
    roll: {
      exampleEn: "Roll the towel before you pack it.",
      exampleJa: "荷造りする前にタオルを丸めてください。"
    },
    combine: {
      exampleEn: "Combine the files into one folder.",
      exampleJa: "ファイルを一つのフォルダーにまとめてください。"
    },
    employ: {
      exampleEn: "The cafe will employ two new students.",
      exampleJa: "そのカフェは新しい学生を2人雇う予定です。"
    },
    settle: {
      exampleEn: "Let us settle the bill before we leave.",
      exampleJa: "出る前に会計を済ませましょう。"
    },
    aid: {
      exampleEn: "This note will aid your review later.",
      exampleJa: "このメモは後で復習の助けになります。"
    },
    jump: {
      exampleEn: "Do not jump over the wet floor sign.",
      exampleJa: "濡れた床の標識を飛び越えないでください。"
    },
    travel: {
      exampleEn: "I travel by train when I visit my parents.",
      exampleJa: "両親を訪ねる時は電車で移動します。"
    },
    dance: {
      exampleEn: "We dance together at the summer festival.",
      exampleJa: "夏祭りで一緒に踊ります。"
    },
    climb: {
      exampleEn: "We climb the stairs when the elevator is busy.",
      exampleJa: "エレベーターが混んでいる時は階段を上ります。"
    },
    rent: {
      exampleEn: "I want to rent a bicycle near the station.",
      exampleJa: "駅の近くで自転車を借りたいです。"
    },
    rush: {
      exampleEn: "Do not rush your answer during the test.",
      exampleJa: "テスト中に答えを急がないでください。"
    },
    steal: {
      exampleEn: "Someone tried to steal a bike outside the store.",
      exampleJa: "店の外で誰かが自転車を盗もうとしました。"
    },
    swing: {
      exampleEn: "The door can swing open in the wind.",
      exampleJa: "風でドアが勢いよく開くことがあります。"
    },
    withdraw: {
      exampleEn: "I need to withdraw cash before dinner.",
      exampleJa: "夕食前に現金を引き出す必要があります。"
    }
  };

  if (exactExamples[normalizedTerm]) {
    return exactExamples[normalizedTerm];
  }

  if (hasAny(context, ["say", "speak", "talk", "tell", "ask", "answer", "explain", "reply", "call", "write", "read"])) {
    return pickByTerm(term, [
      {
        exampleEn: `Please ${term} clearly so everyone can understand.`,
        exampleJa: `みんなが分かるように、はっきり${meaning}ください。`
      },
      {
        exampleEn: `I had to ${term} the message again after lunch.`,
        exampleJa: `昼食後、そのメッセージをもう一度${meaning}必要がありました。`
      },
      {
        exampleEn: `She helped me ${term} the question in simple English.`,
        exampleJa: `彼女はその質問を簡単な英語で${meaning}のを手伝ってくれました。`
      }
    ]);
  }

  if (hasAny(context, ["move", "go", "come", "walk", "run", "travel", "arrive", "leave", "return", "rise", "fall", "sit", "stand", "stay", "live"])) {
    return pickByTerm(term, [
      {
        exampleEn: `I plan to ${term} there after lunch.`,
        exampleJa: `昼食後にそこへ${meaning}つもりです。`
      },
      {
        exampleEn: `We decided to ${term} after breakfast.`,
        exampleJa: `朝食の後で${meaning}ことにしました。`
      },
      {
        exampleEn: `She will ${term} when the next train arrives.`,
        exampleJa: `次の電車が着いたら、彼女は${meaning}でしょう。`
      }
    ]);
  }

  if (hasAny(context, ["make", "create", "build", "develop", "produce", "prepare", "arrange", "set"])) {
    return pickByTerm(term, [
      {
        exampleEn: `I need to ${term} a simple plan before Friday.`,
        exampleJa: `金曜日までに簡単な計画を${meaning}必要があります。`
      },
      {
        exampleEn: `We can ${term} the poster together tonight.`,
        exampleJa: `今夜、一緒にポスターを${meaning}ことができます。`
      },
      {
        exampleEn: `She helped me ${term} a better routine.`,
        exampleJa: `彼女はよりよい習慣を${meaning}のを手伝ってくれました。`
      }
    ]);
  }

  if (hasAny(context, ["choose", "decide", "select", "agree", "consider", "believe", "think", "know", "understand", "remember", "learn"])) {
    return pickByTerm(term, [
      {
        exampleEn: `I need to ${term} the best time for tomorrow.`,
        exampleJa: `明日に一番よい時間を${meaning}必要があります。`
      },
      {
        exampleEn: `We should ${term} this before we buy anything.`,
        exampleJa: `何かを買う前に、これを${meaning}べきです。`
      },
      {
        exampleEn: `She helped me ${term} what to do next.`,
        exampleJa: `彼女は次に何をすべきか${meaning}のを手伝ってくれました。`
      }
    ]);
  }

  if (hasAny(context, ["pay", "buy", "sell", "cost", "charge", "spend", "save", "use", "borrow", "lend"])) {
    return pickByTerm(term, [
      {
        exampleEn: `I need to ${term} this carefully before Friday.`,
        exampleJa: `金曜日までにこれを慎重に${meaning}必要があります。`
      },
      {
        exampleEn: `Please ${term} the receipt until we get home.`,
        exampleJa: `家に着くまでレシートを${meaning}ください。`
      },
      {
        exampleEn: `We can ${term} this app every morning.`,
        exampleJa: `毎朝このアプリを${meaning}ことができます。`
      }
    ]);
  }

  if (hasAny(context, ["feel", "seem", "look", "sound", "become", "appear", "remain"])) {
    return pickByTerm(term, [
      {
        exampleEn: `The room may ${term} quiet after lunch.`,
        exampleJa: `昼食後、その部屋は静かに${meaning}かもしれません。`
      },
      {
        exampleEn: `You may ${term} tired after such a long day.`,
        exampleJa: `そんな長い一日の後では、疲れて${meaning}かもしれません。`
      },
      {
        exampleEn: `The plan can ${term} easier once we write it down.`,
        exampleJa: `書き出すと、その計画はより簡単に${meaning}ことがあります。`
      }
    ]);
  }

  return pickByTerm(term, [
    {
      exampleEn: `I need to ${term} this carefully before lunch.`,
      exampleJa: `昼食前にこれを慎重に${meaning}必要があります。`
    },
    {
      exampleEn: `Can you ${term} it when you have a minute?`,
      exampleJa: `時間がある時にそれを${meaning}もらえますか。`
    },
    {
      exampleEn: `We should ${term} it before tomorrow.`,
      exampleJa: `明日までにそれを${meaning}べきです。`
    },
    {
      exampleEn: `She helped me ${term} it after work.`,
      exampleJa: `仕事の後、彼女がそれを${meaning}のを手伝ってくれました。`
    },
    {
      exampleEn: `I forgot to ${term} it before I left home.`,
      exampleJa: `家を出る前にそれを${meaning}のを忘れました。`
    }
  ]);
}

function buildPhraseExample(item: ExampleSource): UsageExample {
  const term = item.term.trim();
  const meaning = getPrimaryMeaning(item.meaningJa);
  const rawMeaning = item.meaningJa.trim();
  const normalizedTerm = normalizeTerm(term);
  const isPhrasalVerb =
    item.pos.toLocaleLowerCase("en-US").includes("phrasal") ||
    looksLikePhrasalVerb(normalizedTerm);

  if (isPhrasalVerb) {
    return buildPhrasalVerbExample(term, meaning);
  }

  const sentenceLikeExample = buildSentenceLikePhraseExample(normalizedTerm, term, rawMeaning);
  if (sentenceLikeExample) {
    return sentenceLikeExample;
  }

  if (needsObjectAfterPhrase(normalizedTerm)) {
    const appliedMeaning = applyObjectToMeaning(meaning, "そのメッセージ");

    return pickByTerm(term, [
      {
        exampleEn: `${capitalizeFirst(term)} the message, I called her back.`,
        exampleJa: `${appliedMeaning}、彼女に折り返し電話しました。`
      },
      {
        exampleEn: `${capitalizeFirst(term)} the weather, we stayed home.`,
        exampleJa: `${applyObjectToMeaning(meaning, "天気")}、家にいました。`
      },
      {
        exampleEn: `${capitalizeFirst(term)} your schedule, Friday may work better.`,
        exampleJa: `${applyObjectToMeaning(meaning, "あなたの予定")}、金曜日の方がよさそうです。`
      }
    ]);
  }

  if (isAmountPhrase(normalizedTerm)) {
    return pickByTerm(term, [
      {
        exampleEn: `I added ${term} milk to my coffee.`,
        exampleJa: `コーヒーに${meaning}ミルクを入れました。`
      },
      {
        exampleEn: `We need ${term} time before dinner.`,
        exampleJa: `夕食前に${meaning}時間が必要です。`
      },
      {
        exampleEn: `She bought ${term} apples on the way home.`,
        exampleJa: `彼女は帰り道に${meaning}りんごを買いました。`
      }
    ]);
  }

  if (isTimeOrPlacePhrase(normalizedTerm)) {
    return pickByTerm(term, [
      {
        exampleEn: `The cafe is ${term} from my office.`,
        exampleJa: `そのカフェは職場から${meaning}です。`
      },
      {
        exampleEn: `I called my friend ${term}.`,
        exampleJa: `${meaning}友達に電話しました。`
      },
      {
        exampleEn: `We can meet ${term} if that works for you.`,
        exampleJa: `都合がよければ${meaning}会えます。`
      }
    ]);
  }

  return pickByTerm(term, [
    {
      exampleEn: `${capitalizeFirst(term)}, I left my keys at home.`,
      exampleJa: `${meaning}、家に鍵を置いてきました。`
    },
    {
      exampleEn: `${capitalizeFirst(term)}, we can try again tomorrow.`,
      exampleJa: `${meaning}、明日もう一度試せます。`
    },
    {
      exampleEn: `${capitalizeFirst(term)}, the smaller bag is easier to carry.`,
      exampleJa: `${meaning}、小さいバッグの方が持ち運びやすいです。`
    },
    {
      exampleEn: `${capitalizeFirst(term)}, I would rather leave a little early.`,
      exampleJa: `${meaning}、少し早めに出たいです。`
    }
  ]);
}

function buildPhrasalVerbExample(term: string, meaning: string): UsageExample {
  const normalizedTerm = normalizeTerm(term);

  if (hasAny(normalizedTerm, ["go on", "come back", "go back", "come out", "go out", "grow up", "turn out", "get out", "come in", "end up", "sit down", "get up", "take off", "hang out", "work out", "show up", "stand up", "go ahead", "go down", "go up", "look back", "go in", "get off", "go off", "turn back", "set out", "turn up", "hang on", "get down", "come over", "move in", "start out", "sit up", "carry on", "keep on", "stand out", "come along", "eat out", "wrap up"])) {
    return pickByTerm(term, [
      {
        exampleEn: `We can ${term} after breakfast.`,
        exampleJa: `朝食の後で${meaning}ことができます。`
      },
      {
        exampleEn: `She decided to ${term} before it got dark.`,
        exampleJa: `暗くなる前に彼女は${meaning}ことにしました。`
      },
      {
        exampleEn: `I usually ${term} when the alarm rings.`,
        exampleJa: `アラームが鳴ると、私はたいてい${meaning}ます。`
      }
    ]);
  }

  if (normalizedTerm.endsWith("with") || normalizedTerm.endsWith("for") || normalizedTerm.endsWith("of") || normalizedTerm.endsWith("on")) {
    return pickByTerm(term, [
      {
        exampleEn: `I need to ${term} my neighbor this weekend.`,
        exampleJa: `今週末、近所の人に${meaning}必要があります。`
      },
      {
        exampleEn: `Can you ${term} this problem with me?`,
        exampleJa: `この問題について一緒に${meaning}もらえますか。`
      },
      {
        exampleEn: `She had to ${term} the new schedule at work.`,
        exampleJa: `彼女は職場で新しい予定に${meaning}必要がありました。`
      }
    ]);
  }

  return pickByTerm(term, [
    {
      exampleEn: `Please ${term} your jacket before we leave.`,
      exampleJa: `出発する前に上着を${meaning}ください。`
    },
    {
      exampleEn: `I need to ${term} the receipt after dinner.`,
      exampleJa: `夕食後にレシートを${meaning}必要があります。`
    },
    {
      exampleEn: `Can you ${term} the lights when you leave?`,
      exampleJa: `出る時に電気を${meaning}もらえますか。`
    },
    {
      exampleEn: `She helped me ${term} the room on Sunday.`,
      exampleJa: `日曜日、彼女が部屋を${meaning}のを手伝ってくれました。`
    }
  ]);
}

function getPrimaryMeaning(meaningJa: string) {
  return meaningJa.split(/[、；;]/)[0]?.trim() || meaningJa.trim() || "その意味";
}

function applyObjectToMeaning(meaning: string, objectJa: string) {
  return meaning.replace(/^〜/, objectJa);
}

function buildSentenceLikePhraseExample(
  normalizedTerm: string,
  term: string,
  meaningJa: string
): UsageExample | null {
  const sentenceTerm = capitalizeFirst(term);

  if (/^what i mean is\b/.test(normalizedTerm)) {
    return {
      exampleEn: "What I mean is, we should leave a little earlier.",
      exampleJa: "私が言いたいのは、少し早めに出るべきだということです。"
    };
  }

  if (/^what are you up to\b/.test(normalizedTerm)) {
    return {
      exampleEn: "What are you up to this weekend?",
      exampleJa: "今週末は何をしていますか。"
    };
  }

  if (/^could you clarify that\b/.test(normalizedTerm)) {
    return {
      exampleEn: "Could you clarify that? We should decide after that.",
      exampleJa: "もう少し明確に説明してもらえますか。その後で決めましょう。"
    };
  }

  if (/^do you mind if\b/.test(normalizedTerm)) {
    return {
      exampleEn: "Do you mind if I sit here?",
      exampleJa: "ここに座ってもよろしいですか。"
    };
  }

  if (/^(could you|would you|can you)\b/.test(normalizedTerm)) {
    return {
      exampleEn: `${sentenceTerm}, please?`,
      exampleJa: "お願いできますか。"
    };
  }

  if (/^what\b/.test(normalizedTerm)) {
    return {
      exampleEn: `${sentenceTerm}?`,
      exampleJa: "何について聞いていますか。"
    };
  }

  if (/^i'll\b/.test(normalizedTerm)) {
    return {
      exampleEn: `${sentenceTerm} after I look at the schedule.`,
      exampleJa: "予定を見た後で、改めて連絡します。"
    };
  }

  if (/^i'm on my way\b/.test(normalizedTerm)) {
    return {
      exampleEn: "I'm on my way, so I will arrive soon.",
      exampleJa: "今向かっているので、もうすぐ着きます。"
    };
  }

  if (/^i'm running late\b/.test(normalizedTerm)) {
    return {
      exampleEn: "I'm running late, so please start without me.",
      exampleJa: "遅れそうなので、私抜きで始めてください。"
    };
  }

  if (/^i\b/.test(normalizedTerm)) {
    return {
      exampleEn: `${sentenceTerm}.`,
      exampleJa: toJapaneseSentence(meaningJa)
    };
  }

  if (/^you\b/.test(normalizedTerm)) {
    return {
      exampleEn: `${sentenceTerm}.`,
      exampleJa: toJapaneseSentence(meaningJa)
    };
  }

  if (/^(that's|that)\b/.test(normalizedTerm)) {
    return {
      exampleEn: `${sentenceTerm}.`,
      exampleJa: toJapaneseSentence(meaningJa)
    };
  }

  if (/^there you go\b/.test(normalizedTerm)) {
    return {
      exampleEn: "There you go. The file is ready.",
      exampleJa: "はいどうぞ。ファイルの準備ができました。"
    };
  }

  if (/^there's no point in\b/.test(normalizedTerm)) {
    return {
      exampleEn: "There's no point in checking the same file again.",
      exampleJa: "同じファイルをもう一度確認しても意味がありません。"
    };
  }

  if (/^chances are\b/.test(normalizedTerm)) {
    return {
      exampleEn: "Chances are, we need more time.",
      exampleJa: "おそらく、もっと時間が必要です。"
    };
  }

  if (/^long story short\b/.test(normalizedTerm)) {
    return {
      exampleEn: "Long story short, we finished the work early.",
      exampleJa: "手短に言うと、私たちは作業を早く終えました。"
    };
  }

  if (/^needless to say\b/.test(normalizedTerm)) {
    return {
      exampleEn: "Needless to say, we need accurate examples.",
      exampleJa: "言うまでもなく、正確な例文が必要です。"
    };
  }

  if (/^generally speaking\b/.test(normalizedTerm)) {
    return {
      exampleEn: "Generally speaking, this method works well.",
      exampleJa: "一般的に言えば、この方法はうまく機能します。"
    };
  }

  return null;
}

function toJapaneseSentence(meaningJa: string) {
  const sentence = meaningJa
    .split(/[；;]/)[0]
    .replace(/〜/g, "そう")
    .trim();
  return /[。？！]$/.test(sentence) ? sentence : `${sentence}。`;
}

function capitalizeFirst(value: string) {
  return value.charAt(0).toLocaleUpperCase("en-US") + value.slice(1);
}

function needsObjectAfterPhrase(term: string) {
  return /\b(according to|apart from|as for|as opposed to|based on|because of|due to|for the sake of|in accordance with|in addition to|in case of|in contrast to|in favor of|in relation to|in response to|in spite of|in terms of|instead of|on behalf of|regardless of|thanks to|with regard to|with the exception of)$/.test(
    term
  );
}

function isAmountPhrase(term: string) {
  return /^(a bit of|a couple of|a lot of|all sorts of|plenty of)$/.test(term);
}

function isTimeOrPlacePhrase(term: string) {
  return /^(at the moment|for now|so far|these days|the other day|right now|in the meantime|for the time being|on the way|by the time|in time|on time|ahead of time|at the last minute|day to day|in person|on your own|in front of|around the corner|next door|out of town|on board|on the road|for sale|in stock|out of stock|sold out|to go)$/.test(
    term
  );
}

function hasAny(value: string, needles: readonly string[]) {
  return needles.some((needle) => {
    const pattern = new RegExp(`\\b${escapeRegExp(needle)}\\b`);
    return pattern.test(value);
  });
}

function pickByTerm<T>(term: string, choices: readonly T[]) {
  return choices[hashTerm(term) % choices.length];
}

function hashTerm(term: string) {
  let hash = 0;

  for (let index = 0; index < term.length; index += 1) {
    hash = (hash * 31 + term.charCodeAt(index)) >>> 0;
  }

  return hash;
}

function looksLikePhrasalVerb(term: string) {
  const [verb, particle] = term.split(" ");
  const phrasalVerbs = new Set([
    "back",
    "break",
    "bring",
    "build",
    "call",
    "carry",
    "catch",
    "check",
    "clean",
    "come",
    "cut",
    "end",
    "figure",
    "fill",
    "find",
    "get",
    "give",
    "go",
    "grow",
    "hang",
    "hold",
    "keep",
    "lay",
    "line",
    "look",
    "make",
    "move",
    "open",
    "pay",
    "pick",
    "point",
    "pull",
    "put",
    "reach",
    "run",
    "send",
    "set",
    "show",
    "shut",
    "sit",
    "slow",
    "stand",
    "start",
    "step",
    "take",
    "throw",
    "turn",
    "wake",
    "wind",
    "work",
    "write"
  ]);
  const particles = new Set([
    "about",
    "across",
    "ahead",
    "along",
    "around",
    "away",
    "back",
    "down",
    "in",
    "off",
    "on",
    "out",
    "over",
    "through",
    "up"
  ]);

  return Boolean(verb && particle && phrasalVerbs.has(verb) && particles.has(particle));
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeTerm(term: string) {
  return term.trim().toLocaleLowerCase("en-US").replace(/[’‘]/g, "'").replace(/\s+/g, " ");
}
