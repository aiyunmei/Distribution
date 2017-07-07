<template>
  <div class="item">

    <div class="item-search">
      <el-collapse>
        <el-collapse-item name="1">
          <template slot="title">
            <el-button type="primary">搜索</el-button>
          </template>
          <div class="item-search-input">
            <el-row>
              <el-col :span="4">
                <el-input v-model="searchData.userId" placeholder="userId" class="item-search-input-l" @keyup.enter.native="search"></el-input>
              </el-col>
              <el-col :span="5">
                <el-date-picker v-model="searchData.createTime" type="date" placeholder="创建时间" align="right"
                                @input="createTimeChange" :editable="false" class="item-search-input-l">
                </el-date-picker>
              </el-col>
              <el-col :span="1">
                <el-button type="primary" icon="search" @click="search"></el-button>
              </el-col>
              <el-col :span="1">
                <el-button type="primary" icon="delete" @click="reset"></el-button>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <div class="item-table">

      <div class="item-table-title">
        <h2>{{ tableTitle.big }}<span>{{ tableTitle.small }}</span></h2>
        <div class="item-table-add"></div>
      </div>

      <div class="item-table-main">

        <el-table :data="tableData" border>
          <el-table-column v-for="(item,index) in table" :label="item.label" :key="index" :sortable="item.sortable ? true : false" :prop="item.name">
            <template scope="scope">
              <span :title="scope.row[item.name]">{{ scope.row[item.name] }}</span>
            </template>
          </el-table-column>
        </el-table>

        <div class="item-pagination">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="page.pageNum"
            :page-size="page.pageSize"
            :total="page.total"
            layout="prev, pager, next, jumper, total">
          </el-pagination>
        </div>
      </div>

    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import setDate from '../../../utils/date/setDate'
  import ajax from '../../../utils/ajax/index'
  export default {
    data () {
      return {
        searchData: { // 搜索字段
          userId: '', createTime: ''
        }
      }
    },
    computed: mapState({
      tableTitle: state => state.tableTitle,
      table: state => state.table,
      tableData: state => state.tableData,
      page: state => state.page
    }),
    mounted () {
      this.Result()
    },
    methods: {
      Result (formData) { // 初始化
        let that = this
        let url = that.$api.userInfo.result
        let store = that.$store
        let msg = that.$message

        ajax.get(url, formData || {}, store).then((res) => {
          console.log(res)
          let data = res.data.alipayUserList
          let page = res.data.page
          data.length === 0 ? msg({type: 'error', message: '未查询到数据'}) : ''
          store.dispatch('setTableData', data)
          store.dispatch('setPage', page)
        })
      },
      search () {
        this.searchData.pageNum = 1
        this.Result(this.searchData)
      },
      reset () {
        this.$clearJson(this.searchData)
      },
      handleCurrentChange (val) {
        this.searchData.pageNum = val
        this.Result(this.searchData)
      },
      createTimeChange (val) {
        this.searchData.createTime = setDate(val)
      }
    }
  }
</script>
