<template>
  <div class="about">
    <div>
      <h1 id="title">This is an about page</h1>
      <br />

      <a href="/JavaScript高级程序设计（第4版 中文高清）.pdf" target="_blank"
        >预览PDF</a
      >
      <br /><br />
      <!-- <el-input
        v-model="input"
        style="width: 240px"
        placeholder="Please input"
        @input="valChange"
      /> -->
      <input type="text" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { ref } from "vue";

const input = ref("");
let isComposition = ref(false);

onMounted(() => {
  const inputEl = document.querySelector('input[type="text"]');

  inputEl.addEventListener("input", (e) => {
    if (isComposition.value) {
      return;
    }
    search(e.target.value);
  });

  inputEl.addEventListener("compositionstart", (event) => {
    isComposition.value = true;
  });

  inputEl.addEventListener("compositionend", (event) => {
    isComposition.value = false;
    search(event.data);
  });
});

const search = (val) => {
  console.log(val);
};

const obj = {
  a: 1,
  b: "123",
};

const nProxy = new Proxy(obj, {
  get(target, property, receiver) {
    console.log("Get property: ", property);
    return target[property];
  },
});

var o = (function () {
  var obj = {
    a: 1,
    b: 22,
  };
  return {
    get: function (k) {
      return obj[k];
    },
  };
})();

// 如何在不改变上面代码的情况下，修改obj对象

// 想办法获取obj对象本身，所以想到在obj的原型上添加自定义属性，get方法中返回this
// Object.defineProperty(Object.prototype, "spec", {
//   get() {
//     return this;
//   },
// });

// o.get('spec'), 在对象obj上找不到，就回去原型上找，
// 即Object.prototype, 找到后使用定义的get方法，这里的this即调用者o
// console.log(o.get("spec"));
// const oo = o.get("spec");
// console.log(oo);
// oo.c = 23434;
// console.log(o.get("c"));
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
