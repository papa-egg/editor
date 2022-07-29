# EDA前端开发规范文档

## JSX 规范

### 使用紧凑风格

#### 规范一：合并简短的 prop 属性
正确：简短的 prop 尽可能放到⼀⾏

```js
<IconButton icon="close" iconSize={14} title="关闭" onClick={() => {
  console.log('close')
}} />

```

错误：偏激地追求格式
```js
<IconButton
  icon="close"
  iconSize={14}
  title="关闭"
  onClick={() => {
    console.log('close')
 }}
/>
```

#### 规范⼆：禁⽌(偷懒)使⽤全局格式化
代码格式必须⼿动调整！禁⽌使⽤编辑器的全局格式化⼯具（⽆论格式化规则有多么优化，都不可
以），因为：

1、格式化⼯具⽆法完全正确地判断代码的意图

2、代码不够紧凑

正确：⼿动调整
```js
<span className="ctw60 mr4 ctNote">[{t('unsaved')}]</span>
```
错误：使⽤编辑器进⾏格式化

```js
<span className="ctw60 mr4 ctNote">
 [
 {t('unsaved')}
 ]
</span>
```

## 遍历数组成员

### 规范⼀：使⽤ Children.toArray() ⽅法，不使⽤ key="id"

正确：⼦ Component 使⽤ Children.toArray 包裹起来

```js
{options.map(option => Children.toArray(<div
  ...
</div>))}
```
错误：⼦ Component 使使⽤了 key 属性
```js
{stories.map((story, index) => (<div key={story.id}>
  ...
</div>))} 
```

## 清晰的视图层级及展示逻辑

### 规范⼀：禁⽌在JSX内部直接定义模型的业务逻辑

⽬的，看模型的实现时，要将模型的能⼒清晰的展示出来，封装了什么业务，如何调⽤。看JSX的实现
时，要将视图层结构尽可能清晰的展示出来，要利于查看DOM层级，减少⼲扰。否则，就会在看模型时
看不全能⼒，看JSX时⼜有⼀堆⼲扰的业务代码。

正确：在模型内实现业务代码的封装，在JSX内简洁调⽤。

```js
const Box = ({box}) => {
  const boxEl = useRef(null)
  useEffect(() => {
    // 将业务逻辑封装到模型上，⾼效理解，维护清晰
 box.initDrag(boxEl)
 })
  return <div
    ref={boxEl}
  />
}
```

错误：在JSX内联实现业务逻辑代码

```js
const Box = ({box}) => {
  // 可能引⼊了⾮渲染相关的属性
  const const {
    x1, y1, width, height, isSelected,
 } = box
  return <div
    onMouseDown={e => {
      拖拽业务的事件绑定，调⽤⾮渲染相关的属性
   }}
    onMouseUp={e => {
      拖拽业务的事件绑定，调⽤⾮渲染相关的属性
   }}
    onMouseMove={e => {
      拖拽业务的事件绑定，调⽤⾮渲染相关的属性
   }}
  />
}

```

## 内联样式

### 规范⼀：⾮变量的 style 样式，禁⽌直接写在 jsx ⽂件内

错误


```js
<div
  style={{
    right: 0,
    lineHeight: '16px',
    bottom: '-16px',
    color: 'red',
 }}
/>
```

## 第三⽅资源(⼯具/组件/图⽚)

### 引⼊⽅式

### 规范⼀：可以按模块引⽤时，就不能整体引⼊。不能为了杀鸡把⽜⼑引⼊项⽬

正确：按模块引⼊


```js
import isFunction from 'lodash/isFunction'
import isString from 'lodash/isString'
```

错误：整体引⼊

```js
import {isFunction, isString, isPlainObject} from 'lodash'
```

### 规范⼆：禁⽌全局⻚头引⼊

优先使⽤ npm 包引⼊，配合 webpack 的按需加载进⾏打包，⽆特殊情况，禁⽌直接加到 index.h
tml ⽂件中

正确：在使⽤ video 组件时，才加载它

```js
const Video = React.lazy(() => import('video'))
```

错误：这么加下去，臃肿且⽆法按需加载

```js
ylesheet" type="text/css" href="%PUBLIC_URL%/videojs.min.css">
<script src="%PUBLIC_URL%/video.min.js"></script>
```

### 规范三：禁⽌直接使⽤外⽹资源

正确：在使⽤ video 组件时，才加载它

```js
import defaultThumbnail from './thumbnail.png'
<img src={art.thumbnail || defaultThumbnail} />
```

错误：直接使⽤外⽹资源

```js
<img src="http://t8.baidu.com/it/1484500186.pn" />
```

## Hook组件的ref定义

两个点：

1.使⽤ observer 的第⼆个参数传⼊ forwardRef

2.变量关键字使⽤ xxxRef

定义时，使⽤ observer 的第⼆个参数传⼊ forwardRef

```js
// 下⾯hook的参数，不能使⽤内置的ref，会报错，需要使⽤其他名字
const Art = ({props, artRef}) => {
  return <div ref={artRef} className={s.root}>...</div>
}
export default observer(Art, {forwardRef: true})
```

使⽤时，变量关键字使⽤ xxxRef

```js
const ArtTab = ({tab}) => {
  const tabRef = useRef(null)
  const artRef = createRef()
  useEffect(() => {
    console.log('tabRef.current', tabRef.current)
    console.log('artRef.current', artRef.current)
 })
  return <div ref={tabRef} className="wh100p">
    <Art artRef={artRef} art={tab.art} />
  </div>
}
```

## 变量命名

### 命名规范

固定的标准缩写不可改（持续补充）

1、 flyline 飞线

2、 imgae 图片

3、 。。。

变量名称尽量全写，不用计较长短，需要足够语义化








