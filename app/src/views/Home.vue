<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="['2']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1"> nav 1 </a-menu-item>
        <a-menu-item key="2"> nav 2 </a-menu-item>
        <a-menu-item key="3"> nav 3 </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="300" style="background: #fff; padding-left: 12px">
        <a-list
          item-layout="horizontal"
          :data-source="data"
          :loading="{
            tip: 'Waiting for http requests',
            spinning: false,
          }"
          header="Requests (Last 50 records)"
        >
          <a-list-item
            slot="renderItem"
            slot-scope="item"
            @click="onChange(item)"
            :class="{'selectedItem': item._id==selectedItem._id}"
          >
            <a-list-item-meta
              :description="new Date(item.createdAt).toLocaleString()"
            >
              <span slot="title">{{ item.path }}</span>
              <a-avatar
                slot="avatar"
                style="color: #fff; backgroundColor: #5cb85c"
                shape="square"
              >
                {{ item.method }}
              </a-avatar>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-page-header
          style="border: 1px solid rgb(235, 237, 240)"
          :title="data[0].url"
          :backIcon="false"
        />
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '24px',
            margin: 0,
            minHeight: '280px',
          }"
        >
          <a-row :gutter="24">
            <a-col :span="12">
              <b>Request Details</b>
              <a-table
                :columns="detailColumns"
                :data-source="details"
                :showHeader="false"
                :pagination="false"
                size="middle"
              >
              </a-table>
            </a-col>
            <a-col :span="12">
              <b>Headers</b>
              <a-table
                :columns="headerColumns"
                :data-source="headers"
                :showHeader="false"
                :pagination="false"
                size="middle"
              >
              </a-table>
            </a-col>
          </a-row>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
const detailColumns = [
  {
    title: "Key",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Value",
    dataIndex: "value",
    key: "value",
  },
];

const headerColumns = [
  {
    title: "Key",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Value",
    dataIndex: "value",
    key: "value",
  },
];

export default {
  data() {
    return {
      detailColumns: detailColumns,
      headerColumns: headerColumns,
      headers: [],
      details: [],
      selectedItem: {},
      collapsed: false,
      data: [],
      selectedRowKeys: [],
    };
  },
  methods: {
    onChange(item) {
      this.updateDetails(item)
    },

    updateDetails(item) {
      this.selectedItem = item;

      this.headers = Object.keys(this.selectedItem.headers).map((header) => {
        return { key: header, value: this.selectedItem.headers[header] };
      });
      this.details = [
        {
          key: "Method",
          value: this.selectedItem.method,
        },
        {
          key: "Date",
          value: new Date(this.selectedItem.createdAt).toLocaleString(),
        },
      ];
    },

    getLogs() {
      this.axios.get("/logs").then((res) => {
        this.data = res.data;

        this.updateDetails(res.data[0])
      });
    },
  },

  mounted() {
    const io = require("socket.io-client");

    const socket = io("http://localhost:3000");
    socket.on("connect", () => {
      console.log("websocket connected..."); // true
    });
    socket.on("refresh", () => {
      this.getLogs();
    });

    this.getLogs();
  },
};
</script>

<style>
.selectedItem {
  background: rgba(24, 144, 255, 0.2);
}
</style>
