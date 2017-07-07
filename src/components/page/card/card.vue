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
              <el-col :span="2">
                <el-input  v-model="searchData.userName" placeholder="姓名" class="item-search-input-l" @keyup.enter.native="search"></el-input>
              </el-col>
              <el-col :span="2">
                <el-input  v-model="searchData.cardNo" placeholder="卡编号" class="item-search-input-l" @keyup.enter.native="search"></el-input>
              </el-col>
              <el-col :span="3">
                <el-input  v-model="searchData.mobilePhone" placeholder="电话" class="item-search-input-l" @keyup.enter.native="search"></el-input>
              </el-col>
              <el-col :span="3">
                <el-input v-model="searchData.userId" placeholder="userId" class="item-search-input-l" @keyup.enter.native="search"></el-input>
              </el-col>
              <el-col :span="2">
                <el-select v-model="searchData.cardStatus" placeholder="状态" class="item-search-input-l" @keyup.enter.native="search">
                  <el-option v-for="item in cardStatusOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                </el-select>
              </el-col>
              <el-col :span="5">
                <el-date-picker v-model="searchData.checkEndTime" @input="checkEndTimeChange" type="date" placeholder="退卡截至日期" align="right" :editable="false" class="item-search-input-l"></el-date-picker>
              </el-col>
              <el-col :span="5">
                <el-date-picker v-model="searchData.createTime" type="date" @input="createTimeChange" placeholder="领卡时间" align="right" :editable="false" class="item-search-input-l"></el-date-picker>
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
              <span v-if="item.name === 'cardStatusName'">
                <span v-show="!scope.row.edit">{{ scope.row[item.name] }}</span>
                <span v-show="scope.row.edit">
                  <el-select v-model="scope.row.cardStatus">
                    <el-option  v-for="(item,index) in cardStatusOptions" :label="item.label" :value="item.value" :key="index" :disabled="item.value === 'disabled' ? true : false"></el-option>
                  </el-select>
                </span>
              </span>
              <span v-else :title="scope.row[item.name]">{{ scope.row[item.name] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="90">
            <template scope="scope">
              <el-button v-show='!scope.row.edit' type="primary" @click='handleEdit(scope.$index, scope.row)' size="small" icon="edit">编辑</el-button>
              <el-button v-show='scope.row.edit' type="success" @click='handleUpdate(scope.$index, scope.row)' size="small" icon="check">完成</el-button>
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
  import message from './js/msg'
  export default {
    data () {
      return {
        searchData: { // 搜索字段
          cardNo: '', userId: '', cardStatus: 'disabled', checkEndTime: '', createTime: '', userName: '', mobilePhone: ''
        }
      }
    },
    computed: mapState({
      cardStatusOptions: state => state.cardStatusOptions,
      tableTitle: state => state.tableTitle,
      table: state => state.table,
      tableData: state => state.tableData,
      page: state => state.page
    }),
    mounted () {
      this.Result(this.searchData)
    },
    methods: {
      Result (formData) { // 初始化
        let that = this
        let store = that.$store
        let url = that.$api.card.result

        ajax.get(url, formData || {}, store).then((res) => {
          console.log(res)
          let page = res.data.page
          let data = res.data.virtualTransitCardList
          data.length === 0 ? that.$message({type: 'error', message: '未查询到数据'}) : ''
          for (let i = 0; i < data.length; i++) {
            data[i].cardStatusName = that.$cardStatus(data[i].cardStatus)
            data[i].edit = false
          }
          store.dispatch('setTableData', data)
          store.dispatch('setPage', page)
        })
      },
      search () { // 搜索
        this.searchData.pageNum = 1
        this.Result(this.searchData)
      },
      reset () { // 清空搜索数据
        this.$clearJson(this.searchData)
        this.searchData.cardStatus = 'disabled'
      },
      handleCurrentChange (val) { // 分页
        this.searchData.pageNum = val
        this.Result(this.searchData)
      },
      handleEdit (index, row) { // 编辑
        row.edit = true
      },
      handleUpdate (index, row) { // 提交
        let that = this
        let store = that.$store
        let msg = that.$message
        let confirm = that.$confirm
        let url = that.$api.card[row.cardStatus]
        let params = { id: row.id, cardStatus: row.cardStatus, userId: row.userId }

        store.dispatch('setIndexEdit', index)

        confirm('是否继续?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'})
          .then(() => { // 确认
            ajax.post(url, params, store, false).then((res) => {
              console.log(res.message.code)
              message(res, store, row, that.$cardStatus, msg)
              row.edit = false
            })
          }).catch(() => { row.edit = false })
      },
      checkEndTimeChange (val) {
        this.searchData.checkEndTime = setDate(val)
      },
      createTimeChange (val) {
        this.searchData.createTime = setDate(val)
      }
    }
  }
</script>
