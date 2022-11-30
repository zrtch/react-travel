// 处理语言的reducer；整个reducer就是以旧换新的过程

interface LanguageState{
  language: 'en'|'zh',
  languageList:{name: string, code: string}[]
}
// 初始化state
const defaultState: LanguageState = {
  language:'zh',
  languageList:[
    {name:'中文',code:'zh'},
    {name:'English',code:'en'}
  ]
}

export default (state = defaultState, action) => {//利用参数传入的state，经过数据变化生成新的数据；action则是指挥reducer做出数据变换的指令
  return state
}