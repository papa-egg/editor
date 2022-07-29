import Editor from '@/engine/editor';
import { getUUID } from '@/engine/common/plugin';
import librarys from '@/engine/library/library';

export default class Engine {
  constructor () {
    this.editorList = [];
    this.curIdx = 'index';
  }

  getCurEditor () {
    for (let editor of this.editorList) {
      if (editor.proId === this.curIdx) return editor;
    }

    return null;
  }

  cutEditor (proId) {
    this.curIdx = proId;
    const editor = this.getCurEditor();

    window.$vue.$store.dispatch('setCH', editor);
    window.$vue.$store.dispatch('setDoc', editor.doc.msg);

    editor.mouse.updateMsg();
  }

  createProject (proMsg = {}) {
    proMsg.proId = proMsg.id || getUUID();

    const editor = new Editor(proMsg);

    this.editorList.push(editor);
    this.curIdx = proMsg.proId;

    setTimeout(() => {
      window.$vue.$store.dispatch('setCH', editor);
      editor.initEditor();

      window.$vue.$store.dispatch('setDoc', editor.doc.msg);
      editor.mouse.updateViewBox();
    }, 0)

    return proMsg.proId;
  }

  openDoc (id) {
    const docLists = librarys;
    let curDoc = null;

    for (let doc of docLists) {
      if (doc.id == id) {
        curDoc = doc;
      }
    }

    if (!curDoc) return;

    this.createProject(curDoc);

    console.log(curDoc);
  }

  toSaveMsg () {
    const editor = this.getCurEditor();
    const CH = window.$vue.$store.getters.getCH;
    const sElems = CH.sElems;
    const elemMsgList = [];
    const vb = editor.mouse.vb;

    for (let elem of sElems) {
      elemMsgList.push(this.reducElem(elem));
    }

    console.log(editor);
    console.log(vb);
    console.log(JSON.stringify({
      id: '333-2',
      proName: '焊盘',
      type: 'pcb_element',
      vb,
      elemList: elemMsgList,
    }));
  }

  reducElem (elem) {
    console.log(elem);

    const type = elem.attrs.mType;
    const attrs = elem.attrs;
    const params = elem.params;

    /*if (elem.params) {
      for (let item in elem.params) {
        if (typeof elem.params[item] === 'function') {
          params[item] = '' + elem.params[item].toString();
        } else {
          params[item] = elem.params[item];
        }
      }
    }*/

    return {
      type,
      attrs,
      params,
    }
  }

  checkType(any) {
    return Object.prototype.toString.call(any).slice(8, -1)
  }
}
