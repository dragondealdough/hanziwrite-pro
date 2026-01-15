import { Category } from './types';
import { MODERN_CHINESE_VOCAB } from './modernChineseVocab';

export const APP_VERSION = "1.1.53";

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
          { char: '吃', pinyin: 'chī', zhuyin: 'ㄔ', meaning: 'to eat', difficulty: 2, components: ['口', '乞'], exampleSentence: '我喜歡吃水果。', exampleTranslation: 'I like to eat fruit.' },
          { char: '愛', pinyin: 'ài', zhuyin: 'ㄞˋ', meaning: 'love', difficulty: 3, components: ['爫', '冖', '心', '夂'], exampleSentence: '媽媽愛我。', exampleTranslation: 'Mom loves me.' },
          { char: '友', pinyin: 'yǒu', zhuyin: 'ㄧㄡˇ', meaning: 'friend (part of 朋友)', difficulty: 2, components: ['ナ', '又'], exampleSentence: '他是我的好朋友。', exampleTranslation: 'He is my good friend.' },
          { char: '朋', pinyin: 'péng', zhuyin: 'ㄆㄥˊ', meaning: 'friend (part of 朋友)', difficulty: 2, components: ['月', '月'], exampleSentence: '我有許多朋友。', exampleTranslation: 'I have many friends.' },
          { char: '家', pinyin: 'jiā', zhuyin: 'ㄐㄧㄚ', meaning: 'home / family', difficulty: 2, components: ['宀', '豕'], exampleSentence: '我的家很大。', exampleTranslation: 'My home is big.' },
          { char: '大', pinyin: 'dà', zhuyin: 'ㄉㄚˋ', meaning: 'big / great', difficulty: 1, components: ['一', '人'], exampleSentence: '這隻狗很大。', exampleTranslation: 'This dog is big.' },
          { char: '氣', pinyin: 'qì', zhuyin: 'ㄑㄧˋ', meaning: 'air / gas / energy', difficulty: 3, components: ['气', '米'], exampleSentence: '今天天氣很好。', exampleTranslation: 'The weather is good today.' },
          { char: '客', pinyin: 'kè', zhuyin: 'ㄎㄜˋ', meaning: 'guest / customer', difficulty: 3, components: ['宀', '各'], exampleSentence: '家裡有客人。', exampleTranslation: 'There are guests at home.' },
          { char: '謝', pinyin: 'xiè', zhuyin: 'ㄒㄧㄝˋ', meaning: 'to thank', difficulty: 4, components: ['言', '身', '寸'], exampleSentence: '謝謝你的幫忙。', exampleTranslation: 'Thank you for your help.' },
          { char: '喝', pinyin: 'hē', zhuyin: 'ㄏㄜ', meaning: 'to drink', difficulty: 3, components: ['口', '曷'], exampleSentence: '我想喝水。', exampleTranslation: 'I want to drink water.' },
          { char: '果', pinyin: 'guǒ', zhuyin: 'ㄍㄨㄛˇ', meaning: 'fruit / result', difficulty: 2, components: ['田', '木'], exampleSentence: '桌上有水果。', exampleTranslation: 'There is fruit on the table.' },
          { char: '水', pinyin: 'shuǐ', zhuyin: 'ㄕㄨㄟˇ', meaning: 'water', difficulty: 1, components: ['水'], exampleSentence: '請給我一杯水。', exampleTranslation: 'Please give me a glass of water.' },
          { char: '珠', pinyin: 'zhū', zhuyin: 'ㄓㄨ', meaning: 'pearl / bead', difficulty: 3, components: ['王', '朱'], exampleSentence: '這是珍珠奶茶。', exampleTranslation: 'This is bubble tea.' },
          { char: '珍', pinyin: 'zhēn', zhuyin: 'ㄓㄣ', meaning: 'precious / rare', difficulty: 3, components: ['王', '㐱'], exampleSentence: '珍珠很貴。', exampleTranslation: 'Pearls are expensive.' },
          { char: '紹', pinyin: 'shào', zhuyin: 'ㄕㄠˋ', meaning: 'to introduce (part of 介紹)', difficulty: 3, components: ['糹', '召'], exampleSentence: '請自我介紹。', exampleTranslation: 'Please introduce yourself.' },
          { char: '介', pinyin: 'jiè', zhuyin: 'ㄐㄧㄝˋ', meaning: 'between (part of 介紹)', difficulty: 2, components: ['人', '丨', '丨'], exampleSentence: '我介紹朋友給你。', exampleTranslation: 'I introduce a friend to you.' },
          { char: '我', pinyin: 'wǒ', zhuyin: 'ㄨㄛˇ', meaning: 'I / me', difficulty: 3, components: ['手', '戈'], exampleSentence: '我是學生。', exampleTranslation: 'I am a student.' },
          { char: '自', pinyin: 'zì', zhuyin: 'ㄗˋ', meaning: 'self / from', difficulty: 2, components: ['自'], exampleSentence: '我自己去。', exampleTranslation: 'I go by myself.' },
          { char: '茶', pinyin: 'chá', zhuyin: 'ㄔㄚˊ', meaning: 'tea', difficulty: 3, components: ['艹', '人', '木'], exampleSentence: '爸爸喜歡喝茶。', exampleTranslation: 'Dad likes to drink tea.' },
          { char: '奶', pinyin: 'nǎi', zhuyin: 'ㄋㄞˇ', meaning: 'milk / grandmother', difficulty: 2, components: ['女', '乃'], exampleSentence: '我不喝牛奶。', exampleTranslation: 'I do not drink milk.' },
        ]
      },
      {
        id: 'ws-2',
        name: 'Worksheet 2',
        characters: [
          { char: '呢', pinyin: 'ne', zhuyin: 'ㄋㄜ˙', meaning: 'modal particle', difficulty: 2, components: ['口', '尼'], exampleSentence: '你呢？', exampleTranslation: 'How about you?' },
          { char: '姓', pinyin: 'xìng', zhuyin: 'ㄒㄧㄥˋ', meaning: 'surname', difficulty: 2, components: ['女', '生'], exampleSentence: '我也姓王。', exampleTranslation: 'My surname is also Wang.' },
          { char: '字', pinyin: 'zì', zhuyin: 'ㄗˋ', meaning: 'character', difficulty: 2, components: ['宀', '子'], exampleSentence: '這是一個中文字。', exampleTranslation: 'This is a Chinese character.' },
          { char: '名', pinyin: 'míng', zhuyin: 'ㄇㄧㄥˊ', meaning: 'name', difficulty: 2, components: ['夕', '口'], exampleSentence: '你的名字是什麼？', exampleTranslation: 'What is your name?' },
          { char: '麼', pinyin: 'me', zhuyin: 'ㄇㄜ˙', meaning: 'suffix', difficulty: 2, components: ['麻', '幺'], exampleSentence: '你在做什麼？', exampleTranslation: 'What are you doing?' },
          { char: '什', pinyin: 'shén', zhuyin: 'ㄕㄣˊ', meaning: 'what', difficulty: 1, components: ['亻', '十'], exampleSentence: '那是什麼？', exampleTranslation: 'What is that?' },
          { char: '好', pinyin: 'hǎo', zhuyin: 'ㄏㄠˇ', meaning: 'good / well', difficulty: 1, components: ['女', '子'], exampleSentence: '你好嗎？', exampleTranslation: 'How are you?' },
          { char: '妳', pinyin: 'nǐ', zhuyin: 'ㄋㄧˇ', meaning: 'you (female)', difficulty: 2, components: ['女', '尔'], exampleSentence: '妳好漂亮。', exampleTranslation: 'You are beautiful.' },
          { char: '歡', pinyin: 'huān', zhuyin: 'ㄏㄨㄢ', meaning: 'joyous / like', difficulty: 4, components: ['欠', '雚'], exampleSentence: '歡迎光臨。', exampleTranslation: 'Welcome.' },
          { char: '喜', pinyin: 'xǐ', zhuyin: 'ㄒㄧˇ', meaning: 'to like / happy', difficulty: 3, components: ['壴', '口'], exampleSentence: '我喜歡你。', exampleTranslation: 'I like you.' },
          { char: '尼', pinyin: 'ní', zhuyin: 'ㄋㄧˊ', meaning: 'nun / phonetic', difficulty: 2, components: ['尸', '匕'], exampleSentence: '尼加拉瓜在哪裡？', exampleTranslation: 'Where is Nicaragua?' },
          { char: '印', pinyin: 'yìn', zhuyin: 'ㄧㄣˋ', meaning: 'print / stamp', difficulty: 3, components: ['卩', '𠂇'], exampleSentence: '這是印尼菜。', exampleTranslation: 'This is Indonesian food.' },
          { char: '媽', pinyin: 'mā', zhuyin: 'ㄇㄚ', meaning: 'mother', difficulty: 2, components: ['女', '馬'], exampleSentence: '媽媽在煮飯。', exampleTranslation: 'Mom is cooking.' },
          { char: '爸', pinyin: 'bà', zhuyin: 'ㄅㄚˋ', meaning: 'father', difficulty: 2, components: ['父', '巴'], exampleSentence: '爸爸在上班。', exampleTranslation: 'Dad is working.' },
          { char: '愛', pinyin: 'ài', zhuyin: 'ㄞˋ', meaning: 'love', difficulty: 3, components: ['爫', '冖', '心', '夂'], exampleSentence: '媽媽愛我。', exampleTranslation: 'Mom loves me.' },
          { char: '問', pinyin: 'wèn', zhuyin: 'ㄨㄣˋ', meaning: 'to ask', difficulty: 3, components: ['門', '口'], exampleSentence: '我可以問一個問題嗎？', exampleTranslation: 'Can I ask a question?' },
          { char: '請', pinyin: 'qǐng', zhuyin: 'ㄑㄧㄥˇ', meaning: 'please', difficulty: 3, components: ['言', '青'], exampleSentence: '請坐。', exampleTranslation: 'Please sit down.' },
        ]
      },
      {
        id: 'ws-3',
        name: 'Worksheet 3',
        characters: [
          { char: '謝', pinyin: 'xiè', zhuyin: 'ㄒㄧㄝˋ', meaning: 'to thank', difficulty: 4, components: ['言', '身', '寸'], exampleSentence: '謝謝你的幫忙。', exampleTranslation: 'Thank you for your help.' },
          { char: '大', pinyin: 'dà', zhuyin: 'ㄉㄚˋ', meaning: 'big / great', difficulty: 1, components: ['一', '人'], exampleSentence: '這隻狗很大。', exampleTranslation: 'This dog is big.' },
          { char: '家', pinyin: 'jiā', zhuyin: 'ㄐㄧㄚ', meaning: 'home / family', difficulty: 2, components: ['宀', '豕'], exampleSentence: '我的家很大。', exampleTranslation: 'My home is big.' },
          { char: '朋', pinyin: 'péng', zhuyin: 'ㄆㄥˊ', meaning: 'friend (part of 朋友)', difficulty: 2, components: ['月', '月'], exampleSentence: '我有許多朋友。', exampleTranslation: 'I have many friends.' },
          { char: '友', pinyin: 'yǒu', zhuyin: 'ㄧㄡˇ', meaning: 'friend (part of 朋友)', difficulty: 2, components: ['ナ', '又'], exampleSentence: '他是我的好朋友。', exampleTranslation: 'He is my good friend.' },
          { char: '愛', pinyin: 'ài', zhuyin: 'ㄞˋ', meaning: 'love', difficulty: 3, components: ['爫', '冖', '心', '夂'], exampleSentence: '媽媽愛我。', exampleTranslation: 'Mom loves me.' },
          { char: '吃', pinyin: 'chī', zhuyin: 'ㄔ', meaning: 'to eat', difficulty: 2, components: ['口', '乞'], exampleSentence: '我喜歡吃水果。', exampleTranslation: 'I like to eat fruit.' },
          { char: '水', pinyin: 'shuǐ', zhuyin: 'ㄕㄨㄟˇ', meaning: 'water', difficulty: 1, components: ['水'], exampleSentence: '請給我一杯水。', exampleTranslation: 'Please give me a glass of water.' },
          { char: '果', pinyin: 'guǒ', zhuyin: 'ㄍㄨㄛˇ', meaning: 'fruit / result', difficulty: 2, components: ['田', '木'], exampleSentence: '桌上有水果。', exampleTranslation: 'There is fruit on the table.' },
          { char: '喝', pinyin: 'hē', zhuyin: 'ㄏㄜ', meaning: 'to drink', difficulty: 3, components: ['口', '曷'], exampleSentence: '我想喝水。', exampleTranslation: 'I want to drink water.' },
          { char: '客', pinyin: 'kè', zhuyin: 'ㄎㄜˋ', meaning: 'guest / customer', difficulty: 3, components: ['宀', '各'], exampleSentence: '家裡有客人。', exampleTranslation: 'There are guests at home.' },
          { char: '氣', pinyin: 'qì', zhuyin: 'ㄑㄧˋ', meaning: 'air / gas / energy', difficulty: 3, components: ['气', '米'], exampleSentence: '今天天氣很好。', exampleTranslation: 'The weather is good today.' },
          { char: '自', pinyin: 'zì', zhuyin: 'ㄗˋ', meaning: 'self / from', difficulty: 2, components: ['自'], exampleSentence: '我自己去。', exampleTranslation: 'I go by myself.' },
          { char: '我', pinyin: 'wǒ', zhuyin: 'ㄨㄛˇ', meaning: 'I / me', difficulty: 3, components: ['手', '戈'], exampleSentence: '我是學生。', exampleTranslation: 'I am a student.' },
          { char: '介', pinyin: 'jiè', zhuyin: 'ㄐㄧㄝˋ', meaning: 'between (part of 介紹)', difficulty: 2, components: ['人', '丨', '丨'], exampleSentence: '我介紹朋友給你。', exampleTranslation: 'I introduce a friend to you.' },
          { char: '紹', pinyin: 'shào', zhuyin: 'ㄕㄠˋ', meaning: 'to introduce (part of 介紹)', difficulty: 3, components: ['糹', '召'], exampleSentence: '請自我介紹。', exampleTranslation: 'Please introduce yourself.' },
          { char: '珍', pinyin: 'zhēn', zhuyin: 'ㄓㄣ', meaning: 'precious / rare', difficulty: 3, components: ['王', '㐱'], exampleSentence: '珍珠很貴。', exampleTranslation: 'Pearls are expensive.' },
          { char: '珠', pinyin: 'zhū', zhuyin: 'ㄓㄨ', meaning: 'pearl / bead', difficulty: 3, components: ['王', '朱'], exampleSentence: '這是珍珠奶茶。', exampleTranslation: 'This is bubble tea.' },
          { char: '奶', pinyin: 'nǎi', zhuyin: 'ㄋㄞˇ', meaning: 'milk / grandmother', difficulty: 2, components: ['女', '乃'], exampleSentence: '我不喝牛奶。', exampleTranslation: 'I do not drink milk.' },
          { char: '茶', pinyin: 'chá', zhuyin: 'ㄔㄚˊ', meaning: 'tea', difficulty: 3, components: ['艹', '人', '木'], exampleSentence: '爸爸喜歡喝茶。', exampleTranslation: 'Dad likes to drink tea.' },
        ]
      },

      {
        id: 'ws-4',
        name: 'Worksheet 4',
        characters: [
          // Page 1
          {
            char: '去', pinyin: 'qù', zhuyin: 'ㄑㄩˋ', meaning: 'to go', difficulty: 2, components: ['土', '厶'], exampleSentence: '我們去公園吧。', exampleTranslation: 'Let\'s go to the park.'
          },
          { char: '在', pinyin: 'zài', zhuyin: 'ㄗㄞˋ', meaning: 'at / in / to be', difficulty: 2, components: ['才', '土'], exampleSentence: '我在家。', exampleTranslation: 'I am at home.' },
          { char: '現', pinyin: 'xiàn', zhuyin: 'ㄒㄧㄢˋ', meaning: 'now / present', difficulty: 3, components: ['王', '見'], exampleSentence: '現在幾點？', exampleTranslation: 'What time is it now?' },
          { char: '鐘', pinyin: 'zhōng', zhuyin: 'ㄓㄨㄥ', meaning: 'clock / bell', difficulty: 4, components: ['金', '中'], exampleSentence: '還有五分鐘。', exampleTranslation: 'Five minutes left.' },
          {
            char: '點', pinyin: 'diǎn', zhuyin: 'ㄉㄧㄢˇ', meaning: 'o\'clock / point', difficulty: 3, components: ['黑', '占'], exampleSentence: '現在三點。', exampleTranslation: 'It is three o\'clock.'
          },
          { char: '幾', pinyin: 'jǐ', zhuyin: 'ㄐㄧˇ', meaning: 'how many / which', difficulty: 3, components: ['幺', '幺', '戍'], exampleSentence: '你有幾本書？', exampleTranslation: 'How many books do you have?' },
          // Page 2
          { char: '子', pinyin: 'zǐ', zhuyin: 'ㄗˇ', meaning: 'child / suffix', difficulty: 1, components: ['子'], exampleSentence: '這是我的兒子。', exampleTranslation: 'This is my son.' },
          { char: '孩', pinyin: 'hái', zhuyin: 'ㄏㄞˊ', meaning: 'child', difficulty: 3, components: ['子', '亥'], exampleSentence: '那個孩子很可愛。', exampleTranslation: 'That child is cute.' },
          { char: '爸', pinyin: 'bà', zhuyin: 'ㄅㄚˋ', meaning: 'father', difficulty: 2, components: ['父', '巴'], exampleSentence: '爸爸在上班。', exampleTranslation: 'Dad is working.' },
          { char: '媽', pinyin: 'mā', zhuyin: 'ㄇㄚ', meaning: 'mother', difficulty: 2, components: ['女', '馬'], exampleSentence: '媽媽在煮飯。', exampleTranslation: 'Mom is cooking.' },
          { char: '校', pinyin: 'xiào', zhuyin: 'ㄒㄧㄠˋ', meaning: 'school', difficulty: 3, components: ['木', '交'], exampleSentence: '我去學校上課。', exampleTranslation: 'I go to school for class.' },
          { char: '學', pinyin: 'xué', zhuyin: 'ㄒㄩㄝˊ', meaning: 'to learn / study', difficulty: 3, components: ['臼', '冖', '子'], exampleSentence: '我學習中文。', exampleTranslation: 'I learn Chinese.' },
          // Page 3
          { char: '號', pinyin: 'hào', zhuyin: 'ㄏㄠˋ', meaning: 'number / date', difficulty: 3, components: ['口', '丂', '虎'], exampleSentence: '今天是幾號？', exampleTranslation: 'What is the date today?' },
          { char: '月', pinyin: 'yuè', zhuyin: 'ㄩㄝˋ', meaning: 'moon / month', difficulty: 2, components: ['月'], exampleSentence: '現在是五月。', exampleTranslation: 'It is May now.' },
          { char: '期', pinyin: 'qī', zhuyin: 'ㄑㄧ', meaning: 'period / week', difficulty: 3, components: ['其', '月'], exampleSentence: '星期日不用上課。', exampleTranslation: 'No class on Sunday.' },
          { char: '星', pinyin: 'xīng', zhuyin: 'ㄒㄧㄥ', meaning: 'star', difficulty: 3, components: ['日', '生'], exampleSentence: '天上有很多星星。', exampleTranslation: 'There are many stars in the sky.' },
          {
            char: '天', pinyin: 'tiān', zhuyin: 'ㄊㄧㄢ', meaning: 'day / sky', difficulty: 2, components: ['一', '大'], exampleSentence: '今天天氣很好。', exampleTranslation: 'Also: Today\'s weather is good.'
          },
          { char: '今', pinyin: 'jīn', zhuyin: 'ㄐㄧㄣ', meaning: 'today / now', difficulty: 2, components: ['人', '一', '丶'], exampleSentence: '今天我很忙。', exampleTranslation: 'I am busy today.' },
          // Page 4
          { char: '課', pinyin: 'kè', zhuyin: 'ㄎㄜˋ', meaning: 'class / lesson', difficulty: 4, components: ['言', '果'], exampleSentence: '我們在上課。', exampleTranslation: 'We are in class.' },
          {
            char: '沒', pinyin: 'méi', zhuyin: 'ㄇㄟˊ', meaning: 'not have / no', difficulty: 2, components: ['氵', '殳'], exampleSentence: '我沒有錢。', exampleTranslation: 'I don\'t have money.'
          },
          { char: '有', pinyin: 'yǒu', zhuyin: 'ㄧㄡˇ', meaning: 'to have / exist', difficulty: 2, components: ['ナ', '月'], exampleSentence: '我有兩個哥哥。', exampleTranslation: 'I have two older brothers.' },
          { char: '上', pinyin: 'shàng', zhuyin: 'ㄕㄤˋ', meaning: 'up / on / above', difficulty: 1, components: ['上'], exampleSentence: '貓在桌子上。', exampleTranslation: 'The cat is on the table.' },
          { char: '早', pinyin: 'zǎo', zhuyin: 'ㄗㄠˇ', meaning: 'early / morning', difficulty: 2, components: ['日', '十'], exampleSentence: '早安！', exampleTranslation: 'Good morning!' },
          { char: '日', pinyin: 'rì', zhuyin: 'ㄖˋ', meaning: 'sun / day', difficulty: 1, components: ['日'], exampleSentence: '今天是星期日。', exampleTranslation: 'Today is Sunday.' },
          // Page 5
          { char: '回', pinyin: 'huí', zhuyin: 'ㄏㄨㄟˊ', meaning: 'to return', difficulty: 2, components: ['囗', '口'], exampleSentence: '我回家了。', exampleTranslation: 'I went home.' },
          { char: '午', pinyin: 'wǔ', zhuyin: 'ㄨˇ', meaning: 'noon / midday', difficulty: 2, components: ['午'], exampleSentence: '我們吃午餐。', exampleTranslation: 'We eat lunch.' },
          { char: '中', pinyin: 'zhōng', zhuyin: 'ㄓㄨㄥ', meaning: 'middle / center', difficulty: 2, components: ['丨', '口'], exampleSentence: '我在學中文。', exampleTranslation: 'I am learning Chinese.' },
          { char: '館', pinyin: 'guǎn', zhuyin: 'ㄍㄨㄢˇ', meaning: 'hall / building', difficulty: 4, components: ['飠', '官'], exampleSentence: '我們去圖書館。', exampleTranslation: 'We go to the library.' },
          { char: '書', pinyin: 'shū', zhuyin: 'ㄕㄨ', meaning: 'book', difficulty: 3, components: ['聿', '曰'], exampleSentence: '這是一本書。', exampleTranslation: 'This is a book.' },
          { char: '圖', pinyin: 'tú', zhuyin: 'ㄊㄨˊ', meaning: 'picture / map', difficulty: 3, components: ['囗', '啚'], exampleSentence: '圖書館有很多書。', exampleTranslation: 'The library has many books.' },
          // Page 6
          { char: '機', pinyin: 'jī', zhuyin: 'ㄐㄧ', meaning: 'machine / opportunity', difficulty: 4, components: ['木', '幾'], exampleSentence: '這是我的手機。', exampleTranslation: 'This is my mobile phone.' },
          { char: '手', pinyin: 'shǒu', zhuyin: 'ㄕㄡˇ', meaning: 'hand', difficulty: 2, components: ['手'], exampleSentence: '請洗手。', exampleTranslation: 'Please wash your hands.' },
          { char: '分', pinyin: 'fēn', zhuyin: 'ㄈㄣ', meaning: 'minute / to divide', difficulty: 2, components: ['八', '刀'], exampleSentence: '現在十點十分。', exampleTranslation: 'It is 10:10.' },
          { char: '下', pinyin: 'xià', zhuyin: 'ㄒㄧㄚˋ', meaning: 'down / below', difficulty: 1, components: ['一', '卜'], exampleSentence: '我們下課了。', exampleTranslation: 'Class is dismissed.' },
          { char: '家', pinyin: 'jiā', zhuyin: 'ㄐㄧㄚ', meaning: 'home / family', difficulty: 2, components: ['宀', '豕'], exampleSentence: '我的家很大。', exampleTranslation: 'My home is big.' },
          { char: '人', pinyin: 'rén', zhuyin: 'ㄖㄣˊ', meaning: 'person', difficulty: 1, components: ['人'], exampleSentence: '這裡很多人。', exampleTranslation: 'There are many people here.' },
        ]
      },
      {
        id: 'ws-5',
        name: 'Worksheet 5 (Jan 8 - B1L2-3)',
        characters: [
          // Daily activities and meals
          { char: '做', pinyin: 'zuò', zhuyin: 'ㄗㄨㄛˋ', meaning: 'to do / to make', difficulty: 2, components: ['亻', '故'], exampleSentence: '你在做什麼？', exampleTranslation: 'What are you doing?' },
          { char: '歲', pinyin: 'suì', zhuyin: 'ㄙㄨㄟˋ', meaning: 'years old', difficulty: 3, components: ['止', '戌', '小'], exampleSentence: '你幾歲？', exampleTranslation: 'How old are you?' },
          { char: '起', pinyin: 'qǐ', zhuyin: 'ㄑㄧˇ', meaning: 'to rise / to get up', difficulty: 2, components: ['走', '己'], exampleSentence: '我七點起床。', exampleTranslation: 'I get up at seven.' },
          { char: '床', pinyin: 'chuáng', zhuyin: 'ㄔㄨㄤˊ', meaning: 'bed', difficulty: 2, components: ['广', '木'], exampleSentence: '這張床很大。', exampleTranslation: 'This bed is big.' },
          { char: '午', pinyin: 'wǔ', zhuyin: 'ㄨˇ', meaning: 'noon / midday', difficulty: 2, components: ['午'], exampleSentence: '我們吃午餐。', exampleTranslation: 'We eat lunch.' },
          { char: '早', pinyin: 'zǎo', zhuyin: 'ㄗㄠˇ', meaning: 'early / morning', difficulty: 2, components: ['日', '十'], exampleSentence: '早安！', exampleTranslation: 'Good morning!' },
          { char: '晚', pinyin: 'wǎn', zhuyin: 'ㄨㄢˇ', meaning: 'evening / late', difficulty: 3, components: ['日', '免'], exampleSentence: '晚安。', exampleTranslation: 'Good night.' },
          {
            char: '飯', pinyin: 'fàn', zhuyin: 'ㄈㄢˋ', meaning: 'rice / meal', difficulty: 2, components: ['飠', '反'], exampleSentence: '我們一起吃飯。', exampleTranslation: 'Let\'s eat together.'
          },
          { char: '睡', pinyin: 'shuì', zhuyin: 'ㄕㄨㄟˋ', meaning: 'to sleep', difficulty: 3, components: ['目', '垂'], exampleSentence: '我想睡覺。', exampleTranslation: 'I want to sleep.' },
          { char: '覺', pinyin: 'jiào', zhuyin: 'ㄐㄧㄠˋ', meaning: 'sleep / to feel', difficulty: 3, components: ['臼', '冖', '見'], exampleSentence: '他在睡覺。', exampleTranslation: 'He is sleeping.' },
          { char: '忙', pinyin: 'máng', zhuyin: 'ㄇㄤˊ', meaning: 'busy', difficulty: 2, components: ['忄', '亡'], exampleSentence: '爸爸工作很忙。', exampleTranslation: 'Dad is busy with work.' },
          { char: '累', pinyin: 'lèi', zhuyin: 'ㄌㄟˋ', meaning: 'tired', difficulty: 3, components: ['田', '糸'], exampleSentence: '我很累。', exampleTranslation: 'I am tired.' },
        ]
      },
      {
        id: 'ws-6',
        name: 'Worksheet 6 (B1L3-1)',
        characters: [
          // Page 1
          { char: '個', pinyin: 'gè', zhuyin: 'ㄍㄜˋ', meaning: 'general measure word', difficulty: 1, components: ['亻', '固'], exampleSentence: '一個蘋果。', exampleTranslation: 'One apple.' },
          { char: '送', pinyin: 'sòng', zhuyin: 'ㄙㄨㄥˋ', meaning: 'to deliver / to send', difficulty: 2, components: ['辶', '灷'], exampleSentence: '媽媽送我去學校。', exampleTranslation: 'Mom takes me to school.' },
          { char: '想', pinyin: 'xiǎng', zhuyin: 'ㄒㄧㄤˇ', meaning: 'to want / to think', difficulty: 2, components: ['相', '心'], exampleSentence: '我想喝咖啡。', exampleTranslation: 'I want to drink coffee.' },
          { char: '物', pinyin: 'wù', zhuyin: 'ㄨˋ', meaning: 'thing / object', difficulty: 2, components: ['牛', '勿'], exampleSentence: '這是我送給你的禮物', exampleTranslation: 'This is the gift I gave you.' },
          { char: '禮', pinyin: 'lǐ', zhuyin: 'ㄌㄧˇ', meaning: 'gift / courtesy', difficulty: 2, components: ['礻', '豊'], exampleSentence: '生日禮物。', exampleTranslation: 'Birthday gift.' },
          { char: '買', pinyin: 'mǎi', zhuyin: 'ㄇㄞˇ', meaning: 'to buy', difficulty: 2, components: ['罒', '貝'], exampleSentence: '我要買東西。', exampleTranslation: 'I want to buy something.' },
          // Page 2
          { char: '文', pinyin: 'wén', zhuyin: 'ㄨㄣˊ', meaning: 'language / culture', difficulty: 2, components: ['文'], exampleSentence: '英文很難。', exampleTranslation: 'English is hard.' },
          { char: '中', pinyin: 'zhōng', zhuyin: 'ㄓㄨㄥ', meaning: 'middle / center', difficulty: 2, components: ['丨', '口'], exampleSentence: '我在學中文。', exampleTranslation: 'I am learning Chinese.' },
          { char: '本', pinyin: 'běn', zhuyin: 'ㄅㄣˇ', meaning: 'measure word for books', difficulty: 2, components: ['木', '一'], exampleSentence: '一本書。', exampleTranslation: 'A book.' },
          { char: '兩', pinyin: 'liǎng', zhuyin: 'ㄌㄧㄤˇ', meaning: 'two', difficulty: 1, components: ['一', '冂', '入'], exampleSentence: '兩個人。', exampleTranslation: 'Two people.' },
          { char: '書', pinyin: 'shū', zhuyin: 'ㄕㄨ', meaning: 'book', difficulty: 3, components: ['聿', '曰'], exampleSentence: '這是一本書。', exampleTranslation: 'This is a book.' },
          { char: '看', pinyin: 'kàn', zhuyin: 'ㄎㄢˋ', meaning: 'to read / to see', difficulty: 2, components: ['手', '目'], exampleSentence: '看書。', exampleTranslation: 'Reading a book.' },
          // Page 3
          { char: '和', pinyin: 'hé', zhuyin: 'ㄏㄜˊ', meaning: 'and / with', difficulty: 2, components: ['禾', '口'], exampleSentence: '我和你。', exampleTranslation: 'You and me.' },
          { char: '朵', pinyin: 'duǒ', zhuyin: 'ㄉㄨㄛˇ', meaning: 'measure word for flowers', difficulty: 2, components: ['几', '木'], exampleSentence: '一朵花。', exampleTranslation: 'A flower.' },
          { char: '花', pinyin: 'huā', zhuyin: 'ㄏㄨㄚ', meaning: 'flower', difficulty: 1, components: ['艹', '化'], exampleSentence: '花開了。', exampleTranslation: 'The flowers bloomed.' },
          { char: '些', pinyin: 'xiē', zhuyin: 'ㄒㄧㄝ', meaning: 'some / a few', difficulty: 2, components: ['此', '二'], exampleSentence: '一些人。', exampleTranslation: 'Some people.' },
          { char: '一', pinyin: 'yī', zhuyin: 'ㄧ', meaning: 'one', difficulty: 1, components: ['一'], exampleSentence: '第一名。', exampleTranslation: 'First place.' },
          { char: '英', pinyin: 'yīng', zhuyin: 'ㄧㄥ', meaning: 'brave / UK', difficulty: 2, components: ['艹', '央'], exampleSentence: '英國。', exampleTranslation: 'UK.' },
          // Page 4
          { char: '啊', pinyin: 'a', zhuyin: 'ㄚ˙', meaning: 'particle', difficulty: 1, components: ['口', '阿'], exampleSentence: '是啊！', exampleTranslation: 'Yes indeed!' },
          { char: '起', pinyin: 'qǐ', zhuyin: 'ㄑㄧˇ', meaning: 'to rise / to start', difficulty: 2, components: ['走', '己'], exampleSentence: '我七點起床。', exampleTranslation: 'I get up at seven.' },
          { char: '糕', pinyin: 'gāo', zhuyin: 'ㄍㄠ', meaning: 'cake', difficulty: 2, components: ['米', '羔'], exampleSentence: '蛋糕。', exampleTranslation: 'Cake.' },
          { char: '蛋', pinyin: 'dàn', zhuyin: 'ㄉㄢˋ', meaning: 'egg', difficulty: 1, components: ['疋', '虫'], exampleSentence: '雞蛋。', exampleTranslation: 'Chicken egg.' },
          { char: '小', pinyin: 'xiǎo', zhuyin: 'ㄒㄧㄠˇ', meaning: 'small', difficulty: 1, components: ['小'], exampleSentence: '小孩。', exampleTranslation: 'Child.' },
          { char: '大', pinyin: 'dà', zhuyin: 'ㄉㄚˋ', meaning: 'big', difficulty: 1, components: ['一', '人'], exampleSentence: '這隻狗很大。', exampleTranslation: 'This dog is big.' },
        ]
      },
      {
        id: 'ws-7',
        name: 'Worksheet 7 (Jan 14 - B1L3-2)',
        characters: [
          { char: '這', pinyin: 'zhè', zhuyin: 'ㄓㄜˋ', meaning: 'this', difficulty: 2 },
          { char: '那', pinyin: 'nà', zhuyin: 'ㄋㄚˋ', meaning: 'that', difficulty: 1 },
          { char: '種', pinyin: 'zhǒng', zhuyin: 'ㄓㄨㄥˇ', meaning: 'kind / type', difficulty: 2, exampleSentence: '這是哪種茶？', exampleTranslation: 'What kind of tea is this?' },
          { char: '鉛', pinyin: 'qiān', zhuyin: 'ㄑㄧㄢ', meaning: 'lead (metal)', difficulty: 2, exampleSentence: '鉛筆。', exampleTranslation: 'Pencil.' },
          { char: '筆', pinyin: 'bǐ', zhuyin: 'ㄅㄧˇ', meaning: 'pen', difficulty: 1 },
          { char: '怎', pinyin: 'zěn', zhuyin: 'ㄗㄣˇ', meaning: 'how (怎麼)', difficulty: 2 },
          { char: '麼', pinyin: 'me', zhuyin: 'ㄇㄜ˙', meaning: 'suffix', difficulty: 2, components: ['麻', '幺'] },
          { char: '樣', pinyin: 'yàng', zhuyin: 'ㄧㄤˋ', meaning: 'kind / type (怎麼樣)', difficulty: 2 },
          { char: '東', pinyin: 'dōng', zhuyin: 'ㄉㄨㄥ', meaning: 'east', difficulty: 2 },
          { char: '西', pinyin: 'xī', zhuyin: 'ㄒㄧ', meaning: 'west / thing', difficulty: 1 },
          { char: '隻', pinyin: 'zhī', zhuyin: 'ㄓ', meaning: 'measure word for animals', difficulty: 2, exampleSentence: '一隻狗。', exampleTranslation: 'One dog.' },
          { char: '快', pinyin: 'kuài', zhuyin: 'ㄎㄨㄞˋ', meaning: 'fast', difficulty: 1 },
          { char: '錢', pinyin: 'qián', zhuyin: 'ㄑㄧㄢˊ', meaning: 'money', difficulty: 1 },
          { char: '元', pinyin: 'yuán', zhuyin: 'ㄩㄢˊ', meaning: 'dollar / yuan', difficulty: 2, exampleSentence: '五百元。', exampleTranslation: '500 yuan.' },
          { char: '便', pinyin: 'pián', zhuyin: 'ㄆㄧㄢˊ', meaning: 'cheap (便宜)', difficulty: 2, exampleSentence: '很便宜。', exampleTranslation: 'Very cheap.' },
          { char: '宜', pinyin: 'yí', zhuyin: 'ㄧˊ', meaning: 'suitable / cheap (便宜)', difficulty: 2, exampleSentence: '便宜。', exampleTranslation: 'Cheap.' },
          { char: '貴', pinyin: 'guì', zhuyin: 'ㄍㄨㄟˋ', meaning: 'expensive', difficulty: 2 },
          { char: '顏', pinyin: 'yán', zhuyin: 'ㄧㄢˊ', meaning: 'color (顏色)', difficulty: 2, exampleSentence: '什麼顏色？', exampleTranslation: 'What color?' },
          { char: '色', pinyin: 'sè', zhuyin: 'ㄙㄜˋ', meaning: 'color (顏色)', difficulty: 1, exampleSentence: '紅色。', exampleTranslation: 'Red.' },
          { char: '紅', pinyin: 'hóng', zhuyin: 'ㄏㄨㄥˊ', meaning: 'red', difficulty: 1 },
          { char: '白', pinyin: 'bái', zhuyin: 'ㄅㄞˊ', meaning: 'white', difficulty: 1 },
          { char: '都', pinyin: 'dōu', zhuyin: 'ㄉㄡ', meaning: 'all / both', difficulty: 2 },
          { char: '好', pinyin: 'hǎo', zhuyin: 'ㄏㄠˇ', meaning: 'good', difficulty: 1 },
          { char: '看', pinyin: 'kàn', zhuyin: 'ㄎㄢˋ', meaning: 'to look', difficulty: 1 },
          { char: '常', pinyin: 'cháng', zhuyin: 'ㄔㄤˊ', meaning: 'often', difficulty: 1 },
          { char: '穿', pinyin: 'chuān', zhuyin: 'ㄔㄨㄢ', meaning: 'to wear', difficulty: 1 },
          { char: '衣', pinyin: 'yī', zhuyin: 'ㄧ', meaning: 'clothes (衣服)', difficulty: 2, exampleSentence: '穿衣服。', exampleTranslation: 'Wear clothes.' },
          { char: '服', pinyin: 'fú', zhuyin: 'ㄈㄨˊ', meaning: 'clothes (衣服)', difficulty: 2, exampleSentence: '衣服。', exampleTranslation: 'Clothes.' },
          { char: '件', pinyin: 'jiàn', zhuyin: 'ㄐㄧㄢˋ', meaning: 'measure word for clothes', difficulty: 2 },
          { char: '舊', pinyin: 'jiù', zhuyin: 'ㄐㄧㄡˋ', meaning: 'old (past/used)', difficulty: 2, exampleSentence: '這是一本舊書。', exampleTranslation: 'This is an old book.' }
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
          { char: '大', pinyin: 'dà', zhuyin: 'ㄉㄚˋ', meaning: 'big / great', difficulty: 1, components: ['一', '人'], exampleSentence: '這隻狗很大。', exampleTranslation: 'This dog is big.' },
          { char: '家', pinyin: 'jiā', zhuyin: 'ㄐㄧㄚ', meaning: 'home / family', difficulty: 2, components: ['宀', '豕'], exampleSentence: '我的家很大。', exampleTranslation: 'My home is big.' },
          // 朋友
          { char: '朋', pinyin: 'péng', zhuyin: 'ㄆㄥˊ', meaning: 'friend (part of 朋友)', difficulty: 2, components: ['月', '月'], exampleSentence: '我有許多朋友。', exampleTranslation: 'I have many friends.' },
          { char: '友', pinyin: 'yǒu', zhuyin: 'ㄧㄡˇ', meaning: 'friend (part of 朋友)', difficulty: 2, components: ['ナ', '又'], exampleSentence: '他是我的好朋友。', exampleTranslation: 'He is my good friend.' },
          // 愛
          { char: '愛', pinyin: 'ài', zhuyin: 'ㄞˋ', meaning: 'love', difficulty: 3, components: ['爫', '冖', '心', '夂'], exampleSentence: '媽媽愛我。', exampleTranslation: 'Mom loves me.' },
          // 吃
          { char: '吃', pinyin: 'chī', zhuyin: 'ㄔ', meaning: 'to eat', difficulty: 2, components: ['口', '乞'], exampleSentence: '我喜歡吃水果。', exampleTranslation: 'I like to eat fruit.' },
          // 水果
          { char: '水', pinyin: 'shuǐ', zhuyin: 'ㄕㄨㄟˇ', meaning: 'water', difficulty: 1, components: ['水'], exampleSentence: '請給我一杯水。', exampleTranslation: 'Please give me a glass of water.' },
          { char: '果', pinyin: 'guǒ', zhuyin: 'ㄍㄨㄛˇ', meaning: 'fruit / result', difficulty: 2, components: ['田', '木'], exampleSentence: '桌上有水果。', exampleTranslation: 'There is fruit on the table.' },
          // 喝
          { char: '喝', pinyin: 'hē', zhuyin: 'ㄏㄜ', meaning: 'to drink', difficulty: 3, components: ['口', '曷'], exampleSentence: '我想喝水。', exampleTranslation: 'I want to drink water.' },
          // 茶
          { char: '茶', pinyin: 'chá', zhuyin: 'ㄔㄚˊ', meaning: 'tea', difficulty: 3, components: ['艹', '人', '木'], exampleSentence: '爸爸喜歡喝茶。', exampleTranslation: 'Dad likes to drink tea.' },
          // 謝謝
          { char: '謝', pinyin: 'xiè', zhuyin: 'ㄒㄧㄝˋ', meaning: 'to thank', difficulty: 4, components: ['言', '身', '寸'], exampleSentence: '謝謝你的幫忙。', exampleTranslation: 'Thank you for your help.' },
          // 不客氣
          { char: '不', pinyin: 'bù', zhuyin: 'ㄅㄨˋ', meaning: 'not / no', difficulty: 1, components: ['一', '丨', '丿', '丶'], exampleSentence: '不要。', exampleTranslation: 'Do not want.' },
          { char: '客', pinyin: 'kè', zhuyin: 'ㄎㄜˋ', meaning: 'guest / customer', difficulty: 3, components: ['宀', '各'], exampleSentence: '家裡有客人。', exampleTranslation: 'There are guests at home.' },
          { char: '氣', pinyin: 'qì', zhuyin: 'ㄑㄧˋ', meaning: 'air / gas / energy', difficulty: 3, components: ['气', '米'], exampleSentence: '今天天氣很好。', exampleTranslation: 'The weather is good today.' },
          // 珍珠奶茶
          { char: '珍', pinyin: 'zhēn', zhuyin: 'ㄓㄣ', meaning: 'precious / rare', difficulty: 3, components: ['王', '㐱'], exampleSentence: '珍珠很貴。', exampleTranslation: 'Pearls are expensive.' },
          { char: '珠', pinyin: 'zhū', zhuyin: 'ㄓㄨ', meaning: 'pearl / bead', difficulty: 3, components: ['王', '朱'], exampleSentence: '這是珍珠奶茶。', exampleTranslation: 'This is bubble tea.' },
          { char: '奶', pinyin: 'nǎi', zhuyin: 'ㄋㄞˇ', meaning: 'milk / grandmother', difficulty: 2, components: ['女', '乃'], exampleSentence: '我不喝牛奶。', exampleTranslation: 'I do not drink milk.' },
          // 自我介紹
          { char: '自', pinyin: 'zì', zhuyin: 'ㄗˋ', meaning: 'self / from', difficulty: 2, components: ['自'], exampleSentence: '我自己去。', exampleTranslation: 'I go by myself.' },
          { char: '我', pinyin: 'wǒ', zhuyin: 'ㄨㄛˇ', meaning: 'I / me', difficulty: 3, components: ['手', '戈'], exampleSentence: '我是學生。', exampleTranslation: 'I am a student.' },
          { char: '介', pinyin: 'jiè', zhuyin: 'ㄐㄧㄝˋ', meaning: 'between (part of 介紹)', difficulty: 2, components: ['人', '丨', '丨'], exampleSentence: '我介紹朋友給你。', exampleTranslation: 'I introduce a friend to you.' },
          { char: '紹', pinyin: 'shào', zhuyin: 'ㄕㄠˋ', meaning: 'to introduce (part of 介紹)', difficulty: 3, components: ['糹', '召'], exampleSentence: '請自我介紹。', exampleTranslation: 'Please introduce yourself.' },
          // 早安
          { char: '早', pinyin: 'zǎo', zhuyin: 'ㄗㄠˇ', meaning: 'early / morning', difficulty: 2, components: ['日', '十'], exampleSentence: '早安！', exampleTranslation: 'Good morning!' },
          { char: '安', pinyin: 'ān', zhuyin: 'ㄢ', meaning: 'peace / safe', difficulty: 2, components: ['宀', '女'] },
          // 午安
          { char: '午', pinyin: 'wǔ', zhuyin: 'ㄨˇ', meaning: 'noon / midday', difficulty: 2, components: ['午'], exampleSentence: '我們吃午餐。', exampleTranslation: 'We eat lunch.' },
          // 晚安
          { char: '晚', pinyin: 'wǎn', zhuyin: 'ㄨㄢˇ', meaning: 'evening / late', difficulty: 3, components: ['日', '免'], exampleSentence: '晚安。', exampleTranslation: 'Good night.' },
        ]
      },
      {
        id: 'test-2',
        name: 'Test Pack 2',
        characters: [
          // Page 1
          { char: '要', pinyin: 'yào', zhuyin: 'ㄧㄠˋ', meaning: 'want / need', difficulty: 2, exampleSentence: '我要喝水。', exampleTranslation: 'I want to drink water.' },
          { char: '末', pinyin: 'mò', zhuyin: 'ㄇㄛˋ', meaning: 'end / last', difficulty: 2, components: ['木', '一'] },
          { char: '週', pinyin: 'zhōu', zhuyin: 'ㄓㄡ', meaning: 'week', difficulty: 2, components: ['辶', '周'] },
          { char: '昨', pinyin: 'zuó', zhuyin: 'ㄗㄨㄛˊ', meaning: 'yesterday', difficulty: 2 },
          { char: '明', pinyin: 'míng', zhuyin: 'ㄇㄧㄥˊ', meaning: 'bright / tomorrow', difficulty: 2 },
          {
            char: '天', pinyin: 'tiān', zhuyin: 'ㄊㄧㄢ', meaning: 'day / sky', difficulty: 2, components: ['一', '大'], exampleSentence: '今天天氣很好。', exampleTranslation: 'Also: Today\'s weather is good.'
          },
          // Page 2
          { char: '快', pinyin: 'kuài', zhuyin: 'ㄎㄨㄞˋ', meaning: 'fast', difficulty: 1, components: ['忄', '夬'] },
          { char: '日', pinyin: 'rì', zhuyin: 'ㄖˋ', meaning: 'sun / day', difficulty: 1, components: ['日'], exampleSentence: '今天是星期日。', exampleTranslation: 'Today is Sunday.' },
          { char: '生', pinyin: 'shēng', zhuyin: 'ㄕㄥ', meaning: 'student / life', difficulty: 2 },
          { char: '的', pinyin: 'de', zhuyin: 'ㄉㄜ˙', meaning: 'possessive particle', difficulty: 1, exampleSentence: '我的。', exampleTranslation: 'Mine.' },
          { char: '啊', pinyin: 'a', zhuyin: 'ㄚ˙', meaning: 'particle', difficulty: 1, components: ['口', '阿'], exampleSentence: '是啊！', exampleTranslation: 'Yes indeed!' },
          { char: '來', pinyin: 'lái', zhuyin: 'ㄌㄞˊ', meaning: 'to come', difficulty: 2, exampleSentence: '請過來。', exampleTranslation: 'Please come here.' },
          // Page 3
          { char: '題', pinyin: 'tí', zhuyin: 'ㄊㄧˊ', meaning: 'topic / problem', difficulty: 3, components: ['是', '頁'] },
          { char: '問', pinyin: 'wèn', zhuyin: 'ㄨㄣˋ', meaning: 'to ask', difficulty: 3, components: ['門', '口'], exampleSentence: '我可以問一個問題嗎？', exampleTranslation: 'Can I ask a question?' },
          {
            char: '沒', pinyin: 'méi', zhuyin: 'ㄇㄟˊ', meaning: 'not have / no', difficulty: 2, components: ['氵', '殳'], exampleSentence: '我沒有錢。', exampleTranslation: 'I don\'t have money.'
          },
          { char: '上', pinyin: 'shàng', zhuyin: 'ㄕㄤˋ', meaning: 'up / on / above', difficulty: 1, components: ['上'], exampleSentence: '貓在桌子上。', exampleTranslation: 'The cat is on the table.' },
          { char: '晚', pinyin: 'wǎn', zhuyin: 'ㄨㄢˇ', meaning: 'evening / late', difficulty: 3, components: ['日', '免'], exampleSentence: '晚安。', exampleTranslation: 'Good night.' },
          { char: '樂', pinyin: 'lè', zhuyin: 'ㄌㄜˋ', meaning: 'happy / music', difficulty: 2, components: ['白', '幺', '木'] },
          // Page 4
          { char: '熱', pinyin: 'rè', zhuyin: 'ㄖㄜˋ', meaning: 'hot', difficulty: 3, exampleSentence: '今天很熱。', exampleTranslation: 'It is hot today.' },
          { char: '見', pinyin: 'jiàn', zhuyin: 'ㄐㄧㄢˋ', meaning: 'to see / meet', difficulty: 2 },
          { char: '再', pinyin: 'zài', zhuyin: 'ㄗㄞˋ', meaning: 'again / goodbye', difficulty: 2 },
        ]
      },
      {
        id: 'test-3',
        name: 'Test Pack 3 (Jan 8)',
        characters: [
          // Daily activities and meals
          { char: '做', pinyin: 'zuò', zhuyin: 'ㄗㄨㄛˋ', meaning: 'to do / to make', difficulty: 2, components: ['亻', '故'], exampleSentence: '你在做什麼？', exampleTranslation: 'What are you doing?' },
          { char: '歲', pinyin: 'suì', zhuyin: 'ㄙㄨㄟˋ', meaning: 'years old', difficulty: 3, components: ['止', '戌', '小'], exampleSentence: '你幾歲？', exampleTranslation: 'How old are you?' },
          { char: '起', pinyin: 'qǐ', zhuyin: 'ㄑㄧˇ', meaning: 'to rise / to get up', difficulty: 2, components: ['走', '己'], exampleSentence: '我七點起床。', exampleTranslation: 'I get up at seven.' },
          { char: '床', pinyin: 'chuáng', zhuyin: 'ㄔㄨㄤˊ', meaning: 'bed', difficulty: 2, components: ['广', '木'], exampleSentence: '這張床很大。', exampleTranslation: 'This bed is big.' },
          { char: '午', pinyin: 'wǔ', zhuyin: 'ㄨˇ', meaning: 'noon / midday', difficulty: 2, components: ['午'], exampleSentence: '我們吃午餐。', exampleTranslation: 'We eat lunch.' },
          { char: '早', pinyin: 'zǎo', zhuyin: 'ㄗㄠˇ', meaning: 'early / morning', difficulty: 2, components: ['日', '十'], exampleSentence: '早安！', exampleTranslation: 'Good morning!' },
          { char: '晚', pinyin: 'wǎn', zhuyin: 'ㄨㄢˇ', meaning: 'evening / late', difficulty: 3, components: ['日', '免'], exampleSentence: '晚安。', exampleTranslation: 'Good night.' },
          {
            char: '飯', pinyin: 'fàn', zhuyin: 'ㄈㄢˋ', meaning: 'rice / meal', difficulty: 2, components: ['飠', '反'], exampleSentence: '我們一起吃飯。', exampleTranslation: 'Let\'s eat together.'
          },
          { char: '睡', pinyin: 'shuì', zhuyin: 'ㄕㄨㄟˋ', meaning: 'to sleep', difficulty: 3, components: ['目', '垂'], exampleSentence: '我想睡覺。', exampleTranslation: 'I want to sleep.' },
          { char: '覺', pinyin: 'jiào', zhuyin: 'ㄐㄧㄠˋ', meaning: 'sleep / to feel', difficulty: 3, components: ['臼', '冖', '見'], exampleSentence: '他在睡覺。', exampleTranslation: 'He is sleeping.' },
          { char: '忙', pinyin: 'máng', zhuyin: 'ㄇㄤˊ', meaning: 'busy', difficulty: 2, components: ['忄', '亡'], exampleSentence: '爸爸工作很忙。', exampleTranslation: 'Dad is busy with work.' },
          { char: '累', pinyin: 'lèi', zhuyin: 'ㄌㄟˋ', meaning: 'tired', difficulty: 3, components: ['田', '糸'], exampleSentence: '我很累。', exampleTranslation: 'I am tired.' },
        ]
      },
      {
        id: 'test-4',
        name: 'Test Pack 4 (Jan 13 - B1L3-1)',
        characters: [
          // Page 1
          { char: '個', pinyin: 'gè', zhuyin: 'ㄍㄜˋ', meaning: 'general measure word', difficulty: 1, components: ['亻', '固'], exampleSentence: '我有一個好朋友。', exampleTranslation: 'I have a good friend.' },
          { char: '送', pinyin: 'sòng', zhuyin: 'ㄙㄨㄥˋ', meaning: 'to deliver / to send', difficulty: 2, components: ['辶', '灷'], exampleSentence: '我送他一本書。', exampleTranslation: 'I gave him a book.' },
          { char: '想', pinyin: 'xiǎng', zhuyin: 'ㄒㄧㄤˇ', meaning: 'to want / to think', difficulty: 2, components: ['相', '心'], exampleSentence: '我想去台灣。', exampleTranslation: 'I want to go to Taiwan.' },
          { char: '物', pinyin: 'wù', zhuyin: 'ㄨˋ', meaning: 'thing / object', difficulty: 2, components: ['牛', '勿'], exampleSentence: '這是我送給你的禮物', exampleTranslation: 'This is the gift I gave you.' },
          { char: '禮', pinyin: 'lǐ', zhuyin: 'ㄌㄧˇ', meaning: 'gift / courtesy', difficulty: 2, components: ['礻', '豊'], exampleSentence: '這是給你的禮物。', exampleTranslation: 'This is a gift for you.' },
          { char: '買', pinyin: 'mǎi', zhuyin: 'ㄇㄞˇ', meaning: 'to buy', difficulty: 2, components: ['罒', '貝'], exampleSentence: '我想買一個蛋糕。', exampleTranslation: 'I want to buy a cake.' },
          // Page 2
          { char: '文', pinyin: 'wén', zhuyin: 'ㄨㄣˊ', meaning: 'language / culture', difficulty: 2, components: ['文'], exampleSentence: '我喜歡中文。', exampleTranslation: 'I like Chinese.' },
          { char: '中', pinyin: 'zhōng', zhuyin: 'ㄓㄨㄥ', meaning: 'middle / center', difficulty: 2, components: ['丨', '口'], exampleSentence: '他是中國人。', exampleTranslation: 'He is Chinese.' },
          { char: '本', pinyin: 'běn', zhuyin: 'ㄅㄣˇ', meaning: 'measure word for books', difficulty: 2, components: ['木', '一'], exampleSentence: '我有三本書。', exampleTranslation: 'I have three books.' },
          { char: '兩', pinyin: 'liǎng', zhuyin: 'ㄌㄧㄤˇ', meaning: 'two', difficulty: 1, components: ['一', '冂', '入'], exampleSentence: '我有兩個妹妹。', exampleTranslation: 'I have two younger sisters.' },
          { char: '書', pinyin: 'shū', zhuyin: 'ㄕㄨ', meaning: 'book', difficulty: 3, components: ['聿', '曰'], exampleSentence: '這本書很有趣。', exampleTranslation: 'This book is very interesting.' },
          { char: '看', pinyin: 'kàn', zhuyin: 'ㄎㄢˋ', meaning: 'to read / to see', difficulty: 2, components: ['手', '目'], exampleSentence: '我喜歡看電影。', exampleTranslation: 'I like to watch movies.' },
          // Page 3
          { char: '和', pinyin: 'hé', zhuyin: 'ㄏㄜˊ', meaning: 'and / with', difficulty: 2, components: ['禾', '口'], exampleSentence: '我和你去。', exampleTranslation: 'I will go with you.' },
          { char: '朵', pinyin: 'duǒ', zhuyin: 'ㄉㄨㄛˇ', meaning: 'measure word for flowers', difficulty: 2, components: ['几', '木'], exampleSentence: '那是一朵花。', exampleTranslation: 'That is a flower.' },
          { char: '花', pinyin: 'huā', zhuyin: 'ㄏㄨㄚ', meaning: 'flower', difficulty: 1, components: ['艹', '化'], exampleSentence: '這朵花很漂亮。', exampleTranslation: 'This flower is beautiful.' },
          { char: '些', pinyin: 'xiē', zhuyin: 'ㄒㄧㄝ', meaning: 'some / a few', difficulty: 2, components: ['此', '二'], exampleSentence: '這些書是誰的？', exampleTranslation: 'Whose books are these?' },
          { char: '一', pinyin: 'yī', zhuyin: 'ㄧ', meaning: 'one', difficulty: 1, components: ['一'], exampleSentence: '我有一個蘋果。', exampleTranslation: 'I have an apple.' },
          { char: '英', pinyin: 'yīng', zhuyin: 'ㄧㄥ', meaning: 'brave / UK', difficulty: 2, components: ['艹', '央'], exampleSentence: '他會說英文。', exampleTranslation: 'He can speak English.' },
          // Page 4
          { char: '啊', pinyin: 'a', zhuyin: 'ㄚ˙', meaning: 'particle', difficulty: 1, components: ['口', '阿'], exampleSentence: '好快啊！', exampleTranslation: 'So fast!' },
          { char: '起', pinyin: 'qǐ', zhuyin: 'ㄑㄧˇ', meaning: 'to rise / to start', difficulty: 2, components: ['走', '己'], exampleSentence: '我早上六點起床。', exampleTranslation: 'I get up at 6 in the morning.' },
          { char: '糕', pinyin: 'gāo', zhuyin: 'ㄍㄠ', meaning: 'cake', difficulty: 2, components: ['米', '羔'], exampleSentence: '蛋糕很好吃。', exampleTranslation: 'The cake is delicious.' },
          { char: '蛋', pinyin: 'dàn', zhuyin: 'ㄉㄢˋ', meaning: 'egg', difficulty: 1, components: ['疋', '虫'], exampleSentence: '我想吃雞蛋。', exampleTranslation: 'I want to eat eggs.' },
          { char: '小', pinyin: 'xiǎo', zhuyin: 'ㄒㄧㄠˇ', meaning: 'small', difficulty: 1, components: ['小'], exampleSentence: '這隻狗很小。', exampleTranslation: 'This dog is small.' },
          { char: '大', pinyin: 'dà', zhuyin: 'ㄉㄚˋ', meaning: 'big', difficulty: 1, components: ['一', '人'], exampleSentence: '那個房子很大。', exampleTranslation: 'That house is big.' },
        ]
      },
    ]
  },
  {
    id: 'intro-basics',
    name: 'Introduction',
    description: 'Essential basics for getting started with writing.',
    icon: '🌱',
    characters: [
      { char: '一', pinyin: 'yī', zhuyin: 'ㄧ', meaning: 'one', difficulty: 1, components: ['一'], exampleSentence: '第一名。', exampleTranslation: 'First place.' },
      { char: '二', pinyin: 'èr', zhuyin: 'ㄦˋ', meaning: 'two', difficulty: 1, components: ['一', '一'], exampleSentence: '二月二日。', exampleTranslation: 'February 2nd.' },
      {
        char: '三', pinyin: 'sān', zhuyin: 'ㄙㄢ', meaning: 'three', difficulty: 1, components: ['一', '一', '一'], exampleSentence: '三點鐘。', exampleTranslation: 'Three o\'clock.'
      },
      { char: '人', pinyin: 'rén', zhuyin: 'ㄖㄣˊ', meaning: 'person', difficulty: 1, components: ['人'], exampleSentence: '這裡很多人。', exampleTranslation: 'There are many people here.' },
      { char: '口', pinyin: 'kǒu', zhuyin: 'ㄎㄡˇ', meaning: 'mouth', difficulty: 1, components: ['口'], exampleSentence: '一家三口。', exampleTranslation: 'A family of three.' },
      { char: '日', pinyin: 'rì', zhuyin: 'ㄖˋ', meaning: 'sun / day', difficulty: 1, components: ['日'], exampleSentence: '今天是星期日。', exampleTranslation: 'Today is Sunday.' },
      { char: '月', pinyin: 'yuè', zhuyin: 'ㄩㄝˋ', meaning: 'moon / month', difficulty: 2, components: ['月'], exampleSentence: '現在是五月。', exampleTranslation: 'It is May now.' },
      { char: '山', pinyin: 'shān', zhuyin: 'ㄕㄢ', meaning: 'mountain', difficulty: 2, components: ['山'], exampleSentence: '山上。', exampleTranslation: 'On the mountain.' },
      { char: '水', pinyin: 'shuǐ', zhuyin: 'ㄕㄨㄟˇ', meaning: 'water', difficulty: 2, components: ['水'], exampleSentence: '請給我一杯水。', exampleTranslation: 'Please give me a glass of water.' },
    ]
  },
  {
    id: 'hsk1',
    name: 'HSK 1',
    description: 'All 150 essential characters for HSK Level 1 proficiency.',
    icon: '📚',
    isSpecial: true,
    characters: [],
    sequences: [
      {
        id: 'hsk1-numbers',
        name: 'Numbers & Time',
        characters: [
          { char: '一', pinyin: 'yī', zhuyin: 'ㄧ', meaning: 'one', difficulty: 1, exampleSentence: '第一名。', exampleTranslation: 'First place.' },
          { char: '二', pinyin: 'èr', zhuyin: 'ㄦˋ', meaning: 'two', difficulty: 1, exampleSentence: '二月二日。', exampleTranslation: 'February 2nd.' },
          {
            char: '三', pinyin: 'sān', zhuyin: 'ㄙㄢ', meaning: 'three', difficulty: 1, exampleSentence: '三點鐘。', exampleTranslation: 'Three o\'clock.'
          },
          { char: '四', pinyin: 'sì', zhuyin: 'ㄙˋ', meaning: 'four', difficulty: 1, exampleSentence: '四個。', exampleTranslation: 'Four.' },
          { char: '五', pinyin: 'wǔ', zhuyin: 'ㄨˇ', meaning: 'five', difficulty: 1, exampleSentence: '五天。', exampleTranslation: 'Five days.' },
          { char: '六', pinyin: 'liù', zhuyin: 'ㄌㄧㄡˋ', meaning: 'six', difficulty: 1, exampleSentence: '星期六。', exampleTranslation: 'Saturday.' },
          { char: '七', pinyin: 'qī', zhuyin: 'ㄑㄧ', meaning: 'seven', difficulty: 1, exampleSentence: '七月。', exampleTranslation: 'July.' },
          {
            char: '八', pinyin: 'bā', zhuyin: 'ㄅㄚ', meaning: 'eight', difficulty: 1, exampleSentence: '八點。', exampleTranslation: 'Eight o\'clock.'
          },
          { char: '九', pinyin: 'jiǔ', zhuyin: 'ㄐㄧㄡˇ', meaning: 'nine', difficulty: 1, exampleSentence: '九個。', exampleTranslation: 'Nine.' },
          { char: '十', pinyin: 'shí', zhuyin: 'ㄕˊ', meaning: 'ten', difficulty: 1, exampleSentence: '十月。', exampleTranslation: 'October.' },
          { char: '百', pinyin: 'bǎi', zhuyin: 'ㄅㄞˇ', meaning: 'hundred', difficulty: 2, exampleSentence: '一百元。', exampleTranslation: 'One hundred yuan.' },
          { char: '零', pinyin: 'líng', zhuyin: 'ㄌㄧㄥˊ', meaning: 'zero', difficulty: 2, exampleSentence: '零度。', exampleTranslation: 'Zero degrees.' },
          { char: '年', pinyin: 'nián', zhuyin: 'ㄋㄧㄢˊ', meaning: 'year', difficulty: 2, exampleSentence: '明年。', exampleTranslation: 'Next year.' },
          { char: '月', pinyin: 'yuè', zhuyin: 'ㄩㄝˋ', meaning: 'month', difficulty: 1, exampleSentence: '現在是五月。', exampleTranslation: 'It is May now.' },
          { char: '日', pinyin: 'rì', zhuyin: 'ㄖˋ', meaning: 'day / sun', difficulty: 1, exampleSentence: '今天是星期日。', exampleTranslation: 'Today is Sunday.' },
          { char: '號', pinyin: 'hào', zhuyin: 'ㄏㄠˋ', meaning: 'number / date', difficulty: 3, exampleSentence: '今天是幾號？', exampleTranslation: 'What is the date today?' },
          { char: '星', pinyin: 'xīng', zhuyin: 'ㄒㄧㄥ', meaning: 'star', difficulty: 2, exampleSentence: '天上有很多星星。', exampleTranslation: 'There are many stars in the sky.' },
          { char: '期', pinyin: 'qī', zhuyin: 'ㄑㄧ', meaning: 'period', difficulty: 2, exampleSentence: '星期日不用上課。', exampleTranslation: 'No class on Sunday.' },
          { char: '今', pinyin: 'jīn', zhuyin: 'ㄐㄧㄣ', meaning: 'today / now', difficulty: 1, exampleSentence: '今天我很忙。', exampleTranslation: 'I am busy today.' },
          {
            char: '天', pinyin: 'tiān', zhuyin: 'ㄊㄧㄢ', meaning: 'day / sky', difficulty: 1, exampleSentence: '今天天氣很好。', exampleTranslation: 'Also: Today\'s weather is good.'
          },
          { char: '昨', pinyin: 'zuó', zhuyin: 'ㄗㄨㄛˊ', meaning: 'yesterday', difficulty: 2 },
          { char: '明', pinyin: 'míng', zhuyin: 'ㄇㄧㄥˊ', meaning: 'bright / tomorrow', difficulty: 2 },
          { char: '時', pinyin: 'shí', zhuyin: 'ㄕˊ', meaning: 'time / hour', difficulty: 2, exampleSentence: '時間。', exampleTranslation: 'Time.' },
          { char: '候', pinyin: 'hòu', zhuyin: 'ㄏㄡˋ', meaning: 'time / wait', difficulty: 2, exampleSentence: '時候。', exampleTranslation: 'Time/Moment.' },
          { char: '分', pinyin: 'fēn', zhuyin: 'ㄈㄣ', meaning: 'minute / divide', difficulty: 2, exampleSentence: '現在十點十分。', exampleTranslation: 'It is 10:10.' },
          { char: '鐘', pinyin: 'zhōng', zhuyin: 'ㄓㄨㄥ', meaning: 'clock', difficulty: 3, exampleSentence: '還有五分鐘。', exampleTranslation: 'Five minutes left.' },
          {
            char: '點', pinyin: 'diǎn', zhuyin: 'ㄉㄧㄢˇ', meaning: 'o\'clock / point', difficulty: 2, exampleSentence: '現在三點。', exampleTranslation: 'It is three o\'clock.'
          },
          { char: '半', pinyin: 'bàn', zhuyin: 'ㄅㄢˋ', meaning: 'half', difficulty: 1, exampleSentence: '兩點半。', exampleTranslation: '2:30.' },
          { char: '上', pinyin: 'shàng', zhuyin: 'ㄕㄤˋ', meaning: 'up / above', difficulty: 1, exampleSentence: '貓在桌子上。', exampleTranslation: 'The cat is on the table.' },
          { char: '下', pinyin: 'xià', zhuyin: 'ㄒㄧㄚˋ', meaning: 'down / below', difficulty: 1, exampleSentence: '我們下課了。', exampleTranslation: 'Class is dismissed.' },
        ]
      },
      {
        id: 'hsk1-people',
        name: 'People & Family',
        characters: [
          { char: '人', pinyin: 'rén', zhuyin: 'ㄖㄣˊ', meaning: 'person', difficulty: 1, exampleSentence: '這裡很多人。', exampleTranslation: 'There are many people here.' },
          { char: '我', pinyin: 'wǒ', zhuyin: 'ㄨㄛˇ', meaning: 'I / me', difficulty: 2, exampleSentence: '我是學生。', exampleTranslation: 'I am a student.' },
          { char: '你', pinyin: 'nǐ', zhuyin: 'ㄋㄧˇ', meaning: 'you', difficulty: 2, exampleSentence: '你是誰？', exampleTranslation: 'Who are you?' },
          { char: '他', pinyin: 'tā', zhuyin: 'ㄊㄚ', meaning: 'he / him', difficulty: 1, exampleSentence: '他是我的老師。', exampleTranslation: 'He is my teacher.' },
          { char: '她', pinyin: 'tā', zhuyin: 'ㄊㄚ', meaning: 'she / her', difficulty: 2, exampleSentence: '她很漂亮。', exampleTranslation: 'She is beautiful.' },
          { char: '們', pinyin: 'men', zhuyin: 'ㄇㄣ˙', meaning: 'plural marker', difficulty: 2, exampleSentence: '我們。', exampleTranslation: 'We.' },
          { char: '誰', pinyin: 'shéi', zhuyin: 'ㄕㄟˊ', meaning: 'who', difficulty: 3, exampleSentence: '那是誰？', exampleTranslation: 'Who is that?' },
          { char: '爸', pinyin: 'bà', zhuyin: 'ㄅㄚˋ', meaning: 'dad', difficulty: 2, exampleSentence: '爸爸在上班。', exampleTranslation: 'Dad is working.' },
          { char: '媽', pinyin: 'mā', zhuyin: 'ㄇㄚ', meaning: 'mom', difficulty: 2, exampleSentence: '媽媽在煮飯。', exampleTranslation: 'Mom is cooking.' },
          { char: '兒', pinyin: 'ér', zhuyin: 'ㄦˊ', meaning: 'son / child', difficulty: 2, exampleSentence: '兒子。', exampleTranslation: 'Son.' },
          { char: '子', pinyin: 'zǐ', zhuyin: 'ㄗˇ', meaning: 'child / suffix', difficulty: 1, exampleSentence: '這是我的兒子。', exampleTranslation: 'This is my son.' },
          { char: '女', pinyin: 'nǚ', zhuyin: 'ㄋㄩˇ', meaning: 'female / daughter', difficulty: 2, exampleSentence: '女兒。', exampleTranslation: 'Daughter.' },
          { char: '家', pinyin: 'jiā', zhuyin: 'ㄐㄧㄚ', meaning: 'home / family', difficulty: 2, exampleSentence: '我的家很大。', exampleTranslation: 'My home is big.' },
          { char: '朋', pinyin: 'péng', zhuyin: 'ㄆㄥˊ', meaning: 'friend (朋友)', difficulty: 2, exampleSentence: '我有許多朋友。', exampleTranslation: 'I have many friends.' },
          { char: '友', pinyin: 'yǒu', zhuyin: 'ㄧㄡˇ', meaning: 'friend (朋友)', difficulty: 2, exampleSentence: '他是我的好朋友。', exampleTranslation: 'He is my good friend.' },
          { char: '老', pinyin: 'lǎo', zhuyin: 'ㄌㄠˇ', meaning: 'old / teacher prefix', difficulty: 2, exampleSentence: '老師。', exampleTranslation: 'Teacher.' },
          { char: '師', pinyin: 'shī', zhuyin: 'ㄕ', meaning: 'teacher (老師)', difficulty: 2, exampleSentence: '老師好。', exampleTranslation: 'Hello teacher.' },
          { char: '生', pinyin: 'shēng', zhuyin: 'ㄕㄥ', meaning: 'student / life', difficulty: 2 },
          { char: '學', pinyin: 'xué', zhuyin: 'ㄒㄩㄝˊ', meaning: 'study / learn', difficulty: 3, exampleSentence: '我學習中文。', exampleTranslation: 'I learn Chinese.' },
          { char: '同', pinyin: 'tóng', zhuyin: 'ㄊㄨㄥˊ', meaning: 'same', difficulty: 2, exampleSentence: '同學。', exampleTranslation: 'Classmate.' },
          { char: '先', pinyin: 'xiān', zhuyin: 'ㄒㄧㄢ', meaning: 'first / Mr.', difficulty: 2, exampleSentence: '先生。', exampleTranslation: 'Mr.' },
          { char: '小', pinyin: 'xiǎo', zhuyin: 'ㄒㄧㄠˇ', meaning: 'small / young', difficulty: 1, exampleSentence: '小孩。', exampleTranslation: 'Child.' },
          { char: '姐', pinyin: 'jiě', zhuyin: 'ㄐㄧㄝˇ', meaning: 'older sister / Miss', difficulty: 2, exampleSentence: '小姐。', exampleTranslation: 'Miss.' },
          { char: '名', pinyin: 'míng', zhuyin: 'ㄇㄧㄥˊ', meaning: 'name', difficulty: 2, exampleSentence: '你的名字是什麼？', exampleTranslation: 'What is your name?' },
          { char: '字', pinyin: 'zì', zhuyin: 'ㄗˋ', meaning: 'character / word', difficulty: 2, exampleSentence: '這是一個中文字。', exampleTranslation: 'This is a Chinese character.' },
        ]
      },
      {
        id: 'hsk1-verbs',
        name: 'Common Verbs',
        characters: [
          { char: '是', pinyin: 'shì', zhuyin: 'ㄕˋ', meaning: 'to be', difficulty: 1, exampleSentence: '這是書。', exampleTranslation: 'This is a book.' },
          { char: '有', pinyin: 'yǒu', zhuyin: 'ㄧㄡˇ', meaning: 'to have', difficulty: 2, exampleSentence: '我有兩個哥哥。', exampleTranslation: 'I have two older brothers.' },
          { char: '在', pinyin: 'zài', zhuyin: 'ㄗㄞˋ', meaning: 'at / in', difficulty: 1, exampleSentence: '我在家。', exampleTranslation: 'I am at home.' },
          { char: '會', pinyin: 'huì', zhuyin: 'ㄏㄨㄟˋ', meaning: 'can / will', difficulty: 2, exampleSentence: '我會說中文。', exampleTranslation: 'I can speak Chinese.' },
          { char: '能', pinyin: 'néng', zhuyin: 'ㄋㄥˊ', meaning: 'can / able', difficulty: 2, exampleSentence: '你能來嗎？', exampleTranslation: 'Can you come?' },
          { char: '想', pinyin: 'xiǎng', zhuyin: 'ㄒㄧㄤˇ', meaning: 'want / think', difficulty: 2, exampleSentence: '我想喝咖啡。', exampleTranslation: 'I want to drink coffee.' },
          { char: '要', pinyin: 'yào', zhuyin: 'ㄧㄠˋ', meaning: 'want / need', difficulty: 2, exampleSentence: '我要喝水。', exampleTranslation: 'I want to drink water.' },
          {
            char: '去', pinyin: 'qù', zhuyin: 'ㄑㄩˋ', meaning: 'to go', difficulty: 1, exampleSentence: '我們去公園吧。', exampleTranslation: 'Let\'s go to the park.'
          },
          { char: '來', pinyin: 'lái', zhuyin: 'ㄌㄞˊ', meaning: 'to come', difficulty: 2, exampleSentence: '請過來。', exampleTranslation: 'Please come here.' },
          { char: '回', pinyin: 'huí', zhuyin: 'ㄏㄨㄟˊ', meaning: 'to return', difficulty: 2, exampleSentence: '我回家了。', exampleTranslation: 'I went home.' },
          { char: '看', pinyin: 'kàn', zhuyin: 'ㄎㄢˋ', meaning: 'to look / see', difficulty: 2, exampleSentence: '看書。', exampleTranslation: 'Reading a book.' },
          { char: '見', pinyin: 'jiàn', zhuyin: 'ㄐㄧㄢˋ', meaning: 'to see / meet', difficulty: 2 },
          { char: '聽', pinyin: 'tīng', zhuyin: 'ㄊㄧㄥ', meaning: 'to listen', difficulty: 3, exampleSentence: '聽音樂。', exampleTranslation: 'Listening to music.' },
          { char: '說', pinyin: 'shuō', zhuyin: 'ㄕㄨㄛ', meaning: 'to speak / say', difficulty: 2, exampleSentence: '說話。', exampleTranslation: 'Speaking.' },
          { char: '讀', pinyin: 'dú', zhuyin: 'ㄉㄨˊ', meaning: 'to read', difficulty: 3, exampleSentence: '讀書。', exampleTranslation: 'Reading.' },
          { char: '寫', pinyin: 'xiě', zhuyin: 'ㄒㄧㄝˇ', meaning: 'to write', difficulty: 3, exampleSentence: '寫字。', exampleTranslation: 'Writing characters.' },
          { char: '做', pinyin: 'zuò', zhuyin: 'ㄗㄨㄛˋ', meaning: 'to do / make', difficulty: 2, exampleSentence: '你在做什麼？', exampleTranslation: 'What are you doing?' },
          { char: '工', pinyin: 'gōng', zhuyin: 'ㄍㄨㄥ', meaning: 'work', difficulty: 1, exampleSentence: '工作。', exampleTranslation: 'Work.' },
          { char: '作', pinyin: 'zuò', zhuyin: 'ㄗㄨㄛˋ', meaning: 'work / do', difficulty: 2, exampleSentence: '作業。', exampleTranslation: 'Homework.' },
          { char: '住', pinyin: 'zhù', zhuyin: 'ㄓㄨˋ', meaning: 'to live', difficulty: 2, exampleSentence: '你住在哪裡？', exampleTranslation: 'Where do you live?' },
          { char: '吃', pinyin: 'chī', zhuyin: 'ㄔ', meaning: 'to eat', difficulty: 2, exampleSentence: '我喜歡吃水果。', exampleTranslation: 'I like to eat fruit.' },
          { char: '喝', pinyin: 'hē', zhuyin: 'ㄏㄜ', meaning: 'to drink', difficulty: 2, exampleSentence: '我想喝水。', exampleTranslation: 'I want to drink water.' },
          { char: '睡', pinyin: 'shuì', zhuyin: 'ㄕㄨㄟˋ', meaning: 'to sleep', difficulty: 3, exampleSentence: '我想睡覺。', exampleTranslation: 'I want to sleep.' },
          { char: '覺', pinyin: 'jiào', zhuyin: 'ㄐㄧㄠˋ', meaning: 'sleep / feel', difficulty: 3, exampleSentence: '他在睡覺。', exampleTranslation: 'He is sleeping.' },
          { char: '坐', pinyin: 'zuò', zhuyin: 'ㄗㄨㄛˋ', meaning: 'to sit', difficulty: 2, exampleSentence: '坐下。', exampleTranslation: 'Sit down.' },
          { char: '買', pinyin: 'mǎi', zhuyin: 'ㄇㄞˇ', meaning: 'to buy', difficulty: 2, exampleSentence: '我要買東西。', exampleTranslation: 'I want to buy something.' },
          { char: '叫', pinyin: 'jiào', zhuyin: 'ㄐㄧㄠˋ', meaning: 'to call / name', difficulty: 2, exampleSentence: '我叫小明。', exampleTranslation: 'My name is Xiao Ming.' },
          { char: '打', pinyin: 'dǎ', zhuyin: 'ㄉㄚˇ', meaning: 'to hit / make', difficulty: 2, exampleSentence: '打電話。', exampleTranslation: 'Make a phone call.' },
          { char: '開', pinyin: 'kāi', zhuyin: 'ㄎㄞ', meaning: 'to open', difficulty: 2, exampleSentence: '開門。', exampleTranslation: 'Open the door.' },
          { char: '關', pinyin: 'guān', zhuyin: 'ㄍㄨㄢ', meaning: 'to close', difficulty: 3, exampleSentence: '關燈。', exampleTranslation: 'Turn off the light.' },
          { char: '愛', pinyin: 'ài', zhuyin: 'ㄞˋ', meaning: 'to love', difficulty: 3, exampleSentence: '媽媽愛我。', exampleTranslation: 'Mom loves me.' },
          { char: '喜', pinyin: 'xǐ', zhuyin: 'ㄒㄧˇ', meaning: 'happy / like', difficulty: 2, exampleSentence: '我喜歡你。', exampleTranslation: 'I like you.' },
          { char: '歡', pinyin: 'huān', zhuyin: 'ㄏㄨㄢ', meaning: 'happy / like (喜歡)', difficulty: 3, exampleSentence: '歡迎光臨。', exampleTranslation: 'Welcome.' },
        ]
      },
      {
        id: 'hsk1-adj-adv',
        name: 'Adjectives & Adverbs',
        characters: [
          { char: '好', pinyin: 'hǎo', zhuyin: 'ㄏㄠˇ', meaning: 'good / well', difficulty: 1, exampleSentence: '你好嗎？', exampleTranslation: 'How are you?' },
          { char: '大', pinyin: 'dà', zhuyin: 'ㄉㄚˋ', meaning: 'big / large', difficulty: 1, exampleSentence: '這隻狗很大。', exampleTranslation: 'This dog is big.' },
          { char: '多', pinyin: 'duō', zhuyin: 'ㄉㄨㄛ', meaning: 'many / much', difficulty: 1, exampleSentence: '多少錢？', exampleTranslation: 'How much money?' },
          { char: '少', pinyin: 'shǎo', zhuyin: 'ㄕㄠˇ', meaning: 'few / little', difficulty: 2, exampleSentence: '很少。', exampleTranslation: 'Very few.' },
          { char: '冷', pinyin: 'lěng', zhuyin: 'ㄌㄥˇ', meaning: 'cold', difficulty: 2, exampleSentence: '今天很冷。', exampleTranslation: 'It is cold today.' },
          { char: '熱', pinyin: 'rè', zhuyin: 'ㄖㄜˋ', meaning: 'hot', difficulty: 3, exampleSentence: '今天很熱。', exampleTranslation: 'It is hot today.' },
          { char: '高', pinyin: 'gāo', zhuyin: 'ㄍㄠ', meaning: 'tall / high', difficulty: 2, exampleSentence: '很高興。', exampleTranslation: 'Very happy.' },
          { char: '漂', pinyin: 'piào', zhuyin: 'ㄆㄧㄠˋ', meaning: 'pretty (漂亮)', difficulty: 2, exampleSentence: '漂亮。', exampleTranslation: 'Beautiful.' },
          { char: '亮', pinyin: 'liàng', zhuyin: 'ㄌㄧㄤˋ', meaning: 'bright (漂亮)', difficulty: 2, exampleSentence: '月亮。', exampleTranslation: 'Moon.' },
          { char: '很', pinyin: 'hěn', zhuyin: 'ㄏㄣˇ', meaning: 'very', difficulty: 2, exampleSentence: '很好。', exampleTranslation: 'Very good.' },
          { char: '太', pinyin: 'tài', zhuyin: 'ㄊㄞˋ', meaning: 'too / very', difficulty: 1, exampleSentence: '太好了。', exampleTranslation: 'That is great.' },
          { char: '都', pinyin: 'dōu', zhuyin: 'ㄉㄡ', meaning: 'all / both', difficulty: 2, exampleSentence: '我們都是學生。', exampleTranslation: 'We are all students.' },
          { char: '不', pinyin: 'bù', zhuyin: 'ㄅㄨˋ', meaning: 'not', difficulty: 1, exampleSentence: '不要。', exampleTranslation: 'Do not want.' },
          {
            char: '沒', pinyin: 'méi', zhuyin: 'ㄇㄟˊ', meaning: 'not / no', difficulty: 2, exampleSentence: '我沒有錢。', exampleTranslation: 'I don\'t have money.'
          },
          { char: '對', pinyin: 'duì', zhuyin: 'ㄉㄨㄟˋ', meaning: 'correct / right', difficulty: 2, exampleSentence: '對不起。', exampleTranslation: 'Sorry.' },
        ]
      },
      {
        id: 'hsk1-nouns',
        name: 'Common Nouns',
        characters: [
          { char: '中', pinyin: 'zhōng', zhuyin: 'ㄓㄨㄥ', meaning: 'middle / China', difficulty: 1, exampleSentence: '我在學中文。', exampleTranslation: 'I am learning Chinese.' },
          { char: '國', pinyin: 'guó', zhuyin: 'ㄍㄨㄛˊ', meaning: 'country', difficulty: 2, exampleSentence: '國家。', exampleTranslation: 'Country.' },
          { char: '北', pinyin: 'běi', zhuyin: 'ㄅㄟˇ', meaning: 'north', difficulty: 2, exampleSentence: '北京。', exampleTranslation: 'Beijing.' },
          { char: '京', pinyin: 'jīng', zhuyin: 'ㄐㄧㄥ', meaning: 'capital', difficulty: 2, exampleSentence: '南京。', exampleTranslation: 'Nanjing.' },
          { char: '電', pinyin: 'diàn', zhuyin: 'ㄉㄧㄢˋ', meaning: 'electricity', difficulty: 3, exampleSentence: '電腦。', exampleTranslation: 'Computer.' },
          { char: '話', pinyin: 'huà', zhuyin: 'ㄏㄨㄚˋ', meaning: 'speech / words', difficulty: 2, exampleSentence: '電話。', exampleTranslation: 'Telephone.' },
          { char: '腦', pinyin: 'nǎo', zhuyin: 'ㄋㄠˇ', meaning: 'brain (電腦)', difficulty: 3, exampleSentence: '頭腦。', exampleTranslation: 'Brain.' },
          { char: '視', pinyin: 'shì', zhuyin: 'ㄕˋ', meaning: 'view (電視)', difficulty: 2, exampleSentence: '電視。', exampleTranslation: 'Television.' },
          { char: '影', pinyin: 'yǐng', zhuyin: 'ㄧㄥˇ', meaning: 'shadow / movie', difficulty: 2, exampleSentence: '電影。', exampleTranslation: 'Movie.' },
          { char: '院', pinyin: 'yuàn', zhuyin: 'ㄩㄢˋ', meaning: 'yard / hospital', difficulty: 2, exampleSentence: '醫院。', exampleTranslation: 'Hospital.' },
          { char: '醫', pinyin: 'yī', zhuyin: 'ㄧ', meaning: 'doctor / medicine', difficulty: 3, exampleSentence: '醫生。', exampleTranslation: 'Doctor.' },
          { char: '書', pinyin: 'shū', zhuyin: 'ㄕㄨ', meaning: 'book', difficulty: 2, exampleSentence: '這是一本書。', exampleTranslation: 'This is a book.' },
          { char: '店', pinyin: 'diàn', zhuyin: 'ㄉㄧㄢˋ', meaning: 'shop / store', difficulty: 2, exampleSentence: '書店。', exampleTranslation: 'Bookstore.' },
          {
            char: '飯', pinyin: 'fàn', zhuyin: 'ㄈㄢˋ', meaning: 'rice / meal', difficulty: 2, exampleSentence: '我們一起吃飯。', exampleTranslation: 'Let\'s eat together.'
          },
          { char: '館', pinyin: 'guǎn', zhuyin: 'ㄍㄨㄢˇ', meaning: 'hall / restaurant', difficulty: 3, exampleSentence: '我們去圖書館。', exampleTranslation: 'We go to the library.' },
          { char: '菜', pinyin: 'cài', zhuyin: 'ㄘㄞˋ', meaning: 'vegetable / dish', difficulty: 2, exampleSentence: '做菜。', exampleTranslation: 'Cooking.' },
          { char: '茶', pinyin: 'chá', zhuyin: 'ㄔㄚˊ', meaning: 'tea', difficulty: 2, exampleSentence: '爸爸喜歡喝茶。', exampleTranslation: 'Dad likes to drink tea.' },
          { char: '水', pinyin: 'shuǐ', zhuyin: 'ㄕㄨㄟˇ', meaning: 'water', difficulty: 1, exampleSentence: '請給我一杯水。', exampleTranslation: 'Please give me a glass of water.' },
          { char: '果', pinyin: 'guǒ', zhuyin: 'ㄍㄨㄛˇ', meaning: 'fruit', difficulty: 2, exampleSentence: '桌上有水果。', exampleTranslation: 'There is fruit on the table.' },
          { char: '錢', pinyin: 'qián', zhuyin: 'ㄑㄧㄢˊ', meaning: 'money', difficulty: 3, exampleSentence: '有錢。', exampleTranslation: 'Have money.' },
          { char: '塊', pinyin: 'kuài', zhuyin: 'ㄎㄨㄞˋ', meaning: 'piece / yuan', difficulty: 2, exampleSentence: '一塊錢。', exampleTranslation: 'One yuan.' },
          { char: '車', pinyin: 'chē', zhuyin: 'ㄔㄜ', meaning: 'car / vehicle', difficulty: 2, exampleSentence: '開車。', exampleTranslation: 'Drive a car.' },
          { char: '機', pinyin: 'jī', zhuyin: 'ㄐㄧ', meaning: 'machine / plane', difficulty: 3, exampleSentence: '這是我的手機。', exampleTranslation: 'This is my mobile phone.' },
          { char: '場', pinyin: 'chǎng', zhuyin: 'ㄔㄤˇ', meaning: 'field / place', difficulty: 2, exampleSentence: '操場。', exampleTranslation: 'Playground.' },
          { char: '雨', pinyin: 'yǔ', zhuyin: 'ㄩˇ', meaning: 'rain', difficulty: 2, exampleSentence: '下雨。', exampleTranslation: 'Raining.' },
          { char: '氣', pinyin: 'qì', zhuyin: 'ㄑㄧˋ', meaning: 'air / gas', difficulty: 2, exampleSentence: '今天天氣很好。', exampleTranslation: 'The weather is good today.' },
          { char: '東', pinyin: 'dōng', zhuyin: 'ㄉㄨㄥ', meaning: 'east', difficulty: 2, exampleSentence: '東邊。', exampleTranslation: 'East side.' },
          { char: '西', pinyin: 'xī', zhuyin: 'ㄒㄧ', meaning: 'west / thing', difficulty: 1, exampleSentence: '西瓜。', exampleTranslation: 'Watermelon.' },
          { char: '前', pinyin: 'qián', zhuyin: 'ㄑㄧㄢˊ', meaning: 'front / before', difficulty: 2, exampleSentence: '前面。', exampleTranslation: 'Front.' },
          { char: '後', pinyin: 'hòu', zhuyin: 'ㄏㄡˋ', meaning: 'back / after', difficulty: 2, exampleSentence: '後面。', exampleTranslation: 'Back.' },
          { char: '面', pinyin: 'miàn', zhuyin: 'ㄇㄧㄢˋ', meaning: 'face / side', difficulty: 2, exampleSentence: '麵條。', exampleTranslation: 'Noodles.' },
          { char: '裡', pinyin: 'lǐ', zhuyin: 'ㄌㄧˇ', meaning: 'inside', difficulty: 2, exampleSentence: '家裡。', exampleTranslation: 'At home.' },
          { char: '桌', pinyin: 'zhuō', zhuyin: 'ㄓㄨㄛ', meaning: 'table', difficulty: 2, exampleSentence: '桌子。', exampleTranslation: 'Table.' },
          { char: '椅', pinyin: 'yǐ', zhuyin: 'ㄧˇ', meaning: 'chair', difficulty: 3, exampleSentence: '椅子。', exampleTranslation: 'Chair.' },
        ]
      },
      {
        id: 'hsk1-grammar',
        name: 'Grammar & Particles',
        characters: [
          { char: '的', pinyin: 'de', zhuyin: 'ㄉㄜ˙', meaning: 'possessive particle', difficulty: 1, exampleSentence: '我的。', exampleTranslation: 'Mine.' },
          { char: '了', pinyin: 'le', zhuyin: 'ㄌㄜ˙', meaning: 'completed action', difficulty: 2, exampleSentence: '太棒了。', exampleTranslation: 'Awesome.' },
          { char: '嗎', pinyin: 'ma', zhuyin: 'ㄇㄚ˙', meaning: 'question particle', difficulty: 1, exampleSentence: '好嗎？', exampleTranslation: 'Okay?' },
          { char: '呢', pinyin: 'ne', zhuyin: 'ㄋㄜ˙', meaning: 'and you? / what about', difficulty: 2, exampleSentence: '你呢？', exampleTranslation: 'How about you?' },
          {
            char: '吧', pinyin: 'ba', zhuyin: 'ㄅㄚ˙', meaning: 'suggestion particle', difficulty: 2, exampleSentence: '走吧。', exampleTranslation: 'Let\'s go.'
          },
          { char: '和', pinyin: 'hé', zhuyin: 'ㄏㄜˊ', meaning: 'and / with', difficulty: 2, exampleSentence: '我和你。', exampleTranslation: 'You and me.' },
          { char: '這', pinyin: 'zhè', zhuyin: 'ㄓㄜˋ', meaning: 'this', difficulty: 2, exampleSentence: '這是什麼？', exampleTranslation: 'What is this?' },
          { char: '那', pinyin: 'nà', zhuyin: 'ㄋㄚˋ', meaning: 'that', difficulty: 1, exampleSentence: '那是什麼？', exampleTranslation: 'What is that?' },
          { char: '哪', pinyin: 'nǎ', zhuyin: 'ㄋㄚˇ', meaning: 'which', difficulty: 2, exampleSentence: '哪裡？', exampleTranslation: 'Where?' },
          { char: '什', pinyin: 'shén', zhuyin: 'ㄕㄣˊ', meaning: 'what (什麼)', difficulty: 2, exampleSentence: '那是什麼？', exampleTranslation: 'What is that?' },
          { char: '麼', pinyin: 'me', zhuyin: 'ㄇㄜ˙', meaning: 'what (什麼)', difficulty: 2, exampleSentence: '你在做什麼？', exampleTranslation: 'What are you doing?' },
          { char: '怎', pinyin: 'zěn', zhuyin: 'ㄗㄣˇ', meaning: 'how (怎麼)', difficulty: 2, exampleSentence: '怎麼辦？', exampleTranslation: 'What to do?' },
          { char: '樣', pinyin: 'yàng', zhuyin: 'ㄧㄤˋ', meaning: 'kind / type (怎麼樣)', difficulty: 2, exampleSentence: '怎麼樣？', exampleTranslation: 'How is it?' },
          { char: '幾', pinyin: 'jǐ', zhuyin: 'ㄐㄧˇ', meaning: 'how many', difficulty: 2, exampleSentence: '你有幾本書？', exampleTranslation: 'How many books do you have?' },
          { char: '個', pinyin: 'gè', zhuyin: 'ㄍㄜˋ', meaning: 'general classifier', difficulty: 1, exampleSentence: '一個蘋果。', exampleTranslation: 'One apple.' },
          { char: '些', pinyin: 'xiē', zhuyin: 'ㄒㄧㄝ', meaning: 'some', difficulty: 2, exampleSentence: '一些人。', exampleTranslation: 'Some people.' },
          { char: '本', pinyin: 'běn', zhuyin: 'ㄅㄣˇ', meaning: 'classifier for books', difficulty: 2, exampleSentence: '一本書。', exampleTranslation: 'A book.' },
          { char: '歲', pinyin: 'suì', zhuyin: 'ㄙㄨㄟˋ', meaning: 'years old', difficulty: 3, exampleSentence: '你幾歲？', exampleTranslation: 'How old are you?' },
        ]
      },
      {
        id: 'hsk1-misc',
        name: 'Misc & Greetings',
        characters: [
          { char: '謝', pinyin: 'xiè', zhuyin: 'ㄒㄧㄝˋ', meaning: 'thank', difficulty: 3, exampleSentence: '謝謝你的幫忙。', exampleTranslation: 'Thank you for your help.' },
          { char: '再', pinyin: 'zài', zhuyin: 'ㄗㄞˋ', meaning: 'again / goodbye', difficulty: 2 },
          { char: '請', pinyin: 'qǐng', zhuyin: 'ㄑㄧㄥˇ', meaning: 'please / invite', difficulty: 3, exampleSentence: '請坐。', exampleTranslation: 'Please sit down.' },
          { char: '對', pinyin: 'duì', zhuyin: 'ㄉㄨㄟˋ', meaning: 'correct / sorry', difficulty: 2, exampleSentence: '對不起。', exampleTranslation: 'Sorry.' },
          { char: '起', pinyin: 'qǐ', zhuyin: 'ㄑㄧˇ', meaning: 'rise (對不起)', difficulty: 2, exampleSentence: '我七點起床。', exampleTranslation: 'I get up at seven.' },
          {
            char: '沒', pinyin: 'méi', zhuyin: 'ㄇㄟˊ', meaning: 'not (沒關係)', difficulty: 2, exampleSentence: '我沒有錢。', exampleTranslation: 'I don\'t have money.'
          },
          {
            char: '係', pinyin: 'xì', zhuyin: 'ㄒㄧˋ', meaning: 'relation (沒關係)', difficulty: 3, exampleSentence: '沒關係。', exampleTranslation: 'It\'s okay.'
          },
          { char: '現', pinyin: 'xiàn', zhuyin: 'ㄒㄧㄢˋ', meaning: 'now / appear', difficulty: 2, exampleSentence: '現在幾點？', exampleTranslation: 'What time is it now?' },
          { char: '正', pinyin: 'zhèng', zhuyin: 'ㄓㄥˋ', meaning: 'just / correct', difficulty: 2, exampleSentence: '正在。', exampleTranslation: 'Currently doing.' },
          { char: '認', pinyin: 'rèn', zhuyin: 'ㄖㄣˋ', meaning: 'recognize (認識)', difficulty: 3, exampleSentence: '認識。', exampleTranslation: 'To know.' },
          { char: '識', pinyin: 'shí', zhuyin: 'ㄕˊ', meaning: 'know (認識)', difficulty: 3, exampleSentence: '知識。', exampleTranslation: 'Knowledge.' },
        ]
      },
      {
        id: 'hsk1-modern-chinese',
        name: 'Modern Chinese Vocabulary',
        characters: MODERN_CHINESE_VOCAB
      }
    ]
  },
  {
    id: 'zhuyin',
    name: 'Zhuyin (注音符號)',
    description: 'Learn Bopomofo - the Taiwanese phonetic system for pronunciation.',
    icon: 'ㄅ',
    characters: [],
    sequences: [
      {
        id: 'zhuyin-consonants',
        name: 'Consonants (聲母)',
        characters: [
          { char: 'ㄅ', pinyin: 'b', zhuyin: 'ㄅ', meaning: 'b as in "boy"', difficulty: 1 },
          { char: 'ㄆ', pinyin: 'p', zhuyin: 'ㄆ', meaning: 'p as in "pop"', difficulty: 1 },
          { char: 'ㄇ', pinyin: 'm', zhuyin: 'ㄇ', meaning: 'm as in "mom"', difficulty: 1 },
          { char: 'ㄈ', pinyin: 'f', zhuyin: 'ㄈ', meaning: 'f as in "fun"', difficulty: 1 },
          { char: 'ㄉ', pinyin: 'd', zhuyin: 'ㄉ', meaning: 'd as in "dog"', difficulty: 1 },
          { char: 'ㄊ', pinyin: 't', zhuyin: 'ㄊ', meaning: 't as in "top"', difficulty: 1 },
          { char: 'ㄋ', pinyin: 'n', zhuyin: 'ㄋ', meaning: 'n as in "no"', difficulty: 1 },
          { char: 'ㄌ', pinyin: 'l', zhuyin: 'ㄌ', meaning: 'l as in "love"', difficulty: 1 },
          { char: 'ㄍ', pinyin: 'g', zhuyin: 'ㄍ', meaning: 'g as in "go"', difficulty: 1 },
          { char: 'ㄎ', pinyin: 'k', zhuyin: 'ㄎ', meaning: 'k as in "key"', difficulty: 1 },
          { char: 'ㄏ', pinyin: 'h', zhuyin: 'ㄏ', meaning: 'h as in "hot"', difficulty: 1 },
          { char: 'ㄐ', pinyin: 'j', zhuyin: 'ㄐ', meaning: 'j as in "jeep"', difficulty: 1 },
          { char: 'ㄑ', pinyin: 'q', zhuyin: 'ㄑ', meaning: 'q (ch sound)', difficulty: 2 },
          { char: 'ㄒ', pinyin: 'x', zhuyin: 'ㄒ', meaning: 'x (sh sound)', difficulty: 2 },
          { char: 'ㄓ', pinyin: 'zh', zhuyin: 'ㄓ', meaning: 'zh (retroflex j)', difficulty: 2 },
          { char: 'ㄔ', pinyin: 'ch', zhuyin: 'ㄔ', meaning: 'ch (retroflex ch)', difficulty: 2 },
          { char: 'ㄕ', pinyin: 'sh', zhuyin: 'ㄕ', meaning: 'sh (retroflex sh)', difficulty: 2 },
          { char: 'ㄖ', pinyin: 'r', zhuyin: 'ㄖ', meaning: 'r (retroflex r)', difficulty: 2 },
          { char: 'ㄗ', pinyin: 'z', zhuyin: 'ㄗ', meaning: 'z as in "zoo"', difficulty: 1 },
          { char: 'ㄘ', pinyin: 'c', zhuyin: 'ㄘ', meaning: 'c (ts sound)', difficulty: 2 },
          { char: 'ㄙ', pinyin: 's', zhuyin: 'ㄙ', meaning: 's as in "sun"', difficulty: 1 },
        ]
      },
      {
        id: 'zhuyin-vowels',
        name: 'Vowels (韻母)',
        characters: [
          { char: 'ㄚ', pinyin: 'a', zhuyin: 'ㄚ', meaning: 'a as in "father"', difficulty: 1 },
          { char: 'ㄛ', pinyin: 'o', zhuyin: 'ㄛ', meaning: 'o as in "or"', difficulty: 1 },
          { char: 'ㄜ', pinyin: 'e', zhuyin: 'ㄜ', meaning: 'e as in "her"', difficulty: 1 },
          { char: 'ㄝ', pinyin: 'ê', zhuyin: 'ㄝ', meaning: 'ê as in "yeah"', difficulty: 2 },
          { char: 'ㄞ', pinyin: 'ai', zhuyin: 'ㄞ', meaning: 'ai as in "eye"', difficulty: 1 },
          { char: 'ㄟ', pinyin: 'ei', zhuyin: 'ㄟ', meaning: 'ei as in "way"', difficulty: 1 },
          { char: 'ㄠ', pinyin: 'ao', zhuyin: 'ㄠ', meaning: 'ao as in "cow"', difficulty: 1 },
          { char: 'ㄡ', pinyin: 'ou', zhuyin: 'ㄡ', meaning: 'ou as in "go"', difficulty: 1 },
          { char: 'ㄢ', pinyin: 'an', zhuyin: 'ㄢ', meaning: 'an as in "on"', difficulty: 1 },
          { char: 'ㄣ', pinyin: 'en', zhuyin: 'ㄣ', meaning: 'en as in "taken"', difficulty: 1 },
          { char: 'ㄤ', pinyin: 'ang', zhuyin: 'ㄤ', meaning: 'ang as in "song"', difficulty: 1 },
          { char: 'ㄥ', pinyin: 'eng', zhuyin: 'ㄥ', meaning: 'eng as in "sung"', difficulty: 1 },
          { char: 'ㄦ', pinyin: 'er', zhuyin: 'ㄦ', meaning: 'er as in "are"', difficulty: 2 },
          { char: 'ㄧ', pinyin: 'i', zhuyin: 'ㄧ', meaning: 'i as in "bee"', difficulty: 1 },
          { char: 'ㄨ', pinyin: 'u', zhuyin: 'ㄨ', meaning: 'u as in "too"', difficulty: 1 },
          { char: 'ㄩ', pinyin: 'ü', zhuyin: 'ㄩ', meaning: 'ü as in German "über"', difficulty: 2 },
        ]
      }
    ]
  }
];