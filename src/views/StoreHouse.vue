<template>
  <div class="store-house">
    <van-nav-bar title="药库" @click-right="cascaderShow = true">
      <template #right>
        <van-icon name="filter-o" size="16" />
        <span>筛选</span>
      </template>
    </van-nav-bar>
    <!-- 粘性布局，固定在顶部 -->
    <van-sticky>
      <van-search
        v-model="searchContent"
        shape="round"
        placeholder="按药名搜索"
        @search="onSearch"
        clearable
      />
      <!-- 显示当前所选分类标签 -->
      <div v-if="tagValue" class="classification">
        <span>所选分类：</span>
        <van-tag closeable size="large" type="primary" @close="onTagClose">
          {{ tagValue }}
        </van-tag>
      </div>
    </van-sticky>
    <van-popup v-model="cascaderShow" round position="bottom">
      <van-cascader
        v-model="cascaderValue"
        title="请选择所需分类"
        :options="options"
        @close="cascaderShow = false"
        @finish="onFinish"
      />
    </van-popup>
    <div class="tcm-house">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <van-row v-for="(tcms, index) in tcmList" :key="index" gutter="10">
          <van-col v-for="tcm in tcms" :key="tcm.id" span="12">
            <tcm-card
              :id="tcm.id"
              :name="tcm.name"
              :name-eng="tcm.name_eng"
              :img="tcm.img"
            />
          </van-col>
        </van-row>
      </van-list>
    </div>
  </div>
</template>

<script>
import TcmCard from "../components/TcmCard";
import { sliceArray, stringCheck } from "../util/util";
import qs from "qs";

export default {
  name: "StoreHouse",
  data() {
    return {
      tcmList: [],
      pageIndex: 0,
      pageSize: 20,
      // list 刷新
      loading: false,
      finished: false,
      error: false,
      searchContent: "",
      cascaderShow: false,
      cascaderValue: "",
      tagValue: undefined,
      classification: undefined,
      //TODO 后端获取 demo 数据
      options: [
        // 药性
        {
          text: "药性",
          value: "medicinal_group",
          children: [
            {
              text: "清热解毒药",
              value: "清热解毒药",
            },
            {
              text: "利尿通淋药",
              value: "利尿通淋药",
            },
            {
              text: "祛风湿强筋骨药",
              value: "祛风湿强筋骨药",
            },
          ],
        },
        // 性味
        {
          text: "性味",
          value: "nature_flavors",
          children: [
            {
              text: "甘",
              value: "甘",
            },
            {
              text: "凉",
              value: "凉",
            },
            {
              text: "平",
              value: "平",
            },
          ],
        },
        // 科
        {
          text: "科",
          value: "family",
          children: [
            {
              text: "豆科",
              value: "豆科",
            },
            {
              text: "锦葵科",
              value: "锦葵科",
            },
            {
              text: "五加科",
              value: "五加科",
            },
          ],
        },
      ],
    };
  },
  watch: {
    tagValue: function (val) {
      console.log("tabValue 值改变为 => " + val);
      this.clearTcmList();
      this.onLoad();
    },
  },
  methods: {
    onSearch: function () {
      console.log("药库搜索 => " + this.searchContent);
      this.clearTcmList();
      this.onLoad();
    },
    onFinish: function ({ selectedOptions }) {
      this.cascaderShow = false;
      // 顺序很重要！！！
      //TODO classification 没有灵活性，想到可以设置一个英文 tagValue
      this.classification = selectedOptions[0].value;
      this.tagValue = selectedOptions.map((option) => option.text).join("/");
      //TODO 后端请求分类 用 change 异步
      //TODO 字符映射数据库字段名 json？？？
    },
    onTagClose: function () {
      this.tagValue = undefined;
      this.classification = undefined;
      // 不知道怎么把级联初始化，直接赋空字符串不可行，上方的滑块位置不正确
      // this.cascaderValue = "";
    },
    onLoad: function () {
      console.log("请求前页数：" + this.pageIndex);
      // 定时器，时间和 axios 的超时时间一致，错误处理
      const time = setTimeout(() => {
        console.log("10s 后 loading 值 => " + this.loading);
        if (this.loading) {
          console.log("list 加载失败");
          //TODO 未知失败请求后的页数是否增加，好像是增加的，那需要回溯，但是再执行一次就会成功，一下子显示 2 perPage 也不是不可以
          console.log("失败请求后页数 => " + this.pageIndex);
          this.error = true;
          this.loading = false;
        }
      }, 10000);
      const query = qs.stringify({
        type: this.classification || "all",
        type_value:
          (this.classification && this.tagValue.split("/")[1]) || undefined,
        page: this.pageIndex,
        per_page: this.pageSize,
        keyword: stringCheck(this.searchContent)
          ? this.searchContent
          : undefined,
      });
      this.$api.tcm.index(query).then((response) => {
        console.log(`GET /tcms?${query} => ` + response.statusText);
        for (let item of sliceArray(response.data, 2)) {
          this.tcmList.push(item);
        }
        // 加载状态结束
        this.loading = false;
        // 关闭定时器
        console.log("list 加载成功，关闭 error 计时器");
        clearTimeout(time);
        this.pageIndex++;
        console.log("请求后页数 => " + this.pageIndex);

        // 数据全部加载完成
        if (response.data < this.pageSize) {
          this.finished = true;
        }
      });
    },
    clearTcmList: function () {
      this.tcmList = [];
      this.pageIndex = 0;
      this.finished = false;
      this.loading = true;
    },
  },
  components: {
    TcmCard,
  },
};
</script>

<style scoped>
.van-icon-filter-o::before {
  color: #646566;
}

.van-nav-bar__right > span {
  color: #646566;
}

.classification {
  background-color: #ffffff;
  padding: 6px 16px;
}

.tcm-house {
  padding: 0 8px;
  margin-top: 6px;
}

/* 防止内容被底部栏遮挡 */
.store-house {
  margin-bottom: 50px;
}
</style>
