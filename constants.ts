import { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'homework-group',
    name: 'Homework (作業)',
    description: 'Practice units for characters from your class worksheets.',
    icon: '📝',
    isSpecial: true,
    characters: [],
    sequences: [
      {
        id: 'ws-1',
        name: 'Worksheet 1',
        characters: [
          { char: '吃', pinyin: 'chī', zhuyin: 'ㄔ', meaning: 'to eat', difficulty: 2, components: ['口', '乞'] },
          { char: '愛', pinyin: 'ài', zhuyin: 'ㄞˋ', meaning: 'love', difficulty: 3, components: ['爫', '冖', '心', '夂'] },
          { char: '友', pinyin: 'yǒu', zhuyin: 'ㄧㄡˇ', meaning: 'friend (part of 朋友)', difficulty: 2, components: ['ナ', '又'] },
          { char: '朋', pinyin: 'péng', zhuyin: 'ㄆㄥˊ', meaning: 'friend (part of 朋友)', difficulty: 2, components: ['月', '月'] },
          { char: '家', pinyin: 'jiā', zhuyin: 'ㄐㄧㄚ', meaning: 'home / family', difficulty: 2, components: ['宀', '豕'] },
          { char: '大', pinyin: 'dà', zhuyin: 'ㄉㄚˋ', meaning: 'big / great', difficulty: 1, components: ['一', '人'] },
          { char: '氣', pinyin: 'qì', zhuyin: 'ㄑㄧˋ', meaning: 'air / gas / energy', difficulty: 3, components: ['气', '米'] },
          { char: '客', pinyin: 'kè', zhuyin: 'ㄎㄜˋ', meaning: 'guest / customer', difficulty: 3, components: ['宀', '各'] },
          { char: '謝', pinyin: 'xiè', zhuyin: 'ㄒㄧㄝˋ', meaning: 'to thank', difficulty: 4, components: ['言', '身', '寸'] },
          { char: '喝', pinyin: 'hē', zhuyin: 'ㄏㄜ', meaning: 'to drink', difficulty: 3, components: ['口', '曷'] },
          { char: '果', pinyin: 'guǒ', zhuyin: 'ㄍㄨㄛˇ', meaning: 'fruit / result', difficulty: 2, components: ['田', '木'] },
          { char: '水', pinyin: 'shuǐ', zhuyin: 'ㄕㄨㄟˇ', meaning: 'water', difficulty: 1, components: ['水'] },
          { char: '珠', pinyin: 'zhū', zhuyin: 'ㄓㄨ', meaning: 'pearl / bead', difficulty: 3, components: ['王', '朱'] },
          { char: '珍', pinyin: 'zhēn', zhuyin: 'ㄓㄣ', meaning: 'precious / rare', difficulty: 3, components: ['王', '㐱'] },
          { char: '紹', pinyin: 'shào', zhuyin: 'ㄕㄠˋ', meaning: 'to introduce (part of 介紹)', difficulty: 3, components: ['糹', '召'] },
          { char: '介', pinyin: 'jiè', zhuyin: 'ㄐㄧㄝˋ', meaning: 'between (part of 介紹)', difficulty: 2, components: ['人', '丨', '丨'] },
          { char: '我', pinyin: 'wǒ', zhuyin: 'ㄨㄛˇ', meaning: 'I / me', difficulty: 3, components: ['手', '戈'] },
          { char: '自', pinyin: 'zì', zhuyin: 'ㄗˋ', meaning: 'self / from', difficulty: 2, components: ['自'] },
          { char: '茶', pinyin: 'chá', zhuyin: 'ㄔㄚˊ', meaning: 'tea', difficulty: 3, components: ['艹', '人', '木'] },
          { char: '奶', pinyin: 'nǎi', zhuyin: 'ㄋㄞˇ', meaning: 'milk / grandmother', difficulty: 2, components: ['女', '乃'] },
        ]
      },
      {
        id: 'ws-2',
        name: 'Worksheet 2',
        characters: [
          { char: '呢', pinyin: 'ne', zhuyin: 'ㄋㄜ˙', meaning: 'modal particle', difficulty: 2, components: ['口', '尼'] },
          { char: '姓', pinyin: 'xìng', zhuyin: 'ㄒㄧㄥˋ', meaning: 'surname', difficulty: 2, components: ['女', '生'] },
          { char: '字', pinyin: 'zì', zhuyin: 'ㄗˋ', meaning: 'character', difficulty: 2, components: ['宀', '子'] },
          { char: '名', pinyin: 'míng', zhuyin: 'ㄇㄧㄥˊ', meaning: 'name', difficulty: 2, components: ['夕', '口'] },
          { char: '麼', pinyin: 'me', zhuyin: 'ㄇㄜ˙', meaning: 'suffix', difficulty: 2, components: ['麻', '幺'] },
          { char: '什', pinyin: 'shén', zhuyin: 'ㄕㄣˊ', meaning: 'what', difficulty: 1, components: ['亻', '十'] },
          { char: '好', pinyin: 'hǎo', zhuyin: 'ㄏㄠˇ', meaning: 'good / well', difficulty: 1, components: ['女', '子'] },
          { char: '妳', pinyin: 'nǐ', zhuyin: 'ㄋㄧˇ', meaning: 'you (female)', difficulty: 2, components: ['女', '尔'] },
          { char: '歡', pinyin: 'huān', zhuyin: 'ㄏㄨㄢ', meaning: 'joyous / like', difficulty: 4, components: ['欠', '雚'] },
          { char: '喜', pinyin: 'xǐ', zhuyin: 'ㄒㄧˇ', meaning: 'to like / happy', difficulty: 3, components: ['壴', '口'] },
          { char: '尼', pinyin: 'ní', zhuyin: 'ㄋㄧˊ', meaning: 'nun / phonetic', difficulty: 2, components: ['尸', '匕'] },
          { char: '印', pinyin: 'yìn', zhuyin: 'ㄧㄣˋ', meaning: 'print / stamp', difficulty: 3, components: ['卩', '𠂇'] },
          { char: '媽', pinyin: 'mā', zhuyin: 'ㄇㄚ', meaning: 'mother', difficulty: 2, components: ['女', '馬'] },
          { char: '爸', pinyin: 'bà', zhuyin: 'ㄅㄚˋ', meaning: 'father', difficulty: 2, components: ['父', '巴'] },
          { char: '愛', pinyin: 'ài', zhuyin: 'ㄞˋ', meaning: 'love', difficulty: 3, components: ['爫', '冖', '心', '夂'] },
          { char: '問', pinyin: 'wèn', zhuyin: 'ㄨㄣˋ', meaning: 'to ask', difficulty: 3, components: ['門', '口'] },
          { char: '請', pinyin: 'qǐng', zhuyin: 'ㄑㄧㄥˇ', meaning: 'please', difficulty: 3, components: ['言', '青'] },
        ]
      },
      {
        id: 'ws-3',
        name: 'Worksheet 3',
        characters: [
          { char: '謝', pinyin: 'xiè', zhuyin: 'ㄒㄧㄝˋ', meaning: 'to thank', difficulty: 4, components: ['言', '身', '寸'] },
          { char: '大', pinyin: 'dà', zhuyin: 'ㄉㄚˋ', meaning: 'big / great', difficulty: 1, components: ['一', '人'] },
          { char: '家', pinyin: 'jiā', zhuyin: 'ㄐㄧㄚ', meaning: 'home / family', difficulty: 2, components: ['宀', '豕'] },
          { char: '朋', pinyin: 'péng', zhuyin: 'ㄆㄥˊ', meaning: 'friend (part of 朋友)', difficulty: 2, components: ['月', '月'] },
          { char: '友', pinyin: 'yǒu', zhuyin: 'ㄧㄡˇ', meaning: 'friend (part of 朋友)', difficulty: 2, components: ['ナ', '又'] },
          { char: '愛', pinyin: 'ài', zhuyin: 'ㄞˋ', meaning: 'love', difficulty: 3, components: ['爫', '冖', '心', '夂'] },
          { char: '吃', pinyin: 'chī', zhuyin: 'ㄔ', meaning: 'to eat', difficulty: 2, components: ['口', '乞'] },
          { char: '水', pinyin: 'shuǐ', zhuyin: 'ㄕㄨㄟˇ', meaning: 'water', difficulty: 1, components: ['水'] },
          { char: '果', pinyin: 'guǒ', zhuyin: 'ㄍㄨㄛˇ', meaning: 'fruit / result', difficulty: 2, components: ['田', '木'] },
          { char: '喝', pinyin: 'hē', zhuyin: 'ㄏㄜ', meaning: 'to drink', difficulty: 3, components: ['口', '曷'] },
          { char: '客', pinyin: 'kè', zhuyin: 'ㄎㄜˋ', meaning: 'guest / customer', difficulty: 3, components: ['宀', '各'] },
          { char: '氣', pinyin: 'qì', zhuyin: 'ㄑㄧˋ', meaning: 'air / gas / energy', difficulty: 3, components: ['气', '米'] },
          { char: '自', pinyin: 'zì', zhuyin: 'ㄗˋ', meaning: 'self / from', difficulty: 2, components: ['自'] },
          { char: '我', pinyin: 'wǒ', zhuyin: 'ㄨㄛˇ', meaning: 'I / me', difficulty: 3, components: ['手', '戈'] },
          { char: '介', pinyin: 'jiè', zhuyin: 'ㄐㄧㄝˋ', meaning: 'between (part of 介紹)', difficulty: 2, components: ['人', '丨', '丨'] },
          { char: '紹', pinyin: 'shào', zhuyin: 'ㄕㄠˋ', meaning: 'to introduce (part of 介紹)', difficulty: 3, components: ['糹', '召'] },
          { char: '珍', pinyin: 'zhēn', zhuyin: 'ㄓㄣ', meaning: 'precious / rare', difficulty: 3, components: ['王', '㐱'] },
          { char: '珠', pinyin: 'zhū', zhuyin: 'ㄓㄨ', meaning: 'pearl / bead', difficulty: 3, components: ['王', '朱'] },
          { char: '奶', pinyin: 'nǎi', zhuyin: 'ㄋㄞˇ', meaning: 'milk / grandmother', difficulty: 2, components: ['女', '乃'] },
          { char: '茶', pinyin: 'chá', zhuyin: 'ㄔㄚˊ', meaning: 'tea', difficulty: 3, components: ['艹', '人', '木'] },
        ]
      },
      {
        id: 'ws-4',
        name: 'Worksheet 4',
        characters: [
          // Page 1
          { char: '去', pinyin: 'qù', zhuyin: 'ㄑㄩˋ', meaning: 'to go', difficulty: 2, components: ['土', '厶'] },
          { char: '在', pinyin: 'zài', zhuyin: 'ㄗㄞˋ', meaning: 'at / in / to be', difficulty: 2, components: ['才', '土'] },
          { char: '現', pinyin: 'xiàn', zhuyin: 'ㄒㄧㄢˋ', meaning: 'now / present', difficulty: 3, components: ['王', '見'] },
          { char: '鐘', pinyin: 'zhōng', zhuyin: 'ㄓㄨㄥ', meaning: 'clock / bell', difficulty: 4, components: ['金', '中'] },
          { char: '點', pinyin: 'diǎn', zhuyin: 'ㄉㄧㄢˇ', meaning: 'o\'clock / point', difficulty: 3, components: ['黑', '占'] },
          { char: '幾', pinyin: 'jǐ', zhuyin: 'ㄐㄧˇ', meaning: 'how many / which', difficulty: 3, components: ['幺', '幺', '戍'] },
          // Page 2
          { char: '子', pinyin: 'zǐ', zhuyin: 'ㄗˇ', meaning: 'child / suffix', difficulty: 1, components: ['子'] },
          { char: '孩', pinyin: 'hái', zhuyin: 'ㄏㄞˊ', meaning: 'child', difficulty: 3, components: ['子', '亥'] },
          { char: '爸', pinyin: 'bà', zhuyin: 'ㄅㄚˋ', meaning: 'father', difficulty: 2, components: ['父', '巴'] },
          { char: '媽', pinyin: 'mā', zhuyin: 'ㄇㄚ', meaning: 'mother', difficulty: 2, components: ['女', '馬'] },
          { char: '校', pinyin: 'xiào', zhuyin: 'ㄒㄧㄠˋ', meaning: 'school', difficulty: 3, components: ['木', '交'] },
          { char: '學', pinyin: 'xué', zhuyin: 'ㄒㄩㄝˊ', meaning: 'to learn / study', difficulty: 3, components: ['臼', '冖', '子'] },
          // Page 3
          { char: '號', pinyin: 'hào', zhuyin: 'ㄏㄠˋ', meaning: 'number / date', difficulty: 3, components: ['口', '丂', '虎'] },
          { char: '月', pinyin: 'yuè', zhuyin: 'ㄩㄝˋ', meaning: 'moon / month', difficulty: 2, components: ['月'] },
          { char: '期', pinyin: 'qī', zhuyin: 'ㄑㄧ', meaning: 'period / week', difficulty: 3, components: ['其', '月'] },
          { char: '星', pinyin: 'xīng', zhuyin: 'ㄒㄧㄥ', meaning: 'star', difficulty: 3, components: ['日', '生'] },
          { char: '天', pinyin: 'tiān', zhuyin: 'ㄊㄧㄢ', meaning: 'day / sky', difficulty: 2, components: ['一', '大'] },
          { char: '今', pinyin: 'jīn', zhuyin: 'ㄐㄧㄣ', meaning: 'today / now', difficulty: 2, components: ['人', '一', '丶'] },
          // Page 4
          { char: '課', pinyin: 'kè', zhuyin: 'ㄎㄜˋ', meaning: 'class / lesson', difficulty: 4, components: ['言', '果'] },
          { char: '沒', pinyin: 'méi', zhuyin: 'ㄇㄟˊ', meaning: 'not have / no', difficulty: 2, components: ['氵', '殳'] },
          { char: '有', pinyin: 'yǒu', zhuyin: 'ㄧㄡˇ', meaning: 'to have / exist', difficulty: 2, components: ['ナ', '月'] },
          { char: '上', pinyin: 'shàng', zhuyin: 'ㄕㄤˋ', meaning: 'up / on / above', difficulty: 1, components: ['上'] },
          { char: '早', pinyin: 'zǎo', zhuyin: 'ㄗㄠˇ', meaning: 'early / morning', difficulty: 2, components: ['日', '十'] },
          { char: '日', pinyin: 'rì', zhuyin: 'ㄖˋ', meaning: 'sun / day', difficulty: 1, components: ['日'] },
          // Page 5
          { char: '回', pinyin: 'huí', zhuyin: 'ㄏㄨㄟˊ', meaning: 'to return', difficulty: 2, components: ['囗', '口'] },
          { char: '午', pinyin: 'wǔ', zhuyin: 'ㄨˇ', meaning: 'noon / midday', difficulty: 2, components: ['午'] },
          { char: '中', pinyin: 'zhōng', zhuyin: 'ㄓㄨㄥ', meaning: 'middle / center', difficulty: 2, components: ['丨', '口'] },
          { char: '館', pinyin: 'guǎn', zhuyin: 'ㄍㄨㄢˇ', meaning: 'hall / building', difficulty: 4, components: ['飠', '官'] },
          { char: '書', pinyin: 'shū', zhuyin: 'ㄕㄨ', meaning: 'book', difficulty: 3, components: ['聿', '曰'] },
          { char: '圖', pinyin: 'tú', zhuyin: 'ㄊㄨˊ', meaning: 'picture / map', difficulty: 3, components: ['囗', '啚'] },
          // Page 6
          { char: '機', pinyin: 'jī', zhuyin: 'ㄐㄧ', meaning: 'machine / opportunity', difficulty: 4, components: ['木', '幾'] },
          { char: '手', pinyin: 'shǒu', zhuyin: 'ㄕㄡˇ', meaning: 'hand', difficulty: 2, components: ['手'] },
          { char: '分', pinyin: 'fēn', zhuyin: 'ㄈㄣ', meaning: 'minute / to divide', difficulty: 2, components: ['八', '刀'] },
          { char: '下', pinyin: 'xià', zhuyin: 'ㄒㄧㄚˋ', meaning: 'down / below', difficulty: 1, components: ['一', '卜'] },
          { char: '家', pinyin: 'jiā', zhuyin: 'ㄐㄧㄚ', meaning: 'home / family', difficulty: 2, components: ['宀', '豕'] },
          { char: '人', pinyin: 'rén', zhuyin: 'ㄖㄣˊ', meaning: 'person', difficulty: 1, components: ['人'] },
        ]
      }
    ]
  },
  {
    id: 'test-group',
    name: 'Test (測驗)',
    description: 'Test packs to assess your character mastery.',
    icon: '📋',
    isSpecial: true,
    characters: [],
    sequences: [
      {
        id: 'test-1',
        name: 'Test Pack 1',
        characters: [
          // 大家
          { char: '大', pinyin: 'dà', zhuyin: 'ㄉㄚˋ', meaning: 'big / great', difficulty: 1, components: ['一', '人'] },
          { char: '家', pinyin: 'jiā', zhuyin: 'ㄐㄧㄚ', meaning: 'home / family', difficulty: 2, components: ['宀', '豕'] },
          // 朋友
          { char: '朋', pinyin: 'péng', zhuyin: 'ㄆㄥˊ', meaning: 'friend (part of 朋友)', difficulty: 2, components: ['月', '月'] },
          { char: '友', pinyin: 'yǒu', zhuyin: 'ㄧㄡˇ', meaning: 'friend (part of 朋友)', difficulty: 2, components: ['ナ', '又'] },
          // 愛
          { char: '愛', pinyin: 'ài', zhuyin: 'ㄞˋ', meaning: 'love', difficulty: 3, components: ['爫', '冖', '心', '夂'] },
          // 吃
          { char: '吃', pinyin: 'chī', zhuyin: 'ㄔ', meaning: 'to eat', difficulty: 2, components: ['口', '乞'] },
          // 水果
          { char: '水', pinyin: 'shuǐ', zhuyin: 'ㄕㄨㄟˇ', meaning: 'water', difficulty: 1, components: ['水'] },
          { char: '果', pinyin: 'guǒ', zhuyin: 'ㄍㄨㄛˇ', meaning: 'fruit / result', difficulty: 2, components: ['田', '木'] },
          // 喝
          { char: '喝', pinyin: 'hē', zhuyin: 'ㄏㄜ', meaning: 'to drink', difficulty: 3, components: ['口', '曷'] },
          // 茶
          { char: '茶', pinyin: 'chá', zhuyin: 'ㄔㄚˊ', meaning: 'tea', difficulty: 3, components: ['艹', '人', '木'] },
          // 謝謝
          { char: '謝', pinyin: 'xiè', zhuyin: 'ㄒㄧㄝˋ', meaning: 'to thank', difficulty: 4, components: ['言', '身', '寸'] },
          // 不客氣
          { char: '不', pinyin: 'bù', zhuyin: 'ㄅㄨˋ', meaning: 'not / no', difficulty: 1, components: ['一', '丨', '丿', '丶'] },
          { char: '客', pinyin: 'kè', zhuyin: 'ㄎㄜˋ', meaning: 'guest / customer', difficulty: 3, components: ['宀', '各'] },
          { char: '氣', pinyin: 'qì', zhuyin: 'ㄑㄧˋ', meaning: 'air / gas / energy', difficulty: 3, components: ['气', '米'] },
          // 珍珠奶茶
          { char: '珍', pinyin: 'zhēn', zhuyin: 'ㄓㄣ', meaning: 'precious / rare', difficulty: 3, components: ['王', '㐱'] },
          { char: '珠', pinyin: 'zhū', zhuyin: 'ㄓㄨ', meaning: 'pearl / bead', difficulty: 3, components: ['王', '朱'] },
          { char: '奶', pinyin: 'nǎi', zhuyin: 'ㄋㄞˇ', meaning: 'milk / grandmother', difficulty: 2, components: ['女', '乃'] },
          // 自我介紹
          { char: '自', pinyin: 'zì', zhuyin: 'ㄗˋ', meaning: 'self / from', difficulty: 2, components: ['自'] },
          { char: '我', pinyin: 'wǒ', zhuyin: 'ㄨㄛˇ', meaning: 'I / me', difficulty: 3, components: ['手', '戈'] },
          { char: '介', pinyin: 'jiè', zhuyin: 'ㄐㄧㄝˋ', meaning: 'between (part of 介紹)', difficulty: 2, components: ['人', '丨', '丨'] },
          { char: '紹', pinyin: 'shào', zhuyin: 'ㄕㄠˋ', meaning: 'to introduce (part of 介紹)', difficulty: 3, components: ['糹', '召'] },
          // 早安
          { char: '早', pinyin: 'zǎo', zhuyin: 'ㄗㄠˇ', meaning: 'early / morning', difficulty: 2, components: ['日', '十'] },
          { char: '安', pinyin: 'ān', zhuyin: 'ㄢ', meaning: 'peace / safe', difficulty: 2, components: ['宀', '女'] },
          // 午安
          { char: '午', pinyin: 'wǔ', zhuyin: 'ㄨˇ', meaning: 'noon / midday', difficulty: 2, components: ['午'] },
          // 晚安
          { char: '晚', pinyin: 'wǎn', zhuyin: 'ㄨㄢˇ', meaning: 'evening / late', difficulty: 3, components: ['日', '免'] },
        ]
      }
    ]
  },
  {
    id: 'intro-basics',
    name: 'Introduction',
    description: 'Essential basics for getting started with writing.',
    icon: '🌱',
    characters: [
      { char: '一', pinyin: 'yī', zhuyin: 'ㄧ', meaning: 'one', difficulty: 1, components: ['一'] },
      { char: '二', pinyin: 'èr', zhuyin: 'ㄦˋ', meaning: 'two', difficulty: 1, components: ['一', '一'] },
      { char: '三', pinyin: 'sān', zhuyin: 'ㄙㄢ', meaning: 'three', difficulty: 1, components: ['一', '一', '一'] },
      { char: '人', pinyin: 'rén', zhuyin: 'ㄖㄣˊ', meaning: 'person', difficulty: 1, components: ['人'] },
      { char: '口', pinyin: 'kǒu', zhuyin: 'ㄎㄡˇ', meaning: 'mouth', difficulty: 1, components: ['口'] },
      { char: '日', pinyin: 'rì', zhuyin: 'ㄖˋ', meaning: 'sun / day', difficulty: 1, components: ['日'] },
      { char: '月', pinyin: 'yuè', zhuyin: 'ㄩㄝˋ', meaning: 'moon / month', difficulty: 2, components: ['月'] },
      { char: '山', pinyin: 'shān', zhuyin: 'ㄕㄢ', meaning: 'mountain', difficulty: 2, components: ['山'] },
      { char: '水', pinyin: 'shuǐ', zhuyin: 'ㄕㄨㄟˇ', meaning: 'water', difficulty: 2, components: ['水'] },
      { char: '火', pinyin: 'huǒ', zhuyin: 'ㄏㄨㄛˇ', meaning: 'fire', difficulty: 2, components: ['火'] },
    ]
  }
];