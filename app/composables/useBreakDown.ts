import { ref } from "vue";

interface ChatMessage {
  role: string;
  content: string;
}

export function useBreakDown() {
  const baseHistory = [
    {
      role: "system",
      content: `You are an intelligent and helpful AI language assistant, designed to break down and explain concepts in Japanese. When given multiple lines of Japanese lyrics (one line terminated with '\\n'), respond by breaking down phrase in the line into a JSON array. Each element of the array should represent one line and include a key-value pair for each vocabulary item in that line only. Ensure that:
				1. Only the JSON array is returned. No useless words such as "Here's a breakdown or your input...". No markdown as well please. Just the array. Or else the frontend parsing it will crash.
				2. Each key represents a unique vocabulary item in the input.
				3. The value is the definition, including its hiragana and meaning.
				4. The final key in each object is 'translation', providing an English translation of the line.
				5. Avoid repeating the same key within an object, even if the word appears multiple times.
				6. Break down each line separately and create a new object for each.
        7. Do not attempt to combine multiple lines into a single object even if its a part of the same sentence. for example: '貴方も私も秘密の花を\\n咲かせて笑う怪物だね' should be broken down into two objects, one for each line.
        8. '\\n' will be used to indicate a new line in the input. YOU WILL ALWAYS START A NEW OBJECT AFTER A '\\n' IN THE INPUT. NO EXCEPTIONS. Failure to do so, will cause desync in the frontend and the breakdown will be incorrect.
        9. If the sentence in that line is a part of a larger sentence, you can ignore the larger sentence and just focus on the line itself.
        `,
    },
    {
      role: "assistant",
      content:
        "Hello! Please provide the Japanese sentence or lyrics you'd like me to break down, and I'll format it for you.",
    },
    {
      role: "user",
      content: `荒んで 荒んで 予測不可能な回答\\n曜日すら分かってない 今日を生きぬくことで痛いくらい\\n第二ボタンをはずしながら言う\\n「最後だからいいよ」 って\\n卒業の日の教室はどこか\\n寂し気な顔をしている\\n返事はいらないからさ\\n二人のストーリー\\nあげちゃおうよ\\n振り返る通いなれた道も\\n懐かしくなってしまうんだろう\\n春に置いて行く\\n恋焦がれた日々\\n貴方も私も秘密の花を\\n咲かせて笑う怪物だね\\nくすぐりあって転げ合って\\nなんて夢はもう終わりにしよう"
			`,
    },
    {
      role: "assistant",
      content: `[
						{
								"荒んで": "すさんで - to become desolate or rough",
								"予測不可能": "よそくふかのう - unpredictable",
								"回答": "かいとう - response, answer",
								"translation": "Becoming rough, unpredictable responses"
						},
						{
								"曜日": "ようび - day of the week",
								"すら": "even (particle indicating emphasis)",
								"分かってない": "わかってない - not understanding",
								"今日": "きょう - today",
								"生きぬく": "いきぬく - to survive, to live through",
								"ことで": "by doing (nominalizer + particle)",
								"痛いくらい": "いたいくらい - painfully, to the point of pain",
								"translation": "Not even knowing the day of the week, painfully surviving through today"		
						},
            {
                "第二ボタン": "だいにぼたん - second button",
                "を": "object marker",
                "はずしながら": "while unbuttoning",
                "言う": "いう - to say",
                "translation": "Saying while unbuttoning the second button"
            },
            {
                "「最後だからいいよ」": "「さいごだからいいよ」 - \"It's okay because it's the last time.\"",
                "って": "quotation particle",
                "translation": "\"It's okay because it's the last time.\""
            },
            {
                "卒業": "そつぎょう - graduation",
                "の": "possessive particle",
                "日": "ひ - day",
                "教室": "きょうしつ - classroom",
                "どこか": "somewhere",
                "translation": "The graduation day classroom is somewhere..."
            },
            {
                "寂し気": "さびしげ - lonely-looking",
                "な": "adjectival particle",
                "顔": "かお - face",
                "している": "is doing",
                "translation": "...wearing a lonely expression."
            },
            {
                "返事": "へんじ - reply",
                "は": "topic marker",
                "いらない": "not needed",
                "から": "because",
                "さ": "casual sentence ending particle",
                "translation": "Because a reply isn't necessary..."
            }
            {
                "二人": "ふたり - two people",
                "の": "possessive particle",
                "ストーリー": "story",
                "translation": "...our story..."
            },
            {
                "あげちゃおう": "to give",
                "よ": "casual sentence ending particle",
                "translation": "...let's give them away."
            },
            {
                "振り返る": "ふりかえる - to look back",
                "通いなれた": "かよいなれた - familiar",
                "道": "みち - road",
                "も": "also",
                "translation": "Looking back, the familiar road also..."
            },
            {
                "懐かしく": "なつかしく - nostalgically",
                "なってしまう": "become",
                "んだろう": "casual question",
                "translation": "...becoming nostalgic, I wonder."
            }.
            {
                "春": "はる - spring",
                "に": "in",
                "置いて行く": "おいていく - to leave behind",
                "translation": "Leaving behind in spring..."
            },
            {
                "恋焦がれた": "こいこがれた - yearned for",
                "日々": "ひび - days",
                "translation": "...the days yearned for love."
            },
            {
                "貴方": "あなた - you",
                "も": "also",
                "私": "わたし - I",
                "秘密": "ひみつ - secret
                "の": "possessive particle",
                "花": "はな - flower",
                "を": "object marker",
                "translation": "You and I, the secret flowers..."
            },
            {
                "咲かせて": "さかせて - to bloom",
                "笑う": "わらう - to laugh",
                "怪物": "かいぶつ - monster",
                "だ": "is",
                "ね": "casual sentence ending particle",
                "translation": "...bloom and laugh, we're monsters, right?"
            },
            {
                "くすぐりあって": "to tickle",
                "転げ合って": "to roll around",
                "translation": "Tickling and rolling around..."
            },
            {
                "なんて": "such as",
                "夢": "ゆめ - dream",
                "は": "topic marker",
                "もう": "already",
                "終わり": "おわり - end",
                "に": "to",
                "しよう": "let's do",
                "translation": "...such as dreams, let's end already."
            } 
				]`,
    },
  ];

  async function getBreakDown(message: string) {
    const runningHistory = [
      ...baseHistory,
      {
        role: "user",
        content: message.replace(/\n/g, "\\n"),
      },
    ];

    try {
      const response = await fetch("/api/breakdown", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ history: runningHistory }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Breakdown error: ", error);
      return;
    }
  }

  return {
    getBreakDown,
  };
}
