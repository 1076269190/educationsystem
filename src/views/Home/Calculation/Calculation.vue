<template>
  <div class="Calculation-container">
    <el-button @click="drawer = true"> 历史 </el-button>
    <div class="question">
      <h1>请输入你的计算表达式</h1>
      <mathlive-mathfield
        id="mf"
        ref="mathfiled"
        :options="{
          smartFence: false,
          virtualKeyboardMode: 'manual',
          virtualKeyboards: 'numeric symbols',
        }"
        @blur="calculation"
        :on-keystroke="displayKeystroke"
        v-model="formula"
        style="
          font-size: 32px;
          margin: 2em;
          padding: 8px;
          border-radius: 8px;
          border: 1px solid rgba(0, 0, 0, 0.3);
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
          width: 100%;
          background: #fff;
        "
      >
      </mathlive-mathfield>
    </div>
    <el-drawer title="历史搜索" :visible.sync="drawer" :with-header="false">
      <div class="history">
        <div
          v-for="item in historySearchs"
          :key="item"
          v-show="item.question != null"
          class="historyItem"
        >
          <mathlive-mathfield
            read-only
            :body-style="{ padding: '0px' }"
            style="
              padding: 14px;
              width: 60vh;
              height: 10vh;
              border-radius: 8px;
              background: #fff;
            "
            >{{ item.question }} = {{ item.answer }}
          </mathlive-mathfield>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Calculation",
  data() {
    return {
      formula: "",
      keystroke: "",
      historySearchs: [{ question: null, answer: null }],
      drawer: false,
    };
  },
  methods: {
    async calculation() {
      if(this.formula != ''){
        const { data: res } = await axios.post(
        "http://localhost:8080/api/tool/calculate",
        {
          latex: this.formula,
        }
      );
      //弹出结果窗
      const h = this.$createElement;
      this.$message({
        showClose: true,
        message: h("p", {style:"padding: 10px"}, [
          h("span", null, "计算结果为:"),
          h("i", { style: "color: teal" }, res.result),
        ]),
        type: 'success',
        duration: 0
      });
      //历史记录添加
      if (this.historySearchs.length > 100) {
        this.historySearchs.pop();
      }
      this.historySearchs.unshift({
        question: this.formula,
        answer: res.result,
      });
      }
    },
    sayIt: function (event) {
      this.$refs.mathfield.perform(["speak", "all"]);
    },
    setIt: function (event) {
      this.formula = "x=-b\\pm \\frac {\\sqrt{b^2-4ac}}{2a}";
    },

    displayKeystroke: function (keystroke, _ev) {
      this.keystroke = keystroke;
      return true;
    },
    asSpokenText: function () {
      return this.$refs.mathfield
        ? this.$refs.mathfield.getValue("spoken")
        : "";
    },
  },
};
</script>

<style lang='less' scoped>
math-field:focus-within {
  outline: 1px solid rgba(64, 158, 255);
  border-radius: 8px;
}
.Calculation-container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 100vh;
  background: #e6e6e6;

  /deep/.el-button {
    position: fixed;
    z-index: 1;
    top: 50%;
    right: 17px;
    border-radius: 100%;
    width: 75px;
    height: 75px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  }
  .question {
    width: 40%;
    height: 90%;
    margin: 30px 0px 50px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .history {
    width: 50vh;
    margin: 30px 0px 30px 0px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    .historyItem {
      margin: 0px 0px 0px 100px;
      display: flex;
    }
  }
}
</style>