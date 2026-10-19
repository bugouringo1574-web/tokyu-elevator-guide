/**
 * 東急東横線・大井町線 駅＆エレベーター詳細データベース
 * 自由研究・現地調査にも使える詳細なバリアフリー・構造データ
 */

const TOKYU_LINES = {
  toyoko: {
    id: 'toyoko',
    name: '東急東横線',
    shortName: '東横線',
    color: '#DA0442',
    accent: '#ff2e63',
    textColor: '#ffffff',
    symbol: 'TY'
  },
  oimachi: {
    id: 'oimachi',
    name: '東急大井町線',
    shortName: '大井町線',
    color: '#F39700',
    accent: '#ffaa00',
    textColor: '#ffffff',
    symbol: 'OM'
  }
};

const STATIONS_DATA = [
  {
    id: 'jiyugaoka',
    name: '自由が丘',
    kana: 'じゆうがおか',
    code: 'TY07 / OM10',
    lines: ['toyoko', 'oimachi'],
    structure: '立体交差型（1F: 大井町線ホーム / 2F: 東横線ホーム）',
    centerLat: 35.607421,
    centerLng: 139.669835,
    summary: '東横線と大井町線が直交する要衝駅。1階に大井町線、2階に東横線があります。北口にはエレベーターやスロープがないため、正面口か南口を利用するのが鉄則です！',
    researchNotes: '【自由研究ポイント】北口には階段しかありません。車椅子やベビーカーで北口側に行きたい時は、正面口から外の道路を回る必要があります。駅の構造を観察してみよう！',
    elevators: [
      {
        id: 'jiyugaoka-ev-front',
        name: '正面口 地上エレベーター＆スロープ',
        type: 'ground_to_gate',
        floor: '地上 ⇄ 正面改札口（1F）',
        lat: 35.60755,
        lng: 139.66970,
        addressDescription: '正面口タクシーロータリー横（みずほ銀行側）',
        routeSteps: [
          '正面口ロータリーのみずほ銀行側スロープを進みます。',
          '段差なしで正面改札口（1階）へ入れます。',
          '改札通過後、正面左奥の各ホーム行きエレベーターへ進みます。'
        ],
        targetPlatforms: '大井町線（1・2番線）/ 東横線（3〜6番線）すべて',
        features: ['地上スロープ直結', '幅広改札あり', '多機能トイレ至近', '点字ブロック完備'],
        researchItems: {
          hasRamp: true,
          wheelchairFriendly: true,
          strollerFriendly: true,
          braille: true,
          doorWidthCm: 90,
          capacity: '11人乗り'
        }
      },
      {
        id: 'jiyugaoka-ev-south',
        name: '南口 地上スロープ通路',
        type: 'ground_to_gate',
        floor: '地上（マリ・クレール通り） ⇄ 南改札口（1F）',
        lat: 35.60695,
        lng: 139.66885,
        addressDescription: '南口改札外（マリ・クレール通り側）',
        routeSteps: [
          'マリ・クレール通り側から南改札口へなだらかなスロープで入れます。',
          '南改札を通ると、大井町線1番線ホームへ直接スロープで接続しています。',
          '東横線ホームへ行く場合は改札内の連絡エレベーターを利用します。'
        ],
        targetPlatforms: '大井町線1番線直通 / 東横線ホームへのEV連絡',
        features: ['スロープ通路', 'マリ・クレール通り直結', '段差ゼロ'],
        researchItems: {
          hasRamp: true,
          wheelchairFriendly: true,
          strollerFriendly: true,
          braille: true,
          doorWidthCm: 100,
          capacity: 'スロープ通路'
        }
      },
      {
        id: 'jiyugaoka-ev-ty-up',
        name: '改札内 東横線上り（渋谷方面）エレベーター',
        type: 'gate_to_platform',
        floor: '1Fコンコース ⇄ 2F 東横線5・6番線ホーム',
        lat: 35.60742,
        lng: 139.66983,
        addressDescription: '正面改札を入って中央奥',
        routeSteps: [
          '正面改札を入って中央通路を進みます。',
          '左手に見えるエレベーターで2階（5・6番線）へ上がります。',
          'ホーム中央（4・5号車付近）に到着します。'
        ],
        targetPlatforms: '東横線 5・6番線（渋谷・池袋・川越方面）',
        features: ['車椅子対応押しボタン', '防犯窓付き', '鏡あり', '両側ドア'],
        researchItems: {
          hasRamp: true,
          wheelchairFriendly: true,
          strollerFriendly: true,
          braille: true,
          doorWidthCm: 90,
          capacity: '13人乗り'
        }
      },
      {
        id: 'jiyugaoka-ev-ty-down',
        name: '改札内 東横線下り（横浜方面）エレベーター',
        type: 'gate_to_platform',
        floor: '1Fコンコース ⇄ 2F 東横線3・4番線ホーム',
        lat: 35.60738,
        lng: 139.66980,
        addressDescription: '正面改札を入って右手奥',
        routeSteps: [
          '正面改札を入って右手側の通路を進みます。',
          '東横線下りホーム行きエレベーターで2階へ上がります。',
          'ホーム中央（4・5号車付近）に到着します。'
        ],
        targetPlatforms: '東横線 3・4番線（武蔵小杉・横浜・元町・中華街方面）',
        features: ['車椅子対応押しボタン', '鏡あり', '音声案内'],
        researchItems: {
          hasRamp: true,
          wheelchairFriendly: true,
          strollerFriendly: true,
          braille: true,
          doorWidthCm: 90,
          capacity: '13人乗り'
        }
      }
    ]
  },
  {
    id: 'nakameguro',
    name: '中目黒',
    kana: 'なかめぐろ',
    code: 'TY03',
    lines: ['toyoko'],
    structure: '高架駅（1F: 改札・コンコース / 2F: ホーム）',
    centerLat: 35.644287,
    centerLng: 139.698941,
    summary: '東横線と東京メトロ日比谷線が同じホームで乗り換えできる便利な高架駅。正面改札と南改札の2ヶ所に地上出入口があります。',
    researchNotes: '【自由研究ポイント】東横線と地下鉄の日比谷線が同じ2階ホームに並んでいます。エレベーターで上がれば階段なしで別会社の電車に乗り換えできる仕組みを調べてみよう！',
    elevators: [
      {
        id: 'nakameguro-ev-front',
        name: '正面改札口 地上エレベーター（山手通り側）',
        type: 'ground_to_gate',
        floor: '地上（山手通り） ⇄ 正面改札口（1F）',
        lat: 35.64438,
        lng: 139.69905,
        addressDescription: '山手通り・目黒川方面の正面口横',
        routeSteps: [
          '山手通りの正面改札口前はフラットで段差がありません。',
          '正面改札からそのままスムーズに入場できます。',
          '改札内に入ると、各ホーム行きエレベーターが目の前にあります。'
        ],
        targetPlatforms: '全ホーム（1〜4番線）',
        features: ['段差なし完全フラット', '目黒川散策直結', '幅広自動改札'],
        researchItems: {
          hasRamp: true,
          wheelchairFriendly: true,
          strollerFriendly: true,
          braille: true,
          doorWidthCm: 100,
          capacity: '地上フラット直結'
        }
      },
      {
        id: 'nakameguro-ev-platform1-2',
        name: '改札内 1・2番線ホーム行きエレベーター',
        type: 'gate_to_platform',
        floor: '1Fコンコース ⇄ 2F 下りホーム（東横線横浜方面・日比谷線終点）',
        lat: 35.64425,
        lng: 139.69890,
        addressDescription: '正面改札入って右手',
        routeSteps: [
          '正面改札を通り、右手奥のエレベーターへ向かいます。',
          'エレベーターで2階ホームへ上がります。',
          '1番線（東横線下り横浜方面）と2番線（日比谷線降車ホーム）の中央に出ます。'
        ],
        targetPlatforms: '1・2番線（東横線横浜方面・日比谷線降車）',
        features: ['音声案内', 'シースルーガラス', '低位置押しボタン'],
        researchItems: {
          hasRamp: true,
          wheelchairFriendly: true,
          strollerFriendly: true,
          braille: true,
          doorWidthCm: 90,
          capacity: '11人乗り'
        }
      },
      {
        id: 'nakameguro-ev-platform3-4',
        name: '改札内 3・4番線ホーム行きエレベーター',
        type: 'gate_to_platform',
        floor: '1Fコンコース ⇄ 2F 上りホーム（日比谷線北千住方面・東横線渋谷方面）',
        lat: 35.64430,
        lng: 139.69910,
        addressDescription: '正面改札入って左手',
        routeSteps: [
          '正面改札を通り、左手のエレベーターへ向かいます。',
          '2階へ上がると、日比谷線（3番線）と東横線上り渋谷方面（4番線）のホームです。'
        ],
        targetPlatforms: '3・4番線（日比谷線始発・東横線上り渋谷方面）',
        features: ['音声案内', '鏡あり', '点字案内板'],
        researchItems: {
          hasRamp: true,
          wheelchairFriendly: true,
          strollerFriendly: true,
          braille: true,
          doorWidthCm: 90,
          capacity: '11人乗り'
        }
      }
    ]
  },
  {
    id: 'ookayama',
    name: '大岡山',
    kana: 'おおおかやま',
    code: 'OM08 / MG06',
    lines: ['oimachi'],
    structure: '地下駅＋駅上病院直結（1F: 改札・東急病院 / B1F: ホーム）',
    centerLat: 35.607589,
    centerLng: 139.685711,
    summary: '目黒線と大井町線が交差する地下駅。駅の真上に「東急病院」が建っている全国でも珍しい構造です。完全バリアフリー化が進んでいます。',
    researchNotes: '【自由研究ポイント】電車の線路が地下を走っていて、駅の上に大きな病院が建っています！病院に行く人のためにエレベーターがとても使いやすく設計されています。病院直結エレベーターを探してみよう！',
    elevators: [
      {
        id: 'ookayama-ev-hospital',
        name: '中央口 東急病院・駅前広場直結エレベーター',
        type: 'ground_to_gate',
        floor: '地上（駅前広場） ⇄ 東急病院 ⇄ 改札階（1F）',
        lat: 35.60765,
        lng: 139.68580,
        addressDescription: '中央口駅前広場（東工大正門前側）',
        routeSteps: [
          '駅前広場から段差なく中央改札口へアプローチできます。',
          '東急病院のエレベーターホールと駅改札が同じフロアで直結しています。',
          '地下ホームへは改札内のエレベーターを使用します。'
        ],
        targetPlatforms: '全方面（地下ホーム）',
        features: ['病院直結バリアフリー', '段差なしフラット', '広い通路'],
        researchItems: {
          hasRamp: true,
          wheelchairFriendly: true,
          strollerFriendly: true,
          braille: true,
          doorWidthCm: 100,
          capacity: '大型ストレッチャー対応'
        }
      },
      {
        id: 'ookayama-ev-platform1-2',
        name: '改札内 1・2番線ホーム行きエレベーター',
        type: 'gate_to_platform',
        floor: '1F改札内コンコース ⇄ B1F ホーム（目黒線下り・大井町線下り）',
        lat: 35.60750,
        lng: 139.68565,
        addressDescription: '中央改札を入って右手',
        routeSteps: [
          '中央改札を入り、右側のエレベーターに乗ります。',
          '地下1階へ降りると、1番線（目黒線日吉方面）と2番線（大井町線溝の口方面）のホームです。'
        ],
        targetPlatforms: '1・2番線（日吉・二子玉川・溝の口方面）',
        features: ['地下直通', '点字案内', '車椅子対応'],
        researchItems: {
          hasRamp: true,
          wheelchairFriendly: true,
          strollerFriendly: true,
          braille: true,
          doorWidthCm: 90,
          capacity: '11人乗り'
        }
      },
      {
        id: 'ookayama-ev-platform3-4',
        name: '改札内 3・4番線ホーム行きエレベーター',
        type: 'gate_to_platform',
        floor: '1F改札内コンコース ⇄ B1F ホーム（大井町線上り・目黒線上り）',
        lat: 35.60755,
        lng: 139.68575,
        addressDescription: '中央改札を入って左手',
        routeSteps: [
          '中央改札を入り、左側のエレベーターに乗ります。',
          '地下1階へ降りると、3番線（大井町方面）と4番線（目黒・南北線・三田線方面）のホームです。'
        ],
        targetPlatforms: '3・4番線（大井町・目黒・都心方面）',
        features: ['地下直通', '防犯窓', '音声ガイド'],
        researchItems: {
          hasRamp: true,
          wheelchairFriendly: true,
          strollerFriendly: true,
          braille: true,
          doorWidthCm: 90,
          capacity: '11人乗り'
        }
      }
    ]
  },
  {
    id: 'musashikosugi',
    name: '武蔵小杉',
    kana: 'むさしこすぎ',
    code: 'TY11 / MG11',
    lines: ['toyoko'],
    structure: '高架・立体複合駅（1F: 改札 / 2F: JR連絡通路 / 3F: ホーム / 4F: 東急スクエア連絡口）',
    centerLat: 35.575912,
    centerLng: 139.659648,
    summary: 'タワーマンションが立ち並ぶ巨大ターミナル。商業施設「武蔵小杉東急スクエア」と直結しており、東急スクエア内の大型エレベーターも活用できます。',
    researchNotes: '【自由研究ポイント】地上、商業施設（4階）、電車のホーム（3階）、JR乗り換え通路（2階）と何層にも分かれています！エレベーターがどの階に止まるかボタンの案内板を調べてみよう！',
    elevators: [
      {
        id: 'musashikosugi-ev-square',
        name: '東急スクエア連絡 地上大型エレベーター',
        type: 'ground_to_gate',
        floor: '1F地上 ⇄ 2F JR連絡通路 ⇄ 4F 東急スクエア連絡改札口',
        lat: 35.57610,
        lng: 139.65980,
        addressDescription: '東急スクエア1階入口横（西口広場側）',
        routeSteps: [
          '西口バスロータリー側、東急スクエア1階入口のエレベーターに乗ります。',
          '4階へ上がると「東急スクエア連絡改札口」に直結しています。',
          '改札を通ってそのままホーム（3階）へ降りるエレベーターへ乗り継げます。'
        ],
        targetPlatforms: '全ホーム（東横線・目黒線）',
        features: ['大型定員（ベビーカー複数台可）', '商業施設直結', '雨に濡れない'],
        researchItems: {
          hasRamp: true,
          wheelchairFriendly: true,
          strollerFriendly: true,
          braille: true,
          doorWidthCm: 110,
          capacity: '24人乗り（大型）'
        }
      },
      {
        id: 'musashikosugi-ev-south',
        name: '南口改札外 地上エレベーター',
        type: 'ground_to_gate',
        floor: '地上 ⇄ 1F南改札口',
        lat: 35.57550,
        lng: 139.65940,
        addressDescription: '南口駅前広場（こすぎコアパーク側）',
        routeSteps: [
          'こすぎコアパークから平坦な舗装路で南改札口に入れます。',
          '南口改札内コンコースから各ホームへエレベーターが直結しています。'
        ],
        targetPlatforms: '東横線・目黒線 各ホーム',
        features: ['公園直結', '段差なしフラット', '広々コンコース'],
        researchItems: {
          hasRamp: true,
          wheelchairFriendly: true,
          strollerFriendly: true,
          braille: true,
          doorWidthCm: 100,
          capacity: '地上フラット直結'
        }
      },
      {
        id: 'musashikosugi-ev-platform1-2',
        name: '改札内 東横線・目黒線下りホーム行きエレベーター',
        type: 'gate_to_platform',
        floor: '1F改札内コンコース ⇄ 3F ホーム（下り横浜・日吉・新横浜方面）',
        lat: 35.57585,
        lng: 139.65955,
        addressDescription: '南改札内コンコース中央',
        routeSteps: [
          '南改札を通り、中央エレベーターで3階ホームへ上がります。',
          '1番線（東横線下り）および2番線（目黒線下り）のホーム中央に到着します。'
        ],
        targetPlatforms: '1・2番線（横浜・新横浜・新横浜線直通方面）',
        features: ['2方向ドア', '車椅子低位置ボタン', '音声ガイダンス'],
        researchItems: {
          hasRamp: true,
          wheelchairFriendly: true,
          strollerFriendly: true,
          braille: true,
          doorWidthCm: 90,
          capacity: '13人乗り'
        }
      }
    ]
  },
  {
    id: 'futakotamagawa',
    name: '二子玉川',
    kana: 'ふたこたまがわ',
    code: 'OM15 / DT07',
    lines: ['oimachi'],
    structure: '高架駅（1F: 改札口・バスロータリー / 2F: ホーム）',
    centerLat: 35.611723,
    centerLng: 139.626743,
    summary: '田園都市線と大井町線が並ぶ広大な駅。二子玉川ライズや高島屋と直結しており、改札外も改札内もエレベーターやスロープが非常に充実しています。',
    researchNotes: '【自由研究ポイント】ベビーカーを押した親子連れがとても多い駅です。二子玉川ライズへの連絡通路や高島屋へのルートがすべて段差なしで作られています。街全体と駅のバリアフリー設計を調べてみよう！',
    elevators: [
      {
        id: 'futakotamagawa-ev-rise',
        name: '東口 ライズショッピングセンター連絡エレベーター',
        type: 'ground_to_gate',
        floor: '1F改札口 ⇄ 2F ライズ連絡デッキ ⇄ バスターミナル',
        lat: 35.61190,
        lng: 139.62720,
        addressDescription: '改札口を出て右手、ライズガレリア入口',
        routeSteps: [
          '改札口を出て東口（右手）へ進みます。',
          'ライズガレリアの大型シースルーエレベーターで2階歩行者デッキへ直通できます。',
          '映画館や蔦屋家電方面へも段差なしで移動できます。'
        ],
        targetPlatforms: '改札外〜街連絡',
        features: ['超大型エレベーター', 'シースルーガラス', '開放感抜群'],
        researchItems: {
          hasRamp: true,
          wheelchairFriendly: true,
          strollerFriendly: true,
          braille: true,
          doorWidthCm: 120,
          capacity: '24人乗り'
        }
      },
      {
        id: 'futakotamagawa-ev-platform1-2',
        name: '改札内 1・2番線ホーム行きエレベーター',
        type: 'gate_to_platform',
        floor: '1F改札内コンコース ⇄ 2F 大井町線・田園都市線下りホーム',
        lat: 35.61165,
        lng: 139.62660,
        addressDescription: '改札を通って右手側',
        routeSteps: [
          '広い集中改札を通り、右手のエレベーターに乗ります。',
          '2階へ上がると、1・2番線ホーム（中央林間・溝の口方面）に到着します。'
        ],
        targetPlatforms: '1・2番線（大井町線終点・田園都市線下り）',
        features: ['車椅子対応', '点字案内', '両側ドア'],
        researchItems: {
          hasRamp: true,
          wheelchairFriendly: true,
          strollerFriendly: true,
          braille: true,
          doorWidthCm: 90,
          capacity: '13人乗り'
        }
      },
      {
        id: 'futakotamagawa-ev-platform3-4',
        name: '改札内 3・4番線ホーム行きエレベーター',
        type: 'gate_to_platform',
        floor: '1F改札内コンコース ⇄ 2F 大井町線始発・田園都市線上りホーム',
        lat: 35.61175,
        lng: 139.62680,
        addressDescription: '改札を通って左手側',
        routeSteps: [
          '改札を通り左手のエレベーターで2階へ上がります。',
          '4番線（大井町線始発・大井町方面）と3番線（田園都市線上り渋谷方面）のホームに出ます。'
        ],
        targetPlatforms: '3・4番線（大井町線大井町方面・田園都市線上り）',
        features: ['幅広ドア', '防犯窓', '音声ガイダンス'],
        researchItems: {
          hasRamp: true,
          wheelchairFriendly: true,
          strollerFriendly: true,
          braille: true,
          doorWidthCm: 90,
          capacity: '13人乗り'
        }
      }
    ]
  },
  {
    id: 'shibuya',
    name: '渋谷',
    kana: 'しぶや',
    code: 'TY01',
    lines: ['toyoko'],
    structure: '超深層地下駅（B5F: 東横線・副都心線ホーム / B3F: 改札口 / 地上各施設直結）',
    centerLat: 35.659108,
    centerLng: 139.702758,
    summary: '東横線は地下5階にホームがある超深層駅！地上からホームまでエレベーターを乗り継ぐ必要があります。渋谷ヒカリエ口やスクランブルスクエア口のエレベーターが最もスムーズです。',
    researchNotes: '【自由研究ポイント】東横線のホームはなんと地下5階（深さ約30メートル）にあります！地上から改札、改札からホームへエレベーターが何本も動いています。一番迷いやすい駅なので、ルート案内が一番活躍する駅です！',
    elevators: [
      {
        id: 'shibuya-ev-hikarie',
        name: '渋谷ヒカリエ1階 地上連絡エレベーター',
        type: 'ground_to_gate',
        floor: '1F地上 ⇄ B3F ヒカリエ改札口',
        lat: 35.65905,
        lng: 139.70320,
        addressDescription: '渋谷ヒカリエ1階オフィス・劇場エントランス横',
        routeSteps: [
          '渋谷ヒカリエ1階の専用エレベーターに乗ります。',
          '地下3階の「ヒカリエ改札口」フロアへ一気に直行できます。',
          'ヒカリエ改札口を入ると、すぐ目の前に地下5階ホーム直通エレベーターがあります！'
        ],
        targetPlatforms: '東横線・副都心線 全ホーム（3〜6番線）',
        features: ['地下3階直通', '雨に濡れない', '大型高速エレベーター'],
        researchItems: {
          hasRamp: true,
          wheelchairFriendly: true,
          strollerFriendly: true,
          braille: true,
          doorWidthCm: 110,
          capacity: '24人乗り'
        }
      },
      {
        id: 'shibuya-ev-scramble',
        name: '渋谷スクランブルスクエア 地上連絡エレベーター',
        type: 'ground_to_gate',
        floor: '1F東口広場 ⇄ B2F/B3F 改札コンコース',
        lat: 35.65860,
        lng: 139.70250,
        addressDescription: 'スクランブルスクエア東口歩行者広場',
        routeSteps: [
          'スクランブルスクエア東口の屋外エレベーターで地下へ降ります。',
          '地下3階改札口（宮益坂中央改札）へ段差なしでアプローチできます。'
        ],
        targetPlatforms: '東横線・副都心線 全ホーム',
        features: ['最新大型', '車椅子対応', 'ガラス張り'],
        researchItems: {
          hasRamp: true,
          wheelchairFriendly: true,
          strollerFriendly: true,
          braille: true,
          doorWidthCm: 110,
          capacity: '20人乗り'
        }
      },
      {
        id: 'shibuya-ev-platform-direct',
        name: 'ヒカリエ改札内 地下5階ホーム直通エレベーター',
        type: 'gate_to_platform',
        floor: 'B3F ヒカリエ改札内 ⇄ B5F ホーム（3〜6番線）',
        lat: 35.65910,
        lng: 139.70280,
        addressDescription: 'ヒカリエ改札を入ってすぐ正面',
        routeSteps: [
          'ヒカリエ改札口を入るとすぐ目の前にあるエレベーターです。',
          'B3Fからエスカレーターを使わず、一気にB5Fのホームへ降りることができます。',
          '横浜方面（3・4番線）と池袋・和光市方面（5・6番線）へ通じています。'
        ],
        targetPlatforms: '3・4番線（東横線下り） / 5・6番線（上り）',
        features: ['超深層直通', '大型', '点字・音声完備'],
        researchItems: {
          hasRamp: true,
          wheelchairFriendly: true,
          strollerFriendly: true,
          braille: true,
          doorWidthCm: 100,
          capacity: '18人乗り'
        }
      }
    ]
  },
  {
    id: 'oimachi',
    name: '大井町',
    kana: 'おおいまち',
    code: 'OM01',
    lines: ['oimachi'],
    structure: '地上終着駅（2F: ホーム・改札口 / 1F: バスロータリー・JR乗り換え）',
    centerLat: 35.606822,
    centerLng: 139.734419,
    summary: '大井町線の起点駅。東急線のホームは高架2階にあり、JR京浜東北線やりんかい線、イトーヨーカドー、アトレ大井町と連絡しています。',
    researchNotes: '【自由研究ポイント】終点の駅（頭端式ホーム）なので、改札から電車止めまでフラットにつながっています！JR線やりんかい線との乗り換えルートにあるエレベーターの配置を調べてみよう！',
    elevators: [
      {
        id: 'oimachi-ev-pedestrian',
        name: '東急大井町駅 ペデストリアンデッキ地上エレベーター',
        type: 'ground_to_gate',
        floor: '1F地上ロータリー ⇄ 2F 東急改札口・歩行者デッキ',
        lat: 35.60690,
        lng: 139.73420,
        addressDescription: '西口バスターミナル前・きゅりあん連絡デッキ下',
        routeSteps: [
          '地上バスターミナル横のエレベーターに乗ります。',
          '2階へ上がると東急大井町線の改札口がすぐ目の前です。',
          '改札を通ればそのまま段差なしで電車の扉まで行けます。'
        ],
        targetPlatforms: '1・2番線（大井町線始発）',
        features: ['デッキ直結', '平坦アプローチ', 'JR乗換スムーズ'],
        researchItems: {
          hasRamp: true,
          wheelchairFriendly: true,
          strollerFriendly: true,
          braille: true,
          doorWidthCm: 100,
          capacity: '13人乗り'
        }
      }
    ]
  }
];

// 自由研究用のチェック項目テンプレート
const RESEARCH_CHECKLIST_TEMPLATE = [
  { id: 'check_ramp', label: '地上からエレベーターまでのスロープや段差はあるか？' },
  { id: 'check_door_width', label: 'ドアの幅はベビーカーや車椅子が通りやすい広さか？' },
  { id: 'check_wheelchair_btn', label: '低い位置に車椅子・子供用ボタンがあるか？' },
  { id: 'check_mirror', label: '後ろを確認できる鏡がついているか？' },
  { id: 'check_braille_voice', label: '点字の表示や音声アナウンスがあるか？' },
  { id: 'check_see_through', label: '中が見えるガラス窓（シースルー）になっているか？' },
  { id: 'check_sign_clarity', label: '駅から何番出口か看板案内がわかりやすいか？' }
];
