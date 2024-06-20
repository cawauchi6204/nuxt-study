import type { Member } from "@/interfaces";
import { createMemberList } from "@/membersDB";
// 本来なら、配列やオブジェクトをそのままリターンしても、
// サーバAPIエンドポイントの送信データとしては機能せず、
// 通常は、JSON.stringify()メソッドを利用してJSONデータ化する必要があります。
// これが、defineEventHandler()内では不要であり、単に配列やオブジェクトをリターンするだけで、
// 自動でJSONデータ化されるようになっています。

// export defaultにする
// eventはhttpに関するイベントオブジェクト
export default defineEventHandler((event): Member[] => {
  //membersDB.tsを利用して会員リスト情報Mapオブジェクトを生成。
  const memberList = createMemberList();
  //会員リスト情報Mapオブジェクトの値部分を取得。
  const memberListValues = memberList.values();
  //会員リスト情報Mapオブジェクトの値部分を配列に変換。
  const memberListArray = Array.from(memberListValues);
  //会員リスト情報配列をリターン。
  return memberListArray;
});
