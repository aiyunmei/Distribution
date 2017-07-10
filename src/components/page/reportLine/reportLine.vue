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
                <el-input v-model="searchData.lineShort" placeholder="公司名称" class="item-search-input-l" @keyup.enter.native="search"></el-input>
              </el-col>
              <el-col :span="8">
                <el-date-picker class="item-search-input-l" @keyup.enter.native="search" v-model="dateScope" type="daterange" placeholder="选择日期范围" align="left" :editable="false" @input="dateScopeChange"></el-date-picker>
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
              <span v-if="item.name === 'amount'" :title="scope.row[item.name] / 100">{{ scope.row[item.name] / 100 }}</span>
              <span v-else :title="scope.row[item.name]">{{ scope.row[item.name] }}</span>
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
  import ajax from '../../../utils/ajax/index'
  import setDate from '../../../utils/date/setDate'
  export default {
    data () {
      return {
        dateScope: [], // 日期范围
        searchData: {
          lineShort: '', startTime: '', endTime: ''
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
      Result (fromData) { // 初始化
        let that = this
        let store = that.$store
        let url = that.$api.reportLine.result

        ajax.get(url, fromData || {}, store, true).then((res) => {
          console.log(res)
          let data = res.data
          let page = res.page
          store.dispatch('setTableData', data)
          store.dispatch('setPage', page)
        })
      },
      search () { // 搜索
        this.searchData.pageNum = 1
        this.Result(this.searchData)
      },
      reset () { // 清空
        this.dateScope = []
        this.$clearJson(this.searchData)
      },
      handleCurrentChange (val) { // 分页
        this.searchData.pageNum = val
        this.Result(this.searchData)
      },
      dateScopeChange (val) {
        console.log(val)
        this.searchData.startTime = setDate(val[0])
        this.searchData.endTime = setDate(val[1])
      }
    }
  }
</script>
