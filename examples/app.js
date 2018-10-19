import { parse, Compile } from '../src/velocity.js';
import { resolve } from 'path';
import { rejects } from 'assert';

const asts = parse(document.querySelector('#tmpl').innerHTML);
const data = {
  items: [{
    a:'1'
  },
  {
    a: 'successed',
  },
  {
    a:"fadfadfadf",
    asyncMethod: () => {
      return {async_id:44444}
      // return new Promise((resolve, rejects) => {
      //   setTimeout(() => {
      //     resolve({
      //       async_id:44444
      //     })
      //   }, 1000)
      // })
    } 
  }],
  asyncMethod: () => {
    return new Promise((resolve, rejects) => {
      setTimeout(() => {
        resolve({
          async_id:44444
        })
      }, 1000)
    })
  } ,
  method() {
    return 'method value'
  },
  a: {
    asyncMethod: () => {
      return new Promise((resolve, rejects) => {
        setTimeout(() => {
          resolve({
            async_id:1
          })
        }, 1000)
      })
    }
  },
  tag:{
    async getNumTest(){
       return 1;
    },
    async getStringTest(){
       return 'stringTest';
    },
    async getObjTest(){
       return {id:12};
    },
    async getListTest(){
       return [{id:1},{id:2}]
    },
    asyncgetList(){
       return [{id:1},{id:2}]
    }
 },
 tools:{
    async parseJson2Obj(json) {
       return JSON.parse(JSON.stringify(json));
    },
 }

};
(async () => {
  const s = await (new Compile(asts)).asyncRender(data);

  document.querySelector('.foo').innerHTML = s;
})()

