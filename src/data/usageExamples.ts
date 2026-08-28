import type { VocabularySeedItem } from "../types";

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
    exampleEn: "You may be supposed to sign here.",
    exampleJa: "ここに署名することになっているかもしれません。"
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
  const override = FUNCTION_WORD_EXAMPLES[normalizedTerm] ?? PHRASE_EXAMPLES[normalizedTerm];

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
  const pos = item.pos.toLocaleLowerCase("en-US");

  if (pos.includes("noun")) {
    return {
      exampleEn: `The ${term} was important in the discussion.`,
      exampleJa: `その${meaning}は話し合いで重要でした。`
    };
  }

  if (pos.includes("adjective")) {
    return {
      exampleEn: `This situation seems ${term}.`,
      exampleJa: `この状況は${meaning}ように思えます。`
    };
  }

  if (pos.includes("adverb")) {
    return {
      exampleEn: `She explained the answer ${term}.`,
      exampleJa: `彼女は答えを${meaning}説明しました。`
    };
  }

  if (pos.includes("verb")) {
    return {
      exampleEn: `It is useful to know how to ${term} in real situations.`,
      exampleJa: `実際の場面で${meaning}方法を知っておくと役に立ちます。`
    };
  }

  return {
    exampleEn: `I saw "${term}" in today's lesson.`,
    exampleJa: `今日の授業で「${term}（${meaning}）」を見ました。`
  };
}

function buildPhraseExample(item: ExampleSource): UsageExample {
  const term = item.term.trim();
  const meaning = getPrimaryMeaning(item.meaningJa);
  const rawMeaning = item.meaningJa.trim();
  const normalizedTerm = normalizeTerm(term);
  const isPhrasalVerb =
    item.pos.toLocaleLowerCase("en-US").includes("phrasal") ||
    /^(back|break|bring|build|call|carry|catch|check|clean|come|cut|end|figure|fill|find|get|give|go|grow|hang|hold|keep|lay|line|look|make|move|open|pay|pick|point|pull|put|reach|run|send|set|show|shut|sit|slow|stand|start|step|take|throw|turn|wake|wind|work|write)\s/.test(
      normalizedTerm
    );

  if (isPhrasalVerb) {
    return {
      exampleEn: `We need to ${term} before the meeting starts.`,
      exampleJa: `会議が始まる前に${meaning}必要があります。`
    };
  }

  const sentenceLikeExample = buildSentenceLikePhraseExample(normalizedTerm, term, rawMeaning);
  if (sentenceLikeExample) {
    return sentenceLikeExample;
  }

  if (needsObjectAfterPhrase(normalizedTerm)) {
    const appliedMeaning = applyObjectToMeaning(meaning, "新しい計画");

    return {
      exampleEn: `${capitalizeFirst(term)} the new plan, we need more details.`,
      exampleJa: `${appliedMeaning}、もっと詳しい情報が必要です。`
    };
  }

  return {
    exampleEn: `${capitalizeFirst(term)}, we should check the details.`,
    exampleJa: `${meaning}、詳細を確認すべきです。`
  };
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
      exampleEn: "What I mean is, we should check the details.",
      exampleJa: "私が言いたいのは、詳細を確認すべきだということです。"
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
      exampleEn: `${sentenceTerm} after I check the details.`,
      exampleJa: "詳しく確認した後で、改めて連絡します。"
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

function normalizeTerm(term: string) {
  return term.trim().toLocaleLowerCase("en-US").replace(/[’‘]/g, "'").replace(/\s+/g, " ");
}
