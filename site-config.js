/*
  PROJECT X//EDGE — ここだけ編集すれば公開内容を変更できます。

  画像の追加：
    1. assets/characters/ に PNG を置く（例: nanaya.png）
    2. 下の image: "" に "./assets/characters/nanaya.png" を入力

  ダウンロードボタンの有効化：
    1. GitHub の Releases にキャラZIPをアップロード
    2. ファイルのURLを downloadUrl: "" に貼り付け
    3. status: "準備中" を "公開中" に変更（配布可能な場合のみ）

  公開する前に、各ファイルの配布権限・利用条件をご確認ください。
*/
window.XEDGE_CONFIG = {
  characters: [
    {
      id: "nanaya", number: "01", name: "七夜エクストラ", english: "NANAYA EXTRA",
      type: "playable", category: "PLAYABLE CHARACTER", status: "制作中",
      description: "黒いダウンジャケットとナイフを携えた、高速連係を軸にするファイター。新デザインでリニューアル中。",
      features: ["HIGH-SPEED", "KNIFE COMBAT", "COMBO"],
      version: "", fileSize: "", image: "", downloadUrl: "", accent: "cyan", motif: "七"
    },
    {
      id: "sanchan", number: "02", name: "さんちゃん", english: "SANCHAN",
      type: "playable", category: "ORIGINAL CHARACTER", status: "制作中",
      description: "銀白の髪と黒いゴシックセーラー。刀と拳の切り替え、トリックを活かした連続攻撃が特徴。",
      features: ["SWORD", "GAUNTLET", "TRICK"],
      version: "", fileSize: "", image: "", downloadUrl: "", accent: "violet", motif: "燦"
    },
    {
      id: "white-len", number: "03", name: "白レン", english: "WHITE LEN",
      type: "training", category: "TRAINING CHARACTER", status: "配布準備中",
      description: "コンボ動画や練習に使える、待機・ダウン動作中心のトレーニング向けキャラクター。",
      features: ["TRAINING", "VOICE", "DOWN"],
      version: "", fileSize: "", image: "", downloadUrl: "", accent: "ice", motif: "白"
    },
    {
      id: "black-len", number: "04", name: "黒レン", english: "BLACK LEN",
      type: "training", category: "TRAINING CHARACTER", status: "配布準備中",
      description: "猫耳と黒いゴシックドレスが特徴。コンボ確認向けの待機・ダウン動作を制作中。",
      features: ["TRAINING", "VOICE", "DOWN"],
      version: "", fileSize: "", image: "", downloadUrl: "", accent: "rose", motif: "黒"
    }
  ],
  updates: [
    { date: "2026.11.22", label: "SITE", title: "PROJECT X//EDGE ダウンロードサイト、公開準備を開始", text: "サイトの初期版を制作。正式なキャラクター画像と配布ZIPへのリンクは順次追加予定です。" },
    { date: "2026.11.22", label: "ROSTER", title: "キャラクター紹介枠を4名分用意", text: "七夜エクストラ / さんちゃん / 白レン / 黒レンの紹介ページを準備しました。" }
  ]
};
